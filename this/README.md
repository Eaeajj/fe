# Exhaustive guide to this keyword javascript

Pointing out best explanation to understand this   
[video to article below](https://www.youtube.com/watch?v=q0N6Dzu-Jl8)  
[article](https://medium.com/@gordon_zhu/understand-javascripts-this-keyword-in-any-conceivable-situation-4945637fbe7a)  

```
                ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                ┃   _____ _   _ ___ ____    ┃
                ┃  |_   _| | | |_ _/ ___|   ┃
                ┃    | | | |_| || |\___ \   ┃
                ┃    | | |  _  || | ___\ |  ┃
                ┃    |_| |_| |_|___|____/   ┃
                ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

╔════════════════════════════════════════════════════════════╗
║                        SPECIAL CASE                        ║
╚════════════════════════════════════════════════════════════╝

┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
│bind, call,│   │    new    │   │    =>     │   │   super   │
│   apply   │   │           │   │           │   │ .method() │
└───────────┘   └───────────┘   └───────────┘   └───────────┘
      │               │               │               │
      │               │               │               │
      ▼               ▼               ▼               ▼
┌───────────┐   ┌───────────┐ ┌──────────────┐┌──────────────┐
│ Up to you │   │ New empty │ │Outside `this`││Outside `this`│
│           │   │  object   │ │when function ││when function │
└───────────┘   └───────────┘ │  is created  ││  is invoked  │
                              └──────────────┘└──────────────┘

╔════════════════════════════════════════════════════════════╗
║                        COMMON CASE                         ║
╚════════════════════════════════════════════════════════════╝

                        ┌───────────┐
                        │   In a    │         ┌───────────┐
                        │ function? │────No──▶│  window   │
                        └───────────┘         └───────────┘
                              │
                             Yes
                              │
                              ▼
                        ┌───────────┐
                        │Invoked as │
                        │  method?  │
                        └───────────┘
                              │
                 ┌─────Yes────┴──────No────┐
                 │                         │
                 ▼                         ▼
       ┌───────────────────┐     ┌───────────────────┐
       │                   │     │ window (undefined │
       │    Left of dot    │     │if function created│
       │                   │     │     on class)     │
       └───────────────────┘     └───────────────────┘
```

That above good generalized idea. But I want to consider this keyword via interview quetions and somefraemwork usage situations


```typescript
function someFabric() {
  return {
    foo: 5,
    bar() { // or bar: function() {} // there is no difference in behavior
      return this.foo
    },
    baz: () => {
      return this.foo
    },
  }
}

const instance = someFabric()
instance.bar() // (returned object).foo
instance.baz() // (global).foo

const instanceBindedContext = someFabric.call({foo: 10})
instanceBindedContext.bar() // (returned object).foo
instanceBindedContext.baz() // (binded object).foo
```

```typescript
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo); // bar
        console.log("outer func:  self.foo = " + self.foo); // bar
        // (0)
        
        const goo = () => {
          // (1)
          // looks at this in lexical context of outer func (0)
          const doo = () => {
            // (2)
            // looks at  this in lexical context of outer func (1)
            console.log("inner func:  this.foo = " + this.foo); // bar
            console.log("inner func:  self.foo = " + self.foo); // bar
          };
          doo();
        }
        goo();
    }
};
myObject.func();
```

```typescript
const obj = {
  bar: 'bar',
  foo() {

    setTimeout(() => {
      console.log(this.bar) // 'bar'
    })
  }
}
```
