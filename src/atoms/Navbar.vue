<script>
import { defineComponent, watchEffect} from 'vue'
export default defineComponent({
name: 'Navbar' ,
props: {isVisible : {type: Boolean, default: false}},
setup(props){
    watchEffect(() => {
        console.log(props.isVisible);
    })
    return{
        props
    }
}
})
</script>

<template>
<nav v-if="props.isVisible" class="navbar w-full absolute top-0 left-0 z-2 p-4 h-32">
    <div class="logo-wrapper relative cursor-pointer">
        <img src="../assets/images/logoNav.png" class="absolute top-0 left-0 w-full h-full" />
    </div>
</nav>
</template>

<style scoped lang="scss">
/* .navbar{
    opacity: 0;
} */
.logo-wrapper{
    height: 6.25rem;
    width: 6.25rem;

    &:hover{
        transform: scale(1.1);
        transition: all .3s ease-in;
    }
}

.opacity{
    opacity: 1 !important;
}
</style>