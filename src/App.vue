<script>
import { defineComponent, ref, watchEffect } from "vue";
import MapPage from "./pages/MapPage.vue";
import Navbar from "./atoms/Navbar.vue";
export default defineComponent({
  name: "App",
  components: { MapPage, Navbar },
  setup() {
    const navbarVisible = ref(false)
    watchEffect(() => {
      console.log(navbarVisible.value);
    })
    return {
      navbarVisible
    };
  }
});
</script>

<template>
  <div class="main-wrapper relative">
    <Navbar :isVisible="navbarVisible" />
    <MapPage @show-navbar="navbarVisible = $event" />
  </div>
</template>

<style scoped>
.main-wrapper {
  background: black;
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
