<template>
  <div class="divide-x flex justify-center items-center gap-3">
    <div class="flex flex-col items-center">
      <span> STYLE computed</span>
      <div class="phoneSrc" :style="phoneSrc" />
      <div class="flex items-center gap-2">
        <button
          @click="increateSize()"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Bigger
        </button>
        <button
          @click="decreateSize()"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Smaller
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <span> Class computed</span>
      <div :class="checkClass"></div>
      <div class="flex items-center gap-2 relative z-[99]">
        <button
          @click="PlayPic()"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{ playing ? "Stop" : "Play" }}
        </button>
        <button
          @click="BlockPic()"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Block
        </button>
        <button
          @click="NonePic()"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          None
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Phone from "../assets/phone.png";

const size = ref(600);
const isBlock = ref(true);
const playing = ref(false);
const message = ref("Hello");
const increateSize = () => {
  size.value += 20;
  // updatePhoneSrc()
};
const decreateSize = () => {
  size.value -= 20;
  // updatePhoneSrc()

};

const phoneSrc = computed(() => {
  return {
    backgroundImage: `url(${Phone})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: `${size.value}px`,
    height: `${size.value}px`,
    Transition: "all 0.5s",
    "--message": `"${message.value}"`,
    "--color": "red",
  };
});

// const phoneSrc = ref({});
// const updatePhoneSrc = () => {
//   phoneSrc.value = {
//     backgroundImage: `url(${Phone})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     width: `${size.value}px`,
//     height: `${size.value}px`,
//     transition: "all 0.5s",
//     "--message": `"${message.value}"`,
//     "--color": "red",
//   };
// };

const checkClass = computed(() => {
  return {
    "bg-phone": isBlock.value,
    "bg-phone-none": !isBlock.value,
    play: playing.value,
  };
});

const checkClassTernary = computed(() => {
  return `${isBlock.value} ? "bg-phone" : "bg-phone-none" `;
});

const PlayPic = () => {
  if (!isBlock.value) {
    return;
  }
  playing.value = !playing.value;
};

const BlockPic = () => {
  isBlock.value = true;
};
const NonePic = () => {
  isBlock.value = false;
};

watch(
  () => isBlock.value,
  (newVal) => {
    if (!newVal) {
      playing.value = false;
    }
  }
);
</script>
<style lang="css" scoped>
.phoneSrc {
  position: relative;
}
.phoneSrc::after {
  content: var(--message);
  color: var(--color, #12d12f);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
}

.bg-phone {
  background-image: url("../assets/phone.png");
  background-size: cover;
  background-position: center;
  width: 600px;
  height: 600px;
}
.bg-phone-none {
  /* background-image: url("../assets/phone.png");
  background-size: cover;
  background-position: center; */
  width: 600px;
  height: 600px;
}
.play {
  animation: play 1s infinite;
}
@keyframes play {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
