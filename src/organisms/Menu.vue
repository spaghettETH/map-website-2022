<script>
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  ref,
  watch,
} from "vue";
import { useRouter } from 'vue-router';
import gsap from "gsap";
import { useBreakpoint } from "../functions/useBreakpoint";
import Fork from "../assets/svg/fork.svg"

export default defineComponent({
  name: "Menu",
  emits: ["closeMenu"],
  components: {Fork},
  setup(props, { emit }) {
    const router = useRouter();
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
    const closeMenu = (redirectToMap = true) => {
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
            if (redirectToMap) {
              router.push('/');
            }
          },
        }
      );
    };

    const navigateToBlog = () => {
      window.open('https://paragraph.com/@spaghetteth', '_blank');
      closeMenu(false);
    };

    const navigateToIntro = () => {
      router.push('/intro');
      closeMenu(false);
    };

    const navigateToEcosystem = () => {
      router.push('/ecosystem');
      closeMenu(false);
    };

    const navigateToProjects = () => {
      router.push('/projects');
      closeMenu(false);
    };

    const navigateToMembership = () => {
      router.push('/membership');
      closeMenu(false);
    };

    return {
      closeMenu,
      isMobile,
      Fork,
      navigateToBlog,
      navigateToIntro,
      navigateToEcosystem,
      navigateToProjects,
      navigateToMembership
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
        class="content-wrapper flex items-center justify-center w-[75%] h-[75%]"
      >
        <ul
          class="
            menu-list-wrapper
            w-full
            h-full
            flex flex-col
            items-center
            justify-center
            text-center
          "
        >
          <li class="w-full">
            <a
              href="https://github.com/spaghettETH/map-website-2022#come-aggiungere-una-nuova-community"
              target="_blank"
              class="inline-block w-full text-center"
            >
              Registra Community
            </a>
          </li>
          <li class="w-full">
            <a @click="navigateToIntro" class="cursor-pointer inline-block w-full text-center">
              Cos'è SpaghettETH
            </a>
          </li>
          <li>
            <a @click="navigateToProjects" class="cursor-pointer">Progetti</a>
          </li>
          <li>
            <a @click="navigateToBlog" class="cursor-pointer">Blog</a>
          </li>
          <li>
            <a @click="navigateToEcosystem" class="cursor-pointer">Ecosystem</a>
          </li>
          <li class="w-full">
            <a @click="navigateToMembership" class="cursor-pointer inline-block w-full text-center">
              Membership
            </a>
          </li>
          <li class="back-to-map-item w-full">
            <a @click="closeMenu(true)" class="cursor-pointer inline-block w-full text-center">
              → back to Map
            </a>
          </li>
        </ul>
        
        <div v-if="isMobile" 
             class="menu-info-mobile-wrapper fixed bottom-0 left-0 w-full 
                    flex flex-col items-start justify-center px-8 py-4 
                    bg-gradient-to-t from-black/20 to-transparent">
          <a class="email-anchor mb-2" href="mailto:ciao@spaghett-eth.com">
            ciao@spaghett-eth.com
          </a>
          <div class="social-wrapper flex mb-4">
            <a href="https://medium.com/spaghetteth" target="_blank">
              <img
                src="../assets/images/medium-icon.png"
                class="social-image cursor-pointer"
              />
            </a>
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

        <h2 class="menu-label absolute opacity-10 pointer-events-none">MENU</h2>
      </div>

      <a v-if="!isMobile"
         class="email-anchor fixed bottom-8 left-8"
         href="mailto:ciao@spaghett-eth.com">
        ciao@spaghett-eth.com
      </a>

      <div v-if="!isMobile"
           class="social-wrapper fixed bottom-8 right-32 flex gap-4">
        <a href="https://medium.com/spaghetteth" target="_blank">
          <img
            src="../assets/images/medium-icon.png"
            class="social-image cursor-pointer"
          />
        </a>
        <a href="https://twitter.com/spaghettETH" target="_blank">
          <img
            src="../assets/images/tweetterIcn.png"
            class="social-image cursor-pointer"
          />
        </a>
        <a href="https://github.com/spaghettETH" target="_blank">
          <img
            src="../assets/images/github-mark-white.png"
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
  font-size: clamp(5rem, 10vw, 10rem);
  
  @media (max-height: 700px) {
    font-size: clamp(4rem, 8vw, 7rem);
  }
}
.menu-list-wrapper {
  & li {
    font-family: MonsterratBold;
    font-size: clamp(2rem, 5vw, 5rem);
    cursor: pointer;
    line-height: 1.2;
    margin-bottom: clamp(1rem, 2vw, 2rem);
    text-align: center;
    width: 100%;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }

    @media (max-height: 700px) {
      font-size: clamp(1.5rem, 4vw, 3rem);
      margin-bottom: 0.8rem;
    }

    &:hover {
      opacity: 0.5 !important;
    }

    a {
      width: 100%;
      display: inline-block;
      text-align: center;
    }

    &.back-to-map-item {
      font-size: clamp(1rem, 2.5vw, 2.5rem);
      margin-top: 1rem;
      opacity: 0.7;
      
      @media (max-height: 700px) {
        font-size: clamp(1rem, 2vw, 1.5rem);
        margin-top: 0.5rem;
      }

      &:hover {
        opacity: 1 !important;
      }

      a {
        color: #0ef9c2;
        transition: color 0.3s ease;

        &:hover {
          color: #ffffff;
        }
      }
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

.menu-info-mobile-wrapper {
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
