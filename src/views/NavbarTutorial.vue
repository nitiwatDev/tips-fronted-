<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface FooterItem {
  component: any;
  label: string;
  key: string;
}
const footerItems: FooterItem[] = [
  { component: "pi-envelope", label: "Envelope", key: "main" },
  { component: "pi-file-plus", label: "File", key: "deposit" },
  { component: "pi-map", label: "Map", key: "game" },
  { component: "pi-qrcode", label: "QR code", key: "withdraw" },
  { component: "pi-trash", label: "Trash", key: "promotion" },
];

const router = useRouter();
const route = useRoute();
const currentMenu = ref<string>("main");

const footerRef = ref<HTMLElement>();

const routePage = async (key: string) => {
  currentMenu.value = key;
};
const getDirection = async () => {
  await nextTick();
  const footer = footerRef.value as HTMLElement;
  const container = footer.querySelector(".container") as HTMLElement;
  const activeItem = footer.querySelector("li.active") as HTMLElement;

  const activeItemRect = activeItem.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  console.log("containerRect", containerRect.left);
  console.log("activeItemRect", activeItemRect.left);

  const positionXActive = activeItemRect.left - containerRect.left;;
  container.style.setProperty("--position-x-active", `${positionXActive}px`);
};

onMounted(async () => {
  addEventListener("resize", getDirection);
  getDirection();
});
watch(currentMenu, async () => {
  getDirection();
});
onUnmounted(() => {
  removeEventListener("resize", getDirection);
});
</script>

<template>
  <footer ref="footerRef" v-if="route.name !== 'play'">
    <div class="container">
      <ul>
        <li
          :class="{ active: currentMenu === item.key }"
          v-for="(item, index) in footerItems"
          :key="index"
          @click="routePage(item.key)"
        >
          <a>
            <span class="icon">
              <i class="text-[20px]" :class="`pi ${item.component}`"></i>
            </span>
            <span
              :class="{
                'text-active': currentMenu === item.key,
              }"
              class="text"
              >{{ item.label }}</span
            >
          </a>
        </li>
      </ul>
      <div class="effect">
        <div class="circle"></div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  z-index: 999;
  max-width: 700px;
  height: calc(100% - 71px);
}

footer .container {
  position: relative;
  max-width: 100% !important;
  padding: 0;
  --w-h-item: 70px;
}
footer .container ul {
  display: grid;
  grid-template-columns: repeat(5, var(--w-h-item));
  grid-template-rows: var(--w-h-item);
  justify-content: space-between;
  padding: 0 10px;
  margin: 0;
  position: relative;
  max-width: 560px !important;
  margin: 0 auto;
  /* background-color: white !important; */
}
footer .container ul li {
  cursor: pointer;
  text-align: center;
  color: #fff;
  list-style: none;
  position: relative;
  z-index: 1;
  display: flex;
  gap: 3px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
footer .container ul li a {
  text-decoration: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  color: black !important;
}

footer .container ul li a:hover {
  background-color: transparent;
}
footer .container ul li a:hover .icon {
  transform: scale(1.3);
  transition: all 0.3s ease;
}

footer .container ul li.active a .icon {
  transform: scale(1.3) translateY(-20px) !important;
  font-weight: 900;
}

footer .container ul li a .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
}

footer .container ul li a .text {
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  position: absolute;
  bottom: 4px;
  transform: translateY(9px) !important;
}

footer .container ul li a .text.text-active {
  animation-fill-mode: forwards;
  animation: signup 0.3s ease-in-out;
  opacity: 1;
  transform: translateY(0px) !important;
}

footer .container ul li a .icon svg {
  width: 23px;
  height: 23px;
}

footer .container .effect {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: calc(var(--w-h-item) + 25px);
  overflow: hidden;
}

footer .container .effect::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: calc(var(--w-h-item) + 0px);
  width: calc(var(--position-x-active) + 1px);
  background-color: white;
  border-radius: 16px 30px 0 16px;
  transition: all 0.3s ease;
}

footer .container .effect::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  height: calc(var(--w-h-item) + 0px);
  width: calc(100% - var(--position-x-active) - var(--w-h-item) + 1px);
  background-color: white;
  border-radius: 30px 16px 16px 0;
  z-index: -1;
  transition: all 0.3s ease;
}

footer .container .effect .circle {
  position: absolute;
  width: calc(var(--w-h-item) - 4px);
  height: calc(var(--w-h-item) - 4px);
  background: linear-gradient(180deg, rgb(190, 244, 190), green);
  background-size: 400% 400%;
  left: calc(var(--position-x-active) + 2px);
  border-radius: 50%;
  transition: all 0.3s ease;
}

footer .container .effect .circle::before {
  content: "";
  position: absolute;
  left: -3px;
  right: -3px;
  height: 100%;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 0px 50px 0px 20px white;
  transition: all 0.3s ease;
  bottom: -6px;
}

</style>
