export {};
const sleep = async (delay: number) => {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(undefined);
    }, delay);
  });
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const logDebounced = debounce((msg: string) => console.log(msg));

const throttle = (fn, delay = 500) => {
  let timeoutId = null;
  let argsMem;
  return (...args) => {
    argsMem = args;
    if (timeoutId) return;
    timeoutId = null;
    setTimeout(() => {
      fn(...argsMem);
      timeoutId = clearTimeout(timeoutId);
      argsMem = null;
    }, delay);
  };
};

const logThrottled = throttle((msg) => console.log(msg));

(async () => {
  logThrottled("1");
  await sleep(400);
  logThrottled("2");
  await sleep(400);
  logThrottled("3");
})();

interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: "string";
  age: number;
  role: string;
}

type PowerUser = Omit<User, "type"> &
  Omit<Admin, "type"> & {
    role: "powerUser";
  };

declare const a: PowerUser;
