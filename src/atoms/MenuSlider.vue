<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MenuSlider",
  props: { isVisible: { type: Boolean, default: false } },
  emits: ["openMenu"],
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
  <div
    v-if="props.isVisible"
    class="menu-slider-wrapper absolute top-0 right-0 z-4"
    @click="openMenu()"
  >
    <h2 class="menu-labels flex">
      <span>MENU</span>
      <span>MENU</span>
      <span>MENU</span>
      <span>MENU</span>
      <span>MENU</span>
      <span>MENU</span>
      <span>MENU</span>
      <span>MENU</span>
      <span>MENU</span>
    </h2>
  </div>
</template>yarn 

<style scoped lang="scss">
.menu-slider-wrapper {
  height: 100%;
  width: 5rem;
  cursor: pointer;
  transform: translateY(-70%);
  animation: infinite slide-right 10s linear;
}

.menu-labels {
  font-size: 2rem;
  letter-spacing: 5px;
  color: #f2f2f2;
  transform: rotate(90deg);
  & span {
    padding: 2rem;
    background: linear-gradient(
      85.18deg,
      #f99bc0 34.19%,
      #aabbc1 54.56%,
      #0ef9c2 72.58%,
      #01fec2 119.57%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  @keyframes slide-right {
    to {
      transform: translateY(0);
    }
  }
}
</style>