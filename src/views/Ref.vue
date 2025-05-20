<template>
  <div class="mx-auto max-w-[1200px] flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-4">
      Reference ({{ currentSlide.toUpperCase() }})
    </h1>

    <div
      class="relative min-w-[600px] min-h-[300px] flex items-center justify-center"
    >
      <button @click="updateSlide('prev')" class="btn-slide left-[-80px]">
        <span class="!text-black !text-[20px]"><</span>
      </button>
      <Transition name="slide-up" mode="out-in">
        <div class="flex flex-col gap-2" v-if="currentSlide === 'core'">
          <div class="flex items-center gap-4">
            <button @click="handlerAdd('let')">Add</button>
            <p>
              letValue : <span>{{ letValue }}</span>
            </p>
          </div>
          <div class="flex items-center gap-4">
            <button @click="handlerAdd('ref')">Add</button>
            <p>
              refValue : <span>{{ refValue }}</span>
            </p>
          </div>

          <p>
            computedValue : <span>{{ computedValue }}</span>
          </p>
          <div class="flex items-center gap-4">
            <button @click="handlerAdd('reactive')">Add</button>
            <p>reactiveValue :</p>
            <pre>{{ JSON.stringify(reactiveValue, null, 2) }}</pre>
          </div>
        </div>
        <div class="flex flex-col gap-2" v-else-if="currentSlide === 'utility'">
          <p>
            isRefValue : <span>{{ isRefValue }}</span>
          </p>

          <div class="flex items-center gap-4">
            <button @click="handlerAdd('toRef')">Add</button>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-4">
                <p>reactiveObject :</p>
                <pre> {{ JSON.stringify(reactiveObject, null, 2) }}</pre>
              </div>

              <p>
                toRefValue : <span>{{ toRefValue }}</span>
              </p>
              <p>
                toRefObjectValue : <span>{{ toRefObjectValue }}</span>
              </p>
              <p>
                toRefObjectValue2 : <span>{{ toRefObjectValue2 }}</span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-2"
          v-else-if="currentSlide === 'advanced'"
        >
          <div class="flex items-center gap-4">
            <button @click="handlerAdd('shallow')">Add</button>
            <p>shallowRefValue :</p>
            <pre>{{ JSON.stringify(shallowRefValue, null, 2) }}</pre>
          </div>
          <div class="flex items-center gap-4">
            <button @click="handlerAdd('shallowReactive')">Add</button>
            <p>shallowReactiveValue :</p>
            <pre>{{ JSON.stringify(shallowReactiveValue, null, 2) }}</pre>
          </div>
          <button @click="handlerAdd('toRaw')">ToRaw</button>
        </div>
      </Transition>
      <button @click="updateSlide('next')" class="btn-slide right-[-80px]">
        <span class="!text-black !text-[20px]">></span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
//core
import { ref, computed, reactive, readonly } from "vue";

// Utility
import { isRef, toRef } from "vue";

//Advanced
import { shallowRef, shallowReactive, markRaw, toRaw } from "vue";

import { type Component } from "vue";
import SvgDeposit from "../components/SvgDeposit.vue";
import SvgWithdraw from "../components/SvgWithdraw.vue";
import SvgDelete2 from "../components/SvgDelete2.vue";
let letValue = 0;
const refValue = ref<number>(0);
const computedValue = computed<number>(() => refValue.value + 1);
const reactiveValue = reactive({
  name: "John",
  age: 30,
});
const readonlyValue = readonly(reactiveValue);

// Utility
const isRefValue = isRef(refValue);
const reactiveObject = reactive({
  name: "John",
  age: 30,
});
const toRefValue = toRef(letValue);
const toRefObjectValue = toRef(reactiveObject, "name");
const toRefObjectValue2 = ref(reactiveObject.name);

// Advanced
const shallowRefValue = shallowRef({
  name: "John",
  pet: {
    type: "dog",
    age: 5,
  },
});
const shallowReactiveValue = shallowReactive({
  name: "John",
  lastName: "Doe",
  pet: {
    type: "dog",
    age: 5,
  },
});
const menuDropdownList = ref<
  { label: string; value: string; icon: Component }[]
>([
  {
    label: "เพิ่มเงิน",
    value: "increase",
    icon: markRaw(SvgDeposit),
  },
  {
    label: "ถอนเงิน",
    value: "withdraw",
    icon: markRaw(SvgWithdraw),
  },
  {
    label: "ลบรายการ",
    value: "delete",
    icon: markRaw(SvgDelete2),
  },
]);

const handlerAdd = (type: string) => {
  switch (type) {
    case "let":
      letValue++, console.log("letValue", letValue);
      break;
    case "ref":
      refValue.value++;
      break;
    case "reactive":
      reactiveValue.name = reactiveValue.name + "e";
      reactiveValue.age++;
      break;
    case "readonly":
      // readonlyValue = "Doe";
      console.log("readonlyValue", readonlyValue);
      break;
    case "toRef":
      toRefValue.value = toRefValue.value + 1;
      reactiveObject.name = "change name";
      break;
    case "shallow":
      // Reactivity is only at the top level
      shallowRefValue.value = { name: "Jane", pet: { type: "cat", age: 3 } }; // Reactive
      // shallowRefValue.value.name = "Jane"; // Not reactive
      break;
    case "shallowReactive":
      // Reactivity is only at the top level
      shallowReactiveValue.lastName = "Jane"; // Reactive
      // shallowReactiveValue.pet.type = "cat"; // Not reactive
      console.log("menuDropdownList", menuDropdownList.value);
      break;
    case "toRaw":
      console.log("menuDropdownList", menuDropdownList.value);
      console.log("toRaw", toRaw(menuDropdownList.value));
      break;

    default:
      break;
  }
};

const arrSlide = ["core", "utility", "advanced"];

const currentSlide = ref("core");
const updateSlide = (direction: "prev" | "next") => {
  const currentIndex = arrSlide.indexOf(currentSlide.value);
  if (direction === "prev") {
    currentSlide.value =
      arrSlide[(currentIndex - 1 + arrSlide.length) % arrSlide.length];
  } else if (direction === "next") {
    currentSlide.value = arrSlide[(currentIndex + 1) % arrSlide.length];
  }
};
</script>
<style lang="css" scoped>
h1 {
  color: #14ff96;
  font-size: 30px;
}
p {
  color: white;
  font-size: 20px;
}
span {
  color: white;
  font-weight: 800;
  font-size: 25px;
}
pre {
  display: block;
  background-color: #040512;
  border-radius: 5px;
  padding: 10px;
}
button {
  background-color: #332ce3;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.btn-slide {
  @apply cursor-pointer absolute flex items-center justify-center top-1/2 transform -translate-y-1/2 bg-white rounded-full w-[40px] h-[40px] text-black;
}
</style>
