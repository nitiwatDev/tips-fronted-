<template>
  <div class="">
    <button
      :class="{ scaling: expand }"
      @click="handlerIncreaseCount(1)"
      type="button"
      class="inline-flex mx-auto items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Messages
      <span
        class="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
      >
        {{ count }}
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["toggleValue", "nofity"]);
const expand = ref(false);
const count = ref(0);
const handlerIncreaseCount = (val: number) => {
  if (val) {
    expand.value = true;
  }

  if (count.value >= 100) {
    emit("nofity", `you got ${count.value} count already`);
  } else {
    count.value += val;
  }

  setTimeout(() => {
    expand.value = false;
  }, 100);
};

const resetCount = () => {
  count.value = 0;
  emit("toggleValue", 10);
};

defineExpose({ handlerIncreaseCount, resetCount });
</script>
<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
.scaling {
  animation: scale 0.3s linear;
}
@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
