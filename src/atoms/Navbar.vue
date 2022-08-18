<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Navbar",
  props: { isVisible: { type: Boolean, default: false } },
  setup(props, { emit }) {
    const openMenu = () => {
      emit("openMenu", true);
    };
    return {
      props,
      openMenu,
    };
  },
});
</script>

<template>
  <nav
    v-if="props.isVisible"
    class="
      navbar
      flex
      items-center
      justify-between
      w-full
      p-4
      h-32
    "
  >
    <div class="logo-wrapper relative cursor-pointer">
      <img
        src="../assets/images/logoNav.png"
        class="absolute top-0 left-0 w-full h-full"
      />
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar{
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
</style>