<template>
  <div class="mx-auto max-w-[1200px] flex flex-col items-center">
    <p>text {{ text }}</p>
    <p>stateShallowRef {{ stateShallowRef }}</p>
    <p>stateShallowRef2 {{ stateShallowRef2 }}</p>
    <p>stateMarkRaw {{ stateMarkRaw }}</p>
    <p>proxy {{ proxy }}</p>
    <button
      type="button"
      class="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="handlerChangeState()"
    >
      click
    </button>
  </div>
</template>
<script setup>
import { ref, shallowRef, markRaw, onMounted } from "vue";

let text = 1;
const stateRef = ref(0);
const proxy = ref([1, 2, 3]);
const stateShallowRef = shallowRef({
  count: 0,
  list: [1, 2, 3],
});
const stateShallowRef2 = shallowRef(0);
let stateMarkRaw = markRaw(0);

const handlerChangeState = () => {
  text = +1;

  //shalloRef

  //not trigger
  // stateShallowRef.value.count += 1;
  // stateShallowRef.value.list = [1, 2, 2, 2, 2];
  // does trigger change
  // stateShallowRef2.value += 1;
  // stateShallowRef.value = { count: 2, list: [1, 2, 3, 4] };

  //markRaw
  // stateMarkRaw += 1;
  // console.log("stateMarkRaw", stateMarkRaw);

  //proxy
  proxy.value.push(4);
  console.log("proxy", proxy.value);
};

onMounted(() => {});
</script>
