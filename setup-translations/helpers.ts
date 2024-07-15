export type ArrayItemFormat<
  KeyName extends string,
  ValueName extends string,
  KeyValueType extends string = string
> = {
  [K in KeyName]: string;
} & {
  [K in ValueName]: KeyValueType;
};

export type KeyValuePairArrayToDictParser<
  KeyName extends string,
  ValueName extends string
> = (
  key: KeyName,
  value: ValueName
) => <
  KeyValueType extends string = string,
  T extends ArrayItemFormat<
    KeyName,
    ValueName,
    KeyValueType
  >[] = ArrayItemFormat<KeyName, ValueName, KeyValueType>[]
>(
  keyValueArray: T
) => Record<KeyValueType, string>;

export type Remapped<
  Shape extends Record<string, unknown>,
  KeyName extends string,
  ValueName extends string,
  ShapeKey extends keyof Shape = keyof Shape
> = {
  [K in ShapeKey]: Shape[K] extends string
    ? string
    : Shape[K] extends Record<string, unknown>
    ? Remapped<Shape[K], KeyName, ValueName, keyof Shape[K]>
    : Shape[K] extends ArrayItemFormat<KeyName, ValueName, infer U>[]
    ? Record<U, string>
    : never;
};

export function createKeyValuePairArrayToDictParser<
  KeyName extends string,
  ValueName extends string
>(key: KeyName, value: ValueName) {
  type ConcreteArrayItemFormat = ArrayItemFormat<KeyName, ValueName>;

  return <T extends ConcreteArrayItemFormat[]>(keyValueArray: T) => {
    type Key = T[number][KeyName];
    type Value = T[number][ValueName];

    const dictionary = {} as Record<Key, Value>;

    keyValueArray.forEach((item) => {
      const id = item[key];
      const label = item[value];

      dictionary[id] = label;
    });
    return dictionary;
  };
}

export const enumArrayToDictParser = createKeyValuePairArrayToDictParser(
  "enumValue",
  "enumName"
);
export function parseLeafsArrays<Shape extends Record<string, unknown>>(
  objToParse: Shape
): Remapped<Shape, "enumName", "enumValue"> {
  const result = {} as Remapped<Shape, "enumName", "enumValue">;
  for (const entries of Object.entries(objToParse)) {
    const [key, value] = entries as [keyof Shape, Shape[keyof Shape]];
    if (Array.isArray(value)) {
      result[key] = enumArrayToDictParser(value) as any;
    } else if (typeof value === "object" && value !== null) {
      result[key] = parseLeafsArrays(value as Record<string, unknown>) as any;
    }
  }
  return result;
}

export const getValueByPath = <T extends Record<string, unknown>>(
  obj: T,
  path: string
): string => {
  const keys = path.split(".");
  if (keys.length === 0) {
    return path;
  }
  const lastKey = keys.at(-1)!;
  if (lastKey === "None") {
    return "Отсутствует";
  }

  let intermediateResult: Record<string, unknown> = obj;
  for (const key of keys) {
    if (
      intermediateResult !== null &&
      typeof intermediateResult === "object" &&
      key in intermediateResult
    ) {
      const value = intermediateResult[key];
      if (typeof value === "string") {
        return value;
      }
      intermediateResult = value as Record<string, unknown>;
    } else {
      console.warn("no such key in dict", key);
      return lastKey;
    }
  }
  console.warn("no such key in dict", lastKey);
  return lastKey;
};
