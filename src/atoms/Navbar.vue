<script>
import { defineComponent, computed } from "vue";
import { useBreakpoint } from "../functions/useBreakpoint";
export default defineComponent({
  name: "Navbar",
  props: { isVisible: { type: Boolean, default: false } },
  emits: ["openMenu"],
  setup(props, { emit }) {
    const openMenu = () => {
      emit("openMenu", true);
    };

    const matches = useBreakpoint();
    const isMobile = computed(() => matches.value?.beforeLg);

    const registerCommunity = () => {
      window.location.assign(
        "https://github.com/spaghettETH/map-website-2022#guidlines-to-upload-a-commuity"
      );
    };
    return {
      props,
      openMenu,
      isMobile,
      registerCommunity,
    };
  },
});
</script>

<template>
  <nav
    v-if="props.isVisible"
    class="navbar flex items-center justify-between w-full p-4 h-32"
  >
    <div class="logo-wrapper relative cursor-pointer">
      <img
        src="../assets/images/logoNav.png"
        class="absolute top-0 left-0 w-full h-full"
      />
    </div>
    <button v-if="isMobile" class="submit-com-btn" @click="openMenu()">
      Menu
    </button>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  background: transparent;
}
.logo-wrapper {
  height: 6.25rem;
  width: 6.25rem;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-in;
  }
}
.hamburger-icon {
  height: 2.5rem;
  width: auto;
  cursor: pointer;
}

.submit-com-btn {
  background-color: #f99bc0;
  color: white;
  padding: 1rem;
  font-weight: bold;
  border-radius: 1rem;
  transition: opacity 0.2s ease-in-out;

  @media (max-width: 640px) {
    padding: 0.7rem;
    font-size: 0.8em;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>