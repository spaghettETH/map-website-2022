<script>
import { defineComponent, ref, computed } from "vue";
import MapPage from "./pages/MapPage.vue";
import Navbar from "./atoms/Navbar.vue";
import Menu from "./organisms/Menu.vue";
import MenuSlider from "./atoms/MenuSlider.vue";
import { useBreakpoint } from "./functions/useBreakpoint";
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "App",
  components: { MapPage, Navbar, Menu, MenuSlider },
  setup() {
    const navbarVisible = ref(false);
    const menuVisible = ref(false);
    const route = useRoute();

    const matches = useBreakpoint();
    const isMobile = computed(() => matches.value?.beforeLg);
    
    // Mostra la navbar solo nella home page
    const showNavbarAndSlider = computed(() => {
      return route.path === '/';
    });

    const updateNavbarVisibility = (value) => {
      navbarVisible.value = value;
    };

    return {
      menuVisible,
      navbarVisible,
      isMobile,
      showNavbarAndSlider,
      updateNavbarVisibility
    };
  },
});
</script>

<template>
  <div class="main-wrapper relative h-screen w-full">
    <Navbar
      :isVisible="showNavbarAndSlider && navbarVisible"
      class="z-2"
      @openMenu="menuVisible = $event"
    />
    <Menu v-if="menuVisible" @close-menu="menuVisible = $event" class="z-3" />
    <router-view @showNavbar="updateNavbarVisibility"></router-view>
    <MenuSlider
      v-if="!isMobile && showNavbarAndSlider && navbarVisible"
      :isVisible="navbarVisible"
      @openMenu="menuVisible = $event"
    />
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
