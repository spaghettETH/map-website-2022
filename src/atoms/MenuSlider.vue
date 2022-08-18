<script>
import { defineComponent} from 'vue'
export default defineComponent({
name: 'MenuSlider' ,
props: { isVisible: { type: Boolean, default: false } },
emits: ["openMenu"],
setup(props){
    return {
        props
    }
}
})
</script>

<template>
<div v-if="props.isVisible" class="menu-slider-wrapper absolute top-0 right-0 z-4">
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
</template>

<style scoped lang="scss">
.menu-slider-wrapper {
    height: 100%;
    width: 5rem;
    cursor: pointer;
    transform: translateY(-70%);
    animation: infinite slide-right 10s linear;
}

.menu-labels{
    font-size: 2rem;
    letter-spacing: 5px;
    color: #f2f2f2;
    transform: rotate(90deg);
& span {
    padding: 2rem;
}
@keyframes slide-right {
  to {
    transform: translateY(0);
  }
}
}
</style>