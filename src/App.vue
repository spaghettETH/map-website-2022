<script>
import { defineComponent} from 'vue'
import Map from './atoms/Map.vue'
export default defineComponent({
    name: "App",
    components: { Map }
})
</script>

<template>
<Map />
</template>

<style scoped>
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

html{
  scroll-behavior: smooth;
  background: black;
  font-family: MonsterratRegular;
}
</style>
