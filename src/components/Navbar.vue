<template>
  <nav
    class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a
        href="https://flowbite.com/"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Flowbite</span
        >
      </a>

      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="(link, index) in links" :key="index">
            <RouterLink
              :to="link.to"
              :class="[
                'block py-2 rounded-[8px] px-3',
                {
                  'text-white ': isActive(link),
                  'md:bg-transparent md:text-blue-700': !isActive(link),
                  'text-gray-900': !isActive(link),
                  'hover:bg-gray-100': !isActive(link),
                  'dark:text-white dark:hover:bg-gray-700 dark:hover:text-white':
                    !isActive(link),
                },
              ]"
            >
              <a>{{ link.label }}</a>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

interface Link {
  to: string;
  label: string;
}

export default defineComponent({
  name: "Navbar",
  setup() {
    // Define the array of links with types
    const links: Link[] = [
      { to: "/", label: "Home" },
      { to: "/parent", label: "Parent to Children" },
      { to: "/style", label: "Style" },
      { to: "/3d", label: "3D" },
      { to: "/ref", label: "Ref" },
      { to: "/Navbar", label: "Navbar" },
      { to: "/Navbar2", label: "Navbar2" },
    ];

    // Access the current route using `useRoute` hook
    const route = useRoute();

    // Computed property to check if the current route matches a given link
    const isActive = (link: Link): boolean => {
      return route.path === link.to;
    };

    // Return the links and isActive method to the template
    return {
      links,
      isActive,
    };
  },
});
</script>

<style lang="css">
.router-link-active {
  color: #fff;
  background-color: #2563eb;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: background-color 0.2s;
}
</style>
