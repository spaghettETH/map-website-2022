<script>
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  ref,
  watch,
} from "vue";
import gsap from "gsap";
import { useBreakpoint } from "../functions/useBreakpoint";
import Fork from "../assets/svg/fork.svg"

export default defineComponent({
  name: "Menu",
  emits: ["closeMenu"],
  components: {Fork},
  setup(props, { emit }) {
    const matches = useBreakpoint();
    const isMobile = computed(() => matches.value?.beforeLg);

    const animation = gsap.timeline();
    onMounted(() => {
      animation.fromTo(
        ".menu-wrapper",
        { x: "100%" },
        {
          x: 0,
        }
      );
      animation.fromTo(
        ".menu-list-wrapper li",
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, stagger: 0.2 },
        ">"
      );
      animation.fromTo(".menu-label", { x: 25 }, { x: 0 }, "<");
      animation.fromTo(
        ".close-icon",
        { opacity: 0, rotate: 0 },
        { opacity: 1, rotate: 360 },
        ">"
      );
    });
    const closeMenu = () => {
      animation.fromTo(
        ".close-icon",
        { opacity: 1, rotate: 360 },
        { opacity: 0, rotate: 0 },
        ">"
      );
      animation.fromTo(
        ".menu-list-wrapper li",
        { opacity: 1, x: 0 },
        { opacity: 0, x: 25, stagger: 0.2 },
        ">"
      );
      animation.fromTo(
        ".menu-wrapper",
        { x: 0 },
        {
          x: "100%",
          onComplete: () => {
            emit("closeMenu", false);
          },
        }
      );
    };
    return {
      closeMenu,
      isMobile,
      Fork
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
          <li class="text-center">
            <a
              href="https://github.com/spaghettETH/map-website-2022#come-aggiungere-una-nuova-community"
              target="_blank"
            >
              Registra Community
            </a>
          </li>
          <li>
            <a href=" http://events.spaghett-eth.com/" target="_blank"
              >Conference</a
            >
          </li>
          <li>
            <a href="/" target="_blank"
              >Blog</a
            >
          </li>
        </ul>
        <h2 class="menu-label absolute opacity-10 pointer-events-none">MENU</h2>
      </div>
      <a
        v-if="!isMobile"
        class="absolute email-anchor"
        href="mailto:ciao@spaghett-eth.com"
        >ciao@spaghett-eth.com</a
      >
      <div
        v-if="!isMobile"
        class="social-wrapper absolute bottom-0 right-0 flex"
      >
        <a href="https://twitter.com/spaghettETH" target="_blank">
          <img
            src="../assets/images/tweetterIcn.png"
            class="social-image cursor-pointer"
          />
        </a>
        <a href="https://discord.gg/eYMQ2Xz4Sr" target="_blank">
          <img
            src="../assets/images/discordIcn.png"
            class="social-image cursor-pointer"
          />
        </a>
        <a href="https://www.linkedin.com/company/spaghetteth/" target="_blank">
          <img
            src="../assets/images/linkedinIcn.png"
            class="social-image cursor-pointer"
          />
        </a>
        <a href="https://t.me/SpaghettETHchat" target="_blank">
          <img
            src="../assets/images/telegramIcn.png"
            class="social-image cursor-pointer"
          />
        </a>
      </div>
      <div
        v-if="isMobile"
        class="
          menu-info-mobile-wrapper
          absolute
          bottom-[5%]
          w-full
          flex flex-col
          items-center
          justify-center
        "
      >
        <a class="email-anchor mb-4" href="mailto:ciao@spaghett-eth.com"
          >ciao@spaghett-eth.com</a
        >
        <div class="social-wrapper flex">
          <a href="https://twitter.com/spaghettETH" target="_blank">
            <img
              src="../assets/images/tweetterIcn.png"
              class="social-image cursor-pointer"
            />
          </a>
          <a href="https://discord.gg/eYMQ2Xz4Sr" target="_blank">
            <img
              src="../assets/images/discordIcn.png"
              class="social-image cursor-pointer"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/spaghetteth/"
            target="_blank"
          >
            <img
              src="../assets/images/linkedinIcn.png"
              class="social-image cursor-pointer"
            />
          </a>
          <a href="https://t.me/SpaghettETHchat" target="_blank">
            <img
              src="../assets/images/telegramIcn.png"
              class="social-image cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

  section {
    cursor: url("../assets/images/fork.png") 40 40 , pointer;
  }
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

a {
  cursor: url("../assets/images/fork.png") 40 40 , pointer;
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

  @media (max-width: 1023px) {
    font-size: 7rem;
  }
  @media (max-width: 670) {
    font-size: 5rem;
  }
}
.menu-list-wrapper {
  & li {
    font-family: MonsterratBold;
    font-size: 5rem;
    cursor: pointer;
    line-height: 1;
    margin-bottom: 2rem;

    @media (max-width: 1023px) {
      font-size: 3rem;
    }
    @media (max-width: 670) {
      font-size: 2rem;
    }

    &:hover {
      opacity: 0.5 !important;
    }
  }
}

.email-anchor {
  font-family: MonsterratRegular;
  font-size: 1rem;
  bottom: 1.5rem;
  left: 1.5rem;
  cursor: pointer;

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