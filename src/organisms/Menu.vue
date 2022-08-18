<script>
import { defineComponent} from 'vue'
export default defineComponent({
name: 'Menu',
emits: ["closeMenu"],
setup(props, {emit}){
    const closeMenu = () => {
        emit("closeMenu", false)
        console.log("click");
    }
    return {
        closeMenu
    }
}
})
</script>

<template>
<section class='menu-wrapper'>
    <nav
    class="
      navbar
      flex
      items-center
      justify-end
      w-full
      absolute
      top-0
      left-0
      z-2
      p-4
      h-32
    "
  >
    <img class="close-icon" src="../assets/images/closeIcon.png" @click="closeMenu()"  />
  </nav>
</section>
</template>

<style scoped>
.menu-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: #b09d95;
}

.close-icon{
    height: 2.5rem;
    width: auto;
    cursor: pointer;
}
</style>