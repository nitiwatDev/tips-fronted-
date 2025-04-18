shallow Ref

- เปลี่ยนค่าให้่ถ้าค่าบนสุดเปลีี่ยน
- will trigger a change only if you change the memory reference
- It is used for performance optimizations of large data structures or integration with external state management systems
- Performance Optimization: Since shallowRef only tracks changes to the top-level properties, it can be more performant than ref when dealing with large or deeply nested objects.

markRaw

- ทำให้ค่าไม่เป็น reactive
- Performance: Using markRaw can improve performance by reducing the overhead of Vue's reactivity system for objects that do not need to be reactive.

proxy

- proxy value refers to the reactive objects created by Vue's reactivity system. These reactive objects are proxies that wrap the original data and allow Vue to track dependencies and automatically update the DOM
