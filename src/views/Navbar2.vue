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

  const positionXActive = activeItemRect.left - containerRect.left;
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
  <footer ref="footerRef" class="footer-nav">
    <div class="container">
      <ul class="footer-flex-box">
        <li
          :class="{ active: currentMenu === item.key }"
          class="footer-item"
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
      <div class="circle"></div>
    </div>
  </footer>
</template>

<style scoped>
.footer-nav {
  background: rgb(119, 119, 119);
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

.footer-nav .container {
  position: relative;
  max-width: 100% !important;
  padding: 0;
  --w-h-item: 70px;
  --position-x-active: 82px;
  background-color: white !important;
  border-radius: 16px;
}

.footer-nav .container .footer-flex-box {
  display: grid;
  grid-template-columns: repeat(5, var(--w-h-item));
  grid-template-rows: var(--w-h-item);
  justify-content: space-between;
  padding: 0 10px;
  margin: 0;
  position: relative;
  max-width: 560px !important;
  margin: 0 auto;
}

.footer-nav .container .footer-flex-box .footer-item {
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

.footer-nav .container .footer-flex-box .footer-item a {
  text-decoration: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  color: black !important;
}

.footer-nav .container .footer-flex-box .footer-item a:hover {
  background-color: transparent;
}

.footer-nav .container .footer-flex-box .footer-item a:hover .icon {
  transform: scale(1.3);
  transition: all 0.3s ease;
}

.footer-nav .container .footer-flex-box .footer-item.active a .icon {
  transform: scale(1.3) translateY(-20px) !important;
  font-weight: 900;
}

.footer-nav .container .footer-flex-box .footer-item a .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
}

.footer-nav .container .footer-flex-box .footer-item a .text {
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  position: absolute;
  bottom: 4px;
  transform: translateY(10px) !important;
}

.footer-nav .container .footer-flex-box .footer-item a .text.text-active {
  animation-fill-mode: forwards;
  animation: signup 0.3s ease-in-out;
  opacity: 1;
  transform: translateY(0px) !important;
}

.footer-nav .container .footer-flex-box .footer-item a .icon svg {
  width: 23px;
  height: 23px;
}
.footer-nav .container .circle {
  position: absolute;
  width: calc(var(--w-h-item) - 4px);
  height: calc(var(--w-h-item) - 4px);
  background: linear-gradient(180deg, rgb(190, 244, 190), green);
  background-size: 400% 400%;
  border-radius: 50%;
  transition: all 0.3s ease;
  top: -25px;
  left: calc(var(--position-x-active) + 3px);
  border: 6px solid rgb(119, 119, 119);
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-nav .container .circle:before {
  content: "";
  position: absolute;
  width: 22px;
  height: 27px;
  background-color: white;
  top: 19px;
  left: -26px;
  border-top-right-radius: 35px;
  box-shadow: 2px -11px 0 rgb(119, 119, 119);
}
.footer-nav .container .circle:after {
  content: "";
  position: absolute;
  width: 22px;
  height: 27px;
  background-color: white;
  top: 19px;
  right: -26px;
  border-top-left-radius: 35px;
  box-shadow: -2px -11px 0 rgb(119, 119, 119);
}
@keyframes signup {
  0% {
    transform: translateY(10px) !important;
    opacity: 0;
  }
  100% {
    transform: translateY(0px) !important;
    opacity: 1;
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
