<script>
import { defineComponent, ref, watchEffect } from "vue";
import MapPage from "./pages/MapPage.vue";
import Navbar from "./atoms/Navbar.vue";
import Menu from "./organisms/Menu.vue";
import MenuSlider from "./atoms/MenuSlider.vue";
export default defineComponent({
  name: "App",
  components: { MapPage, Navbar, Menu, MenuSlider },
  setup() {
    const navbarVisible = ref(false);
    const sidemenuVisible = ref(false);
    const menuVisible = ref(true);
    watchEffect(() => {
      console.log(menuVisible.value);
    });
    return {
      navbarVisible,
      menuVisible,
    };
  },
});
</script>

<template>
  <div class="main-wrapper relative h-screen w-full">
    <Navbar :isVisible="navbarVisible" class="z-2" />
    <Menu v-if="menuVisible" @close-menu="menuVisible = $event" class="z-3" />
    <MapPage @show-navbar="navbarVisible = $event" class="z-1" />
    <MenuSlider :isVisible="navbarVisible" @openMenu="menuVisible = $event" />
  </div>
</template>

<style scoped>
.main-wrapper {
  background: black;
  overflow: hidden;
}
@font-face {
  font-family: MonsterratThin;
  src: url("./assets/fonts/Monsterrat/Montserrat-Thin.ttf");
}
@font-face {
  font-family: MonsterratRegular;
  src: url("./assets/fonts/Monsterrat/Montserrat-Regular.ttf");
}
@font-face {
  font-family: MonsterratBold;
  src: url("./assets/fonts/Monsterrat/Montserrat-Bold.ttf");
}
@font-face {
  font-family: MonsterratBlack;
  src: url("./assets/fonts/Monsterrat/Montserrat-Black.ttf");
}

html {
  scroll-behavior: smooth;
  background: black;
  font-family: MonsterratRegular;
}
</style>
