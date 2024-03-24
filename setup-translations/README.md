# Simple implementation of full type safe translations

### Breakdown

open api do not support typed dicts. So we can only define structure with 2 fields:
```
{
  key: EnumValue,
  value: string
}
```

This solution map object with nested fields another object. 
The first one (raw) we gettin from api and its leaf fields are arrays of key value structures
The second one (we map to) have leaf fields that are typed objects

And then we contructing our t function (t stands for translations) by my using mapped object.
And now we can use typed t function. Type of its argument is a union type of all possible leaf keys of mapped object




