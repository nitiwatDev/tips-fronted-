<template></template>
<script lang="ts" setup>
import { ref, readonly, reactive } from "vue";

const letValue = 0;
// letValue = 1;
console.log("letValue", letValue); // output: 0

const original = { count: 0 };
original.count = 1;
console.log("original", original); // output: { count: 1 }

const readonlyValue = readonly(original);
readonlyValue.count = 1;
console.log("readonlyValue", readonlyValue); // output: { count: 0 }

const originalRef = ref(0);
const readonlyValuRef = readonly(originalRef);
readonlyValuRef.value = 1;
console.log("readonlyValuRef", readonlyValuRef.value); // output: { value: 0 }

const originalReactive = reactive({ count: 0 });
const readonlyValueReactive = readonly(originalReactive);
readonlyValueReactive.count = 1;
console.log("readonlyValueReactive", readonlyValueReactive); // output: { count: 0 }
</script>
