<script>
import { defineComponent, onMounted } from "vue";
import gsap from "gsap";

export default defineComponent({
  name: "Menu",
  emits: ["closeMenu"],
  setup(props, { emit }) {
    const animation = gsap.timeline({ paused: true });

    const closeMenu = () => {
      emit("closeMenu", false);
    };

    onMounted(() => {
      animation.fromTo(
        ".menu-wrapper",
        {
          x: 0,
          // clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 95% )",
        },
        {
          x: "100%",
          // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.3,
          ease: "expo",
        }
      );
      animation.from(
        ".close-icon",
        { y: 10, opacity: 1, duration: 0.2 },
        "<.1"
      );
    });
    return {
      closeMenu,
    };
  },
});
</script>

<template>
  <section class="menu-wrapper relative">
    <div
      class="
        menu-content
        h-full
        w-full
        top-0
        left-0
        absolute
        flex
        items-center
        justify-center
      "
    >
      <img src="../assets/images/logoNav.png" class="logo-icon absolute" />
      <img
        class="close-icon absolute"
        src="../assets/images/closeIcon.png"
        @click="closeMenu()"
      />
      <div
        class="content-wrapper flex items-center justify-center w-[75%] h-[50%]"
      >
        <ul
          class="
            menu-list-wrapper
            w-full
            h-full
            flex flex-col
            items-center
            justify-center
          "
        >
          <li>Home</li>
          <li>About</li>
          <li>Menu</li>
        </ul>
        <h2 class="menu-label absolute opacity-10 pointer-events-none">MENU</h2>
      </div>
      <a class="absolute email-anchor" href="mailto:ciao@spaghett-eth.com"
        >ciao@spaghett-eth.com</a
      >
      <div class="social-wrapper absolute bottom-0 right-0 flex">
        <img
          src="../assets/images/twitterIcon.png"
          class="social-image cursor-pointer"
        />
        <img
          src="../assets/images/discordIcon.png"
          class="social-image cursor-pointer"
        />
        <img
          src="../assets/images/linkedinIcon.png"
          class="social-image cursor-pointer"
        />
        <img
          src="../assets/images/telegramIcon.png"
          class="social-image cursor-pointer"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.menu-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: linear-gradient(112.79deg, #f97aab 35.93%, #6eccc9 64.79%);
}

.menu-content {
  background: linear-gradient(
    180deg,
    #d9d9d9 -25.5%,
    rgba(217, 217, 217, 0) 74.5%
  );
}

.close-icon {
  height: 2.5rem;
  width: auto;
  cursor: pointer;
  top: 1.5rem;
  right: 1.5rem;
}

.logo-icon {
  height: 6rem;
  top: 1.5rem;
  left: 1.5rem;
}

.menu-label {
  font-size: 10rem;
  font-family: MonsterratBold;
}
.menu-list-wrapper {
  & li {
    font-family: MonsterratBold;
    font-size: 5rem;
    cursor: pointer;
  }
}

.email-anchor {
  font-family: MonsterratRegular;
  font-size: 1rem;
  bottom: 1.5rem;
  left: 1.5rem;

  /* line-height: 1; */

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: black;
    content: "";
    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
  }

  &::after {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    height: 100%;
    color: black;
    content: "";
    content: attr(data-replace);
    transform: translate3d(200%, 0, 0);
    transform-origin: 100% 50%;
    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }

  &:hover::after {
    transform: translate3d(0, 0, 0);
  }
}
.social-wrapper {
  bottom: 1.5rem;
  right: 1.5rem;
}

.social-image {
  height: 1.5rem;
  margin-left: 1rem;

  &:hover {
    opacity: 0.8;
  }
}
</style>