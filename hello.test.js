import { describe, test, assert } from "vitest";
// Дан объект или массив thick, нужно вернуть обеъкт или массив thin.
// Массив thin такой же как входящий, но не содержащий ложные элементы. Обрабатываться должны любые вложенные объекты и массивы.
// Ложным элементом является элемент со значением false или null.
// thick является валидным массивом JS или JSON объектом.

// Пример 1:
// Дано: thick = [1, null, false, 15]
// Результат: [1, 15]

// Пример 2:
// Дано: thick = ['a', null, 'false', false, 4]
// Результат: ['a', 'false', 4]

// Пример 3:
// Дано: thick = [1, [null, 1], [false, 2], [false], true, 'two']
// Результат: [1, [1], [2], [], true, 'two']

// Пример 4:
// Дано: thick = {'a': 1, 'b': null, 'c': [false, 15], 'd': false}
// Результат: {'a': 1, 'c': [15]}

// Пример 4:
// Дано: thick = {'a': 1, 'b': [null, 1], 'c': [false, 2], 'd': [false], 'e': true, 'f': 'one'}
// Результат: {'a': 1, 'b': [1], 'c': [2], 'd': [], 'e': true, 'f': 'one'}

const isFalseValue = (value) => {
  return value === false || value === null;
};

const thickToThin = (arg) => {
  if (Array.isArray(arg)) {
    return arg
      .filter((v) => !isFalseValue(v))
      .map((v) => (typeof v === "object" ? thickToThin(v) : v));
  } else {
    return Object.fromEntries(
      Object.entries(arg)
        .filter(([key, value]) => !isFalseValue(value))
        .map(([key, value]) =>
          typeof value === "object" ? [key, thickToThin(value)] : [key, value]
        )
    );
  }
};

describe("thick to thin", () => {
  test("пример 1", () => {
    const input = [1, null, false, 15];
    const output = [1, 15];
    assert.deepEqual(thickToThin(input), output);
  });

  test("пример 2", () => {
    const input = ["a", null, "false", false, 4];
    const output = ["a", "false", 4];

    assert.deepEqual(thickToThin(input), output);
  });

  test("Пример 3", () => {
    const input = [1, [null, 1], [false, 2], [false], true, "two"];
    const output = [1, [1], [2], [], true, "two"];
    assert.deepEqual(thickToThin(input), output);
  });

  test("Пример 4", () => {
    const input = { a: 1, b: null, c: [false, 15], d: false };
    const output = { a: 1, c: [15] };
    assert.deepEqual(thickToThin(input), output);
  });

  test("Пример 5", () => {
    const input = {
      a: 1,
      b: [null, 1],
      c: [false, 2],
      d: [false],
      e: true,
      f: "one",
    };
    const output = { a: 1, b: [1], c: [2], d: [], e: true, f: "one" };

    assert.deepEqual(thickToThin(input), output);
  });
});
