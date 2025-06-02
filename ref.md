# Vue Reactivity System

## `ref`

- Creates a reactive reference to a value. Used for primitive values or objects that need reactivity.
- Always returns a single reactive reference (.value is used to access the value).
- Suitable for simple values like numbers, strings, or objects when you want to track a single value.

## `computed`

- Creates a computed property that automatically updates when its dependencies change.

## `reactive`

- Converts an object into a reactive object, where changes to its properties are tracked.
- Tracks all properties of the object deeply.
- Suitable for complex objects or when you want to manage multiple properties reactively.

## `readonly`

- Creates a read-only version of a reactive object, preventing modifications.

## `isRef`

- Checks if a value is a ref object.

## `toRef`

- Creates a ref for a specific property of a reactive object, allowing you to access and modify it reactively.

## `shallowRef`

- Creates a ref where only the top-level value is reactive, and nested properties are not.
- Will trigger a change only if you change the memory reference.
- **Performance Optimization**: Since `shallowRef` only tracks changes to the top-level properties, it can be more performant than `ref` when dealing with large or deeply nested objects.
- **Benefit**: Tracks reactivity only at the top level of the value.
- **Use Case**: Useful when you want to replace the entire object or array but don't need to track changes to its nested properties.

## `shallowReactive`

- **Benefit**: Tracks reactivity only at the top level of the object or array.
- **Use Case**: Useful when you want to track changes to the top-level properties of an object but don't need reactivity for nested properties.

## `markRaw`

- Prevents a value from becoming reactive.
- **Performance**: Using `markRaw` can improve performance by reducing the overhead of Vue's reactivity system for objects that do not need to be reactive.

## `toRaw`

- Retrieves the original raw object from a reactive or readonly proxy.

## `proxy`

- Proxy value refers to the reactive objects created by Vue's reactivity system. These reactive objects are proxies that wrap the original data and allow Vue to track dependencies and automatically update the DOM.
