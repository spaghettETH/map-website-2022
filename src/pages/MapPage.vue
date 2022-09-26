<script>
//I had to paste the SVG into the code instead of importing it as a component due to a problem
//I wan't able to solve. I'll check into it anyway
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  computed
} from "vue";
import { regionsData } from "../data";
import ItalianMap from "../assets/svg/italianMap.svg";
import gsap from "gsap";
import { useMouseParallax } from "../utils/useMouseParallax.js";
import MobileMap from "../molecules/MobileMap.vue";
import communities from "../communitiesData.json";
import CommunitiesCard from "../molecules/CommunitiesCard.vue";
import { useBreakpoint } from "../functions/useBreakpoint";

export default defineComponent({
  name: "MapPage",
  components: { ItalianMap, MobileMap, CommunitiesCard },
  emits: ["showNavbar"],
  setup(props, { emit }) {
    const currentRegion = ref("ITALIAN MAP");
    const miniMap = ref(false);
    const communitiesToDisplay = ref([]);

    const matches = useBreakpoint()
    const isMobile = computed(() => matches.value?.beforeLg)

    const testFunction = (id) => {
      currentRegion.value = id;
      gsap.fromTo(
        ".italian-map-label",
        { x: -25, opacity: 0 },
        { x: 0, opacity: 0.8, data: 0.3, ease: "power3.inOut" }
      );
    };

    //Initial animation
    onMounted(() => {
      const animation = gsap.timeline();
      animation.fromTo(
        ".welcome-label",
        { opacity: 1 },
        { opacity: 0, duration: 0.01, ease: "power3.inOut" }
      );
      animation.fromTo(
        ".welcome-label-first",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.inOut" }
      );
      animation.fromTo(
        ".welcome-label-first",
        { y: 0, opacity: 1 },
        { y: -25, opacity: 0, duration: 0.3, ease: "power3.inOut" },
        ">+=2"
      );
        animation.fromTo(
          ".welcome-label-second",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power3.inOut" },
          ">"
        );
      animation.fromTo(
        ".welcome-label-second",
        { y: 0, opacity: 1 },
        {
          y: -25,
          opacity: 0,
          duration: 0.3,
          ease: "power3.inOut",
          onComplete: () => {
            emit("showNavbar", true);
          },
        },
        ">+=2"
      );
      animation.fromTo(
        ".italian-map-label",
        { y: 0, opacity: 0 },
        { y: -25, opacity: 1, duration: 0.3, ease: "power3.inOut" },
        ">"
      );
      animation.fromTo(
        ".map",
        {
          clipPath: "polygon(0% 100%, 100% 100%,100% 100%, 0% 100% )",
          scale: 0.9,
        },
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%,100% 100%, 0% 100% )",
          scale: 1,
          onComplete: () => {
            document
              .querySelector(".welcome-labels-wrapper")
              .classList.add("cancel");
          },
        },
        ">"
      );
      animation.fromTo(".barchetta", { opacity: 0 }, { opacity: 1 });
    });

    const { normalizedX, normalizedY } = useMouseParallax();

    watch([normalizedX, normalizedY], () => {
      gsap.to([".barchetta"], {
        x: normalizedX.value * -10,
        y: normalizedY.value * -5,
      });
      gsap.to([".ondina"], {
        x: normalizedX.value * -5,
      });
    });

    watch(currentRegion, () => {
      communities.forEach((c, i) => {
        if (c.regione === currentRegion.value) {
          communitiesToDisplay.value.push(c);
        }
        if (
          communitiesToDisplay.value.includes(c) &&
          c.regione !== currentRegion.value
        ) {
          let index = communitiesToDisplay.value.indexOf(c.nome)
          communitiesToDisplay.value.forEach((c) => {
            communitiesToDisplay.value.splice(c[index])
          })
        }
      });
    });

    const selectRegion = () => {
      miniMap.value = !miniMap.value;
    };
    return {
      testFunction,
      regionsData,
      currentRegion,
      selectRegion,
      miniMap,
      communities,
      communitiesToDisplay,
      isMobile
    };
  },
});
</script>

<template>
  <section class="map-section w-full h-full top-[10%] absolute">
    <div class="h-full w-full flex items-center justify-center svg-wrapper">
      <h1
        class="italian-map-label absolute uppercase opacity-80"
        :class="{ active: miniMap }"
      >
        {{ currentRegion }}
      </h1>
      <div
        class="w-full h-full flex items-center justify-center z-100 absolute"
      >
        <ul
          v-if="miniMap && communitiesToDisplay"
          class="
            communities-wrapper
            w-[75%]
            h-[50%]
            flex
            items-center
            justify-center
          "
        >
          <CommunitiesCard
            v-for="community in communitiesToDisplay"
            :key="community.nome"
            :name="community.nome"
            :focus="community.focus"
            :meet="community.meet"
            :format="community.format"
            :progetti="community.progetti"
            :membri="community.membri"
            :telegram="community.telegram"
            :discord="community.discord"
            :twitter="community.twitter"
            :website="community.website"
          />
          <h1 v-if="communitiesToDisplay.length === 0 && miniMap" class="bg-red-600">NO COMMUNITIES HERE</h1>
        </ul>
      </div>
      <!-- BARCHETTA SINISTRA -->
      <svg
        width="91"
        height="107"
        viewBox="0 0 91 107"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="barchetta barchett-sx absolute left-[40%] top-[45%]"
        v-if="!miniMap && !isMobile"
      >
        <path
          d="M53.0977 1V13.3L60.2977 17.9L53.0977 1Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0975 1L45.8975 17.9L53.0975 13.3V1Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0977 25.8999V34.2999L60.2977 19.8999L53.0977 25.8999Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0975 34.2V25.8L45.8975 19.8L53.0975 34.2Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0977 23.9999L60.2977 17.9999L53.0977 13.3999V23.9999V23.9999Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M45.8975 17.9001L53.0975 23.9001V13.3L45.8975 17.9001Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0977 1V13.3L60.2977 17.9L53.0977 1Z"
          fill="#7474F5"
          fill-opacity="0.602"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0975 1L45.8975 17.9L53.0975 13.3V1Z"
          fill="#ED5A88"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0977 25.8999V34.2999L60.2977 19.8999L53.0977 25.8999Z"
          fill="#7474F5"
          fill-opacity="0.602"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0975 34.2V25.8L45.8975 19.8L53.0975 34.2Z"
          fill="#ED5A88"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M53.0977 23.9999L60.2977 17.9999L53.0977 13.3999V23.9999V23.9999Z"
          fill="#7474F5"
          fill-opacity="0.2"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M45.8975 17.9001L53.0975 23.9001V13.3L45.8975 17.9001Z"
          fill="#7474F5"
          fill-opacity="0.602"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M61.0977 63.4001L76.5977 94.8001"
          stroke="#FF9D23"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M57.6973 57.5002C57.6973 57.5002 66.4973 55.6002 67.4973 58.4002C68.4973 61.2002 57.6973 59.6002 57.6973 59.6002"
          fill="#00F1C2"
        />
        <path
          d="M57.6973 57.5002C57.6973 57.5002 66.4973 55.6002 67.4973 58.4002C68.4973 61.2002 57.6973 59.6002 57.6973 59.6002"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M52.5977 69.0001C52.5977 69.0001 61.0977 71.0001 63.7977 68.1001V70.7001C63.7977 70.7001 56.6977 72.8001 52.5977 70.7001V69.0001V69.0001Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M49.6969 58.9001C49.6969 58.9001 45.8969 59.8001 46.8969 66.3001C47.3969 69.3001 44.0969 76.3001 43.2969 82.2001H56.4969L52.6969 67.8001C52.6969 67.8001 61.4969 67.4001 62.4969 62.3001C64.2969 53.3001 51.9969 56.7001 51.9969 56.7001L49.6969 58.9001Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M49.8974 57.5002C49.8974 57.5002 37.5974 55.5002 40.8974 59.6002C44.1974 63.7002 53.4974 59.6002 53.4974 59.6002"
          fill="#00F1C2"
        />
        <path
          d="M49.8974 57.5002C49.8974 57.5002 37.5974 55.5002 40.8974 59.6002C44.1974 63.7002 53.4974 59.6002 53.4974 59.6002"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M47.6973 55.1002C47.6973 55.1002 37.2973 56.6002 43.1973 57.6002C49.0973 58.6002 68.2973 59.8002 66.0973 55.1002C66.0973 55.1002 56.4973 52.3002 47.6973 55.1002Z"
          fill="#7474F5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M47.3971 56.7001L48.9971 51.3001L49.8971 47.2001L44.1971 50.4001L42.9971 51.2001L45.8971 48.2001L48.6971 45.1001L52.2971 41.6001L52.9971 41.1001L55.1971 44.1001C55.1971 44.1001 56.8971 46.4001 56.9971 47.5001C57.0971 48.6001 58.4971 53.2001 59.3971 53.8001L61.3971 55.3001C61.2971 55.3001 54.2971 58.3001 47.3971 56.7001Z"
          fill="#7474F5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M46.9977 68.8C46.9977 68.8 34.1977 68.9001 35.8977 74.5001H37.8977C37.8977 74.5001 38.2977 71.6001 46.9977 70.0001V68.8Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M55.8977 61.3C56.8977 61.3 56.8977 59.8 55.8977 59.8C54.9977 59.8 54.9977 61.3 55.8977 61.3Z"
          fill="black"
        />
        <path
          d="M43.2969 68.1001L44.2969 72.9001L45.8969 72.4001L43.3969 82.2001H56.5969L54.0969 72.7001L56.5969 73.7001L55.9969 68.5001L52.5969 68.7001C52.5969 68.7001 52.2969 70.7001 49.5969 70.4001C46.8969 70.1001 46.8969 68.9001 46.8969 68.9001L43.2969 68.1001Z"
          fill="#7474F5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M62.2975 60.9001C61.4975 60.9001 60.6975 60.9001 59.8975 60.9001"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.8973 77.2C21.8973 77.2 19.5973 92.5001 43.3973 92.5001C67.1973 92.5001 76.6973 90.4 76.6973 75.8C76.6973 75.8 73.1973 78.8 70.3973 78.8C67.5973 78.8 28.4973 78.8 28.4973 78.8C28.4973 78.8 25.2973 79.3 21.8973 77.2Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M74.2973 92.5002L76.3973 91.7002C76.3973 91.7002 80.8972 96.4002 78.9972 98.0002C77.0972 99.6002 75.8972 98.9002 75.0972 96.6002C74.1972 94.3002 74.2973 92.5002 74.2973 92.5002Z"
          fill="#FF9D23"
        />
        <path
          d="M84.397 84.2C81.597 86.9 77.297 87.2001 73.397 86.9001C69.497 86.6001 65.497 85.7 61.697 86.7C58.897 87.4 56.097 89.1 53.297 88.2C51.597 87.7 50.397 86.3 48.697 85.7C44.297 84.2 39.897 89.2001 35.297 88.3001C33.497 87.9001 31.997 86.7 30.297 85.7C28.697 84.8 26.497 84.3001 24.997 85.4001C24.497 85.8001 23.997 86.4 23.397 86.7C22.397 87.1 21.397 86.5001 20.497 86.0001C14.597 82.8001 6.89699 83.0001 1.19699 86.5001C1.19699 86.5001 -3.10301 93.6 4.59699 95.7C12.297 97.8 78.197 120.2 90.297 93.6C93.197 87.2 84.397 84.2 84.397 84.2Z"
          fill="black"
        />
        <path
          d="M1.29688 86.4C7.09688 82.9 14.6969 82.7 20.5969 85.9C21.4969 86.4 22.4969 87 23.4969 86.6C24.0969 86.4 24.4969 85.8 25.0969 85.3C26.5969 84.2 28.7969 84.7 30.3969 85.6C31.9969 86.5 33.4969 87.8 35.3969 88.2C39.9969 89.1 44.3969 84.1 48.7969 85.6C50.4969 86.2 51.6969 87.6 53.3969 88.1C56.0969 89 58.9969 87.3 61.7969 86.6C65.5969 85.6 69.5969 86.5 73.4969 86.8C77.3969 87.1 81.6969 86.8 84.4969 84.1"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M29.1973 97.5002L41.2973 63.4001"
          stroke="#FF9D23"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.8977 92.5002L31.9977 93.2002C31.9977 93.2002 32.2977 99.7003 29.8977 99.7003C27.4977 99.7003 26.9977 98.4002 27.7977 96.1002C28.5977 93.8002 29.8977 92.5002 29.8977 92.5002Z"
          fill="#FF9D23"
        />
      </svg>

      <!-- BARCHETTA DESTRA -->
      <svg
        width="50"
        height="93"
        viewBox="0 0 50 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="barchetta barchett-dx absolute top-[20%] right-[40%]"
        v-if="!miniMap && !isMobile"
      >
        <path
          d="M22.9 67C22.9 67 27.7 72.3 26.1 77.7H24.6C24.6 77.7 25.7 71.1 21.6 67.5L22.9 67Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.5 53.7C12.5 53.7 9.70004 56.3 9.10004 58.5C9.10004 58.5 13.7 58.9 13.1 60.2C12.6 61.5 9.70004 61.4 9.10004 61.2C9.10004 61.2 10.9 65.8 19.8 62.2C28.7 58.5 20.6 51.8 20.6 51.8L12.5 53.7Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.1 57.2C18.1 57.2 18.4 65 24.9 63.3C31.4 61.5 25 55.4 21.5 53.9"
          fill="#00F1C2"
        />
        <path
          d="M18.1 57.2C18.1 57.2 18.4 65 24.9 63.3C31.4 61.5 25 55.4 21.5 53.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.6 56.9C14.6 56.9 14.3 57.9 14.9 58.1C15.5 58.3 16.4 57.7 16.2 56.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.5001 64.5L10.7001 66.2L12.6001 69.2L15.4001 66.2L11.5001 74.6L19.4001 76.1L18.7001 66.5L21.1001 69.4L25.0001 66.5L19.4001 63.5L14.5001 64.5Z"
          fill="#FF9D23"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.2001 67C11.2001 67 6.40005 68.1 3.80005 66.3L4.50006 68.4C4.50006 68.4 11.5001 69.8 12.6001 67.7L11.2001 67Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.90005 71C6.39122 71 7.60007 68.8957 7.60007 66.3C7.60007 63.7043 6.39122 61.6 4.90005 61.6C3.40889 61.6 2.20007 63.7043 2.20007 66.3C2.20007 68.8957 3.40889 71 4.90005 71Z"
          stroke="white"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.9 52.8C11.9 52.8 3.09998 54.1 6.79998 55C10.5 55.9 19.8 55 19.8 55C19.8 55 14.3 55 11.9 52.8Z"
          fill="#FF9D23"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.2 51.7C12.2 51.7 12.8 46.8 19.2 48.2C19.6 48.3 20.1 48.4 20.6 48.6C24.1 49.8 23.2 54.7 23.2 54.7C23.2 54.7 16.7 57.2 11.9 52.8L12.2 51.7Z"
          fill="#FF9D23"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.9 48.4C19.7 48.3 19.4 48.3 19.2 48.2C12.8 46.8 12.2 51.7 12.2 51.7L11.9 52.8C14.6 55.3 17.9 55.6 20.2 55.3C20.5 53.7 20.2 50.6 19.9 48.4Z"
          fill="white"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.90002 60V72.4"
          stroke="white"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.90005 60.4C5.23143 60.4 5.50006 60.1314 5.50006 59.8C5.50006 59.4686 5.23143 59.2 4.90005 59.2C4.56868 59.2 4.30005 59.4686 4.30005 59.8C4.30005 60.1314 4.56868 60.4 4.90005 60.4Z"
          fill="white"
        />
        <path
          d="M1.00003 66.7C1.3314 66.7 1.60004 66.4314 1.60004 66.1C1.60004 65.7686 1.3314 65.5 1.00003 65.5C0.66866 65.5 0.400024 65.7686 0.400024 66.1C0.400024 66.4314 0.66866 66.7 1.00003 66.7Z"
          fill="white"
        />
        <path
          d="M8.80002 67C9.02093 67 9.20004 66.8209 9.20004 66.6C9.20004 66.3791 9.02093 66.2 8.80002 66.2C8.5791 66.2 8.40002 66.3791 8.40002 66.6C8.40002 66.8209 8.5791 67 8.80002 67Z"
          fill="white"
        />
        <path
          d="M1.60001 63.2C1.93138 63.2 2.20001 62.9314 2.20001 62.6C2.20001 62.2686 1.93138 62 1.60001 62C1.26864 62 1 62.2686 1 62.6C1 62.9314 1.26864 63.2 1.60001 63.2Z"
          fill="white"
        />
        <path
          d="M8.60004 63.6C8.87618 63.6 9.10004 63.3761 9.10004 63.1C9.10004 62.8239 8.87618 62.6 8.60004 62.6C8.32389 62.6 8.10004 62.8239 8.10004 63.1C8.10004 63.3761 8.32389 63.6 8.60004 63.6Z"
          fill="white"
        />
        <path
          d="M7.60007 71.7C7.82098 71.7 8.00006 71.5209 8.00006 71.3C8.00006 71.0791 7.82098 70.9 7.60007 70.9C7.37915 70.9 7.20007 71.0791 7.20007 71.3C7.20007 71.5209 7.37915 71.7 7.60007 71.7Z"
          fill="white"
        />
        <path
          d="M2.10004 71.4C2.37618 71.4 2.60004 71.1761 2.60004 70.9C2.60004 70.6239 2.37618 70.4 2.10004 70.4C1.82389 70.4 1.60004 70.6239 1.60004 70.9C1.60004 71.1761 1.82389 71.4 2.10004 71.4Z"
          fill="white"
        />
        <path
          d="M0.700029 72.1C0.700029 72.1 -0.499995 76.7 2.3 81.1C5.1 85.5 6.50002 91.5 6.50002 91.5C6.50002 91.5 40.7 92.7 43.4 91.5C43.4 91.5 48.9 81.6 48.7 78.3C48.7 78.3 36 78.7 21.7 75.3C7.40003 71.9 0.700029 72.1 0.700029 72.1Z"
          fill="#7474F5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.10004 70.9L8.20004 63.1"
          stroke="white"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.20007 62.6L7.60007 71.3"
          stroke="white"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1.30005 66.1L8.80005 66.6"
          stroke="white"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.1 0.899994V13.2L23.3 17.8L16.1 0.899994Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 0.899994L8.90002 17.8L16.1 13.2V0.899994Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 25.8V34.2L23.3 19.8L16.1 25.8Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 34.1V25.7L8.90002 19.7L16.1 34.1Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 23.9L23.3 17.9L16.1 13.3V23.9Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M8.90002 17.8L16.1 23.8V13.1L8.90002 17.8Z"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 0.899994V13.2L23.3 17.8L16.1 0.899994Z"
          fill="#7474F5"
          fill-opacity="0.602"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 0.899994L8.90002 17.8L16.1 13.2V0.899994Z"
          fill="#ED5A88"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 25.8V34.2L23.3 19.8L16.1 25.8Z"
          fill="#7474F5"
          fill-opacity="0.602"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 34.1V25.7L8.90002 19.7L16.1 34.1Z"
          fill="#ED5A88"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M16.1 23.9L23.3 17.9L16.1 13.3V23.9Z"
          fill="#7474F5"
          fill-opacity="0.2"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M8.90002 17.8L16.1 23.8V13.1L8.90002 17.8Z"
          fill="#7474F5"
          fill-opacity="0.602"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
      </svg>

      <!-- MAPPA -->
      <svg
        width="543"
        height="694"
        viewBox="0 0 543 694"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="map absolute z-3"
        v-if="!miniMap"
      >
        <path
          d="M327.9 266.2L329.1 271.7L331.1 276.5L336.6 286.3L342.7 293L349.9 298.4L350.7 300.4L353.9 303.5L354.2 304.7L359.1 307.9L363.6 309.5L363.8 313.7L366.8 315.8L365.8 317.4L366.6 318.1L364.1 319.8L362.1 322.3L361.4 325L359.3 326.5L357.8 329.8L353.6 334.3L351.8 334L352.5 333.4L351.6 329.7L350.6 328.8L348.5 327.4L347.6 328.6L347.1 328.4L346.2 326.5L345.1 326.6L344.3 325.5L341.8 327.6L340.6 329.5L338.7 329.6L338.3 330.4L339.4 333.5L340.7 334.3L340.3 335.2L339.6 335.1L339.4 334.2L338.8 335.3H337.1L336.6 337.6L335.9 335.8L334.9 335.9L334.1 338H332.9L332.7 339.3L331.1 338.4L329.3 338.9L327.1 336L325.4 336.2L323.3 335L322.4 335.6L321.2 335.2L319.7 332.3L318.5 332.9L317.6 331.9L316 331.5L315.1 333.3L311.6 334.5L310.3 333.7L309.7 332.1L308.1 331.7L306.8 330.5L305.3 329.9L304.1 331.1L303.2 327.9L304.3 325.9L303.4 324.7L302.5 324.9L300.8 322.9L300 323.2L293.3 319.3L291.5 318.7V319.8L289.4 319.2L288.2 317.2L288.3 312.9L289 313.2L290.8 311.6V309.5L292.3 309.4L298 312.5L299.1 311.8L300.6 312.3L301.5 310.4L302.8 310.1L302.3 309.5L303.9 309.2L302.2 308.1L301.9 306.7L299.8 306L297.5 303.8L296.9 300.9L293.6 298.7L295.4 296.7L291.9 293.4L294.7 291.3L294.6 289.2L293.7 287.6L294.6 287.1L295.3 284.7L297.7 285.6L298.2 285H299.4L299.9 285.9L301.2 285.2L303.2 285.5L304.4 284.5L305.1 281.5L303.4 280.9L302.4 279.7L302.9 278.2L304.4 278.6L306 277.4L306.5 277.8L307 275.7L309.1 275.4L309.4 273.2L310.6 271.9L310.8 270.6L312.6 271.6L314.7 270.6L315.3 271.4L316.5 271.3L318.3 270.5L318.7 268.6L319.3 268.3L321.7 268.1L323.5 266.9L327.9 266V266.2Z"
          fill="#FDA8C5"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('abruzzo')"
        />
        <path
          d="M400.5 376.4L400.2 375.3L401.4 374.2L403.1 373.9L407.2 374.6L409.4 373.8L410.7 374.7L412.2 373.9L412.1 373.1L413.6 372.7L413.4 372L414.1 372.3L415.3 371.6L417.3 373L418.8 373.3L419 374.2L420.1 374.5L420.6 376.6L421.1 376.2L422.7 377.5L422.1 378.4L422.4 379.8L420.8 381.6L419.5 381.4L420 382.4L424.9 384.5L426.3 385.8L428.2 384.1L429.9 384.7L432.5 390.3L438.2 395.6L438.9 397.1L440.2 397.5L443.2 394L445 396.2L444.9 394.5L445.7 394.3L446.4 395.5L446.5 394L448 394.6L448.9 394L449 394.9L450 395.5L450.5 394.9L453.1 396.8L452.2 397.2L453.3 398.4L452.5 401.6L453.3 403.4L452.8 403.8L452.4 406.3L453.2 407.2L452.8 407.9L453.8 408.7L453 410.5L453.8 411.3L455.3 410.9L456.8 411.8L457.1 413.2L458.6 414.5L459.3 416.1L455.9 421L451.7 430.1L449.7 431.6L447.3 430.8L444.6 431.6L441.9 430.7L440.2 431L439.6 430L439 431.3L439.2 433.8L438.3 435.7L438.5 437.4L435.8 442.2L436.8 443.2L436.4 444.4L434.5 442.3L432.8 442.1L430.2 442.7V444.2L427.8 443.1L426.9 444L422.7 444.2L421.3 442.7L421.6 442.2L420.9 440.8L422 438.9L421 438.6L419.7 439.3L419.1 438.5L417.5 438.2L416.3 439.3L415.8 438.5L415 438.9L414.2 438.1L412.7 438.3L410.6 440.5L409.8 442.8L408.2 439.7L406.4 438L406.3 436.7L404.8 435.8L406.3 434.9L405.2 433.7L406.3 433.4L407.7 431.5L407.4 429L408.8 427.6L408.7 426.7L411.7 425.4L411.2 424.3L412 423.6V422.4L411.5 421.4L408.9 420.7L408.8 419.5L407.4 418.2V416L405.6 415.3L404.2 413.4L402.4 412.5L402 411L400.1 409.5L400.7 408.6L399.5 405.8L400.1 405.1L396.3 402.8L396.9 401L398.3 400.1L398.4 399.4L393.2 396L393.3 391.8L392.6 391.7L392.8 390.7L391 389.6L392.8 389.5L392.9 387.6L392 387.1L392.4 386.5L396.6 387.4L397.2 387.1L397 386.1L399.6 385L401.6 379.9L400.5 376.4Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('basilicata')"
        />
        <path
          d="M410 442.7L410.8 440.4L412.9 438.2L414.4 438L415.2 438.8L416 438.4L416.5 439.2L417.7 438.1L419.3 438.4L419.9 439.2L421.2 438.5L422.2 438.8L421.1 440.7L421.8 442.1L421.5 442.6L422.9 444.1L427.1 443.9L428 443L430.4 444.1V442.6L433 442L434.7 442.2L436.6 444.3L437 443.1L436 442.1L438.7 437.3L438.5 435.5L439.4 433.6L439.2 431.1L439.7 429.8L440.3 430.8L442 430.5L444.7 431.4L447.4 430.6L449.8 431.4L448.1 433.5L447.8 435.8L449 440.9L445 446L442.8 450V452.6L444.6 454.6L444.1 457.6L448.5 460.2L455.5 460.3L459.6 465L463.7 467.5L466.7 468.3L467.4 470.1L469.3 471.9L472.7 473.1L470.6 478.2L470.4 481.4L472.3 484.2L470.6 489.9L471.9 491.5L471.6 492.3L472.2 493.3L474.9 494.6L473 496.3L473.2 498.7L469.9 502.2L469.7 501.2L468.5 500.8L466.7 501.5L464.8 499.6L460.7 500.2L455.7 502.1L448.1 506.8L444.9 512.5L445.9 514.3L447 526.2L446.6 528.7L441.7 533.8L435.4 536.5L428.4 545.3L427.5 551.2L425.3 555.4L423.8 557.2L420.9 557.7L417.4 556.9L410.2 557.6L406.5 555.5L404.6 551.9L405.5 550.6L404.4 547.6L405.5 545.1L404.5 542.2V539.8L408.1 538.3L409.8 538.2L412.1 536.9L413.2 535L413.6 532.2L414.6 531.3L415.3 528.9L416.6 527.7L417.2 526L417.9 521.7L413.3 517.5L413.7 515.9L415.3 514.4L419 513.2L420.5 511.6L422.6 511.3L425.6 512.2L427.1 511.8L429.2 510.1L430.9 504.4L430.6 499.9L427.9 498.6L425.3 493.7L423.9 487.3L423.2 478.2L420.8 470.3L417.6 465.3L415.3 463.6L413.4 457.2L412.6 456.5L411.4 448.8L410.6 447.3L411.6 445.6L410 442.7Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('calabria')"
        />
        <path
          d="M341.6 405.6L343.4 405.8L342.8 406.6L340.2 407L340.3 405.6H341.6ZM325.6 393.8L329.5 394.8L330 395.5L329.4 397.3H326.9L326.6 397.8L324.9 396.9V395.3L325.6 393.8ZM330.5 352.2L331.8 352.9L331.6 354.2L333.4 356.3L335.3 355.9L336.4 356.7L336.2 354.6L335 353.1L336.9 349.6L338.9 351.3L339.2 350.1L342.2 350.2L342.4 350.9H343.9L344.1 351.8L345.9 352.8L352.9 354.8L353.2 356.2L354.2 357L357.1 356.5L358.2 358L360.1 356.3L361 356.2V355.4L362.7 355.2L363.5 355.8L365.1 355.3L366.6 352.8L370.1 354.3L371.5 352.9L373.8 352.7L376.4 350.9L378 353.4L380.5 354.1L380.7 354.8L380 355.5L380.5 356.5L379.6 356.7L378.9 357.7L379.4 360L382 360.9L382.2 362.8L385.2 362.7L386.1 364L387.5 363.7L388.6 364.9L387.2 365.8L387.9 367.9L386.1 368.9L385.4 370.6L386.8 371.3L387.4 373L389.2 374.3L390.2 373.5L392.7 374.5L394.2 373.4L396 375L397.4 374.9L400.5 376.5L401.7 380L399.7 385.1L397.1 386.2L397.3 387.2L396.7 387.5L392.5 386.5L392.1 387.1L393 387.5L392.9 389.4L391.1 389.5L392.9 390.6L392.7 391.6L393.4 391.7L393.3 395.9L398.5 399.3L398.4 400L396.9 400.9L396.3 402.7L400.1 405L399.5 405.7L400.7 408.5L400.1 409.4L402 410.9L402.4 412.4L404.2 413.3L405.6 415.2L407.4 415.9V418.1L408.8 419.4L408.9 420.6L411.5 421.3L412 422.3V423.5L411.2 424.2L411.7 425.3L408.7 426.6L408.8 427.5L407.4 428.9L407.7 431.4L406.3 433.3L405.3 433.6L406.4 434.8L404.9 435.7L404.1 434L401.7 433.7L398.6 434.5L394.9 438.8L391.9 438.3L390.1 436.6L388.2 437.1L388 436.5L388.8 435.9L388.2 434L385.3 431.2L384 431L381.8 428.4L377.7 428.5L375.4 425.6L372.2 424.6L371.7 423.7L373.4 422.4L373.5 418.9L375.8 417.6V415L370.5 404L365.8 399.1L363.4 399.5L362.2 401.4L359.3 400.6L356.9 402.7L354.8 403.1L352.7 401.9L345.7 405.3L346.4 401.7L349.2 401.1L349.6 399.8L352.7 397.6L351.8 394.8L349.1 393.9L346 390.5L343.6 388.9L341.3 389.9L339.7 392L338.4 391.8L339.1 391.5L338.5 390.6L335.6 389.8L334.6 390.5L335.3 392.9L333.3 392.2V388.3L332.3 384.9L330 381.2L329.9 381.1L327.8 378.8L326.6 374.6L323.5 369.5L320.7 366.7L321.2 365.5L323.8 365L324.2 364.3L323.6 364.1L323.7 363.2L326.4 362.2L325.5 358.3L326.2 357L325 355.1L326.9 354.8L329.6 352.4L330.5 352.2Z"
          fill="#FDA8C5"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('campagna')"
        />
        <path
          d="M275.5 199.9L274.5 202.6L274.7 206.2L272.5 207.1L272 208.9L269.4 208.6L269.6 207.7L268.9 207.4L268.3 205.2L265.9 206.2V204.3L263.9 203.1L263.6 204.3L260.2 203.8L261.3 205.7H259.9L259.6 205L257.9 205.7L257 208.7L254.7 210.5L254.5 212.4L253 213.3L251.2 213L250.5 214.7L249.1 212.7L247.8 213.4L246.6 213.3L245.1 214.1L244.1 213L243.3 213.2L242 212.4L241.1 212.8L239.7 211.9L239.5 211.1L238.3 210.9L237.8 209.8L233.7 209.6L232 207.5L228.9 205.8L229.1 203.1L227.5 202L227.8 200.6L225.9 198.8L226.1 197.8L226.7 197.9L226.5 196.9L228 196.3L228.4 194.6L230.2 192.7L230.5 190.3L225.7 191.3L223.4 191L224.7 189.2L224.5 188.3L222.2 187.8L221.3 188.7L220.3 188.5L218.8 186.8L217.6 186.5L217.3 184.6L216.1 183.6L214 185.7L211.8 185.9L211.6 186.8L209.6 188.6L206.1 188.7L206 189.5L208.6 191L208.8 191.9L206.6 192L203.9 191.2L201 192.5L198.6 192.2L197.2 191.2L197.7 190.3L197.3 189.5L193.1 194.3L192.5 194L192.8 193.2L192.2 192.4L190.2 192L185.9 188.5L181 188.4L180.1 189.5L180.2 190.7L178.7 191.1L175.7 188.4L175.5 187L174 185.6V184.4L172.9 183.8L171.4 184.1L168.8 181.4H167.4L165.5 180.3L163.4 181.3L158.5 176.1L156.4 176.5L152.7 173.9L151.7 172.8L152.2 170.5L151.3 170.3L150.9 169.2L148.8 168.4L144.1 168.9L141.1 173.6L138 175.4L136.8 172.5L134.4 170.8L133.5 171.4L132.3 170.6L132 171.4L129.6 171.6L128.8 172.6L128.6 171.6L127.2 171.9L128.5 168L129.7 167.8L130.1 164.8L129.3 163L126.5 162L125.8 160.5L123.7 162.1L120.9 159.9L120.5 160.8L118.7 160.5L119 159.8L118.5 159.2L116.5 159.6V155.2L116.9 155.4L118.4 155.3L118.1 153.5L119.2 155.7L122 155L121.4 153.8L122.2 152.9L122.1 151.8L120.6 151L120.3 150L123.7 146.6L122.8 143.8L122 143.1L121.4 143.4L119.9 142L121 140.6L120.5 139.7L122 139.3L123.2 135.8L124.6 134.3L124.5 132.4L126.3 130.8L126.2 130.2L127.3 130.4L127.6 129.7L130.1 129.1L131.5 130.7L132.5 129.8L131.9 127.4L132.5 127.3L133.9 129.2L135 128.7L135.6 127L136.4 128.1L136.3 130.3L140 131.9L141.4 130.7L141.8 129.8L141.1 128.8L141.9 128.6L142.6 129.9L144.2 130.7L144.5 132.3L145.3 129.5H146.2L147.1 130.8L147.9 130.5L148.1 129.5L147.1 128.1L148.7 126.8L149.3 127.3L149 129.2L151.5 127.3L152.3 127.4L153.9 129.5L153.5 130.8L154.8 131.9L154.9 133L156.2 132.7L156.9 134.2L159.8 132.8L160.3 133.6L162.2 133.5L164.8 135.6H166.2L168.7 137.6L170.8 136.4L172.1 139L176.1 140.9L179.5 140.8L180.8 140.1L183.3 136.5L183.7 137.9L185.3 136.1L186.1 138.8L190 139.4L190.7 140.1L191.5 140L191.6 140.7L192.8 140.6L192.6 141.1L193.9 140.3L195.1 140.5L195.3 139.5L197.3 138.5L200 138.7L200.8 138L203.1 138.6L204.2 140L204.7 139.4L208.1 139.1L208.4 138.5L209.7 139.4L211.2 138L216.6 138.8L216.7 140.1L221.7 139.8L223.5 141L223.9 142.4L224.5 142.6L225.6 142.5L227.4 140.8L230.2 140L230.8 138.1L233.4 136.9L238.9 137L240.8 136.3L246.7 137.2L248.7 139.9L250 139.1L250.7 140L252.6 140.1L253.9 139H254.8L255.5 139.9L254.9 141L255.2 143.5L255.8 144.3L257.5 144.7L258 146.6L257.4 146.7L256.4 145.1L255.4 144.8L253.9 146.8L255 146.4L253.6 150.2L253.1 154.6L253.5 157.5L255.2 160.8L255.1 168.5L256.6 172.7L256.8 175.7L258.6 181.9L260.1 185L266 191.8L268.2 193.3L273.4 198.9L275.5 199.9ZM249.8 209.8L249.6 210.8L250.8 212.2L252.7 211.2L252.4 210.2L252.2 209.8H249.8Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('emilia-romagna')"
        />
        <path
          d="M277.5 30.5L279.2 31.0999V32.2999L279.8 32.5999L283.4 32.2999L288.8 33.2999L290.5 32.7999L294.1 33.7L297.3 36.1L298.8 35.4999L301 36.2999L302 35.2L303.2 35.2999L303.3 34.4999L304.9 34.9999L304.8 35.7L305.6 35.9999L309 35.3999L309.7 36.7L311.6 36.3999L312.1 37.2999L314.2 36.9999L318.6 38.3999L317.3 43.7L315.6 43.1L313 43.7L311.8 46.2L307.5 48.6L306.1 48.7V50.9999L303.2 52.7999L305.4 56.7999L305 58.2999L306.6 58.1L306.5 57.2999L308.1 57.3999L309 57.9999L310.2 57.7999L311.6 58.7L312.2 59.9999L315 59.6L316.2 60.2999L315.3 63.1L312.2 66.1L308.9 68.2L309.2 70.2L307.8 71.6L310.5 74.1L311.9 73.8999L313.1 72.6L315.4 72.8999L315.2 75.8999L312.5 81.2L313.4 83.9999L314.6 84.7999L316.7 84.4999L320.2 87.3999L322.4 87.9999L325.5 93.4999L327.9 95.2999L324.3 98.4999L322.4 98.6L320.2 97.4999L318.9 97.7999L318.8 96.9999L319.5 96.6L321.9 97.2999L323 96.4999H321.8L321.4 95.1L320.5 95.2999L320 94.7L321.1 93.8999L320.5 92.1L315.1 86.2999L312.9 85.7L311.9 85.9999L311.4 85.2999L310.2 86.6L310 88.1L311.5 89.2999L308.6 90.7L307.9 90.4999L306 92.2999L303.9 92.4999L299.4 90.1L297.8 89.7999H297.5L297.4 89.7L293.7 90.7L291.2 94.6L290.3 94.1L290.4 93.6L289.5 93.7L289.6 92.4999L288.7 91.7999L289 91.1L288.3 90.8999L287.8 88.6L287 89.2999L287.3 88.2999L286.7 87.2L287.1 86.9999L285.3 85.2999L286.3 84.7L285.6 84.3999L285.8 83.7L285.5 83.3999V83.1L285 81.7L284.5 81.8999L284.9 83.1L283.5 83.4999L283.1 82.4999L281.8 83.2999L280.7 82.2999L281 81.2999L280.4 81.2L278.5 82.2L278 83.1L277.5 82.4999L277.9 81.6L276.9 80.8999L275.2 82.7L274.6 82.1L271.2 85.2V83.7999L270.2 83.2999L270.1 82.4999L269 81.8999L268.4 83.2999L266.7 82.3999L266.9 81.3999L265.7 80.2999L264.6 76.2999H263.3L262.4 74.9999H261.2V71.9999L260.6 69.7L259.8 68.9999L261.3 66.4999L263.8 64.7999L264.2 61.7L262.1 59.9999L261.8 58.1L260.2 58.2L260 56.7999H258.2L256.3 54.2999L257.9 52.7V50.9999L258.8 50.2999L260.5 50.4999L260.8 48.7L262.4 47.8999L262.2 47.3999L262.7 47.6L262.4 46.3999L264.1 44.8999L264.3 43.3999L265.6 41.6L266 41.9999L267.4 40.8999L269 41.6L269.9 40.8999L271.5 41.6L271.2 40.1L270.1 39.3999L270.2 38.6L273.2 36.7L275.4 36.6L274.6 35.6L275.2 33.6L274.4 32.0999L274.6 30.5L276 29.7L277.5 30.5Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('friuli-venezia-giulia')"
        />
        <path
          d="M285.1 384.7L284.9 385.9L285.4 386.1L284.5 387.1L284.3 384.6L286.3 383.7L285.1 384.7ZM330.2 350.3L331.1 351L330.4 352.1H329.7L327 354.5L325.1 354.8L326.3 356.7L325.6 358L326.5 361.9L323.8 362.9L323.7 363.8L324.3 364L323.9 364.7L321.3 365.2L320.8 366.4L318.3 364.6L317.2 365.1L314.7 364.1L312.1 365.6L312.2 366.9L313 367.4L311.2 367.5L303.4 362.9L299.6 362L298.2 362.9L296.2 362.8L293.6 363.6L290.7 366.4L288.6 366.2L286 360.3L282.8 356.9L279.7 355.2L276.8 354.9L276.1 355.4L271.9 352.6L270.4 352.8L270.3 353.4L269.5 353.1L266.6 348L260.4 340.6L257.2 337.9L251.8 335.4L251 330.2L248.3 325.2L244.1 322.7L243 321L240.8 320.1L240.3 319L238.3 317.7L234.6 318.2L233.1 314.8L230.4 311.3L230.2 309.7L228.3 306L226.3 303.2L221.5 299.3L217 297.2L218.6 293.6L224.5 293.5L224.4 290.5L222 288.8L223.2 287.1L222.8 285.6L223.3 285.3L224.3 286.2L224.9 285.4L225.6 285.6L227.1 284.8L227.3 283.9L228.6 282.9L229.7 283.1L230.5 281.2L231.7 281.4L232.9 280.6L232.8 279.7L231.9 279.3L231.5 277H232.6L233.5 274.9L230.2 272.3L231.2 270.2L232.3 270.6L232.9 271.8L233.3 270L234.7 269.1L236.9 269.2L238.3 272.6L240.7 274.2L239.8 275.9L238.2 276.8L239.3 278.6L242.9 280.8L246.1 279.7L247 280.6L247.1 279.9L247.7 280.1L248.9 279.1L250.3 279.7L251.8 281.5L252.3 285.4L253.8 286.1L253.6 287.8L254.5 288.5L253.8 289.1L255.1 289.8L254.5 290.2L256.1 290L257.2 291.1L258.9 289.7L260.2 289.8L260 291.4L260.6 292L260 292.2V294L262 294.7L261.2 295.9L264.4 295.4V296.9L265.2 297.8L269 294.9L269.2 291.5L270.2 291.4L271 293H272.1L274.7 291.3L273.5 289.5L276.2 288.7L276.3 287.5L278.1 287.6L279.7 286.2L281.5 285.6L281 283.4L281.5 282.4L283.3 283.3L284 282.5H286.8L287.4 281.2L289.2 282.1L291.6 280.6V279.9L293 280.5L294.2 279.4L294.9 275.5L297.8 276.2L298.3 275.2L299.3 275.1L302.5 277.9L302 279.4L303 280.6L304.7 281.2L304 284.2L302.8 285.2L300.8 284.9L299.5 285.6L299 284.8H297.8L297.3 285.4L294.9 284.5L294.2 286.9L293.3 287.4L294.2 289L294.3 291.1L291.5 293.2L295 296.5L293.2 298.5L296.5 300.7L297.1 303.6L299.4 305.8L301.5 306.5L301.8 307.9L303.5 309L301.9 309.3L302.4 309.9L301.1 310.2L300.2 312.1L298.7 311.6L297.6 312.3L291.9 309.2L290.4 309.3V311.4L288.6 313L287.9 312.7L287.8 317L289 319L291.1 319.6V318.5L292.9 319.1L299.6 323L300.4 322.7L302.1 324.7L303 324.5L303.9 325.7L302.8 327.7L303.7 330.9L304.9 329.7L306.4 330.3L307.7 331.5L309.3 331.9L309.9 333.5L311.2 334.3L314.7 333.1L315.6 331.3L317.1 331.7L318 332.7L319.2 332.1L320.7 335L321.9 335.3L322.8 334.7L324.9 335.9L326.6 335.7L328.8 338.6L330.5 340.1L331.7 343.2L331.8 344.4L331.2 345L332.4 346.3L332.2 347.1L331.5 347.3L332.6 348.2L330.2 350.3ZM262.4 326V325.8L262.3 325.7H262.2H262.1L262 325.9V326L262.1 326.1H262.2L262.4 326.2V326Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('lazio')"
        />
        <path
          d="M145.7 195.1L145.4 196L144.9 195.1H145.7ZM49.7998 194L50.4998 194.2L51.8998 192.7H50.7998L49.9998 191.4L50.3998 190.1L51.9998 189.3L59.8998 191.8L61.2998 191L62.9998 191.6L63.3998 191L62.8998 190.2L61.7998 189.7L63.3998 188.4L64.6998 189.3L65.8998 188.9L66.8998 187.6V185.9L65.5998 184.8L66.1998 183.3L65.3998 182.3L66.4998 181.2L65.3998 180.1V179.2L65.7998 178.7L67.0998 179.3L67.3998 177.4L68.4998 177.5L69.3998 176.1L69.1998 174.4L71.9998 172.9L72.6998 171.2L71.4998 168.3L72.6998 167.9V166.2L74.0998 165.1L74.9998 166.4L76.5998 166.6L79.2998 168.9L80.3998 168.3L80.8998 166.4L81.5998 166.1L82.8998 167L83.8998 165.5L84.1998 166.3L86.9998 166.2L87.8998 166.9L90.2998 164.3L89.5998 163.5L90.6998 161.8L93.7998 162L95.1998 162.2L96.7998 164.8L96.4998 165.6H97.2998L97.5998 167.5L98.6998 167.1L98.3998 165.8L99.8998 164.5V163.2L101.9 162.9L102.7 163.9L104 163.2L103.7 160L102.4 158.6L103.8 157.5L104.4 156L105.8 155.8L106.4 156.7L108.4 156.5L109.8 159.5L111.1 159.2L112.4 159.9V161.2L113.8 162.3L116.9 161L116.8 159.7L118.8 159.3L119.3 159.9L119 160.6L120.8 160.9L121.2 160L124 162.2L126.1 160.6L126.8 162.1L129.6 163.1L130.4 164.9L130 167.9L128.8 168.1L127.5 172L128.9 171.7L129.1 172.7L129.9 171.7L132.3 171.5L132.6 170.7L133.8 171.5L134.7 170.9L137.1 172.6L138.3 175.5L139.5 175.3L140.4 177.6L143.9 180.3L146.2 181.2L146.3 183.4L147 184L146.6 186.4L148.4 184.9L149.7 185.8L149 185.9L147.9 187.6L151.3 187.5L151.5 189.6L152.3 190.8L151.9 191.9L153.5 190.6L155.6 191.9L155.4 193.1L153.5 195.3L152.1 195.1L151.1 195.9L148.5 194V193.2H147.3L145.6 191.5L144.5 192.2L145.6 193.6L145.4 194.1L146.1 194L145.2 195.2L141 192.5L139.3 190.4L137.2 189.3L136.2 190L135 187.8L133.2 187L132.4 185.5L130.5 184.8L129.7 183.6L127.6 183.5L126.4 182.2L125.8 182.6L124.4 180.2L118.3 176.7L117.3 177.6L117.4 179.7L114.2 178.2L114.7 176.6L114.1 175.8L104.8 173.4L104.2 172.5L103.7 172.9L104.1 173.5L100.1 172.4L101.1 172.2L100.3 171.9L98.1998 171.8L98.3998 172.3L96.5998 171.9L94.7998 172.6L93.4998 173.9L91.8998 174.2L90.5998 175.5L85.3998 178.1L84.6998 179L85.2998 178.9L82.6998 181.3L83.3998 182.2L81.6998 184.4L81.9998 186.2L74.9998 189.7L73.2998 192.7L73.0998 195.6L70.3998 198.7L70.1998 199.9L70.7998 201.1L67.0998 203.6L66.2998 205.1L64.2998 205.5L60.5998 207.9L56.6998 208.7L55.3998 209.8L54.0998 209.4L51.1998 211.1L49.5998 210.8L48.2998 212.2L44.1998 211.3L43.0998 212.2L42.1998 212L40.2998 207.5L40.3998 206.2L41.0998 205.4L43.1998 204.7L43.4998 201.9L47.2998 199.9L47.9998 198.4L47.7998 196.5L49.6998 195.7L49.7998 194Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('liguria')"
        />
        <path
          d="M163.5 31.7001L164 32.2001L163.2 33.5001L163.4 34.5001L165.2 34.8001L165.6 36.2001L167.6 36.7001L168.2 35.8001L170.1 36.6001L171.1 36.2001L172.8 37.5001L173.8 39.9001L177.1 40.2001L179.4 41.7001L180.3 42.9001L180.1 44.8001L180.8 46.0001L179.5 47.4001L177.8 47.5001L175.5 49.7001L177.8 50.8001L178.3 52.6001L177.5 53.7001L178.2 54.1001L178.7 56.0001L176.7 59.6001L177.6 61.0001L176.8 64.9001L173.9 68.5001L174.2 70.2001L173.2 71.0001L172.7 72.6001V73.5001L174.2 73.8001L174.1 75.6001L175.2 77.3001L174.4 79.1001L174.9 82.9001L176.9 83.7001L176.3 84.9001L176.7 85.7001L177.9 85.8001L179.8 84.6001L181.5 84.5001L181.9 82.6001L185.4 81.9001L186.5 82.8001L186.8 82.0001L190.3 82.7001L180.6 97.1001L181.6 107.4L181.3 109.1L182 109.3L182.6 108.6L184.7 109.6L183.9 111.8L184.7 112.5L183.6 113.4L184.5 114.7L183.9 116.4L185.2 116.7L185.6 117.6L187.7 115.9L189.4 117.6L190.4 119.7L192.7 120.2L192.8 120.8L194.4 121.2L194.3 122.3L196.8 123.4L197.5 124.5L197.2 126L198.6 125.7L199.4 126.2L198.6 127.8L200.6 129.5L201.6 129.7L201.8 128.6L203 129.2L203.8 127.7L206.4 128.7L205.3 129.6L205.7 130.5L205.2 131.9L207.9 132.9L209.1 132.2V134.4L216.1 138.1L216.3 139L210.9 138.2L209.4 139.6L208.1 138.7L207.8 139.3L204.4 139.6L203.9 140.2L202.8 138.9L200.5 138.3L199.7 139L197 138.8L195 139.8L194.8 140.8L193.6 140.6L192.3 141.4L192.5 140.9L191.3 141L191.2 140.3L190.4 140.4L189.7 139.7L185.8 139.1L185 136.4L183.4 138.2L183 136.8L180.5 140.4L179.2 141.1L175.8 141.2L171.8 139.3L170.5 136.7L168.4 137.9L165.9 135.9H164.5L161.9 133.8L160 133.9L159.5 133.1L156.6 134.5L155.9 133L154.6 133.3L154.5 132.2L153.2 131.1L153.6 129.8L152 127.7L151.2 127.6L148.7 129.5L149 127.6L148.4 127.1L146.8 128.4L147.8 129.8L147.6 130.8L146.8 131.1L145.9 129.8H145L144.2 132.6L143.9 131L142.3 130.2L141.6 128.9L140.8 129.1L141.5 130.1L141.1 131L139.7 132.2L136 130.6L136.1 128.4L135.3 127.3L134.7 129L133.6 129.5L132.2 127.6L131.6 127.7L132.2 130.1L131.2 131L129.8 129.4L127.3 130L127 130.7L125.9 130.5L126 131.1L124.2 132.7L124.3 134.6L122.9 136.1L121.7 139.6L120.3 140L120.8 140.9L119.7 142.3L121.2 143.7L121.8 143.3L122.6 144L123.5 146.8L120.1 150.2L120.4 151.2L121.9 152L122 153.1L121.2 154L121.8 155.2L119 156L117.9 153.8L118.2 155.6L116.7 155.7L116.4 153.2L117 151.5L115 150L114.6 147.4L112.2 148.1L111.8 147.4L110.5 147.3L110.6 146.5L109.6 145.5L110.4 144.6L109.8 142.9L108.9 143L107.4 141.7L106 139.5L106.2 138L105.6 136.9L105.2 136.5L104 137L102.9 135.5L102.6 132.7L100.1 132.9L98.6998 134.3L97.2998 134.5L97.0998 135.4L95.9998 135.3L95.8998 134.4L94.8998 134.5L94.5998 133.5L94.1998 135L91.2998 133.3L90.9998 130.2L89.7998 129.1L90.0998 128L89.0998 127.7L88.5998 126.4L87.3998 126L86.8998 125.1L88.4998 122.9L86.5998 123.7L86.1998 123.4L87.1998 123L86.0998 122L86.8998 121.3L86.3998 120.9L87.4998 120.8L86.0998 120.3V119.9L86.8998 120L86.5998 118.5L84.7998 117.6L85.3998 116.3L86.5998 115.9L86.0998 114.3L87.3998 113.1L88.3998 114L90.7998 113.9V114.7L91.7998 115.3L92.1998 117.5L93.4998 117.4L94.4998 116.9L94.9998 115.1L96.5998 114.1L94.6998 112.1L95.9998 112.3L96.9998 111.6L98.3998 112L100.3 111.1L99.4998 108.7L98.6998 108.8L97.6998 105.4L94.5998 103.8L93.4998 99.5001L93.8998 98.0001L92.1998 96.6001L91.8998 95.5001L93.1998 95.8001L92.4998 94.2001L92.7998 93.3001L90.9998 93.0001L91.4998 90.7001L88.7998 89.9001L86.9998 86.6001L87.0998 85.3001L88.8998 83.2001L87.7998 78.9001L94.7998 71.2001L93.8998 67.2001L94.4998 65.8001L95.5998 64.6001L96.2998 65.8001L97.3998 66.4001L98.4998 65.9001L100.6 67.6001V68.6001L99.6998 69.2001L97.4998 73.1001H99.5998L101.3 74.9001L102.5 75.2001V76.7001L104.7 81.0001L103.2 83.3001L105.2 82.5001L107 83.2001L106.7 84.1001L108.7 84.2001L109.3 81.0001L111.1 79.1001L110.5 79.0001L109.8 77.6001L108 77.1001L107.8 75.1001L106.7 74.5001L108.4 73.0001L107.4 70.1001L107.9 69.2001L110.5 68.2001L111 66.8001L110.3 64.7001L112.4 63.7001L114.3 61.6001L115.2 61.5001L117 57.4001L118.3 57.3001L118.4 55.2001L120.4 51.4001L120.3 49.6001L119.4 48.5001L119.6 45.7001L118.1 43.9001L119.3 42.9001L119.5 40.4001L123.3 39.5001L123.8 41.1001L125.4 42.2001L126.5 40.1001L127.8 39.5001L127.6 40.8001L127 41.0001L127.9 41.5001L127.8 48.2001L129.5 48.8001L130.4 51.4001L131.7 53.0001L132.1 52.7001L135.5 54.1001L137.4 53.0001L139 53.7001L140.2 50.0001L142 51.0001L147.8 48.0001L148.6 49.0001L149.8 48.1001L151.8 49.9001L151.1 51.8001L152 52.4001L151.9 54.3001L154.5 55.6001L154 57.8001L155.1 58.5001L156.1 57.8001L157.5 58.1001L159.9 56.0001L158.9 53.7001L156.7 51.1001L156.8 49.8001L157.7 49.2001L158.2 47.7001L159.2 47.5001L159.4 46.2001L158.6 46.0001L158.3 44.9001L155.6 45.4001L153.8 43.9001L154.4 42.6001L153.9 41.7001L154.4 39.1001L154 37.8001L156.5 35.1001L156.6 33.2001L157.8 33.5001L160.4 32.1001L161.5 32.7001L162.6 31.6001L163.5 31.7001Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('lombardia')"
        />
        <path
          d="M314.7 225.9L312.3 224.5L311.3 222.5L309.5 221L308.8 222.3L307 222.1L300.4 218.4L282.5 202.7L277.7 200.2L275.6 200L274.6 202.7L274.8 206.3L272.6 207.2L272.1 209L269.5 208.7L269.7 207.8L269 207.5L268.4 205.3L266 206.3V204.4L264 203.2L263.6 204.4L260.3 204V203.9L261.4 205.8H260L259.7 205.1L258 205.8L257.1 208.8L254.8 210.6L254.6 212.5L254.7 212.6L256.6 213.4L258.6 216.1H256.8L257.1 218L256.3 217.9L255.8 214.6L255.4 217.3L254.3 217.9L253 217.7L253.2 218.4L252.4 219.3L250.4 220L251.7 221.9L252.3 222.9H255L255.3 223.4L257.1 221.9L258.7 221.8L258.3 222.5L258.7 223.8L256 226.3L257.2 227.5L258.4 226.9L259.5 228.4L260.7 226.6L261.6 226.7L262.3 227.9H263.1L263.4 227.1L264.2 227.5L269.8 233.9L271.7 232.8L273.6 233.5L274.8 231.1L276.6 231.6L276.3 233.4L277.1 234.1L275.5 235.6V236.3L277.5 238.9L277.8 241.4L277.3 242L278.9 243.2L279.5 246.2L280.7 246.8L280.6 249.3L279.2 250.7L279.8 252L281.6 252.4L282.1 253.9L281.9 256.3L282.6 258.1L281.8 258.7L282.6 260.4L282.1 261.7L284.4 263.1L284.6 263.9L285.6 264L285.7 267.5L286.8 266.3V264.8L287.9 265.5L289.1 264.3L291.7 266.3L293.9 269.7L296.2 269.2L297.3 267.6L298.5 270.8L298.3 272.4L297.5 274.1L297.2 273.4L295.5 274.1L295.3 275.8L298.2 276.5L298.7 275.5L299.7 275.4L302.9 278.2L304.4 278.6L306 277.4L306.5 277.8L307 275.7L309.1 275.4L309.4 273.2L310.6 271.9L310.8 270.6L312.6 271.6L314.7 270.6L315.3 271.4L316.5 271.3L318.3 270.5L318.7 268.6L319.3 268.3L321.7 268.1L323.6 266.9L328 266L326.1 260.1L324.8 253L315 228.6L314.7 225.9ZM261.3 223.1L260.7 222.9L260.5 222.8L260.8 222.2L261.3 222.5L261.4 223L261.3 223.1Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('marche')"
        />
        <path
          d="M367 316.3L371.8 318.8L376.2 319.6L379.7 323.4L382.5 324.5L382.7 327.4L380.8 330.1L381.5 332.7L380.7 334.1L381.6 335.2L380.9 335.7L381.8 337L383.4 337.7L381.6 338.6L381 339.9L380.3 339.2V339.9L378.5 340.7L377.3 342.8L374.5 341.5L373.4 342.8L374.2 343.5L373.6 348.4L375 349L376.7 351L374.1 352.8L371.8 353L370.4 354.4L366.9 352.9L365.4 355.4L363.8 355.9L363 355.3L361.3 355.5V356.3L360.4 356.4L358.5 358.1L357.4 356.6L354.5 357.1L353.5 356.3L353.2 354.9L346.2 352.9L344.4 351.9L344.2 351H342.6L342.4 350.3L339.4 350.2L339.1 351.4L337.1 349.7L335.2 353.2L336.4 354.7L336.6 356.8L335.5 356L333.6 356.4L331.8 354.3L332 353L330.7 352.3L331.4 351.2L330.5 350.5L333 348.7L331.9 347.8L332.6 347.6L332.8 346.8L331.6 345.5L332.2 344.9L332.1 343.7L330.9 340.6L329.2 339.1L331 338.6L332.6 339.5L332.8 338.2H334L334.8 336.1L335.8 336L336.5 337.8L337.1 335.5H338.8L339.4 334.4L339.6 335.3L340.3 335.4L340.7 334.5L339.4 333.7L338.3 330.6L338.7 329.8L340.6 329.7L341.8 327.8L344.3 325.7L345.1 326.8L346.2 326.7L347.1 328.6L347.6 328.8L348.5 327.6L350.6 329L351.6 329.9L352.5 333.6L351.8 334.2L353.6 334.5L357.8 330L359.3 326.7L361.4 325.2L362.1 322.5L364.1 320L366.6 318.3L365.8 317.6L366.8 316L367 316.3Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('molise')"
        />
        <path
          d="M82.3 41.8L83.7 43.2001L83.2 44.5L83.8 46.2001L83.5 50.3L81.8 52.5L83.1 54.7001L82.5 55.7001L83.7 56.8L86.4 57.7001L88.3 61.2001L89.6 61.8L89.3 62.7001L90 63.9L91.6 63.8L93.4 65.2001L94.8 65.1001L94.2 66.5L95.1 70.5L88.1 78.2001L89.2 82.5L87.4 84.6001L87.3 85.9L89.1 89.2001L91.8 90L91.3 92.3L93.1 92.6001L92.8 93.5L93.5 95.1001L92.2 94.8L92.5 95.9L94.2 97.3L93.8 98.8L94.9 103.1L98 104.7L99 108.1L99.8 108L100.6 110.4L98.7 111.3L97.3 110.9L96.3 111.6L95 111.3L96.9 113.3L95.3 114.3L94.8 116.1L93.8 116.6L92.5 116.7L92.1 114.5L91.1 113.9V113.1L88.7 113.2L87.7 112.3L86.4 113.5L86.9 115.1L85.7 115.5L85.1 116.8L86.9 117.7L87.2 119.2L86.3 119.1V119.5L87.7 120L86.6 120.1L87.1 120.5L86.3 121.2L87.4 122.2L86.4 122.6L86.8 122.9L88.7 122.1L87.1 124.3L87.6 125.2L88.8 125.6L89.3 126.9L90.3 127.2L90 128.3L91.2 129.4L91.5 132.5L94.4 134.2L94.8 132.7L95.1 133.7L96.1 133.6L96.3 134.5L97.4 134.6L97.6 133.7L99 133.5L100.4 132.1L102.9 131.9L103.2 134.7L104.3 136.2L105.5 135.7L105.9 136.1L106.5 137.2L106.3 138.7L107.7 140.9L109.2 142.2L110.1 142.1L110.7 143.8L109.9 144.7L110.9 145.7L110.8 146.5L112.1 146.6L112.5 147.3L114.9 146.6L115.3 149.2L117.3 150.7L116.8 152.4L117.1 154.9L116.7 154.7V159.1L116.8 160.4L113.7 161.7L112.3 160.6V159.3L111 158.6L109.7 158.9L108.3 155.9L106.3 156.1L105.7 155.2L104.3 155.4L103.8 156.9L102.4 158L103.7 159.4L104 162.6L102.7 163.3L101.9 162.3L99.9 162.6V163.9L98.4 165.2L98.7 166.5L97.6 166.9L97.3 165H96.5L96.8 164.2L95.2 161.6L93.8 161.4L90.7 161.2L89.6 162.9L90.3 163.7L87.9 166.4L87 165.7L84.2 165.8L83.9 165L82.9 166.5L81.6 165.6L80.9 165.9L80.4 167.8L79.3 168.4L76.6 166.1L75 165.9L74.1 164.6L72.7 165.7V167.4L71.5 167.8L72.7 170.7L72 172.4L69.2 173.9L69.4 175.6L68.5 177L67.4 176.9L67.1 178.8L65.8 178.2L65.4 178.7V179.6L66.5 180.7L65.4 181.8L66.2 182.8L65.6 184.3L66.9 185.4V187.1L65.9 188.5L64.7 188.9L63.4 188L61.8 189.3L62.9 189.8L63.4 190.6L63 191.2L61.3 190.6L59.9 191.4L52 189.3L50.3 190.2L49.9 191.5L50.7 192.8H51.8L50.4 194.3L49.7 194.1L49.8 192.8L47.7 189.9L48.5 187.2L46.3 187.1L45.5 188.8L43 188.3L38.5 190.2L37.1 189.9L36.8 191L35.4 190.2L33.8 190.8L33.2 188.9L30.4 189.2L28.8 187.3L27.6 187.5L26.2 185.5L25 185.1L24.2 185.6L21.5 183.8L19.2 184.1L18.1 183.3L17.6 180.5L15.9 179.5L16.1 178.6L14.6 177.2L14.4 176L12.8 175.3L13 171.6L15.5 171.1L12.3 167.9L11.3 164.7L12.3 163.2L13.7 163.1L14.7 162.1L15.5 159.3L16.3 159.2L15.4 157.1L16 155.6L17.1 154.7L21.1 155L20.7 153.4L19.1 152.4L18.6 149.6L17.7 148.6L18.7 146.4L17.9 145.4L14.8 144L13.7 145.1L11.6 144.7L8.9 142.9L8.8 142.1L6.6 141.2L6.8 139.4L6.3 139.1L7.2 137.8L6 135.9L6.6 135.4L6.3 134.4L3.1 134L2.6 130.7L1.8 130.5L1 128.6L3.1 127.3L3.4 126.4L6.2 126.6L7.3 125.2L10.9 126.7L11 127.3L13 126.7V124.7L15.4 124.6L15.8 123.3L17.9 121.4L19 121.6L20.1 121L20.9 122L22.8 119.7L23.4 119.8L23.9 117.5L22.8 114.6L23.7 114.4L24.1 113.1L25.3 112.5V111.2L26.4 109.6L23.1 107.8L22.6 105.7L24.1 102.6L24.4 105.1L25.2 104.5L27.9 105.4L30 102.8L32.4 102.7L34 101.9L34.8 102.5L37.9 100L38.7 98.6001L39.8 98.3L41.4 98.7L43.2 97.7L45 98.8L45.1 99.6001L46.3 99L48 100.1L50 99.8L50.6 100.3L54.9 97.3L57.2 97.1001L58.1 97.7L58.7 95L59.7 94.8L58.1 91.5L59.6 89L59.3 88L57.9 87.5L56.4 84.8L57 80.4L56.4 76.9L57 76.3L57.1 73.1001L58.4 71.7001L62 71.8L63 70.8L63.1 69.5L64.1 68.8L63.5 67L64 65.3L67.3 64.5L67.8 63.3L69.5 62.4L69.4 61.1001L70.1 60.1001L68.9 57.3L67.6 55.7001L66.1 55L68.9 52.2001L70.2 52.6001L72.1 51.8L72.7 50.1001L74.4 49.4V48.2001L76.5 47.3L76.9 46L75.6 45.4L76.3 44.3L77.2 44.2001L78.9 42.5L82.3 41.8Z"
          fill="#FDA8C5"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('piemonte')"
        />
        <path
          d="M421.8 323.1L425.2 323.8L429.5 327.1L428.9 328.4L430 330.5L429.9 331.9L429.6 333.6L428.4 334.8L424.3 337.6L424 338.5L416.7 343.1L416.8 348.1L419 352.2L422 354.4L430.2 358.2L432.8 360.2L439.9 362.9L447.3 367.3L456 370.1L457.4 371.3H459L459.4 372L460.2 371.6L460.4 372.2L464.1 373.8L470.1 375.8L478.5 381.3L481.7 385.2L483.4 386L487.4 389.7L497.7 393.8L503.1 397.6L508 398.2L509 399.8L508.6 400.5L511.7 400.6L511.4 401.6L512.8 403.3L512.3 405.1L514.3 407.5L516.4 409.4L521.5 412.3L529.7 421.1L531.4 425L531.2 426.5L532.6 429.7L533.8 430.5L533.4 430.9L533.9 432.3L532.4 433.7L532 435.8L530.3 437L529 439.8L528.2 443.8V449L527.2 450.4L526.1 450.7L522.8 448.1L518.3 447.2L512.7 442.6L510.3 438.5L511.4 438.1L511.2 436.4L509.4 435.4L510.7 434.4L511.1 432.2L507.1 427.2L507.4 425.5L506.5 423.6L504.3 421.8L496.4 420.6L488.7 421.2L485.9 419.2L483.5 418.9L475.9 414.5H474.9L475.2 413.7L476.9 413L477.1 411.7L475.9 410.3L473.9 410.4L473.4 409L470.9 408.1L467.6 408.6L464.5 410.3L461.4 413.1L459.5 416.2L458.8 414.6L457.3 413.3L457 411.9L455.5 411L454 411.4L453.2 410.6L454 408.8L453 408L453.4 407.3L452.6 406.4L453 403.9L453.6 403.5L452.8 401.7L453.6 398.5L452.5 397.3L453.4 396.9L450.8 395L450.3 395.7L449.3 395.1L449.2 394.2L448.3 394.8L446.8 394.2L446.7 395.7L446 394.5L445.2 394.7L445.3 396.4L443.5 394.2L440.5 397.7L439.2 397.3L438.5 395.8L432.8 390.5L430.2 384.9L428.5 384.3L426.6 386L425.2 384.7L420.3 382.6L419.8 381.6L421.1 381.8L422.7 380L422.4 378.6L423 377.7L421.4 376.4L420.9 376.8L420.4 374.7L419 374.3L418.8 373.4L417.3 373.1L415.3 371.7L414.1 372.4L413.4 372.1L413.6 372.8L412.1 373.2L412.2 374L410.7 374.8L409.4 373.9L407.2 374.7L403.1 374L401.4 374.3L400.2 375.4L400.5 376.5L397.4 374.9L396 375L394.2 373.4L392.7 374.5L390.2 373.5L389.2 374.3L387.4 373L386.8 371.3L385.4 370.6L386.1 368.9L387.9 367.9L387.2 365.8L388.6 364.9L387.5 363.7L386.1 364L385.2 362.7L382.2 362.8L382 360.9L379.4 360L378.9 357.7L379.6 356.7L380.5 356.5L380 355.5L380.7 354.8L380.5 354.1L378 353.4L376.4 350.9L374.7 348.9L373.3 348.3L373.9 343.4L373.1 342.7L374.2 341.4L377 342.7L378.2 340.6L380 339.8V339.1L380.7 339.8L381.3 338.5L383.1 337.6L381.5 336.9L380.6 335.6L381.2 335.1L380.3 334L381.1 332.6L380.4 330L382.3 327.3L382.1 324.4L391.2 325L392.3 325.9L395.1 326L403.8 324.4L406.7 325.2L410.3 325L421.8 323.1Z"
          fill="#FDA8C5"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('puglia')"
        />
        <path
          d="M79.3002 489.6L79.8002 490.4L81.8002 489.8L83.7002 492.9L82.7002 497.8L81.3002 498.6L78.9002 493.9L78.4002 491.4L79.3002 489.6ZM76.5002 485.7L76.4002 490.5L75.0002 490.8L73.8002 490V488.5L72.5002 487.7L74.6002 485.7H76.5002ZM140.3 384.5L140.8 384.9L138.6 386.3L138.1 385.9L140.5 383.9L140.3 384.5ZM72.9002 381.1L72.4002 381.6L72.3002 380.7L72.9002 381.1ZM77.1002 372.6L77.3002 373.6L78.4002 374.3L77.8002 374.9L77.7002 376.6L75.3002 375.5L73.4002 378.1L74.0002 377.9L74.7002 379.3L74.3002 380.5L72.3002 380.2L73.2002 378L72.6002 377.9L72.7002 376.9L74.0002 376.4L74.8002 375L75.6002 374.9L75.1002 373.2L77.1002 372.6ZM128.7 365.4L129.5 366.7L128.4 368.5L129.2 368.7L127.2 369L128.2 365.2L128.7 365.4ZM122.8 364.8L123.6 365.3L122.7 366.1L122.8 364.8ZM117.9 364.4L120.1 366.2L119.4 367.8L120.3 368.8L122.4 368.7L122.6 367.6L123.7 367.5L124.2 369.1L124.7 369.2H126.4L125.5 370.3L126.6 370.5L127.4 371.7L127.3 374.3L128.6 372.3L128.4 371.3L130.6 371.4L130.9 370.4L131.7 371.5L131.2 371.8L132.1 371.9L131.9 373L133.1 372.9L133.3 373.9L132.4 375.2L131.9 374.6L131.6 374.9L131.9 376.2L131.2 376.7L130.5 379.3H131.2L131.3 378.1L132.8 377.6L132.3 379.6L133.5 379.7V379L133.9 379.3L134.3 378.6L137.4 380.2L136.8 380.8L134.9 379.8L133.7 380.8L134.2 381.7L133.1 383.2L133.4 384L131 383.7L130.2 384.1L131 384.5H132.9L133.7 384.8L133.4 385.2L134.2 386.2L135.5 384.4L136.6 384.6L135.3 386.2L137.3 387.2L136.8 388.4L138.3 388.1L140.1 389.4L139.5 389.9L138.6 389.6L138.2 390.4L138.7 391.1L137.9 391.5L137.8 392.6L139.9 394.6L139.8 397L141.5 399.2L141 401.4L141.6 403.6L143.2 405.1L143.4 406.7L144.9 407.6L142.2 415.6L138.8 418.5L136 423.3V426.3L137.2 429.8L139 432.2L140.8 433.2V434.6L138.7 439.7L138.8 441.6L139.9 441.9L140.1 442.6L138.5 444.2L139.1 447L137.9 451.1L138.3 455.2L136.9 458.7L137.4 463.5L136.3 467.4L136.9 469.7L134.7 476.3L135 478.1L136.3 479.2L134.9 479.7L134 481.1L133.1 485.1L133.8 486.2L132.9 488.8H132L131.2 489.8L131.3 490.9L130.4 490.2V488.9L129.6 488.6L127.5 489.3L121.2 484.1L117.3 483.3L115.4 484.4L115 485.9L112.8 484.1L110.9 484.9L108.7 487.7V491.3L110 493.1L108.9 497.2L108.4 496.7L107.8 497L101.6 503.2H100.5L99.6002 502.1L99.0002 502.8L97.9002 501L95.5002 499.6L95.4002 500.5L93.0002 501.1L93.3002 502L92.3002 502.5L92.7002 503.7L91.9002 504L92.2002 502.2L90.0002 502.3L90.6002 499.4L88.4002 497.4L88.0002 493.7L86.5002 492.9L83.9002 492.8L84.3002 491.2L83.7002 489.8L83.1002 489.3L82.1002 489.8V487.3L79.1002 484L79.0002 483.1L81.6002 480.7L82.1002 479.5L81.4002 477.1L80.2002 476.7L80.0002 475.2L79.3002 474.6L81.0002 471.9V470.9L79.7002 470L79.9002 469.1L82.9002 464.7L83.7002 461.5L82.7002 459.6L83.1002 457.8L82.6002 456.8L83.0002 455.4L82.6002 452.5L83.2002 451.8L84.8002 454.5L85.5002 454.4L85.8002 452.6L87.2002 450.2L87.5002 446.5L86.2002 444.1L84.1002 444L82.4002 445.7L80.5002 443.9L80.3002 440L81.2002 437.4L79.6002 436.5L80.7002 435.6L81.1002 436.2L83.0002 435.6L84.6002 433.9L84.7002 432.6L83.2002 428.3L84.4002 421.9L83.4002 419.9L81.7002 418.9L80.0002 418.8L79.8002 417.5L80.8002 414.6L79.6002 409.9L78.0002 409.3L76.3002 404L73.9002 404.5L73.8002 405.3H72.0002V403.8L72.7002 403.3L71.7002 402.3L70.1002 404.8L69.6002 404.6L69.3002 402L71.1002 401.2L72.0002 398.4L70.6002 397.8L68.7002 395.7L70.2002 393.6L70.0002 391.9L71.2002 390.9L72.8002 386.5L70.7002 383.6L71.9002 381.5L73.4002 382.6L73.2002 385.1L76.8002 389L79.5002 389.5L81.5002 389.2L83.2002 390.4L88.0002 389.7L94.0002 384.9L98.4002 384.3L102 380.2L101.9 379.1L104.6 377.5L108.2 372.6L109.6 371.8L110.2 372.4L112.5 372L113 370.8L114.5 370.7L115.2 369.9L114.5 368.2L115.1 366.3L114 366.1L114.1 365.3L115 365.9L116.3 365.2L116.4 366L117.9 364.4ZM126.3 363.8L127.6 365.9L127.2 366.9L124.6 367.3L124.2 366.2L125.5 365.2L125.4 364.2L126 364.8L126.3 363.8Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('sardegna')"
        />
        <path
          d="M265.6 690.9L269.9 691.3L270.2 692.8L265 691.4L265.6 690.9ZM239.9 618.4L241.9 619.4L242.4 619.1L244.2 620.6L244.3 622.7L243.1 624.2L241.5 624.1L238.6 620.5L238.7 619.1L239.9 618.4ZM261.9 562L261.1 559.1L262.3 558.5L261.9 562ZM255.7 555.8L256.4 557.1L257.4 556.7L258.4 557.4V558.4L257.8 558.6L257 557.7L254.9 557.9L254.2 556.7L255.7 555.8ZM244.8 553.6L246 556.1L243.8 555.4L243.2 553.5L244.8 553.6ZM401.2 536.2L403.3 537.6L405.7 538.2L403.3 538.9L402 540L401.3 542.5L402 542.4L398.4 549L389.9 560.1V561.5L388.4 562.5L388.6 563.3L385.7 567L385.4 568L386 569.5L385.1 572.6L384 574L384.1 577.1L381.4 579.7L380.1 582.2L380.6 591.5L383.5 593.3L384.8 593.6L385.4 593L387.7 595.8L387.2 596.5L386.4 595.9L386.2 597.4L385.8 595.8L384.8 596.2L384.5 599L385.4 601L386.6 600.6L387.1 601.3L386.4 601L386.1 601.5L386.7 602.9L387.9 603.6L389.4 603.5L389.5 606.2L388.6 605.8L388.5 607.2L389.1 607.6L389.9 607.1L391.2 609.3L389.6 608.6L388.5 609.1L387.9 611L385.6 611.6L383.1 614.4L380.5 620.8L382.5 627.2L382.1 628.2L381.4 627.8L379.8 629.3L377 626.3L374.3 626.8L372.3 625.1L370.7 624.7L366.4 626.2L364.7 625.3H362.3L359.9 623.1L357.7 622.2L353.4 621.6L351.9 619.9L351.2 616.9L348.4 611.9L343.1 606.6L338.7 604.5L334.4 603.5L329.8 603.6L327 604.3L325.7 603.9L323.3 601.5L320.1 601.2L316.1 598.7L315.3 596.8L311.4 593.6L310.1 593.9L309.4 593.2L306.7 593.1L304.6 590.9L301 589.1L299.8 587.7L298.7 587.6L297.8 585.5L293.9 581.7L289.9 581L287.4 581.6L284.8 577.7L282.8 577L276.6 576.8L271.9 578L268.9 573.5L267 572.3L265 572.4L263.1 570.2L262.9 567.7L260.8 564.5L262.5 563.5L263.5 560.3L262.3 558.4L264.1 555.9L263.9 554.1L265 553.6L263.7 552.2L265 551.9L267.3 549.3L268.8 549.6L270.4 549L271.5 547.9L271.4 546.9L273.7 547L274.9 545.3L273.9 543.4L274.6 542.5L274.9 543.2L276.3 543V544.6L277.2 545.5V546.9L278.2 548.7L282.2 551.8L286.1 550.7L290.1 548.2L289 545.3L289.9 545.1L290.5 544L290.2 543.4L291.6 542.2L295.3 543.5L297.1 542.7L297.5 541.5L299 541.7L300.9 540.3L301.5 541.8L303.1 542.8L303.5 544.7L302.9 545.7L303.8 547L306.7 547.8L308.7 547.3L309.5 546.3L310.8 546.7V549.3L312.2 550.9L318.7 554.4L321.1 554.8L325.4 553.6L329.2 551.4L332.6 550.7L334.6 552L336.5 552.2L338.2 551.4L344.5 552.7L348.3 552.2L350.7 550.8L353.1 551.2L360.3 548.9L365.2 543.7L367.1 544.5L371.6 543.3L372.7 542.2L375.2 544.4H378.5L379.2 545.8L380.9 546.1L384.3 544.2L386.3 542L387.3 539.2L386.5 537.6L387.2 537.5L387.8 538.8L387.3 540.6L389.3 541.1L394.3 539.7L399.8 536L401.2 536.2ZM374.4 529.4L376.1 530.7L376.4 532.2L375.5 532.4L374 531.4L373.5 529.8L374.4 528.6L374.8 529L374.4 529.4ZM374.5 523.5V525.2L375.3 525.8L374.2 526.2L374.1 528.2L371.6 525.5L372.3 523.6L374.5 523.5ZM347.6 521.7L347.5 522.9H346.7L346.6 521.9L347.6 521.7ZM368.2 520L370.4 520.1V522.6L369.7 522.8L367 521.3L367.5 520.1L368.2 520ZM356 519.9L357.2 520.1L358 521.6L356.2 521.4L355.6 520.4L356 519.9ZM379.6 516.5L379.5 517.4L378.7 517.7L378.8 516.7L379.6 516.5ZM295.3 512.6L295.7 512.9L295.1 513.7L293.6 513.8L293.9 512.7L294.8 512.2L295.3 512.6ZM386.3 507L387.1 507.6L385.8 509.3L384.7 508.2L386.3 507Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('sicilia')"
        />
        <path
          d="M166.4 299L167.2 300.6L166.5 301.2L165.6 301.1L165.5 299.2L166.4 299ZM192 296.5L193.7 298.3L193.5 300.9L191.8 298.8L191.1 298.7L192 296.5ZM155.9 282.7L156.8 284.5L156.2 285.8L154.3 284.9L155.5 284.3L155.9 282.7ZM171 267.6L172.2 268.8L171.5 270.7L171.8 273L169.6 274.2L171.7 275.7L171.2 277.3L169 276.6L168.2 274.2L167.5 273.9L166.4 274.1L166.5 275.6L165.7 274.2L165 275.7L163.1 274.8L162.9 276.2L160.5 275.6L159.1 275.8L159.3 276.3L157.7 275.3L156.8 273.8L156.9 272.4L158.5 271.2L161 271.1L163.2 272.5L163.3 271.8L164.2 271.6L163.9 271.1L164.5 270.7L164 270L167.2 270.8L166.5 271.6L168.2 271.9L170.5 267.5L171 267.6ZM144.8 255.6L145.4 257.3L143.8 259.4L143 258.3L143.4 256.3L144.5 255.2L144.8 255.6ZM252.3 210.1L252.4 210.2L252.7 211.2L250.8 212.2L249.6 210.8L249.8 209.8H252.2L252.3 210.1ZM138.1 175.5L141.2 173.7L144.2 169L148.9 168.5L151 169.3L151.4 170.4L152.3 170.6L151.8 172.9L152.8 174L156.5 176.6L158.6 176.2L163.5 181.4L165.6 180.4L167.5 181.5H168.9L171.5 184.2L173 183.9L174.1 184.5V185.7L175.6 187.1L175.8 188.5L178.8 191.2L180.3 190.8L180.2 189.6L181.1 188.5L186 188.6L190.3 192.1L192.3 192.5L192.9 193.3L192.6 194.1L193.2 194.4L197.4 189.6L197.8 190.4L197.3 191.3L198.7 192.3L201.1 192.6L204 191.3L206.7 192.1L208.9 192L208.7 191.1L206.1 189.6L206.2 188.8L209.7 188.7L211.7 186.9L211.9 186L214.1 185.8L216.3 183.7L217.5 184.8L217.8 186.7L219 187L220.5 188.7L221.6 188.9L222.5 188L224.8 188.5L225 189.4L223.7 191.2L226 191.5L230.8 190.5L230.5 192.9L228.7 194.8L228.3 196.5L226.8 197.1L227 198.1L226.4 198L226.2 199L228.1 200.8L227.8 202.2L229.4 203.3L229.2 206L232.3 207.7L234 209.8L238.1 210L238.6 211.1L239.8 211.3L240 212.1L241.4 213L242.3 212.6L243.6 213.4L244.4 213.2L245.4 214.3L246.9 213.5L248.1 213.6L249.4 212.9L250.8 214.9L251.5 213.2L253.3 213.5L254.7 212.7L254.8 212.8L256.7 213.6L258.7 216.3H256.9L257.2 218.2L256.4 218.1L255.9 214.9L255.5 217.6L254.4 218.2L253.1 218L253.3 218.7L252.5 219.6L250.5 220.3L251.8 222.2L249.6 224.9L248.9 227.2L247 227L246.5 227.5L246.4 229L248.7 230.3L248.6 230.8L246.7 231.6L245.8 233.1L244.8 232.8L243.3 234.3L243.6 235.2L245.5 235L245.6 237.3L246.8 236.8L247.4 237.3L248.3 239.3L247.8 240.8L248.2 241.6L250.1 242.3L250.9 240.4L252.2 241.5L246.4 245.2L244.5 244.1L243.8 244.4L244.2 245.6L243.3 248L238.8 250.7L238.4 251.9L239.2 254L238.9 255.1L239.6 256.5L240.3 255.6L241.4 256.8L239.3 265.4L240.3 266.1L240.4 267.7L239.3 267.8L237.6 269.8L235.4 269.7L234 270.6L233.6 272.4L233 271.2L232 270.8L231 272.9L234.3 275.5L233.4 277.6H232.3L232.7 279.9L233.6 280.3L233.7 281.2L232.5 282L231.3 281.8L230.5 283.7L229.4 283.5L228.1 284.5L227.9 285.4L226.4 286.2L225.7 286L225.1 286.8L224.1 285.9L223.6 286.2L224 287.7L222.8 289.4L225.2 291.1L225.3 294.1L219.4 294.2L217.8 297.8L210.5 296.1L209.5 295.3L207.1 295.9L207.2 297.2L206.3 297.6L206.1 298.7L204.5 298.8L203.3 297.3L201.9 296.9L201.5 294.6L202.4 293.5L203.1 294.3L205.1 294.1L206 292.3L206.3 289.6L204.8 286.5L203.3 286.8L202.4 284.3L201.4 283.4L201.6 282.5L198 281L197.2 277.8L195.3 275.8L191.4 274.2L188.4 273.8L185.7 272L187.3 271L187.4 267.8L188.2 266.7L187.6 265.4L186 264.2L183.2 262.9L180.7 262.6L177.4 263.1L177.1 264.6L175.1 263.9L174.6 260.5L176.1 259.8L177.1 254.4L176.5 244.7L175.5 242.2L173.6 240.2L172 235.4L171.1 235.3L170.1 232.5L167.8 230.8L166.4 227L166.7 224.9L165.1 218.2L165.6 217.4L165.4 213.9L163.8 206.3L159.4 199.6L155.8 196.4L153.9 195.5L155.8 193.3L156 192.1L153.9 190.8L152.3 192.1L152.7 191L151.9 189.8L151.7 187.7L148.3 187.8L149.4 186.1L150.1 186L148.8 185.1L147 186.6L147.4 184.2L146.7 183.6L146.6 181.4L144.3 180.5L140.8 177.8L139.9 175.5H138.1Z"
          fill="#FDA8C5"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('toscana')"
        />
        <path
          d="M250.9 1.2L252.4 2.4L251.4 3.1L250.9 5L248.3 5.3L247.1 6.4L247.8 9.7L249.2 11L248.1 12.7L250.1 13.1L251.4 15.1L252.6 14.2L254.1 14.6L255.5 17.4L254.5 19L254.4 21L257.6 21.6L258.8 25.3L263.2 27.8L261.1 28.6L259.6 30.2L258.8 30L259.1 31.2L258.7 31.6L257.6 31.7L257 30.9L254.4 31.7L253.3 31L250.4 33.3L250.3 31.3L248.9 30.4L248.2 30.7L244.8 28L245.1 30L243.8 32.3L243.9 33.6L241.8 37L241.3 36.3L240.3 36.4L239.3 37.4L237.9 37.1L233.6 39.2L233.5 40.6L236.2 41L236.7 42.2L234.7 44.6L234.5 47.8L233.8 47.2L231.7 48.4L234.2 50.5L234.7 51.7L234.1 53.4L234.8 54L236.7 53.6L237.1 55.3L237.7 54.9L238.8 55.4L238.1 57.1L240.2 59L239.7 60.4L238.7 60L237.2 63.5L233.5 64.8L231.6 64.6L230.9 65.3L230.3 64.6L227.9 65.4V67.2L228.7 68.5L227 69.3L227.6 69.9L227 70.6L228 72.4L227.2 74L223.5 73.7L223 71.3L221.3 70.8L219.4 71.1L217 73.1L213.8 72.9L214.1 75.4L213 75.5L212.4 76.8L212.7 77.7L210.5 76.5L210.4 75.8V77L208.3 76.8L207.5 81.1L205.4 83.6L205.9 85.7L204.5 85.6L204.6 88.7L202.4 91.6L201 91.4L199.3 89.8L197.9 90.6L197.5 89.6L195.9 91.9L195.5 91L194.2 92.5L192.9 91.7L193.5 90.7L191.7 89.8H189.8L191.7 86.3L191 85L192.1 84L189.8 82.5L186.3 81.8L186 82.6L184.9 81.7L181.4 82.4L181 84.3L179.3 84.4L177.4 85.6L176.2 85.5L175.8 84.7L176.4 83.5L174.4 82.7L173.9 78.9L174.7 77.1L173.6 75.4L173.7 73.6L172.2 73.3V72.4L172.7 70.8L173.7 70L173.4 68.3L176.3 64.7L177.1 60.8L176.2 59.4L178.2 55.8L177.8 53.9L177.1 53.5L177.9 52.4L177.4 50.6L175.1 49.5L177.4 47.3L179.1 47.2L180.4 45.8L179.7 44.6L179.9 42.7L179 41.5L176.7 40L173.4 39.7L172.4 37.3L173.3 36.5L174.1 32.1L172.1 30.3L170.1 30.6L169.4 27.4L170.7 25.7L170 24.2L171.9 22.7L170.8 20.5L172.1 19.8L173.4 16.2L174.4 17L176.8 16.8L176.5 17.6L181.8 15.1L183 15.8V16.7L185.8 17.8L186.2 18.5L184.7 20.8L185.9 21L187.3 20.3L188.5 21.6L189.5 21.2L191.7 22.5L193.2 21.7L197.8 22.2L198.6 19.7L200.6 18.7L200.1 16.6L201.3 14.3L201.2 12.7L202 11.6L203.1 11.8L204.1 11L204.2 9.3L205.3 9L206.1 9.5L211.1 7.6L211.8 8.1L212.7 7.7L214.8 9.4L216.4 8.7L218.1 6.3L220.7 8.2L224.4 6.2L226.4 7.5L228.5 7.6L229.3 8.8L230.2 9.1L231.8 7.7L234.2 7.6L237.7 4.9L239.1 4.8L240.3 3.8L242.2 4L243.1 3L244.7 3.2L245.7 1.9L246.6 2.2L249.6 1L250.9 1.2Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('trentino-alto-adige')"
        />
        <path
          d="M261.1 223.4L260.6 222.9L260.4 222.8L260.6 222.2L261.2 222.5L261.3 223L261.1 223.4ZM251.4 222.1L252 223.1H254.7L255 223.6L256.8 222.1L258.4 222L258 222.7L258.4 224L255.8 226.4L257 227.6L258.2 227L259.3 228.5L260.5 226.7L261.4 226.8L262.1 228H262.9L263.2 227.2L264 227.6L269.6 234L271.5 232.9L273.4 233.6L274.6 231.2L276.4 231.7L276.1 233.5L276.9 234.2L275.3 235.7V236.4L277.3 239L277.6 241.5L277.1 242.1L278.7 243.3L279.3 246.3L280.5 246.9L280.4 249.4L279 250.8L279.6 252.1L281.4 252.5L281.9 254L281.7 256.4L282.4 258.2L281.6 258.8L282.4 260.5L281.9 261.8L284.3 263.2L284.5 264L285.5 264.1L285.6 267.6L286.7 266.4V264.9L287.8 265.6L289 264.4L291.6 266.4L293.8 269.8L296.1 269.3L297.2 267.7L298.4 270.9L298.2 272.5L297.4 274.2L297.1 273.5L295.4 274.2L295.2 275.9L294.5 279.8L293.3 280.9L291.9 280.3V281L289.5 282.5L287.7 281.6L287.1 282.9H284.3L283.6 283.7L281.8 282.8L281.3 283.8L281.8 286L280 286.6L278.4 288L276.6 287.9L276.5 289.1L273.8 289.9L275 291.7L272.4 293.4H271.4L270.6 291.8L269.6 291.9L269.4 295.3L265.6 298.2L264.8 297.3V295.8L261.6 296.3L262.4 295.1L260.4 294.4V292.6L261 292.4L260.4 291.8L260.6 290.2L259.3 290.1L257.6 291.5L256.5 290.4L254.9 290.6L255.5 290.2L254.2 289.5L254.9 288.9L254 288.2L254.2 286.5L252.7 285.8L252.2 281.9L250.7 280.1L249.3 279.5L248.1 280.5L247.5 280.3L247.4 281L246.5 280.1L243.3 281.2L239.7 279L238.6 277.2L240.2 276.3L241.1 274.6L238.7 273L237.3 269.6L239 267.6L240.1 267.5L240 265.9L239 265.2L241.1 256.6L240 255.4L239.3 256.3L238.6 254.9L238.9 253.8L238.1 251.7L238.5 250.5L243 247.8L243.9 245.4L243.5 244.2L244.2 243.9L246.1 245L251.9 241.3L250.6 240.2L249.8 242.1L247.9 241.4L247.6 240.6L248.1 239.1L247.2 237.1L246.6 236.6L245.4 237.1L245.3 234.8L243.4 235L243.1 234.1L244.6 232.6L245.6 232.9L246.5 231.4L248.4 230.6L248.5 230.1L246.2 228.8L246.3 227.3L246.8 226.8L248.7 227L249.4 224.7L251.4 222.1Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('umbria')"
        />
        <path
          d="M43.6996 72.6001L44.1996 73.6001L47.4996 73.1001L48.2996 74.4001L49.4996 74.9001L50.0996 76.6001L51.4996 75.6001L53.6996 77.0001L54.6996 76.4001L56.4996 77.0001L57.0996 80.5001L56.4996 84.9001L57.9996 87.6001L59.3996 88.1001L59.6996 89.1001L58.1996 91.6001L59.7996 94.9001L58.7996 95.1001L58.1996 97.8001L57.2996 97.2001L54.9996 97.4001L50.6996 100.4L50.0996 99.9001L48.0996 100.2L46.3996 99.1001L45.1996 99.7001L45.0996 98.9001L43.2996 97.8001L41.4996 98.8001L39.8996 98.4001L38.7996 98.7001L37.9996 100.1L34.8996 102.6L34.0996 102L32.4996 102.8L30.0996 102.9L27.9996 105.5L25.2996 104.6L24.4996 105.2L24.1996 102.7L22.6996 105.8L20.2996 105.5L20.4996 104.1L18.0996 103.4L17.8996 99.0001L17.0996 98.1001L18.0996 94.8001L16.5996 93.9001L14.2996 94.1001L13.7996 92.8001L11.6996 92.0001L9.49961 89.5001L9.79961 88.5001L9.09961 85.9001L9.99961 82.3001L10.9996 82.0001L11.8996 82.6001L12.4996 81.6001L14.0996 82.1001L15.3996 81.7001L15.8996 80.8001L17.8996 80.1001L18.1996 78.3001L19.9996 76.8001L22.7996 81.0001L24.9996 79.6001L26.5996 80.9001L27.6996 79.1001L29.5996 79.0001L31.1996 76.9001L35.2996 78.5001L39.1996 76.1001V75.2001L40.3996 74.3001L42.2996 74.7001L42.5996 72.8001L43.6996 72.6001Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('valle-d-aosta')"
        />
        <path
          d="M266.4 138.1L265.2 138.8L266 137.9L265.2 137.6L266.6 137.4L266.4 138.1ZM264.9 136.3L265.9 137.1L263.8 137.6L264.3 136.1L264.9 136.3ZM264.6 27.8999L267.1 29.5999L271.9 29.0999L273.7 29.6999L274.5 30.6999L274.3 32.2999L275.1 33.7999L274.5 35.7999L275.3 36.7999L273.1 36.8999L270.1 38.7999L270 39.5999L271.1 40.2999L271.4 41.7999L269.8 41.0999L268.9 41.7999L267.3 41.0999L265.9 42.1999L265.5 41.7999L264.2 43.5999L264 45.0999L262.3 46.5999L262.6 47.7999L262.1 47.5999L262.3 48.0999L260.7 48.8999L260.4 50.6999L258.7 50.4999L257.8 51.1999V52.8999L256.2 54.5999L258.1 57.0999H259.9L260.1 58.4999L261.7 58.3999L262 60.2999L264.1 61.9999L263.7 65.0999L261.2 66.7999L259.7 69.2999L260.5 69.9999L261.1 72.2999V75.2999H262.3L263.2 76.5999H264.5L265.6 80.5999L266.8 81.6999L266.6 82.6999L268.3 83.5999L268.9 82.1999L270 82.7999L270.1 83.5999L271.1 84.0999V85.4999L274.5 82.3999L275.1 82.9999L276.8 81.1999L277.8 81.8999L277.4 82.7999L278 83.3999L278.5 82.4999L280.4 81.5999L281 81.6999L280.7 82.6999L281.8 83.6999L283.1 82.8999L283.5 83.8999L284.9 83.4999L284.5 82.2999L285 82.0999L285.5 83.4999V83.7999L285.8 84.0999L285.7 84.7999L286.4 85.0999L285.4 85.6999L287.2 87.3999L286.8 87.5999L287.4 88.6999L287.1 89.6999L287.9 89.0999L288.4 91.3999L289.1 91.5999L288.8 92.2999L289.7 92.9999L289.6 94.1999L290.5 94.0999L290.4 94.5999L291.3 95.0999L290.8 95.7999L286.5 96.0999L286.6 95.3999L285.8 95.0999L285.4 96.2999L282.8 96.5999L282 97.6999L276.5 101.1L262.6 107.6L261.3 109.3L259.8 108.6L258.1 110.9L256.8 113.4L256.7 114.3L257.4 114.6L256.5 114.9L255 120.3L256.2 120.7L255.3 121.6L255.8 123.8L256.9 125.1L256.6 129.7L257.9 130.8L259.3 133.5L258.9 133.2L258.2 134L259 134.5L259.8 133.9L259.6 134.9L260 135L260.5 134.7L260.1 133.2H260.5L264.3 137.9L263.7 141.8L262.8 142.7V145.2L261.4 144.7L261.7 142.2L260.8 141.8L260 142.1L259.3 143.6L260.1 144.6L259.8 146.4L260.5 147L261.1 146.6L261.2 147.2L260 147.1L259.9 148.4L257.8 146.7L257.3 144.8L255.6 144.4L255 143.6L254.7 141.1L255.3 140L254.6 139.1H253.7L252.4 140.2L250.5 140.1L249.8 139.2L248.5 140L246.5 137.3L240.6 136.4L238.7 137.1L233.2 137L230.6 138.2L230 140.1L227.2 140.9L225.4 142.6L224.3 142.7L223.7 142.5L223.3 141.1L221.5 139.9L216.5 140.2L216.4 138.9L216.2 138L209.2 134.3V132.2L208 132.9L205.3 131.9L205.8 130.5L205.4 129.6L206.5 128.7L203.9 127.7L203.1 129.2L201.9 128.6L201.7 129.7L200.7 129.5L198.7 127.8L199.5 126.2L198.7 125.7L197.3 126L197.6 124.5L196.9 123.4L194.4 122.3L194.5 121.2L192.9 120.8L192.8 120.2L190.5 119.7L189.5 117.6L187.8 115.9L185.7 117.7L185.3 116.8L184 116.5L184.6 114.8L183.7 113.5L184.8 112.7L184 112L184.8 109.8L182.6 108.8L182 109.5L181.3 109.3L181.7 107.6L180.7 97.2999L190.4 82.8999L192.7 84.3999L191.6 85.3999L192.3 86.6999L190.4 90.1999H192.3L194.1 91.0999L193.5 92.0999L194.8 92.8999L196.1 91.3999L196.5 92.2999L198.1 89.9999L198.5 90.9999L199.9 90.1999L201.6 91.7999L203 91.9999L205.2 89.0999L205.1 85.9999L206.5 86.0999L206 83.9999L208.1 81.4999L208.9 77.1999L211 77.3999V76.1999L211.1 76.8999L213.3 78.0999L213 77.1999L213.6 75.8999L214.7 75.7999L214.4 73.2999L217.6 73.4999L220 71.4999L221.9 71.1999L223.6 71.6999L224.1 74.1999L227.8 74.4999L228.6 72.8999L227.6 71.0999L228.2 70.3999L227.6 69.7999L229.4 69.2999L228.6 67.9999V66.1999L231 65.3999L231.6 66.0999L232.2 65.3999L234.2 65.5999L237.9 64.2999L239.4 60.7999L240.4 61.1999L240.9 59.7999L238.8 57.8999L239.5 56.1999L238.4 55.6999L237.8 56.0999L237.4 54.3999L235.5 54.7999L234.8 54.1999L235.4 52.4999L234.9 51.2999L232.3 49.1999L234.4 47.8999L235.1 48.4999L235.3 45.2999L237.3 42.8999L236.8 41.6999L234.1 41.2999L234.2 39.8999L238.5 37.7999L239.9 38.0999L240.9 37.0999L241.9 36.9999L242.4 37.6999L244.6 34.2999L244.5 32.9999L245.8 30.5999L245.5 28.5999L248.9 31.2999L249.6 30.9999L251 31.8999L251.1 33.8999L254 31.5999L255.1 32.2999L257.7 31.4999L258.4 32.2999L259.5 32.1999L259.9 31.7999L259.6 30.5999L260.4 30.7999L261.9 29.1999L264.1 28.3999L264.6 27.8999Z"
          fill="#FCA7C4"
          stroke="white"
          stroke-width="0.5"
          class="region"
          @click="selectRegion()"
          @mouseover="testFunction('veneto')"
        />
        <path
          d="M99.7996 311.2C97.5996 312.7 94.4996 312.7 92.2996 310.9C91.0996 310 89.3996 310.2 88.4996 311.4C87.0996 313.2 84.3996 313.6 82.5996 312.1L80.7996 310.7C79.2996 309.6 77.1996 309.8 76.0996 311.3C74.5996 313.2 71.8996 313.5 69.9996 312.1L67.4996 310.1C65.5996 308.6 62.6996 308.9 61.1996 310.9C60.1996 312.2 58.3996 312.4 57.0996 311.4"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M180.8 319.8C178.6 321.3 175.5 321.3 173.3 319.5C172.1 318.6 170.4 318.8 169.5 320C168.1 321.8 165.4 322.2 163.6 320.7L161.8 319.3C160.3 318.2 158.2 318.4 157.1 319.9C155.6 321.8 152.9 322.1 151 320.7L148.5 318.7C146.6 317.2 143.7 317.5 142.2 319.5C141.2 320.8 139.4 321 138.1 320"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M141.3 292.3C139.1 293.8 136 293.8 133.8 292C132.6 291.1 130.9 291.3 130 292.5C128.6 294.3 125.9 294.7 124.1 293.2L122.3 291.8C120.8 290.7 118.7 290.9 117.6 292.4C116.1 294.3 113.4 294.6 111.5 293.2L109 291.2C107.1 289.7 104.2 290 102.7 292C101.7 293.3 99.8996 293.5 98.5996 292.5"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M149.399 236.4C146.499 238.3 142.599 238.3 139.799 236.1C138.299 234.9 136.099 235.2 134.899 236.7C133.099 239.1 129.599 239.5 127.299 237.6L124.999 235.8C123.099 234.3 120.399 234.7 118.899 236.6C116.999 239 113.499 239.5 111.099 237.6L107.799 235.1C105.299 233.1 101.699 233.6 99.6994 236.1C98.3994 237.7 96.0994 238 94.3994 236.8"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M116.899 263C113.999 264.9 110.099 264.9 107.299 262.7C105.799 261.5 103.599 261.8 102.399 263.3C100.599 265.7 97.0994 266.1 94.7994 264.2L92.4994 262.4C90.5994 260.9 87.8994 261.3 86.3994 263.2C84.4994 265.6 80.9994 266.1 78.5994 264.2L75.2994 261.7C72.7994 259.7 69.1994 260.2 67.1994 262.7C65.8994 264.3 63.5994 264.6 61.8994 263.4"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M363.399 184.8C361.199 186.3 358.099 186.3 355.899 184.5C354.699 183.6 352.999 183.8 352.099 185C350.699 186.8 347.999 187.2 346.199 185.7L344.399 184.3C342.899 183.2 340.799 183.4 339.699 184.9C338.199 186.8 335.499 187.1 333.599 185.7L331.099 183.7C329.199 182.2 326.299 182.5 324.799 184.5C323.799 185.8 321.999 186 320.699 185"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M371.5 128.9C368.6 130.8 364.7 130.8 361.9 128.6C360.4 127.4 358.2 127.7 357 129.2C355.2 131.6 351.7 132 349.4 130.1L347.1 128.3C345.2 126.8 342.5 127.2 341 129.1C339.1 131.5 335.6 132 333.2 130.1L329.9 127.6C327.4 125.6 323.8 126.1 321.8 128.6C320.5 130.2 318.2 130.5 316.5 129.3"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M339 155.6C336.1 157.5 332.2 157.5 329.4 155.3C327.9 154.1 325.7 154.4 324.5 155.9C322.7 158.3 319.2 158.7 316.9 156.8L314.6 155C312.7 153.5 310 153.9 308.5 155.8C306.6 158.2 303.1 158.7 300.7 156.8L297.4 154.3C294.9 152.3 291.3 152.8 289.3 155.3C288 156.9 285.7 157.2 284 156"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M293.3 489.1C294.6 490 296.3 489.9 297.5 489C298.2 488.5 299.1 488.6 299.7 489.3C300.5 490.3 302 490.5 303.1 489.7L304.1 488.9C304.9 488.3 306.1 488.4 306.8 489.2C307.6 490.3 309.2 490.5 310.2 489.6L311.6 488.5C312.7 487.6 314.3 487.8 315.2 488.9C315.8 489.6 316.8 489.7 317.5 489.2"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M288.699 457.5C290.299 458.6 292.499 458.6 294.199 457.3C295.099 456.6 296.299 456.8 296.999 457.6C297.999 458.9 299.999 459.2 301.299 458.1L302.599 457.1C303.699 456.3 305.199 456.5 305.999 457.5C307.099 458.9 309.099 459.1 310.399 458L312.199 456.6C313.599 455.5 315.699 455.7 316.799 457.2C317.499 458.1 318.899 458.3 319.799 457.6"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M307.1 472.6C308.7 473.7 310.9 473.7 312.6 472.4C313.5 471.7 314.7 471.9 315.4 472.7C316.4 474 318.4 474.3 319.7 473.2L321 472.2C322.1 471.4 323.6 471.6 324.4 472.6C325.5 474 327.5 474.2 328.8 473.1L330.6 471.7C332 470.6 334.1 470.8 335.2 472.3C335.9 473.2 337.3 473.4 338.2 472.7"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M504 306.6C501.8 308.1 498.7 308.1 496.5 306.3C495.3 305.4 493.6 305.6 492.7 306.8C491.3 308.6 488.6 309 486.8 307.5L485 306.1C483.5 305 481.4 305.2 480.3 306.7C478.8 308.6 476.1 308.9 474.2 307.5L471.7 305.5C469.8 304 466.9 304.3 465.4 306.3C464.4 307.6 462.6 307.8 461.3 306.8"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M472.199 277.5C469.299 279.4 465.399 279.4 462.599 277.2C461.099 276 458.899 276.3 457.699 277.8C455.899 280.2 452.399 280.6 450.099 278.7L447.799 276.9C445.899 275.4 443.199 275.8 441.699 277.7C439.799 280.1 436.299 280.6 433.899 278.7L430.599 276.2C428.099 274.2 424.499 274.7 422.499 277.2C421.199 278.8 418.899 279.1 417.199 277.9"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M542.6 349.7C539.7 351.6 535.8 351.6 533 349.4C531.5 348.2 529.3 348.5 528.1 350C526.3 352.4 522.8 352.8 520.5 350.9L518.2 349.1C516.3 347.6 513.6 348 512.1 349.9C510.2 352.3 506.7 352.8 504.3 350.9L501 348.3C498.5 346.3 494.9 346.8 492.9 349.3C491.6 350.9 489.3 351.2 487.6 350"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M154.599 584.8C152.399 586.3 149.299 586.3 147.099 584.5C145.899 583.6 144.199 583.8 143.299 585C141.899 586.8 139.199 587.2 137.399 585.7L135.599 584.3C134.099 583.2 131.999 583.4 130.899 584.9C129.399 586.8 126.699 587.1 124.799 585.7L122.299 583.7C120.399 582.2 117.499 582.5 115.999 584.5C114.999 585.8 113.199 586 111.899 585"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M196.099 565.9C193.899 567.4 190.799 567.4 188.599 565.6C187.399 564.7 185.699 564.9 184.799 566.1C183.399 567.9 180.699 568.3 178.899 566.8L177.099 565.4C175.599 564.3 173.499 564.5 172.399 566C170.899 567.9 168.199 568.2 166.299 566.8L163.799 564.8C161.899 563.3 158.999 563.6 157.499 565.6C156.499 566.9 154.699 567.1 153.399 566.1"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M171.699 536.6C168.799 538.5 164.899 538.5 162.099 536.3C160.599 535.1 158.399 535.4 157.199 536.9C155.399 539.3 151.899 539.7 149.599 537.8L147.299 536C145.399 534.5 142.699 534.9 141.199 536.8C139.299 539.2 135.799 539.7 133.399 537.8L130.099 535.3C127.599 533.3 123.999 533.8 121.999 536.3C120.699 537.9 118.399 538.2 116.699 537"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M114.3 69.2C112.1 66.6 109.9 64.1 107.5 61.7C106.5 60.7 105.2 59.6 103.9 60.1C103.3 60.3 102.9 60.8 102.5 61.3C101 63.1 99.5 64.9 98 66.7C96.6 65 95.1 63.4 93.4 61.9C93.1 61.6 92.7 61.3 92.2 61.3C91.7 61.4 91.4 61.8 91.2 62.1C89.4 64.8 87.6 67.6 86 70.5C84.6 72.9 83.3 75.5 83.7 78.3L79 88.3L121.9 86.2L114.3 69.2Z"
          fill="#F97AAB"
          class="pointer-events-none"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M175.6 157.5C175.6 150.6 181.2 145.1 188 145.1C190.6 145.1 193.1 145.9 195.1 147.3C196.4 143.1 200.3 140.1 204.9 140.1C205.4 140.1 205.8 140.2 206.3 140.2C207.5 134.8 212.3 130.8 218.1 130.8C223.8 130.8 228.5 134.8 229.8 140.1C229.9 140.1 230 140.1 230.2 140.1C238.5 140.1 245.1 146.8 245.1 155"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M175.6 157.5C175.6 150.6 181.2 145.1 188 145.1C190.6 145.1 193.1 145.9 195.1 147.3C196.4 143.1 200.3 140.1 204.9 140.1C205.4 140.1 205.8 140.2 206.3 140.2C207.5 134.8 212.3 130.8 218.1 130.8C223.8 130.8 228.5 134.8 229.8 140.1C229.9 140.1 230 140.1 230.2 140.1C238.5 140.1 245.1 146.8 245.1 155"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M103.8 405.4C103.8 401.6 106.9 398.5 110.7 398.5C114.5 398.5 117.6 401.6 117.6 405.4"
          fill="#00F1C2"
        />
        <path
          d="M103.8 405.4C103.8 401.6 106.9 398.5 110.7 398.5C114.5 398.5 117.6 401.6 117.6 405.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M113.899 406C113.899 403.8 115.699 402 117.899 402C120.099 402 121.899 403.8 121.899 406"
          fill="#00F1C2"
        />
        <path
          d="M113.899 406C113.899 403.8 115.699 402 117.899 402C120.099 402 121.899 403.8 121.899 406"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M118.7 394.1C118.7 391.9 120.5 390.1 122.7 390.1C124.9 390.1 126.7 391.9 126.7 394.1"
          fill="#00F1C2"
        />
        <path
          d="M118.7 394.1C118.7 391.9 120.5 390.1 122.7 390.1C124.9 390.1 126.7 391.9 126.7 394.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M95.5996 474.1C95.5996 471.9 97.3996 470.1 99.5996 470.1C101.8 470.1 103.6 471.9 103.6 474.1"
          fill="#00F1C2"
        />
        <path
          d="M95.5996 474.1C95.5996 471.9 97.3996 470.1 99.5996 470.1C101.8 470.1 103.6 471.9 103.6 474.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M80.2998 399C80.2998 397.5 81.4998 396.3 82.9998 396.3C84.4998 396.3 85.6998 397.5 85.6998 399"
          fill="#00F1C2"
        />
        <path
          d="M80.2998 399C80.2998 397.5 81.4998 396.3 82.9998 396.3C84.4998 396.3 85.6998 397.5 85.6998 399"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M116.2 424.9C116.2 422.7 118 420.9 120.2 420.9C122.4 420.9 124.2 422.7 124.2 424.9"
          fill="#00F1C2"
        />
        <path
          d="M116.2 424.9C116.2 422.7 118 420.9 120.2 420.9C122.4 420.9 124.2 422.7 124.2 424.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M198.2 254.8C198.8 253.7 199.3 252.6 199.9 251.4C202 247.3 204.1 243.2 207.3 239.8C208.4 238.6 209.8 237.5 211.4 237.5C213.4 237.5 214.9 239.3 215.9 241C217.2 243.2 218.1 245.6 218.7 248"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M198.2 254.8C198.8 253.7 199.3 252.6 199.9 251.4C202 247.3 204.1 243.2 207.3 239.8C208.4 238.6 209.8 237.5 211.4 237.5C213.4 237.5 214.9 239.3 215.9 241C217.2 243.2 218.1 245.6 218.7 248"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M215 256.3C215 255.1 215.8 254 216.5 253C218.7 250.2 220.8 247.3 223 244.5C223.3 244.1 223.6 243.8 224 243.5C225.1 242.8 226.5 243.6 227.5 244.5C228.9 245.8 230 247.3 230.7 249"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M215 256.3C215 255.1 215.8 254 216.5 253C218.7 250.2 220.8 247.3 223 244.5C223.3 244.1 223.6 243.8 224 243.5C225.1 242.8 226.5 243.6 227.5 244.5C228.9 245.8 230 247.3 230.7 249"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M214.7 236.3C214.7 230.6 218.1 225.6 221.4 220.9C222.1 219.8 223.1 218.7 224.4 218.6C226.1 218.5 227.3 220.4 227.9 222C229.7 226.4 231.2 230.9 232.3 235.5"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M214.7 236.3C214.7 230.6 218.1 225.6 221.4 220.9C222.1 219.8 223.1 218.7 224.4 218.6C226.1 218.5 227.3 220.4 227.9 222C229.7 226.4 231.2 230.9 232.3 235.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M232.5 247.6C233.3 243.2 235.1 239.1 237.7 235.4C238.4 234.4 239.2 233.4 239.9 232.5C240.6 231.6 241.6 230.6 242.7 230.8C243.5 231 244 231.7 244.5 232.3C246.6 235.4 248.3 238.7 249.6 242.1"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M232.5 247.6C233.3 243.2 235.1 239.1 237.7 235.4C238.4 234.4 239.2 233.4 239.9 232.5C240.6 231.6 241.6 230.6 242.7 230.8C243.5 231 244 231.7 244.5 232.3C246.6 235.4 248.3 238.7 249.6 242.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M229.899 269C229.999 267.3 230.899 265.8 231.699 264.4C233.499 261.5 235.499 258.8 237.599 256.2C239.199 254.2 241.299 252.1 243.799 252.4C246.499 252.7 247.999 255.5 249.099 257.9C250.699 261.4 252.299 264.9 253.899 268.3"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M229.899 269C229.999 267.3 230.899 265.8 231.699 264.4C233.499 261.5 235.499 258.8 237.599 256.2C239.199 254.2 241.299 252.1 243.799 252.4C246.499 252.7 247.999 255.5 249.099 257.9C250.699 261.4 252.299 264.9 253.899 268.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M249.3 255.4C249.6 253.2 250.8 251.3 252 249.4C253 247.9 254.3 246.1 256.1 246.2C257.8 246.3 259 247.9 259.8 249.4C260.9 251.3 262 253.2 263.1 255"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M249.3 255.4C249.6 253.2 250.8 251.3 252 249.4C253 247.9 254.3 246.1 256.1 246.2C257.8 246.3 259 247.9 259.8 249.4C260.9 251.3 262 253.2 263.1 255"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M260.399 268.7C260.499 264.1 262.099 259.5 264.999 255.8C265.899 254.6 267.299 253.4 268.799 253.8C269.899 254.1 270.599 255.2 271.099 256.2C272.899 259.4 274.399 262.8 275.599 266.3"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M260.399 268.7C260.499 264.1 262.099 259.5 264.999 255.8C265.899 254.6 267.299 253.4 268.799 253.8C269.899 254.1 270.599 255.2 271.099 256.2C272.899 259.4 274.399 262.8 275.599 266.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M259.2 284.9C260.2 280.6 262.6 276.7 265.9 273.8C266.7 273.1 267.6 272.4 268.7 272.7C269.5 272.9 270.1 273.6 270.5 274.2C272.8 277.3 274.5 280.8 275.6 284.5"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M259.2 284.9C260.2 280.6 262.6 276.7 265.9 273.8C266.7 273.1 267.6 272.4 268.7 272.7C269.5 272.9 270.1 273.6 270.5 274.2C272.8 277.3 274.5 280.8 275.6 284.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M276.8 291.4C277.4 287.4 280 284 282.5 280.9C283.5 279.7 284.5 278.5 285.4 277.3C285.7 276.9 286 276.6 286.5 276.4C287.1 276.3 287.6 276.6 288.1 276.9C290.8 278.9 292 282.3 293.2 285.4"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M276.8 291.4C277.4 287.4 280 284 282.5 280.9C283.5 279.7 284.5 278.5 285.4 277.3C285.7 276.9 286 276.6 286.5 276.4C287.1 276.3 287.6 276.6 288.1 276.9C290.8 278.9 292 282.3 293.2 285.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M276.7 298.9C278.3 295.9 280.4 293.1 282.9 290.7C283.5 290.1 284.1 289.5 285 289.3C286.2 289 287.6 289.6 288.4 290.5C289.3 291.4 289.8 292.6 290.2 293.8"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M276.7 298.9C278.3 295.9 280.4 293.1 282.9 290.7C283.5 290.1 284.1 289.5 285 289.3C286.2 289 287.6 289.6 288.4 290.5C289.3 291.4 289.8 292.6 290.2 293.8"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M285.8 304.1C285.9 302.2 286.7 300.5 287.5 298.8C289.9 294.1 292.9 289.6 296.5 285.7C299.3 289.4 301.2 293.8 301.8 298.4"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M285.8 304.1C285.9 302.2 286.7 300.5 287.5 298.8C289.9 294.1 292.9 289.6 296.5 285.7C299.3 289.4 301.2 293.8 301.8 298.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M299.5 307.3C300.1 303.5 302.3 300.2 304.4 297C304.9 296.2 305.5 295.4 306.2 294.9C306.9 294.3 308 294 308.8 294.3C309.7 294.6 310.3 295.4 310.8 296.2C311.9 297.9 313 299.6 314.1 301.3"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M299.5 307.3C300.1 303.5 302.3 300.2 304.4 297C304.9 296.2 305.5 295.4 306.2 294.9C306.9 294.3 308 294 308.8 294.3C309.7 294.6 310.3 295.4 310.8 296.2C311.9 297.9 313 299.6 314.1 301.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M310.399 311.1C311.099 308.9 312.199 306.8 313.599 305C313.899 304.6 314.199 304.2 314.699 304.1C315.599 303.8 316.399 304.7 316.899 305.4C317.599 306.4 318.199 307.5 318.799 308.7"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M310.399 311.1C311.099 308.9 312.199 306.8 313.599 305C313.899 304.6 314.199 304.2 314.699 304.1C315.599 303.8 316.399 304.7 316.899 305.4C317.599 306.4 318.199 307.5 318.799 308.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M309.7 329.5C310.8 324.3 313.3 319.3 317 315.5C317.3 315.2 317.6 314.9 318.1 314.9C318.5 314.9 318.7 315.2 318.9 315.5C321.4 318.8 323.3 322.6 324.5 326.6"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M309.7 329.5C310.8 324.3 313.3 319.3 317 315.5C317.3 315.2 317.6 314.9 318.1 314.9C318.5 314.9 318.7 315.2 318.9 315.5C321.4 318.8 323.3 322.6 324.5 326.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M327.8 323.3C327.6 320.7 328.7 318.1 330.6 316.3C330.7 316.2 330.9 316.1 331.1 316C331.4 316 331.6 316.2 331.8 316.3C333.7 318.1 334.7 320.8 335.6 323.3"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M327.8 323.3C327.6 320.7 328.7 318.1 330.6 316.3C330.7 316.2 330.9 316.1 331.1 316C331.4 316 331.6 316.2 331.8 316.3C333.7 318.1 334.7 320.8 335.6 323.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M331.1 334C331.7 332.3 332.8 330.8 334.2 329.7C334.5 329.5 334.8 329.2 335.2 329.2C335.7 329.2 336.1 329.5 336.4 329.8C337.5 330.9 338.3 332.4 338.7 334"
          fill="#FDA8C5"
        />
        <path
          d="M331.1 334C331.7 332.3 332.8 330.8 334.2 329.7C334.5 329.5 334.8 329.2 335.2 329.2C335.7 329.2 336.1 329.5 336.4 329.8C337.5 330.9 338.3 332.4 338.7 334"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M193.2 220.6C192.8 219.7 193.4 218.6 194 217.8C196.8 213.7 199.9 209.7 203.1 205.9C203.8 205 204.8 204.1 205.9 204.2C206.8 204.3 207.5 205.2 208 206C209.8 208.9 211.4 211.8 212.9 214.9"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M193.2 220.6C192.8 219.7 193.4 218.6 194 217.8C196.8 213.7 199.9 209.7 203.1 205.9C203.8 205 204.8 204.1 205.9 204.2C206.8 204.3 207.5 205.2 208 206C209.8 208.9 211.4 211.8 212.9 214.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M210 207.5C211.2 204.6 212.8 201.9 214.9 199.6C215.2 199.3 215.5 199 215.9 198.9C216.2 198.9 216.5 199 216.7 199.2C219.6 201 220.2 205 222.7 207.2"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M210 207.5C211.2 204.6 212.8 201.9 214.9 199.6C215.2 199.3 215.5 199 215.9 198.9C216.2 198.9 216.5 199 216.7 199.2C219.6 201 220.2 205 222.7 207.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M179.1 201.1C178.9 197.6 180.7 194.4 182.5 191.4C183.8 189.2 185.1 187.1 186.3 184.9C187.5 182.9 189.1 180.7 191.3 180.8C193.3 180.8 194.7 182.6 195.8 184.3C198.9 189 201.3 194.1 203.7 199.1"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M179.1 201.1C178.9 197.6 180.7 194.4 182.5 191.4C183.8 189.2 185.1 187.1 186.3 184.9C187.5 182.9 189.1 180.7 191.3 180.8C193.3 180.8 194.7 182.6 195.8 184.3C198.9 189 201.3 194.1 203.7 199.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M147.6 185.8C150 179.7 153.6 174 158.2 169.3C158.5 169 158.8 168.6 159.3 168.5C159.7 168.4 160.2 168.5 160.7 168.6C162.8 169.3 164.3 171.1 165.6 172.8C169.1 177.4 172 182.3 174.3 187.6"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M147.6 185.8C150 179.7 153.6 174 158.2 169.3C158.5 169 158.8 168.6 159.3 168.5C159.7 168.4 160.2 168.5 160.7 168.6C162.8 169.3 164.3 171.1 165.6 172.8C169.1 177.4 172 182.3 174.3 187.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M121.899 173.2C122.699 171.4 123.799 169.9 124.999 168.3C125.999 167 127.099 165.5 128.799 165.1C131.099 164.5 133.399 166.1 135.299 167.6C136.999 169 138.799 170.4 140.499 171.8"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M121.899 173.2C122.699 171.4 123.799 169.9 124.999 168.3C125.999 167 127.099 165.5 128.799 165.1C131.099 164.5 133.399 166.1 135.299 167.6C136.999 169 138.799 170.4 140.499 171.8"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M98.2998 167.9C99.3998 165.9 101 163.6 103.3 163.5C104.5 163.4 105.7 164 106.8 164.6C108.8 165.7 110.7 166.9 112.5 168.2"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M98.2998 167.9C99.3998 165.9 101 163.6 103.3 163.5C104.5 163.4 105.7 164 106.8 164.6C108.8 165.7 110.7 166.9 112.5 168.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M46.2998 184.8C47.4998 180.8 48.6998 176.7 51.0998 173.3C53.4998 169.9 57.4998 167.3 61.6998 167.6C64.0998 167.8 66.2998 168.9 68.2998 170.1C70.4998 171.5 72.5998 173.1 74.4998 175"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M46.2998 184.8C47.4998 180.8 48.6998 176.7 51.0998 173.3C53.4998 169.9 57.4998 167.3 61.6998 167.6C64.0998 167.8 66.2998 168.9 68.2998 170.1C70.4998 171.5 72.5998 173.1 74.4998 175"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M25.9 178.4C25.4 175.7 27 173.1 28.5 170.8C30.1 168.4 31.6 166 33.2 163.6C33.9 162.4 34.8 161.2 36.1 160.9C37.7 160.5 39.2 161.4 40.5 162.4C44.4 165.3 48 168.8 50.9 172.7"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M25.9 178.4C25.4 175.7 27 173.1 28.5 170.8C30.1 168.4 31.6 166 33.2 163.6C33.9 162.4 34.8 161.2 36.1 160.9C37.7 160.5 39.2 161.4 40.5 162.4C44.4 165.3 48 168.8 50.9 172.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.7998 157.9C22.5998 153.5 24.9998 149.4 27.3998 145.6C28.8998 143.2 30.4998 140.7 31.9998 138.3C32.9998 136.7 34.3998 134.9 36.2998 135C37.8998 135.1 38.9998 136.4 39.9998 137.6C44.6998 143.6 49.2998 149.7 53.6998 155.9"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M22.7998 157.9C22.5998 153.5 24.9998 149.4 27.3998 145.6C28.8998 143.2 30.4998 140.7 31.9998 138.3C32.9998 136.7 34.3998 134.9 36.2998 135C37.8998 135.1 38.9998 136.4 39.9998 137.6C44.6998 143.6 49.2998 149.7 53.6998 155.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M39.7998 137.8C43.3998 130.3 47.8998 123.1 52.9998 116.5C53.7998 115.4 54.6998 114.3 55.9998 113.8C57.4998 113.2 59.2998 113.7 60.5998 114.6C61.8998 115.5 62.8998 116.8 63.8998 118.1C68.5998 124.5 72.8998 131.3 76.6998 138.4"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M39.7998 137.8C43.3998 130.3 47.8998 123.1 52.9998 116.5C53.7998 115.4 54.6998 114.3 55.9998 113.8C57.4998 113.2 59.2998 113.7 60.5998 114.6C61.8998 115.5 62.8998 116.8 63.8998 118.1C68.5998 124.5 72.8998 131.3 76.6998 138.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M67.5996 122.7C71.9996 116 76.9996 109.6 82.4996 103.6C83.5996 102.4 84.7996 101.2 86.4996 101C88.8996 100.7 90.7996 102.9 92.0996 104.9C96.7996 111.7 100.6 119.1 103.5 126.9"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M67.5996 122.7C71.9996 116 76.9996 109.6 82.4996 103.6C83.5996 102.4 84.7996 101.2 86.4996 101C88.8996 100.7 90.7996 102.9 92.0996 104.9C96.7996 111.7 100.6 119.1 103.5 126.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M28 115C31.2 106.3 36 98.2 42.1 91.3C42.7 90.6 43.3 89.9 44.1 89.5C45.3 88.9 46.6 89 47.9 89.4C50.9 90.4 53.1 93 55.2 95.4C59.8 101 64.4 106.6 69.1 112.2"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M28 115C31.2 106.3 36 98.2 42.1 91.3C42.7 90.6 43.3 89.9 44.1 89.5C45.3 88.9 46.6 89 47.9 89.4C50.9 90.4 53.1 93 55.2 95.4C59.8 101 64.4 106.6 69.1 112.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M60.2998 100.4C63.3998 94.7999 66.9998 89.4999 70.8998 84.3999C72.9998 81.6999 75.3998 78.9999 78.6998 78.1999C83.5998 76.9999 88.2998 80.4999 92.0998 83.8999C97.4998 88.8999 102.7 94.0999 107.5 99.6999"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M60.2998 100.4C63.3998 94.7999 66.9998 89.4999 70.8998 84.3999C72.9998 81.6999 75.3998 78.9999 78.6998 78.1999C83.5998 76.9999 88.2998 80.4999 92.0998 83.8999C97.4998 88.8999 102.7 94.0999 107.5 99.6999"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M101.6 113.3C101.8 109.4 103.9 105.9 106 102.6C108.1 99.3 110.3 96 112.4 92.6C113 91.6 113.7 90.5999 114.7 89.9999C115.7 89.3999 117.1 89.4 117.9 90.3C118.7 91.2 118.7 92.9999 119.9 92.9999C121.1 93.0999 121.3 91.2999 122.2 90.4999C122.9 89.7999 124.2 89.9 125 90.4C125.9 90.9 126.5 91.7 127.1 92.6C130.8 97.5 134.4 102.5 138.1 107.4"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M101.6 113.3C101.8 109.4 103.9 105.9 106 102.6C108.1 99.3 110.3 96 112.4 92.6C113 91.6 113.7 90.5999 114.7 89.9999C115.7 89.3999 117.1 89.4 117.9 90.3C118.7 91.2 118.7 92.9999 119.9 92.9999C121.1 93.0999 121.3 91.2999 122.2 90.4999C122.9 89.7999 124.2 89.9 125 90.4C125.9 90.9 126.5 91.7 127.1 92.6C130.8 97.5 134.4 102.5 138.1 107.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M98.5 90.1999C103.8 82.1999 109.7 74.6999 116.3 67.7999C117.4 66.6999 118.5 65.4998 120 64.8998C122.9 63.7998 126.6 65.8998 127.2 68.8998C128.5 67.4998 129.8 65.9999 131.1 64.5999C134.1 65.5999 136.2 68.2999 138 70.7999C142.2 76.4999 146.5 82.0999 150.7 87.7999"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M98.5 90.1999C103.8 82.1999 109.7 74.6999 116.3 67.7999C117.4 66.6999 118.5 65.4998 120 64.8998C122.9 63.7998 126.6 65.8998 127.2 68.8998C128.5 67.4998 129.8 65.9999 131.1 64.5999C134.1 65.5999 136.2 68.2999 138 70.7999C142.2 76.4999 146.5 82.0999 150.7 87.7999"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M47.7002 83.9C51.0002 76.9 55.1002 70.3 60.0002 64.4C60.3002 64.1 60.6002 63.7 61.0002 63.6C61.4002 63.5 61.8002 63.8 62.1002 64C63.6002 65 64.9002 66.3 65.9002 67.7C66.8002 65.7 68.1002 63.9 69.6002 62.3C70.0002 61.9 70.4002 61.5 70.9002 61.5C71.4002 61.5 71.9002 61.8 72.2002 62.2C76.4002 65.9 80.2002 70.1 83.5002 74.6"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M47.7002 83.9C51.0002 76.9 55.1002 70.3 60.0002 64.4C60.3002 64.1 60.6002 63.7 61.0002 63.6C61.4002 63.5 61.8002 63.8 62.1002 64C63.6002 65 64.9002 66.3 65.9002 67.7C66.8002 65.7 68.1002 63.9 69.6002 62.3C70.0002 61.9 70.4002 61.5 70.9002 61.5C71.4002 61.5 71.9002 61.8 72.2002 62.2C76.4002 65.9 80.2002 70.1 83.5002 74.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M150.6 93.4C153.2 89 156.2 84.9 159.7 81.3C161.2 79.7 163.2 78.1 165.4 78.6C166.5 78.9 167.3 79.6 168.1 80.3C172 83.9 175.6 87.9 178.8 92.2"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M150.6 93.4C153.2 89 156.2 84.9 159.7 81.3C161.2 79.7 163.2 78.1 165.4 78.6C166.5 78.9 167.3 79.6 168.1 80.3C172 83.9 175.6 87.9 178.8 92.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M140.3 72.4999C142.4 68.4999 145.3 64.8999 148.7 62.0999C149.2 61.6999 149.8 61.2999 150.4 61.0999C151.8 60.7999 153.2 61.8999 154.2 62.9999C155.5 64.2999 156.8 65.5999 158.1 66.8999"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M140.3 72.4999C142.4 68.4999 145.3 64.8999 148.7 62.0999C149.2 61.6999 149.8 61.2999 150.4 61.0999C151.8 60.7999 153.2 61.8999 154.2 62.9999C155.5 64.2999 156.8 65.5999 158.1 66.8999"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M154 62.7C153.5 59.6 155.7 56.7 157.8 54.3C158.9 53 160 51.8 161.1 50.5C161.4 50.2 161.7 49.8 162.1 49.6C163.4 48.9 164.9 50 165.9 51C171 55.9 175.4 61.5 179.1 67.6"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M154 62.7C153.5 59.6 155.7 56.7 157.8 54.3C158.9 53 160 51.8 161.1 50.5C161.4 50.2 161.7 49.8 162.1 49.6C163.4 48.9 164.9 50 165.9 51C171 55.9 175.4 61.5 179.1 67.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M174.899 59.6C177.999 56.1 180.999 52.7 184.099 49.2C185.399 47.7 186.999 46.2 188.999 46.2C190.599 46.2 191.899 47.2 193.099 48.2C197.499 52 201.299 56.3999 204.299 61.2999"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M174.899 59.6C177.999 56.1 180.999 52.7 184.099 49.2C185.399 47.7 186.999 46.2 188.999 46.2C190.599 46.2 191.899 47.2 193.099 48.2C197.499 52 201.299 56.3999 204.299 61.2999"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M190.899 78.0999C192.499 75.3999 194.299 72.6999 196.099 70.0999C197.099 68.7999 198.099 67.3999 199.399 66.4999C200.699 65.4999 202.499 64.9999 204.099 65.4999C205.499 65.8999 206.599 66.9999 207.599 68.0999C211.599 72.4999 215.299 77.2999 218.599 82.1999"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M190.899 78.0999C192.499 75.3999 194.299 72.6999 196.099 70.0999C197.099 68.7999 198.099 67.3999 199.399 66.4999C200.699 65.4999 202.499 64.9999 204.099 65.4999C205.499 65.8999 206.599 66.9999 207.599 68.0999C211.599 72.4999 215.299 77.2999 218.599 82.1999"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M214.1 93.5998C217.4 85.2998 222.1 77.5998 228 70.8998C228.5 70.2998 229 69.6998 229.7 69.3998C231.3 68.6998 233 69.5998 234.4 70.5998C239 73.6998 243 77.6998 246 82.1998"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M214.1 93.5998C217.4 85.2998 222.1 77.5998 228 70.8998C228.5 70.2998 229 69.6998 229.7 69.3998C231.3 68.6998 233 69.5998 234.4 70.5998C239 73.6998 243 77.6998 246 82.1998"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M245.3 90.1998C247.7 80.5998 253.9 72.4998 260.3 64.9998C260.6 64.6998 260.9 64.2998 261.3 64.2998C261.7 64.2998 262.1 64.5998 262.4 64.7998C263.6 65.8998 264.8 67.0998 266 68.2998C267.1 66.0998 269 63.5998 271.3 64.1998C272.6 64.5998 273.5 65.8998 274.2 67.0998C276 70.1998 277.7 73.1998 279.5 76.2998"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M245.3 90.1998C247.7 80.5998 253.9 72.4998 260.3 64.9998C260.6 64.6998 260.9 64.2998 261.3 64.2998C261.7 64.2998 262.1 64.5998 262.4 64.7998C263.6 65.8998 264.8 67.0998 266 68.2998C267.1 66.0998 269 63.5998 271.3 64.1998C272.6 64.5998 273.5 65.8998 274.2 67.0998C276 70.1998 277.7 73.1998 279.5 76.2998"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M211.399 63.5999C213.799 60.7999 216.099 58.0998 218.499 55.2998C220.299 53.1999 222.699 50.8999 225.399 51.2999C226.899 51.4999 228.099 52.4998 229.299 53.4998C233.899 57.5998 238.099 62.0998 241.699 66.9998"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M211.399 63.5999C213.799 60.7999 216.099 58.0998 218.499 55.2998C220.299 53.1999 222.699 50.8999 225.399 51.2999C226.899 51.4999 228.099 52.4998 229.299 53.4998C233.899 57.5998 238.099 62.0998 241.699 66.9998"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M248.3 66.7999C248.2 65.4999 248.7 64.0998 249.3 62.8998C251.5 58.0998 254.8 53.8998 258.8 50.4998C259 50.2998 259.3 50.0999 259.6 50.0999C259.9 50.0999 260.2 50.1998 260.5 50.3998C264.9 53.0998 268.8 56.4998 272.1 60.3998"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M248.3 66.7999C248.2 65.4999 248.7 64.0998 249.3 62.8998C251.5 58.0998 254.8 53.8998 258.8 50.4998C259 50.2998 259.3 50.0999 259.6 50.0999C259.9 50.0999 260.2 50.1998 260.5 50.3998C264.9 53.0998 268.8 56.4998 272.1 60.3998"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M276.5 67.6C278.9 65.1 281.3 62.6 283.8 60C285.3 58.4 287.2 56.7 289.3 57.1C291.2 57.4 292.4 59.1 293.5 60.7C295.9 64.3 298.4 68 300.8 71.6"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M276.5 67.6C278.9 65.1 281.3 62.6 283.8 60C285.3 58.4 287.2 56.7 289.3 57.1C291.2 57.4 292.4 59.1 293.5 60.7C295.9 64.3 298.4 68 300.8 71.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M341.899 400.4C342.999 396.3 345.099 392.4 347.899 389.2C347.999 389.1 348.099 389 348.299 388.9C348.499 388.9 348.599 389 348.799 389.1C349.999 390 351.199 390.8 352.399 391.7C352.799 391 353.299 390.4 353.699 389.7C353.999 389.2 354.399 388.7 354.899 388.7C355.499 388.7 355.899 389.2 356.299 389.6C358.799 392.8 361.299 396 363.899 399.3"
          fill="#ED5A88"
        />
        <path
          d="M341.899 400.4C342.999 396.3 345.099 392.4 347.899 389.2C347.999 389.1 348.099 389 348.299 388.9C348.499 388.9 348.599 389 348.799 389.1C349.999 390 351.199 390.8 352.399 391.7C352.799 391 353.299 390.4 353.699 389.7C353.999 389.2 354.399 388.7 354.899 388.7C355.499 388.7 355.899 389.2 356.299 389.6C358.799 392.8 361.299 396 363.899 399.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M351.1 385.4C351.1 383.6 351.1 381.9 351.1 380.1Z"
          fill="#FDA8C5"
        />
        <path
          d="M351.1 385.4C351.1 383.6 351.1 381.9 351.1 380.1"
          stroke="#ED5A88"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M352.5 379.7C352.5 378.3 352.5 376.8 352.5 375.4Z"
          fill="#FDA8C5"
        />
        <path
          d="M352.5 379.7C352.5 378.3 352.5 376.8 352.5 375.4"
          stroke="#00F1C2"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M350.3 374.8C350.3 373.2 350.3 371.7 350.3 370.1Z"
          fill="#FDA8C5"
        />
        <path
          d="M350.3 374.8C350.3 373.2 350.3 371.7 350.3 370.1"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M352.5 371.9C352.5 370.1 352.5 368.2 352.5 366.4Z"
          fill="#FDA8C5"
        />
        <path
          d="M352.5 371.9C352.5 370.1 352.5 368.2 352.5 366.4"
          stroke="#FF9D23"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M350.899 363.6C350.899 362.3 350.899 361 350.899 359.7Z"
          fill="#FDA8C5"
        />
        <path
          d="M350.899 363.6C350.899 362.3 350.899 361 350.899 359.7"
          stroke="#F8F3A1"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M346.6 374.5C346.6 372.7 346.6 371 346.6 369.2Z"
          fill="#FDA8C5"
        />
        <path
          d="M346.6 374.5C346.6 372.7 346.6 371 346.6 369.2"
          stroke="#ED5A88"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M348.1 368.8C348.1 367.4 348.1 365.9 348.1 364.5Z"
          fill="#FDA8C5"
        />
        <path
          d="M348.1 368.8C348.1 367.4 348.1 365.9 348.1 364.5"
          stroke="#00F1C2"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M345.8 363.9C345.8 362.3 345.8 360.8 345.8 359.2Z"
          fill="#FDA8C5"
        />
        <path
          d="M345.8 363.9C345.8 362.3 345.8 360.8 345.8 359.2"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M348.1 361C348.1 359.2 348.1 357.3 348.1 355.5Z"
          fill="#FDA8C5"
        />
        <path
          d="M348.1 361C348.1 359.2 348.1 357.3 348.1 355.5"
          stroke="#FF9D23"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M346.399 352.7C346.399 351.4 346.399 350.1 346.399 348.8Z"
          fill="#FDA8C5"
        />
        <path
          d="M346.399 352.7C346.399 351.4 346.399 350.1 346.399 348.8"
          stroke="#F8F3A1"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M354.7 371.1C354.7 369.3 354.7 367.6 354.7 365.8Z"
          fill="#FDA8C5"
        />
        <path
          d="M354.7 371.1C354.7 369.3 354.7 367.6 354.7 365.8"
          stroke="#ED5A88"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M356.1 365.4C356.1 364 356.1 362.5 356.1 361.1Z"
          fill="#FDA8C5"
        />
        <path
          d="M356.1 365.4C356.1 364 356.1 362.5 356.1 361.1"
          stroke="#00F1C2"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M353.899 360.5C353.899 358.9 353.899 357.4 353.899 355.8Z"
          fill="#FDA8C5"
        />
        <path
          d="M353.899 360.5C353.899 358.9 353.899 357.4 353.899 355.8"
          stroke="#7474F5"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ondina"
        />
        <path
          d="M356.1 357.7C356.1 355.9 356.1 354 356.1 352.2Z"
          fill="#FDA8C5"
        />
        <path
          d="M356.1 357.7C356.1 355.9 356.1 354 356.1 352.2"
          stroke="#FF9D23"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M354.5 349.3C354.5 348 354.5 346.7 354.5 345.4Z"
          fill="#FDA8C5"
        />
        <path
          d="M354.5 349.3C354.5 348 354.5 346.7 354.5 345.4"
          stroke="#F8F3A1"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M384.3 398.4C384.9 396 386.2 393.8 388.1 392.1C389.4 394.1 390.7 396.1 392.1 398"
          fill="#ED5A88"
        />
        <path
          d="M384.3 398.4C384.9 396 386.2 393.8 388.1 392.1C389.4 394.1 390.7 396.1 392.1 398"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M393.5 386.7C394.1 385.2 394.9 383.7 395.8 382.4C395.9 382.3 396 382.1 396.2 382.1C396.4 382.1 396.5 382.2 396.7 382.3C397.9 383.1 399 384 400 385"
          fill="#ED5A88"
        />
        <path
          d="M393.5 386.7C394.1 385.2 394.9 383.7 395.8 382.4C395.9 382.3 396 382.1 396.2 382.1C396.4 382.1 396.5 382.2 396.7 382.3C397.9 383.1 399 384 400 385"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M412.8 385.2C413.2 383.7 414 382.3 415.1 381.2C415.2 381.1 415.3 381 415.4 381C415.5 381 415.7 381.1 415.8 381.2C416.8 382.1 417.7 383 418.7 384"
          fill="#ED5A88"
        />
        <path
          d="M412.8 385.2C413.2 383.7 414 382.3 415.1 381.2C415.2 381.1 415.3 381 415.4 381C415.5 381 415.7 381.1 415.8 381.2C416.8 382.1 417.7 383 418.7 384"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M401.5 400C402.1 398.9 402.9 398 403.9 397.2C404.1 397 404.3 396.9 404.6 396.8C405.1 396.7 405.5 397.1 405.8 397.4C406.9 398.5 407.9 399.6 409 400.7"
          fill="#ED5A88"
        />
        <path
          d="M401.5 400C402.1 398.9 402.9 398 403.9 397.2C404.1 397 404.3 396.9 404.6 396.8C405.1 396.7 405.5 397.1 405.8 397.4C406.9 398.5 407.9 399.6 409 400.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M410.7 415.9C411.4 414.8 412.3 413.7 413.2 412.7C413.4 412.5 413.6 412.3 413.8 412.3C414 412.3 414.2 412.5 414.4 412.6C415.3 413.5 416.3 414.4 417.2 415.3"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M410.7 415.9C411.4 414.8 412.3 413.7 413.2 412.7C413.4 412.5 413.6 412.3 413.8 412.3C414 412.3 414.2 412.5 414.4 412.6C415.3 413.5 416.3 414.4 417.2 415.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M422.8 407C423.2 405.8 423.9 404.8 424.9 404C426.3 405 427.5 406.1 428.7 407.3"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M422.8 407C423.2 405.8 423.9 404.8 424.9 404C426.3 405 427.5 406.1 428.7 407.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M416.6 429.7C417.8 427.8 419.2 426.1 420.9 424.6C421 424.5 421.2 424.4 421.4 424.4C421.5 424.4 421.7 424.5 421.8 424.6C423.1 425.6 424.3 426.7 425.3 428"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M416.6 429.7C417.8 427.8 419.2 426.1 420.9 424.6C421 424.5 421.2 424.4 421.4 424.4C421.5 424.4 421.7 424.5 421.8 424.6C423.1 425.6 424.3 426.7 425.3 428"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M427 457.8C427.5 456.6 428.1 455.3 428.6 454.1C428.7 453.9 428.8 453.7 429 453.7C429.1 453.7 429.1 453.8 429.2 453.8C430.9 455 432.6 456.3 434.1 457.7"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M427 457.8C427.5 456.6 428.1 455.3 428.6 454.1C428.7 453.9 428.8 453.7 429 453.7C429.1 453.7 429.1 453.8 429.2 453.8C430.9 455 432.6 456.3 434.1 457.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M437 463.2C437.9 462 438.7 460.7 439.6 459.5C439.7 459.4 439.8 459.2 440 459.2C440.2 459.2 440.3 459.3 440.5 459.4C441.4 460.2 442.2 461 443.1 461.8"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M437 463.2C437.9 462 438.7 460.7 439.6 459.5C439.7 459.4 439.8 459.2 440 459.2C440.2 459.2 440.3 459.3 440.5 459.4C441.4 460.2 442.2 461 443.1 461.8"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M431.5 476.2C432.5 474.9 433.6 473.6 434.6 472.4C434.7 472.3 434.8 472.2 434.9 472.2C435.1 472.1 435.3 472.3 435.5 472.5C436.7 473.7 437.8 474.8 439 476"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M431.5 476.2C432.5 474.9 433.6 473.6 434.6 472.4C434.7 472.3 434.8 472.2 434.9 472.2C435.1 472.1 435.3 472.3 435.5 472.5C436.7 473.7 437.8 474.8 439 476"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M444.7 481.9C445.6 479.4 446.7 476.9 448 474.5C448.1 474.4 448.2 474.2 448.3 474.2C448.4 474.2 448.6 474.3 448.7 474.4C450.9 476.2 452.6 478.7 453.5 481.4"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M444.7 481.9C445.6 479.4 446.7 476.9 448 474.5C448.1 474.4 448.2 474.2 448.3 474.2C448.4 474.2 448.6 474.3 448.7 474.4C450.9 476.2 452.6 478.7 453.5 481.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M433.3 500.3C433.8 499.1 434.6 498 435.5 497C437 498.3 438.4 499.7 439.7 501.1"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M433.3 500.3C433.8 499.1 434.6 498 435.5 497C437 498.3 438.4 499.7 439.7 501.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M430.3 511.7C430.7 510.6 431.3 509.6 432.1 508.8C432.3 508.6 432.5 508.5 432.7 508.5C432.8 508.5 432.9 508.7 433 508.8C433.8 510 434.7 511.2 435.5 512.4"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M430.3 511.7C430.7 510.6 431.3 509.6 432.1 508.8C432.3 508.6 432.5 508.5 432.7 508.5C432.8 508.5 432.9 508.7 433 508.8C433.8 510 434.7 511.2 435.5 512.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M421.6 521.7C423 520.4 424.5 519.1 425.9 517.8C426 517.7 426.2 517.5 426.4 517.6C426.5 517.6 426.6 517.7 426.7 517.8C428.2 519.1 429.6 520.4 431.1 521.7"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M421.6 521.7C423 520.4 424.5 519.1 425.9 517.8C426 517.7 426.2 517.5 426.4 517.6C426.5 517.6 426.6 517.7 426.7 517.8C428.2 519.1 429.6 520.4 431.1 521.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M94 418.7C94 416.1 96.1 413.9 98.8 413.9C101.4 413.9 103.6 416 103.6 418.7"
          fill="#00F1C2"
        />
        <path
          d="M94 418.7C94 416.1 96.1 413.9 98.8 413.9C101.4 413.9 103.6 416 103.6 418.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M344.8 581C344.8 577.2 347.9 574.1 351.7 574.1C355.5 574.1 358.6 577.2 358.6 581"
          fill="#ED5A88"
        />
        <path
          d="M344.8 581C344.8 577.2 347.9 574.1 351.7 574.1C355.5 574.1 358.6 577.2 358.6 581"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M354.8 581.5C354.8 579.3 356.6 577.5 358.8 577.5C361 577.5 362.8 579.3 362.8 581.5"
          fill="#ED5A88"
        />
        <path
          d="M354.8 581.5C354.8 579.3 356.6 577.5 358.8 577.5C361 577.5 362.8 579.3 362.8 581.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M359.6 569.7C359.6 567.5 361.4 565.7 363.6 565.7C365.8 565.7 367.6 567.5 367.6 569.7"
          fill="#ED5A88"
        />
        <path
          d="M359.6 569.7C359.6 567.5 361.4 565.7 363.6 565.7C365.8 565.7 367.6 567.5 367.6 569.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M350.8 599.5C350.8 597.3 352.6 595.5 354.8 595.5C357 595.5 358.8 597.3 358.8 599.5"
          fill="#ED5A88"
        />
        <path
          d="M350.8 599.5C350.8 597.3 352.6 595.5 354.8 595.5C357 595.5 358.8 597.3 358.8 599.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M325.8 573.7C325.8 571.2 327.8 569.2 330.3 569.2C332.8 569.2 334.8 571.2 334.8 573.7"
          fill="#ED5A88"
        />
        <path
          d="M325.8 573.7C325.8 571.2 327.8 569.2 330.3 569.2C332.8 569.2 334.8 571.2 334.8 573.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M336.5 583.1C336.5 580 339 577.5 342.1 577.5C345.2 577.5 347.7 580 347.7 583.1"
          fill="#ED5A88"
        />
        <path
          d="M336.5 583.1C336.5 580 339 577.5 342.1 577.5C345.2 577.5 347.7 580 347.7 583.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M343.899 587C343.899 583.2 346.999 580.1 350.799 580.1C354.599 580.1 357.699 583.2 357.699 587"
          fill="#ED5A88"
        />
        <path
          d="M343.899 587C343.899 583.2 346.999 580.1 350.799 580.1C354.599 580.1 357.699 583.2 357.699 587"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M115 461.8C115 460.6 115.9 459.7 117.1 459.7C117.5 459.7 118 459.8 118.3 460.1C118.5 459.4 119.2 458.9 120 458.9C120.1 458.9 120.2 458.9 120.2 458.9C120.4 458 121.2 457.3 122.2 457.3C123.2 457.3 124 458 124.2 458.9C124.2 458.9 124.2 458.9 124.3 458.9C125.7 458.9 126.8 460 126.8 461.4"
          fill="#00F1C2"
        />
        <path
          d="M115 461.8C115 460.6 115.9 459.7 117.1 459.7C117.5 459.7 118 459.8 118.3 460.1C118.5 459.4 119.2 458.9 120 458.9C120.1 458.9 120.2 458.9 120.2 458.9C120.4 458 121.2 457.3 122.2 457.3C123.2 457.3 124 458 124.2 458.9C124.2 458.9 124.2 458.9 124.3 458.9C125.7 458.9 126.8 460 126.8 461.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M248.3 159.2C248.3 156.2 245.8 153.7 242.8 153.7C241.6 153.7 240.5 154.1 239.7 154.7C239.1 152.8 237.4 151.5 235.4 151.5C235.2 151.5 235 151.5 234.8 151.6C234.3 149.2 232.1 147.4 229.6 147.4C227.1 147.4 225 149.2 224.4 151.5C224.3 151.5 224.3 151.5 224.2 151.5C220.5 151.5 217.6 154.5 217.6 158.1"
          fill="#00F1C2"
        />
        <path
          d="M248.3 159.2C248.3 156.2 245.8 153.7 242.8 153.7C241.6 153.7 240.5 154.1 239.7 154.7C239.1 152.8 237.4 151.5 235.4 151.5C235.2 151.5 235 151.5 234.8 151.6C234.3 149.2 232.1 147.4 229.6 147.4C227.1 147.4 225 149.2 224.4 151.5C224.3 151.5 224.3 151.5 224.2 151.5C220.5 151.5 217.6 154.5 217.6 158.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M228.3 168C228.3 165 225.8 162.5 222.8 162.5C221.6 162.5 220.5 162.9 219.7 163.5C219.1 161.6 217.4 160.3 215.4 160.3C215.2 160.3 215 160.3 214.8 160.4C214.3 158 212.1 156.2 209.6 156.2C207.1 156.2 205 158 204.4 160.3C204.3 160.3 204.3 160.3 204.2 160.3C200.5 160.3 197.6 163.3 197.6 166.9"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M228.3 168C228.3 165 225.8 162.5 222.8 162.5C221.6 162.5 220.5 162.9 219.7 163.5C219.1 161.6 217.4 160.3 215.4 160.3C215.2 160.3 215 160.3 214.8 160.4C214.3 158 212.1 156.2 209.6 156.2C207.1 156.2 205 158 204.4 160.3C204.3 160.3 204.3 160.3 204.2 160.3C200.5 160.3 197.6 163.3 197.6 166.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M87.8994 441C87.8994 436.6 91.3994 433.1 95.7994 433.1C97.4994 433.1 98.9994 433.6 100.299 434.5C101.099 431.8 103.599 429.9 106.499 429.9C106.799 429.9 107.099 429.9 107.399 430C108.199 426.6 111.199 424 114.899 424C118.499 424 121.599 426.5 122.399 429.9C122.499 429.9 122.599 429.9 122.599 429.9C127.899 429.9 132.099 434.2 132.099 439.4"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M87.8994 441C87.8994 436.6 91.3994 433.1 95.7994 433.1C97.4994 433.1 98.9994 433.6 100.299 434.5C101.099 431.8 103.599 429.9 106.499 429.9C106.799 429.9 107.099 429.9 107.399 430C108.199 426.6 111.199 424 114.899 424C118.499 424 121.599 426.5 122.399 429.9C122.499 429.9 122.599 429.9 122.599 429.9C127.899 429.9 132.099 434.2 132.099 439.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M134.2 442.1C134.2 440.2 132.6 438.6 130.7 438.6C130 438.6 129.3 438.8 128.7 439.2C128.3 438 127.2 437.2 125.9 437.2C125.8 437.2 125.6 437.2 125.5 437.2C125.2 435.7 123.8 434.5 122.2 434.5C120.6 434.5 119.3 435.6 118.9 437.1H118.8C116.5 437.1 114.6 439 114.6 441.3"
          fill="#00F1C2"
        />
        <path
          d="M134.2 442.1C134.2 440.2 132.6 438.6 130.7 438.6C130 438.6 129.3 438.8 128.7 439.2C128.3 438 127.2 437.2 125.9 437.2C125.8 437.2 125.6 437.2 125.5 437.2C125.2 435.7 123.8 434.5 122.2 434.5C120.6 434.5 119.3 435.6 118.9 437.1H118.8C116.5 437.1 114.6 439 114.6 441.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M121.4 447.7C121.4 445.8 119.8 444.2 117.9 444.2C117.2 444.2 116.5 444.4 115.9 444.8C115.5 443.6 114.4 442.8 113.1 442.8C113 442.8 112.8 442.8 112.7 442.8C112.4 441.3 111 440.1 109.4 440.1C107.8 440.1 106.5 441.2 106.1 442.7H106C103.7 442.7 101.8 444.6 101.8 446.9"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M121.4 447.7C121.4 445.8 119.8 444.2 117.9 444.2C117.2 444.2 116.5 444.4 115.9 444.8C115.5 443.6 114.4 442.8 113.1 442.8C113 442.8 112.8 442.8 112.7 442.8C112.4 441.3 111 440.1 109.4 440.1C107.8 440.1 106.5 441.2 106.1 442.7H106C103.7 442.7 101.8 444.6 101.8 446.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M250.9 119.2C250.9 114.2 246.8 110.1 241.8 110.1C239.9 110.1 238.1 110.7 236.6 111.7C235.6 108.6 232.8 106.4 229.4 106.4C229 106.4 228.7 106.5 228.4 106.5C227.5 102.6 224 99.5999 219.8 99.5999C215.6 99.5999 212.2 102.5 211.2 106.4C211.1 106.4 211 106.4 210.9 106.4C204.9 106.4 200 111.3 200 117.3"
          fill="#D2CDF9"
        />
        <path
          d="M250.9 119.2C250.9 114.2 246.8 110.1 241.8 110.1C239.9 110.1 238.1 110.7 236.6 111.7C235.6 108.6 232.8 106.4 229.4 106.4C229 106.4 228.7 106.5 228.4 106.5C227.5 102.6 224 99.5999 219.8 99.5999C215.6 99.5999 212.2 102.5 211.2 106.4C211.1 106.4 211 106.4 210.9 106.4C204.9 106.4 200 111.3 200 117.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M197.7 120.5C197.7 118.3 199.5 116.5 201.7 116.5C202.6 116.5 203.3 116.8 204 117.2C204.4 115.8 205.7 114.9 207.2 114.9C207.4 114.9 207.5 114.9 207.7 114.9C208.1 113.2 209.7 111.9 211.5 111.9C213.3 111.9 214.9 113.2 215.3 114.9H215.4C218.1 114.9 220.2 117.1 220.2 119.7"
          fill="#00F1C2"
        />
        <path
          d="M197.7 120.5C197.7 118.3 199.5 116.5 201.7 116.5C202.6 116.5 203.3 116.8 204 117.2C204.4 115.8 205.7 114.9 207.2 114.9C207.4 114.9 207.5 114.9 207.7 114.9C208.1 113.2 209.7 111.9 211.5 111.9C213.3 111.9 214.9 113.2 215.3 114.9H215.4C218.1 114.9 220.2 117.1 220.2 119.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M212.399 126.9C212.399 124.7 214.199 122.9 216.399 122.9C217.299 122.9 217.999 123.2 218.699 123.6C219.099 122.2 220.399 121.3 221.899 121.3C222.099 121.3 222.199 121.3 222.399 121.3C222.799 119.6 224.399 118.3 226.199 118.3C227.999 118.3 229.599 119.6 229.999 121.3H230.099C232.799 121.3 234.899 123.5 234.899 126.1"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M212.399 126.9C212.399 124.7 214.199 122.9 216.399 122.9C217.299 122.9 217.999 123.2 218.699 123.6C219.099 122.2 220.399 121.3 221.899 121.3C222.099 121.3 222.199 121.3 222.399 121.3C222.799 119.6 224.399 118.3 226.199 118.3C227.999 118.3 229.599 119.6 229.999 121.3H230.099C232.799 121.3 234.899 123.5 234.899 126.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M285.3 241.6C285.3 238.6 287.8 236.1 290.8 236.1C292 236.1 293.1 236.5 293.9 237.1C294.5 235.2 296.2 233.9 298.2 233.9C298.4 233.9 298.6 233.9 298.8 234C299.3 231.6 301.5 229.8 304 229.8C306.5 229.8 308.6 231.6 309.2 233.9C309.3 233.9 309.3 233.9 309.4 233.9C313.1 233.9 316 236.9 316 240.5"
          fill="#00F1C2"
        />
        <path
          d="M285.3 241.6C285.3 238.6 287.8 236.1 290.8 236.1C292 236.1 293.1 236.5 293.9 237.1C294.5 235.2 296.2 233.9 298.2 233.9C298.4 233.9 298.6 233.9 298.8 234C299.3 231.6 301.5 229.8 304 229.8C306.5 229.8 308.6 231.6 309.2 233.9C309.3 233.9 309.3 233.9 309.4 233.9C313.1 233.9 316 236.9 316 240.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M382.1 342.7C382.1 340.9 383.5 339.5 385.3 339.5C386 339.5 386.6 339.7 387.1 340.1C387.4 339 388.4 338.2 389.6 338.2C389.7 338.2 389.8 338.2 390 338.2C390.3 336.8 391.5 335.8 393 335.8C394.5 335.8 395.7 336.8 396 338.2H396.1C398.2 338.2 399.9 339.9 399.9 342"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M382.1 342.7C382.1 340.9 383.5 339.5 385.3 339.5C386 339.5 386.6 339.7 387.1 340.1C387.4 339 388.4 338.2 389.6 338.2C389.7 338.2 389.8 338.2 390 338.2C390.3 336.8 391.5 335.8 393 335.8C394.5 335.8 395.7 336.8 396 338.2H396.1C398.2 338.2 399.9 339.9 399.9 342"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M395.6 356.7C395.6 354.9 397 353.5 398.8 353.5C399.5 353.5 400.1 353.7 400.6 354.1C400.9 353 401.9 352.2 403.1 352.2C403.2 352.2 403.3 352.2 403.5 352.2C403.8 350.8 405 349.8 406.5 349.8C408 349.8 409.2 350.8 409.5 352.2H409.6C411.7 352.2 413.4 353.9 413.4 356"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M395.6 356.7C395.6 354.9 397 353.5 398.8 353.5C399.5 353.5 400.1 353.7 400.6 354.1C400.9 353 401.9 352.2 403.1 352.2C403.2 352.2 403.3 352.2 403.5 352.2C403.8 350.8 405 349.8 406.5 349.8C408 349.8 409.2 350.8 409.5 352.2H409.6C411.7 352.2 413.4 353.9 413.4 356"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M434.1 371C434.1 369.2 435.5 367.8 437.3 367.8C438 367.8 438.6 368 439.1 368.4C439.4 367.3 440.4 366.5 441.6 366.5C441.7 366.5 441.8 366.5 442 366.5C442.3 365.1 443.5 364.1 445 364.1C446.5 364.1 447.7 365.1 448 366.5H448.1C450.2 366.5 451.9 368.2 451.9 370.3"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M434.1 371C434.1 369.2 435.5 367.8 437.3 367.8C438 367.8 438.6 368 439.1 368.4C439.4 367.3 440.4 366.5 441.6 366.5C441.7 366.5 441.8 366.5 442 366.5C442.3 365.1 443.5 364.1 445 364.1C446.5 364.1 447.7 365.1 448 366.5H448.1C450.2 366.5 451.9 368.2 451.9 370.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M288.5 557C288.5 555.2 289.9 553.8 291.7 553.8C292.4 553.8 293 554 293.5 554.4C293.8 553.3 294.8 552.5 296 552.5C296.1 552.5 296.2 552.5 296.4 552.5C296.7 551.1 297.9 550.1 299.4 550.1C300.9 550.1 302.1 551.1 302.4 552.5H302.5C304.6 552.5 306.3 554.2 306.3 556.3"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M288.5 557C288.5 555.2 289.9 553.8 291.7 553.8C292.4 553.8 293 554 293.5 554.4C293.8 553.3 294.8 552.5 296 552.5C296.1 552.5 296.2 552.5 296.4 552.5C296.7 551.1 297.9 550.1 299.4 550.1C300.9 550.1 302.1 551.1 302.4 552.5H302.5C304.6 552.5 306.3 554.2 306.3 556.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M364.6 553.6C364.6 551.8 366 550.4 367.8 550.4C368.5 550.4 369.1 550.6 369.6 551C369.9 549.9 370.9 549.1 372.1 549.1C372.2 549.1 372.3 549.1 372.5 549.1C372.8 547.7 374 546.7 375.5 546.7C377 546.7 378.2 547.7 378.5 549.1H378.6C380.7 549.1 382.4 550.8 382.4 552.9"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M364.6 553.6C364.6 551.8 366 550.4 367.8 550.4C368.5 550.4 369.1 550.6 369.6 551C369.9 549.9 370.9 549.1 372.1 549.1C372.2 549.1 372.3 549.1 372.5 549.1C372.8 547.7 374 546.7 375.5 546.7C377 546.7 378.2 547.7 378.5 549.1H378.6C380.7 549.1 382.4 550.8 382.4 552.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M277.7 574.7C277.7 572.9 279.1 571.5 280.9 571.5C281.6 571.5 282.2 571.7 282.7 572.1C283 571 284 570.2 285.2 570.2C285.3 570.2 285.4 570.2 285.6 570.2C285.9 568.8 287.1 567.8 288.6 567.8C290.1 567.8 291.3 568.8 291.6 570.2H291.7C293.8 570.2 295.5 571.9 295.5 574"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M277.7 574.7C277.7 572.9 279.1 571.5 280.9 571.5C281.6 571.5 282.2 571.7 282.7 572.1C283 571 284 570.2 285.2 570.2C285.3 570.2 285.4 570.2 285.6 570.2C285.9 568.8 287.1 567.8 288.6 567.8C290.1 567.8 291.3 568.8 291.6 570.2H291.7C293.8 570.2 295.5 571.9 295.5 574"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M316.899 599C316.899 597.2 318.299 595.8 320.099 595.8C320.799 595.8 321.399 596 321.899 596.4C322.199 595.3 323.199 594.5 324.399 594.5C324.499 594.5 324.599 594.5 324.799 594.5C325.099 593.1 326.299 592.1 327.799 592.1C329.299 592.1 330.499 593.1 330.799 594.5H330.899C332.999 594.5 334.699 596.2 334.699 598.3"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M316.899 599C316.899 597.2 318.299 595.8 320.099 595.8C320.799 595.8 321.399 596 321.899 596.4C322.199 595.3 323.199 594.5 324.399 594.5C324.499 594.5 324.599 594.5 324.799 594.5C325.099 593.1 326.299 592.1 327.799 592.1C329.299 592.1 330.499 593.1 330.799 594.5H330.899C332.999 594.5 334.699 596.2 334.699 598.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M129.1 110C129.1 108.2 130.5 106.8 132.3 106.8C133 106.8 133.6 107 134.1 107.4C134.4 106.3 135.4 105.5 136.6 105.5C136.7 105.5 136.8 105.5 137 105.5C137.3 104.1 138.5 103.1 140 103.1C141.5 103.1 142.7 104.1 143 105.5H143.1C145.2 105.5 146.9 107.2 146.9 109.3"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M129.1 110C129.1 108.2 130.5 106.8 132.3 106.8C133 106.8 133.6 107 134.1 107.4C134.4 106.3 135.4 105.5 136.6 105.5C136.7 105.5 136.8 105.5 137 105.5C137.3 104.1 138.5 103.1 140 103.1C141.5 103.1 142.7 104.1 143 105.5H143.1C145.2 105.5 146.9 107.2 146.9 109.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M141.8 97.2999C141.8 95.4999 143.2 94.0999 145 94.0999C145.7 94.0999 146.3 94.2999 146.8 94.6999C147.1 93.5999 148.1 92.7999 149.3 92.7999C149.4 92.7999 149.5 92.7999 149.7 92.7999C150 91.3999 151.2 90.3999 152.7 90.3999C154.2 90.3999 155.4 91.3999 155.7 92.7999H155.8C157.9 92.7999 159.6 94.4999 159.6 96.5999"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M141.8 97.2999C141.8 95.4999 143.2 94.0999 145 94.0999C145.7 94.0999 146.3 94.2999 146.8 94.6999C147.1 93.5999 148.1 92.7999 149.3 92.7999C149.4 92.7999 149.5 92.7999 149.7 92.7999C150 91.3999 151.2 90.3999 152.7 90.3999C154.2 90.3999 155.4 91.3999 155.7 92.7999H155.8C157.9 92.7999 159.6 94.4999 159.6 96.5999"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M163.3 106.1C163.3 104.3 164.7 102.9 166.5 102.9C167.2 102.9 167.8 103.1 168.3 103.5C168.6 102.4 169.6 101.6 170.8 101.6C170.9 101.6 171 101.6 171.2 101.6C171.5 100.2 172.7 99.2 174.2 99.2C175.7 99.2 176.9 100.2 177.2 101.6H177.3C179.4 101.6 181.1 103.3 181.1 105.4"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M163.3 106.1C163.3 104.3 164.7 102.9 166.5 102.9C167.2 102.9 167.8 103.1 168.3 103.5C168.6 102.4 169.6 101.6 170.8 101.6C170.9 101.6 171 101.6 171.2 101.6C171.5 100.2 172.7 99.2 174.2 99.2C175.7 99.2 176.9 100.2 177.2 101.6H177.3C179.4 101.6 181.1 103.3 181.1 105.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M462.5 388.6C462.5 386.8 461.1 385.4 459.3 385.4C458.6 385.4 458 385.6 457.5 386C457.2 384.9 456.2 384.1 455 384.1C454.9 384.1 454.8 384.1 454.6 384.1C454.3 382.7 453.1 381.7 451.6 381.7C450.1 381.7 448.9 382.7 448.6 384.1H448.5C446.4 384.1 444.7 385.8 444.7 387.9"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M462.5 388.6C462.5 386.8 461.1 385.4 459.3 385.4C458.6 385.4 458 385.6 457.5 386C457.2 384.9 456.2 384.1 455 384.1C454.9 384.1 454.8 384.1 454.6 384.1C454.3 382.7 453.1 381.7 451.6 381.7C450.1 381.7 448.9 382.7 448.6 384.1H448.5C446.4 384.1 444.7 385.8 444.7 387.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M236.6 314.6C236.6 312.8 238 311.4 239.8 311.4C240.5 311.4 241.1 311.6 241.6 312C241.9 310.9 242.9 310.1 244.1 310.1C244.2 310.1 244.3 310.1 244.5 310.1C244.8 308.7 246 307.7 247.5 307.7C249 307.7 250.2 308.7 250.5 310.1H250.6C252.7 310.1 254.4 311.8 254.4 313.9"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M236.6 314.6C236.6 312.8 238 311.4 239.8 311.4C240.5 311.4 241.1 311.6 241.6 312C241.9 310.9 242.9 310.1 244.1 310.1C244.2 310.1 244.3 310.1 244.5 310.1C244.8 308.7 246 307.7 247.5 307.7C249 307.7 250.2 308.7 250.5 310.1H250.6C252.7 310.1 254.4 311.8 254.4 313.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M250.1 328.6C250.1 326.8 251.5 325.4 253.3 325.4C254 325.4 254.6 325.6 255.1 326C255.4 324.9 256.4 324.1 257.6 324.1C257.7 324.1 257.8 324.1 258 324.1C258.3 322.7 259.5 321.7 261 321.7C262.5 321.7 263.7 322.7 264 324.1H264.1C266.2 324.1 267.9 325.8 267.9 327.9"
          fill="#F97AAB"
          class="pointer-events-none"
        />
        <path
          d="M250.1 328.6C250.1 326.8 251.5 325.4 253.3 325.4C254 325.4 254.6 325.6 255.1 326C255.4 324.9 256.4 324.1 257.6 324.1C257.7 324.1 257.8 324.1 258 324.1C258.3 322.7 259.5 321.7 261 321.7C262.5 321.7 263.7 322.7 264 324.1H264.1C266.2 324.1 267.9 325.8 267.9 327.9"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M288.5 342.9C288.5 341.1 289.9 339.7 291.7 339.7C292.4 339.7 293 339.9 293.5 340.3C293.8 339.2 294.8 338.4 296 338.4C296.1 338.4 296.2 338.4 296.4 338.4C296.7 337 297.9 336 299.4 336C300.9 336 302.1 337 302.4 338.4H302.5C304.6 338.4 306.3 340.1 306.3 342.2"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M288.5 342.9C288.5 341.1 289.9 339.7 291.7 339.7C292.4 339.7 293 339.9 293.5 340.3C293.8 339.2 294.8 338.4 296 338.4C296.1 338.4 296.2 338.4 296.4 338.4C296.7 337 297.9 336 299.4 336C300.9 336 302.1 337 302.4 338.4H302.5C304.6 338.4 306.3 340.1 306.3 342.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M317 360.5C317 358.7 315.6 357.3 313.8 357.3C313.1 357.3 312.5 357.5 312 357.9C311.7 356.8 310.7 356 309.5 356C309.4 356 309.3 356 309.1 356C308.8 354.6 307.6 353.6 306.1 353.6C304.6 353.6 303.4 354.6 303.1 356H303C300.9 356 299.2 357.7 299.2 359.8"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M317 360.5C317 358.7 315.6 357.3 313.8 357.3C313.1 357.3 312.5 357.5 312 357.9C311.7 356.8 310.7 356 309.5 356C309.4 356 309.3 356 309.1 356C308.8 354.6 307.6 353.6 306.1 353.6C304.6 353.6 303.4 354.6 303.1 356H303C300.9 356 299.2 357.7 299.2 359.8"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M429.8 351.6C430.1 350.6 430.1 349.4 429.6 348.5C429 347.6 427.7 347.1 426.8 347.7C426.7 346.6 425.6 345.7 424.5 345.7C423.4 345.7 422.3 346.4 421.8 347.3C420.8 346.8 419.6 346.5 418.6 346.7C417.5 347 416.6 347.9 416.5 349.1C415.2 348.9 413.9 349.6 413.3 350.8C412.7 352 413.1 353.5 414.1 354.3C413.1 354.6 412.5 355.7 412.8 356.7C413.1 357.7 414.4 358.2 415.3 357.8C415 358.3 415.2 358.9 415.5 359.3C415.9 359.7 416.4 359.9 416.9 359.9C418 360 419.1 359.7 420 359C421 360.7 423.6 361 424.9 359.7"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M429.8 351.6C430.1 350.6 430.1 349.4 429.6 348.5C429 347.6 427.7 347.1 426.8 347.7C426.7 346.6 425.6 345.7 424.5 345.7C423.4 345.7 422.3 346.4 421.8 347.3C420.8 346.8 419.6 346.5 418.6 346.7C417.5 347 416.6 347.9 416.5 349.1C415.2 348.9 413.9 349.6 413.3 350.8C412.7 352 413.1 353.5 414.1 354.3C413.1 354.6 412.5 355.7 412.8 356.7C413.1 357.7 414.4 358.2 415.3 357.8C415 358.3 415.2 358.9 415.5 359.3C415.9 359.7 416.4 359.9 416.9 359.9C418 360 419.1 359.7 420 359C421 360.7 423.6 361 424.9 359.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M424.4 360.1C424.9 361.5 425.6 362.8 426.3 364.1C426.2 364.4 425.8 364.6 425.5 364.5C425.2 364.4 424.9 364.2 424.7 363.9C424.5 363.6 424.3 363.4 424 363.2C423.9 363.5 423.8 363.8 423.6 364C423.4 364.2 423.1 364.4 422.8 364.4C422.3 364.4 422 363.8 421.8 363.3C421.5 363.8 420.9 364.2 420.3 364.4C420.2 364.4 420 364.5 419.9 364.4C419.6 364.3 419.5 364.1 419.4 363.8C419.3 363.5 419.4 363.3 419.4 363C419.6 361.8 419.9 360.7 420.4 359.6"
          fill="#ED5A88"
        />
        <path
          d="M424.4 360.1C424.9 361.5 425.6 362.8 426.3 364.1C426.2 364.4 425.8 364.6 425.5 364.5C425.2 364.4 424.9 364.2 424.7 363.9C424.5 363.6 424.3 363.4 424 363.2C423.9 363.5 423.8 363.8 423.6 364C423.4 364.2 423.1 364.4 422.8 364.4C422.3 364.4 422 363.8 421.8 363.3C421.5 363.8 420.9 364.2 420.3 364.4C420.2 364.4 420 364.5 419.9 364.4C419.6 364.3 419.5 364.1 419.4 363.8C419.3 363.5 419.4 363.3 419.4 363C419.6 361.8 419.9 360.7 420.4 359.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M423.701 360.6C424.501 359.7 425.9 359.4 427 359.9C427.6 360.1 428.301 360.5 428.701 360.1C428.901 359.9 428.9 359.5 428.8 359.2C428.7 358.9 428.401 358.7 428.101 358.4C428.701 358.6 429.3 358.7 430 358.7C430.3 358.7 430.6 358.7 430.8 358.5C431 358.3 431 357.9 430.9 357.6C430.7 357.3 430.501 357.2 430.201 357.1C430.601 357 431 357 431.3 356.7C431.6 356.4 431.801 356 431.601 355.6C431.401 355.2 430.8 355.1 430.3 355.1C430.6 354.6 430.9 354.1 431 353.6C431.1 353 430.8 352.4 430.3 352.2C429.6 351.9 428.9 352.5 428.4 353C428.6 352.1 427.9 351.2 427 351.1C426.1 351 425.201 351.7 425.101 352.6C424.601 351.8 423.8 351.2 422.9 351.3C422 351.4 421.3 352.5 421.8 353.3C421.2 352.9 420.2 353.3 420 354C419.8 354.7 420.3 355.6 421 355.7"
          fill="#00F1C2"
        />
        <path
          d="M423.701 360.6C424.501 359.7 425.9 359.4 427 359.9C427.6 360.1 428.301 360.5 428.701 360.1C428.901 359.9 428.9 359.5 428.8 359.2C428.7 358.9 428.401 358.7 428.101 358.4C428.701 358.6 429.3 358.7 430 358.7C430.3 358.7 430.6 358.7 430.8 358.5C431 358.3 431 357.9 430.9 357.6C430.7 357.3 430.501 357.2 430.201 357.1C430.601 357 431 357 431.3 356.7C431.6 356.4 431.801 356 431.601 355.6C431.401 355.2 430.8 355.1 430.3 355.1C430.6 354.6 430.9 354.1 431 353.6C431.1 353 430.8 352.4 430.3 352.2C429.6 351.9 428.9 352.5 428.4 353C428.6 352.1 427.9 351.2 427 351.1C426.1 351 425.201 351.7 425.101 352.6C424.601 351.8 423.8 351.2 422.9 351.3C422 351.4 421.3 352.5 421.8 353.3C421.2 352.9 420.2 353.3 420 354C419.8 354.7 420.3 355.6 421 355.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M384.4 412.4C384.1 411.4 384.1 410.2 384.6 409.3C385.2 408.4 386.5 407.9 387.4 408.5C387.5 407.4 388.6 406.5 389.7 406.5C390.8 406.5 391.9 407.2 392.4 408.1C393.4 407.6 394.6 407.3 395.6 407.5C396.7 407.8 397.6 408.7 397.7 409.9C399 409.7 400.3 410.4 400.9 411.6C401.5 412.8 401.1 414.3 400.1 415.1C401.1 415.4 401.7 416.5 401.4 417.5C401.1 418.5 399.8 419 398.9 418.6C399.2 419.1 399 419.7 398.7 420.1C398.3 420.5 397.8 420.7 397.3 420.7C396.2 420.8 395.1 420.5 394.2 419.8C393.2 421.5 390.6 421.8 389.3 420.5"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M384.4 412.4C384.1 411.4 384.1 410.2 384.6 409.3C385.2 408.4 386.5 407.9 387.4 408.5C387.5 407.4 388.6 406.5 389.7 406.5C390.8 406.5 391.9 407.2 392.4 408.1C393.4 407.6 394.6 407.3 395.6 407.5C396.7 407.8 397.6 408.7 397.7 409.9C399 409.7 400.3 410.4 400.9 411.6C401.5 412.8 401.1 414.3 400.1 415.1C401.1 415.4 401.7 416.5 401.4 417.5C401.1 418.5 399.8 419 398.9 418.6C399.2 419.1 399 419.7 398.7 420.1C398.3 420.5 397.8 420.7 397.3 420.7C396.2 420.8 395.1 420.5 394.2 419.8C393.2 421.5 390.6 421.8 389.3 420.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M389.8 420.9C389.3 422.3 388.6 423.6 387.9 424.9C388 425.2 388.4 425.4 388.7 425.3C389 425.2 389.3 425 389.5 424.7C389.7 424.4 389.9 424.2 390.2 424C390.3 424.3 390.4 424.6 390.6 424.8C390.8 425 391.1 425.2 391.4 425.2C391.9 425.2 392.2 424.6 392.4 424.1C392.7 424.6 393.3 425 393.9 425.2C394 425.2 394.2 425.3 394.3 425.2C394.6 425.1 394.7 424.9 394.8 424.6C394.9 424.3 394.8 424.1 394.8 423.8C394.6 422.6 394.3 421.5 393.8 420.4"
          fill="#ED5A88"
        />
        <path
          d="M389.8 420.9C389.3 422.3 388.6 423.6 387.9 424.9C388 425.2 388.4 425.4 388.7 425.3C389 425.2 389.3 425 389.5 424.7C389.7 424.4 389.9 424.2 390.2 424C390.3 424.3 390.4 424.6 390.6 424.8C390.8 425 391.1 425.2 391.4 425.2C391.9 425.2 392.2 424.6 392.4 424.1C392.7 424.6 393.3 425 393.9 425.2C394 425.2 394.2 425.3 394.3 425.2C394.6 425.1 394.7 424.9 394.8 424.6C394.9 424.3 394.8 424.1 394.8 423.8C394.6 422.6 394.3 421.5 393.8 420.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M390.5 421.4C389.7 420.5 388.3 420.2 387.2 420.7C386.6 420.9 385.9 421.3 385.5 420.9C385.3 420.7 385.3 420.3 385.4 420C385.5 419.7 385.8 419.5 386.1 419.2C385.5 419.4 384.9 419.5 384.2 419.5C383.9 419.5 383.6 419.5 383.4 419.3C383.2 419.1 383.2 418.7 383.3 418.4C383.4 418.1 383.7 418 384 417.9C383.6 417.8 383.2 417.8 382.9 417.5C382.6 417.2 382.4 416.8 382.6 416.4C382.8 416 383.4 415.9 383.9 415.9C383.6 415.4 383.3 414.9 383.2 414.4C383.1 413.8 383.4 413.2 383.9 413C384.6 412.7 385.3 413.3 385.8 413.8C385.6 412.9 386.3 412 387.2 411.9C388.1 411.8 389 412.5 389.1 413.4C389.6 412.6 390.4 412 391.3 412.1C392.2 412.2 392.9 413.3 392.4 414.1C393 413.7 394 414.1 394.2 414.8C394.4 415.5 393.9 416.4 393.2 416.5"
          fill="#00F1C2"
        />
        <path
          d="M390.5 421.4C389.7 420.5 388.3 420.2 387.2 420.7C386.6 420.9 385.9 421.3 385.5 420.9C385.3 420.7 385.3 420.3 385.4 420C385.5 419.7 385.8 419.5 386.1 419.2C385.5 419.4 384.9 419.5 384.2 419.5C383.9 419.5 383.6 419.5 383.4 419.3C383.2 419.1 383.2 418.7 383.3 418.4C383.4 418.1 383.7 418 384 417.9C383.6 417.8 383.2 417.8 382.9 417.5C382.6 417.2 382.4 416.8 382.6 416.4C382.8 416 383.4 415.9 383.9 415.9C383.6 415.4 383.3 414.9 383.2 414.4C383.1 413.8 383.4 413.2 383.9 413C384.6 412.7 385.3 413.3 385.8 413.8C385.6 412.9 386.3 412 387.2 411.9C388.1 411.8 389 412.5 389.1 413.4C389.6 412.6 390.4 412 391.3 412.1C392.2 412.2 392.9 413.3 392.4 414.1C393 413.7 394 414.1 394.2 414.8C394.4 415.5 393.9 416.4 393.2 416.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M290.499 207.5C290.799 206.5 290.799 205.3 290.299 204.4C289.799 203.5 288.399 203 287.499 203.6C287.399 202.5 286.299 201.6 285.199 201.6C284.099 201.6 282.999 202.3 282.499 203.2C281.499 202.7 280.299 202.4 279.299 202.6C278.199 202.9 277.299 203.8 277.199 205C275.899 204.8 274.599 205.5 273.999 206.7C273.499 207.9 273.799 209.4 274.799 210.2C273.799 210.5 273.199 211.6 273.499 212.6C273.799 213.6 275.099 214.1 275.999 213.7C275.699 214.2 275.899 214.8 276.199 215.2C276.599 215.6 277.099 215.8 277.599 215.8C278.699 215.9 279.799 215.6 280.699 214.9C281.699 216.6 284.299 216.9 285.599 215.6"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M290.499 207.5C290.799 206.5 290.799 205.3 290.299 204.4C289.799 203.5 288.399 203 287.499 203.6C287.399 202.5 286.299 201.6 285.199 201.6C284.099 201.6 282.999 202.3 282.499 203.2C281.499 202.7 280.299 202.4 279.299 202.6C278.199 202.9 277.299 203.8 277.199 205C275.899 204.8 274.599 205.5 273.999 206.7C273.499 207.9 273.799 209.4 274.799 210.2C273.799 210.5 273.199 211.6 273.499 212.6C273.799 213.6 275.099 214.1 275.999 213.7C275.699 214.2 275.899 214.8 276.199 215.2C276.599 215.6 277.099 215.8 277.599 215.8C278.699 215.9 279.799 215.6 280.699 214.9C281.699 216.6 284.299 216.9 285.599 215.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M285.099 216C285.599 217.4 286.299 218.7 286.999 220C286.899 220.3 286.499 220.5 286.199 220.4C285.899 220.3 285.599 220.1 285.399 219.8C285.199 219.5 284.999 219.3 284.699 219.1C284.599 219.4 284.499 219.7 284.299 219.9C284.099 220.1 283.799 220.3 283.499 220.3C282.999 220.3 282.699 219.7 282.499 219.2C282.199 219.7 281.599 220.1 280.999 220.3C280.899 220.3 280.699 220.4 280.599 220.3C280.299 220.2 280.199 220 280.099 219.7C279.999 219.4 280.099 219.2 280.099 218.9C280.299 217.7 280.599 216.6 281.099 215.5"
          fill="#ED5A88"
        />
        <path
          d="M285.099 216C285.599 217.4 286.299 218.7 286.999 220C286.899 220.3 286.499 220.5 286.199 220.4C285.899 220.3 285.599 220.1 285.399 219.8C285.199 219.5 284.999 219.3 284.699 219.1C284.599 219.4 284.499 219.7 284.299 219.9C284.099 220.1 283.799 220.3 283.499 220.3C282.999 220.3 282.699 219.7 282.499 219.2C282.199 219.7 281.599 220.1 280.999 220.3C280.899 220.3 280.699 220.4 280.599 220.3C280.299 220.2 280.199 220 280.099 219.7C279.999 219.4 280.099 219.2 280.099 218.9C280.299 217.7 280.599 216.6 281.099 215.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M284.4 216.5C285.2 215.6 286.6 215.3 287.7 215.8C288.3 216 289 216.4 289.4 216C289.6 215.8 289.6 215.4 289.5 215.1C289.4 214.8 289.1 214.6 288.8 214.3C289.4 214.5 290 214.6 290.7 214.6C291 214.6 291.3 214.6 291.5 214.4C291.7 214.2 291.7 213.8 291.6 213.5C291.4 213.2 291.2 213.1 290.9 213C291.3 212.9 291.7 212.9 292 212.6C292.3 212.4 292.5 211.9 292.3 211.5C292.1 211.1 291.5 211 291 211C291.3 210.5 291.6 210 291.7 209.5C291.8 208.9 291.5 208.3 291 208.1C290.3 207.8 289.6 208.4 289.1 208.9C289.3 208 288.6 207.1 287.7 207C286.8 206.9 285.9 207.6 285.8 208.5C285.3 207.7 284.5 207.1 283.6 207.2C282.7 207.3 282 208.4 282.5 209.2C281.9 208.8 280.9 209.2 280.7 209.9C280.5 210.6 281 211.5 281.7 211.6"
          fill="#00F1C2"
        />
        <path
          d="M284.4 216.5C285.2 215.6 286.6 215.3 287.7 215.8C288.3 216 289 216.4 289.4 216C289.6 215.8 289.6 215.4 289.5 215.1C289.4 214.8 289.1 214.6 288.8 214.3C289.4 214.5 290 214.6 290.7 214.6C291 214.6 291.3 214.6 291.5 214.4C291.7 214.2 291.7 213.8 291.6 213.5C291.4 213.2 291.2 213.1 290.9 213C291.3 212.9 291.7 212.9 292 212.6C292.3 212.4 292.5 211.9 292.3 211.5C292.1 211.1 291.5 211 291 211C291.3 210.5 291.6 210 291.7 209.5C291.8 208.9 291.5 208.3 291 208.1C290.3 207.8 289.6 208.4 289.1 208.9C289.3 208 288.6 207.1 287.7 207C286.8 206.9 285.9 207.6 285.8 208.5C285.3 207.7 284.5 207.1 283.6 207.2C282.7 207.3 282 208.4 282.5 209.2C281.9 208.8 280.9 209.2 280.7 209.9C280.5 210.6 281 211.5 281.7 211.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M91.3998 139.2C91.6998 138.2 91.6998 137 91.1998 136.1C90.5998 135.2 89.2998 134.7 88.3998 135.3C88.2998 134.2 87.1998 133.3 86.0998 133.3C84.9998 133.3 83.8998 134 83.3998 134.9C82.3998 134.4 81.1998 134.1 80.1998 134.3C79.0998 134.6 78.1998 135.5 78.0998 136.7C76.7998 136.5 75.4998 137.2 74.8998 138.4C74.3998 139.6 74.6998 141.1 75.6998 141.9C74.6998 142.2 74.0998 143.3 74.3998 144.3C74.6998 145.3 75.9998 145.8 76.8998 145.4C76.5998 145.9 76.7998 146.5 77.0998 146.9C77.4998 147.3 77.9998 147.5 78.4998 147.5C79.5998 147.6 80.6998 147.3 81.5998 146.6C82.5998 148.3 85.1998 148.6 86.4998 147.3"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M91.3998 139.2C91.6998 138.2 91.6998 137 91.1998 136.1C90.5998 135.2 89.2998 134.7 88.3998 135.3C88.2998 134.2 87.1998 133.3 86.0998 133.3C84.9998 133.3 83.8998 134 83.3998 134.9C82.3998 134.4 81.1998 134.1 80.1998 134.3C79.0998 134.6 78.1998 135.5 78.0998 136.7C76.7998 136.5 75.4998 137.2 74.8998 138.4C74.3998 139.6 74.6998 141.1 75.6998 141.9C74.6998 142.2 74.0998 143.3 74.3998 144.3C74.6998 145.3 75.9998 145.8 76.8998 145.4C76.5998 145.9 76.7998 146.5 77.0998 146.9C77.4998 147.3 77.9998 147.5 78.4998 147.5C79.5998 147.6 80.6998 147.3 81.5998 146.6C82.5998 148.3 85.1998 148.6 86.4998 147.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M85.8999 147.7C86.3999 149.1 87.0999 150.4 87.7999 151.7C87.6999 152 87.2999 152.2 86.9999 152.1C86.6999 152 86.3999 151.8 86.1999 151.5C85.9999 151.2 85.7999 151 85.4999 150.8C85.3999 151.1 85.2999 151.4 85.0999 151.6C84.8999 151.8 84.5999 152 84.2999 152C83.7999 152 83.4999 151.4 83.2999 150.9C82.9999 151.4 82.3999 151.8 81.7999 152C81.6999 152 81.4999 152.1 81.3999 152C81.0999 151.9 80.9999 151.7 80.8999 151.4C80.7999 151.1 80.8999 150.9 80.8999 150.6C81.0999 149.4 81.3999 148.3 81.8999 147.2"
          fill="#ED5A88"
        />
        <path
          d="M85.8999 147.7C86.3999 149.1 87.0999 150.4 87.7999 151.7C87.6999 152 87.2999 152.2 86.9999 152.1C86.6999 152 86.3999 151.8 86.1999 151.5C85.9999 151.2 85.7999 151 85.4999 150.8C85.3999 151.1 85.2999 151.4 85.0999 151.6C84.8999 151.8 84.5999 152 84.2999 152C83.7999 152 83.4999 151.4 83.2999 150.9C82.9999 151.4 82.3999 151.8 81.7999 152C81.6999 152 81.4999 152.1 81.3999 152C81.0999 151.9 80.9999 151.7 80.8999 151.4C80.7999 151.1 80.8999 150.9 80.8999 150.6C81.0999 149.4 81.3999 148.3 81.8999 147.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M85.1995 148.2C85.9995 147.3 87.3995 147 88.4995 147.5C89.0995 147.7 89.7995 148.1 90.1995 147.7C90.3995 147.5 90.3995 147.1 90.2995 146.8C90.1995 146.5 89.8995 146.3 89.5995 146C90.1995 146.2 90.7995 146.3 91.4995 146.3C91.7995 146.3 92.0995 146.3 92.2995 146.1C92.4995 145.9 92.4995 145.5 92.3995 145.2C92.1995 144.9 91.9995 144.8 91.6995 144.7C92.0995 144.6 92.4995 144.6 92.7995 144.3C93.0995 144 93.2995 143.6 93.0995 143.2C92.8995 142.8 92.2995 142.7 91.7995 142.7C92.0995 142.2 92.3995 141.7 92.4995 141.2C92.5995 140.6 92.2995 140 91.7995 139.8C91.0995 139.5 90.3995 140.1 89.8995 140.6C90.0995 139.7 89.3995 138.8 88.4995 138.7C87.5995 138.6 86.6995 139.3 86.5995 140.2C86.0995 139.4 85.2995 138.8 84.3995 138.9C83.4995 139 82.7995 140.1 83.2995 140.9C82.6995 140.5 81.6995 140.9 81.4995 141.6C81.2995 142.3 81.7995 143.2 82.4995 143.3"
          fill="#00F1C2"
        />
        <path
          d="M85.1995 148.2C85.9995 147.3 87.3995 147 88.4995 147.5C89.0995 147.7 89.7995 148.1 90.1995 147.7C90.3995 147.5 90.3995 147.1 90.2995 146.8C90.1995 146.5 89.8995 146.3 89.5995 146C90.1995 146.2 90.7995 146.3 91.4995 146.3C91.7995 146.3 92.0995 146.3 92.2995 146.1C92.4995 145.9 92.4995 145.5 92.3995 145.2C92.1995 144.9 91.9995 144.8 91.6995 144.7C92.0995 144.6 92.4995 144.6 92.7995 144.3C93.0995 144 93.2995 143.6 93.0995 143.2C92.8995 142.8 92.2995 142.7 91.7995 142.7C92.0995 142.2 92.3995 141.7 92.4995 141.2C92.5995 140.6 92.2995 140 91.7995 139.8C91.0995 139.5 90.3995 140.1 89.8995 140.6C90.0995 139.7 89.3995 138.8 88.4995 138.7C87.5995 138.6 86.6995 139.3 86.5995 140.2C86.0995 139.4 85.2995 138.8 84.3995 138.9C83.4995 139 82.7995 140.1 83.2995 140.9C82.6995 140.5 81.6995 140.9 81.4995 141.6C81.2995 142.3 81.7995 143.2 82.4995 143.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M170.1 218.1C169.8 217.1 169.8 215.9 170.3 215C170.9 214.1 172.2 213.6 173.1 214.2C173.2 213.1 174.3 212.2 175.4 212.2C176.5 212.2 177.6 212.9 178.1 213.8C179.1 213.3 180.3 213 181.3 213.2C182.4 213.5 183.3 214.4 183.4 215.6C184.7 215.4 186 216.1 186.6 217.3C187.1 218.5 186.8 220 185.8 220.8C186.8 221.1 187.4 222.2 187.1 223.2C186.8 224.2 185.5 224.7 184.6 224.3C184.9 224.8 184.7 225.4 184.4 225.8C184 226.2 183.5 226.4 183 226.4C181.9 226.5 180.8 226.2 179.9 225.5C178.9 227.2 176.3 227.5 175 226.2"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M170.1 218.1C169.8 217.1 169.8 215.9 170.3 215C170.9 214.1 172.2 213.6 173.1 214.2C173.2 213.1 174.3 212.2 175.4 212.2C176.5 212.2 177.6 212.9 178.1 213.8C179.1 213.3 180.3 213 181.3 213.2C182.4 213.5 183.3 214.4 183.4 215.6C184.7 215.4 186 216.1 186.6 217.3C187.1 218.5 186.8 220 185.8 220.8C186.8 221.1 187.4 222.2 187.1 223.2C186.8 224.2 185.5 224.7 184.6 224.3C184.9 224.8 184.7 225.4 184.4 225.8C184 226.2 183.5 226.4 183 226.4C181.9 226.5 180.8 226.2 179.9 225.5C178.9 227.2 176.3 227.5 175 226.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M175.501 226.6C175.001 228 174.301 229.3 173.601 230.6C173.701 230.9 174.101 231.1 174.401 231C174.701 230.9 175.001 230.7 175.201 230.4C175.401 230.1 175.601 229.9 175.901 229.7C176.001 230 176.101 230.3 176.301 230.5C176.501 230.7 176.801 230.9 177.101 230.9C177.601 230.9 177.901 230.3 178.101 229.8C178.401 230.3 179.001 230.7 179.601 230.9C179.701 230.9 179.901 231 180.001 230.9C180.301 230.8 180.401 230.6 180.501 230.3C180.601 230 180.501 229.8 180.501 229.5C180.301 228.3 180.001 227.2 179.501 226.1"
          fill="#ED5A88"
        />
        <path
          d="M175.501 226.6C175.001 228 174.301 229.3 173.601 230.6C173.701 230.9 174.101 231.1 174.401 231C174.701 230.9 175.001 230.7 175.201 230.4C175.401 230.1 175.601 229.9 175.901 229.7C176.001 230 176.101 230.3 176.301 230.5C176.501 230.7 176.801 230.9 177.101 230.9C177.601 230.9 177.901 230.3 178.101 229.8C178.401 230.3 179.001 230.7 179.601 230.9C179.701 230.9 179.901 231 180.001 230.9C180.301 230.8 180.401 230.6 180.501 230.3C180.601 230 180.501 229.8 180.501 229.5C180.301 228.3 180.001 227.2 179.501 226.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M176.2 227.1C175.4 226.2 174 225.9 172.9 226.4C172.3 226.6 171.6 227 171.2 226.6C171 226.4 171 226 171.1 225.7C171.2 225.4 171.5 225.2 171.8 224.9C171.2 225.1 170.6 225.2 169.9 225.2C169.6 225.2 169.3 225.2 169.1 225C168.9 224.8 168.9 224.4 169 224.1C169.1 223.8 169.4 223.7 169.7 223.6C169.3 223.5 168.9 223.5 168.6 223.2C168.3 222.9 168.1 222.5 168.3 222.1C168.5 221.7 169.1 221.6 169.6 221.6C169.3 221.1 169 220.6 168.9 220.1C168.8 219.6 169.1 218.9 169.6 218.7C170.3 218.4 171 219 171.5 219.5C171.3 218.6 172 217.7 172.9 217.6C173.8 217.5 174.7 218.2 174.8 219.1C175.3 218.3 176.1 217.7 177 217.8C177.9 217.9 178.6 219 178.1 219.8C178.7 219.4 179.7 219.8 179.9 220.5C180.1 221.2 179.6 222.1 178.9 222.2"
          fill="#00F1C2"
        />
        <path
          d="M176.2 227.1C175.4 226.2 174 225.9 172.9 226.4C172.3 226.6 171.6 227 171.2 226.6C171 226.4 171 226 171.1 225.7C171.2 225.4 171.5 225.2 171.8 224.9C171.2 225.1 170.6 225.2 169.9 225.2C169.6 225.2 169.3 225.2 169.1 225C168.9 224.8 168.9 224.4 169 224.1C169.1 223.8 169.4 223.7 169.7 223.6C169.3 223.5 168.9 223.5 168.6 223.2C168.3 222.9 168.1 222.5 168.3 222.1C168.5 221.7 169.1 221.6 169.6 221.6C169.3 221.1 169 220.6 168.9 220.1C168.8 219.6 169.1 218.9 169.6 218.7C170.3 218.4 171 219 171.5 219.5C171.3 218.6 172 217.7 172.9 217.6C173.8 217.5 174.7 218.2 174.8 219.1C175.3 218.3 176.1 217.7 177 217.8C177.9 217.9 178.6 219 178.1 219.8C178.7 219.4 179.7 219.8 179.9 220.5C180.1 221.2 179.6 222.1 178.9 222.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M193.2 226.2C193.5 225.2 193.5 224 193 223.1C192.5 222.2 191.1 221.7 190.2 222.3C190.1 221.2 189 220.3 187.9 220.3C186.8 220.3 185.7 221 185.2 221.9C184.2 221.4 183 221.1 182 221.3C180.9 221.6 180 222.5 179.9 223.7C178.6 223.5 177.3 224.2 176.7 225.4C176.2 226.6 176.5 228.1 177.5 228.9C176.5 229.2 175.9 230.3 176.2 231.3C176.5 232.3 177.8 232.8 178.7 232.4C178.4 232.9 178.6 233.5 178.9 233.9C179.2 234.3 179.8 234.5 180.3 234.5C181.4 234.6 182.5 234.3 183.4 233.6C184.4 235.3 187 235.6 188.3 234.3"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M193.2 226.2C193.5 225.2 193.5 224 193 223.1C192.5 222.2 191.1 221.7 190.2 222.3C190.1 221.2 189 220.3 187.9 220.3C186.8 220.3 185.7 221 185.2 221.9C184.2 221.4 183 221.1 182 221.3C180.9 221.6 180 222.5 179.9 223.7C178.6 223.5 177.3 224.2 176.7 225.4C176.2 226.6 176.5 228.1 177.5 228.9C176.5 229.2 175.9 230.3 176.2 231.3C176.5 232.3 177.8 232.8 178.7 232.4C178.4 232.9 178.6 233.5 178.9 233.9C179.2 234.3 179.8 234.5 180.3 234.5C181.4 234.6 182.5 234.3 183.4 233.6C184.4 235.3 187 235.6 188.3 234.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M187.799 234.7C188.299 236.1 188.999 237.4 189.699 238.7C189.599 239 189.199 239.2 188.899 239.1C188.599 239 188.299 238.8 188.099 238.5C187.899 238.2 187.699 238 187.399 237.8C187.299 238.1 187.199 238.4 186.999 238.6C186.799 238.8 186.499 239 186.199 239C185.699 239 185.399 238.4 185.199 237.9C184.899 238.4 184.299 238.8 183.699 239C183.599 239 183.399 239.1 183.299 239C182.999 238.9 182.899 238.7 182.799 238.4C182.699 238.1 182.799 237.9 182.799 237.6C182.999 236.4 183.299 235.3 183.799 234.2"
          fill="#ED5A88"
        />
        <path
          d="M187.799 234.7C188.299 236.1 188.999 237.4 189.699 238.7C189.599 239 189.199 239.2 188.899 239.1C188.599 239 188.299 238.8 188.099 238.5C187.899 238.2 187.699 238 187.399 237.8C187.299 238.1 187.199 238.4 186.999 238.6C186.799 238.8 186.499 239 186.199 239C185.699 239 185.399 238.4 185.199 237.9C184.899 238.4 184.299 238.8 183.699 239C183.599 239 183.399 239.1 183.299 239C182.999 238.9 182.899 238.7 182.799 238.4C182.699 238.1 182.799 237.9 182.799 237.6C182.999 236.4 183.299 235.3 183.799 234.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M187.1 235.2C187.9 234.3 189.3 234 190.4 234.5C191 234.7 191.7 235.1 192.1 234.7C192.3 234.5 192.3 234.1 192.2 233.8C192.1 233.5 191.8 233.3 191.5 233C192.1 233.2 192.7 233.3 193.4 233.3C193.7 233.3 194 233.3 194.2 233.1C194.4 232.9 194.4 232.5 194.3 232.2C194.2 231.9 193.9 231.8 193.6 231.7C194 231.6 194.4 231.6 194.7 231.3C195 231 195.2 230.6 195 230.2C194.8 229.8 194.2 229.7 193.7 229.7C194 229.2 194.3 228.7 194.4 228.2C194.5 227.6 194.2 227 193.7 226.8C193 226.5 192.3 227.1 191.8 227.6C192 226.7 191.3 225.8 190.4 225.7C189.5 225.6 188.6 226.3 188.5 227.2C188 226.4 187.2 225.8 186.3 225.9C185.4 226 184.7 227.1 185.2 227.9C184.6 227.5 183.6 227.9 183.4 228.6C183.2 229.3 183.7 230.2 184.4 230.3"
          fill="#00F1C2"
        />
        <path
          d="M187.1 235.2C187.9 234.3 189.3 234 190.4 234.5C191 234.7 191.7 235.1 192.1 234.7C192.3 234.5 192.3 234.1 192.2 233.8C192.1 233.5 191.8 233.3 191.5 233C192.1 233.2 192.7 233.3 193.4 233.3C193.7 233.3 194 233.3 194.2 233.1C194.4 232.9 194.4 232.5 194.3 232.2C194.2 231.9 193.9 231.8 193.6 231.7C194 231.6 194.4 231.6 194.7 231.3C195 231 195.2 230.6 195 230.2C194.8 229.8 194.2 229.7 193.7 229.7C194 229.2 194.3 228.7 194.4 228.2C194.5 227.6 194.2 227 193.7 226.8C193 226.5 192.3 227.1 191.8 227.6C192 226.7 191.3 225.8 190.4 225.7C189.5 225.6 188.6 226.3 188.5 227.2C188 226.4 187.2 225.8 186.3 225.9C185.4 226 184.7 227.1 185.2 227.9C184.6 227.5 183.6 227.9 183.4 228.6C183.2 229.3 183.7 230.2 184.4 230.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M166.5 114.3C166.2 113.4 166.2 112.4 166.7 111.6C167.2 110.8 168.3 110.4 169.1 110.9C169.2 110 170.1 109.2 171.1 109.2C172.1 109.2 173 109.8 173.4 110.6C174.2 110.1 175.2 109.9 176.2 110.1C177.1 110.3 177.9 111.2 178 112.1C179.1 111.9 180.3 112.5 180.7 113.5C181.2 114.5 180.8 115.8 180 116.5C180.8 116.7 181.4 117.7 181.1 118.6C180.8 119.4 179.8 119.9 179 119.5C179.2 119.9 179.1 120.4 178.8 120.7C178.5 121 178 121.2 177.6 121.2C176.7 121.3 175.7 121 175 120.4C174.2 121.8 172 122.1 170.8 121"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M166.5 114.3C166.2 113.4 166.2 112.4 166.7 111.6C167.2 110.8 168.3 110.4 169.1 110.9C169.2 110 170.1 109.2 171.1 109.2C172.1 109.2 173 109.8 173.4 110.6C174.2 110.1 175.2 109.9 176.2 110.1C177.1 110.3 177.9 111.2 178 112.1C179.1 111.9 180.3 112.5 180.7 113.5C181.2 114.5 180.8 115.8 180 116.5C180.8 116.7 181.4 117.7 181.1 118.6C180.8 119.4 179.8 119.9 179 119.5C179.2 119.9 179.1 120.4 178.8 120.7C178.5 121 178 121.2 177.6 121.2C176.7 121.3 175.7 121 175 120.4C174.2 121.8 172 122.1 170.8 121"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M171.2 121.6C170.7 122.8 170.2 123.9 169.6 125C169.7 125.3 170 125.4 170.3 125.3C170.6 125.2 170.8 125 171 124.8C171.2 124.6 171.3 124.3 171.6 124.2C171.7 124.5 171.8 124.7 171.9 124.9C172 125.1 172.3 125.3 172.6 125.2C173 125.2 173.3 124.7 173.4 124.2C173.7 124.6 174.2 125 174.7 125.1C174.8 125.1 175 125.2 175.1 125.1C175.3 125 175.5 124.8 175.5 124.6C175.5 124.4 175.5 124.2 175.5 123.9C175.3 122.9 175 121.9 174.7 121"
          fill="#ED5A88"
        />
        <path
          d="M171.2 121.6C170.7 122.8 170.2 123.9 169.6 125C169.7 125.3 170 125.4 170.3 125.3C170.6 125.2 170.8 125 171 124.8C171.2 124.6 171.3 124.3 171.6 124.2C171.7 124.5 171.8 124.7 171.9 124.9C172 125.1 172.3 125.3 172.6 125.2C173 125.2 173.3 124.7 173.4 124.2C173.7 124.6 174.2 125 174.7 125.1C174.8 125.1 175 125.2 175.1 125.1C175.3 125 175.5 124.8 175.5 124.6C175.5 124.4 175.5 124.2 175.5 123.9C175.3 122.9 175 121.9 174.7 121"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M171.8 122C171.1 121.3 169.9 121 169 121.4C168.5 121.6 167.9 121.9 167.6 121.5C167.4 121.3 167.4 121 167.5 120.7C167.6 120.4 167.8 120.2 168.1 120C167.6 120.2 167 120.2 166.5 120.2C166.3 120.2 166 120.2 165.9 120C165.7 119.8 165.7 119.5 165.9 119.3C166 119.1 166.3 118.9 166.5 118.9C166.2 118.8 165.8 118.8 165.5 118.6C165.2 118.4 165 118 165.2 117.7C165.4 117.3 165.9 117.3 166.3 117.3C166 116.9 165.7 116.5 165.7 116C165.7 115.5 165.8 115 166.3 114.8C166.9 114.6 167.5 115.1 167.9 115.5C167.8 114.7 168.3 113.9 169.1 113.8C169.9 113.7 170.6 114.3 170.7 115.1C171.1 114.4 171.8 113.9 172.6 114C173.4 114.1 174 115 173.6 115.7C174.1 115.4 174.9 115.7 175.2 116.3C175.4 116.9 175 117.6 174.3 117.7"
          fill="#00F1C2"
        />
        <path
          d="M171.8 122C171.1 121.3 169.9 121 169 121.4C168.5 121.6 167.9 121.9 167.6 121.5C167.4 121.3 167.4 121 167.5 120.7C167.6 120.4 167.8 120.2 168.1 120C167.6 120.2 167 120.2 166.5 120.2C166.3 120.2 166 120.2 165.9 120C165.7 119.8 165.7 119.5 165.9 119.3C166 119.1 166.3 118.9 166.5 118.9C166.2 118.8 165.8 118.8 165.5 118.6C165.2 118.4 165 118 165.2 117.7C165.4 117.3 165.9 117.3 166.3 117.3C166 116.9 165.7 116.5 165.7 116C165.7 115.5 165.8 115 166.3 114.8C166.9 114.6 167.5 115.1 167.9 115.5C167.8 114.7 168.3 113.9 169.1 113.8C169.9 113.7 170.6 114.3 170.7 115.1C171.1 114.4 171.8 113.9 172.6 114C173.4 114.1 174 115 173.6 115.7C174.1 115.4 174.9 115.7 175.2 116.3C175.4 116.9 175 117.6 174.3 117.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M176.299 242.6C177.699 243.9 180.299 243.5 181.199 241.9C181.999 242.6 183.199 242.9 184.299 242.8C184.799 242.7 185.399 242.6 185.699 242.2C186.099 241.8 186.199 241.2 185.899 240.7C186.799 241.1 188.099 240.6 188.399 239.6C188.699 238.6 188.099 237.5 187.099 237.2C188.099 236.4 188.499 234.9 187.899 233.7C187.399 232.5 185.999 231.8 184.699 232C184.699 230.9 183.699 229.9 182.599 229.6C181.499 229.3 180.299 229.6 179.399 230.2C178.799 229.2 177.799 228.5 176.699 228.6C175.599 228.6 174.499 229.5 174.399 230.6C173.499 230 172.199 230.5 171.599 231.4C170.999 232.3 171.099 233.5 171.399 234.5C171.399 234.5 168.699 235.5 170.599 238.4C170.599 238.4 172.399 240 173.399 238.6C173.399 238.6 171.899 239.9 173.499 241.9C175.299 244 176.299 242.6 176.299 242.6Z"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M176.899 243.1C176.399 244.5 175.699 245.8 174.999 247.1C175.099 247.4 175.499 247.6 175.799 247.5C176.099 247.4 176.399 247.2 176.599 246.9C176.799 246.6 176.999 246.4 177.299 246.2C177.399 246.5 177.499 246.8 177.699 247C177.899 247.2 178.199 247.4 178.499 247.4C178.999 247.4 179.299 246.8 179.499 246.3C179.799 246.8 180.399 247.2 180.999 247.4C181.099 247.4 181.299 247.5 181.399 247.4C181.699 247.3 181.799 247.1 181.899 246.8C181.999 246.5 181.899 246.3 181.899 246C181.699 244.8 181.399 243.7 180.899 242.6"
          fill="#ED5A88"
        />
        <path
          d="M176.899 243.1C176.399 244.5 175.699 245.8 174.999 247.1C175.099 247.4 175.499 247.6 175.799 247.5C176.099 247.4 176.399 247.2 176.599 246.9C176.799 246.6 176.999 246.4 177.299 246.2C177.399 246.5 177.499 246.8 177.699 247C177.899 247.2 178.199 247.4 178.499 247.4C178.999 247.4 179.299 246.8 179.499 246.3C179.799 246.8 180.399 247.2 180.999 247.4C181.099 247.4 181.299 247.5 181.399 247.4C181.699 247.3 181.799 247.1 181.899 246.8C181.999 246.5 181.899 246.3 181.899 246C181.699 244.8 181.399 243.7 180.899 242.6"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M179.5 240.1C179.2 239.1 179.2 237.9 179.7 237C180.2 236.1 181.6 235.6 182.5 236.2C182.6 235.1 183.7 234.2 184.8 234.2C185.9 234.2 187 234.9 187.5 235.8C188.5 235.3 189.7 235 190.7 235.2C191.8 235.5 192.7 236.4 192.8 237.6C194.1 237.4 195.4 238.1 196 239.3C196.5 240.5 196.2 242 195.2 242.8C196.2 243.1 196.8 244.2 196.5 245.2C196.2 246.2 194.9 246.7 194 246.3C194.3 246.8 194.1 247.4 193.8 247.8C193.4 248.2 192.9 248.4 192.4 248.4C191.3 248.5 190.2 248.2 189.3 247.5C188.3 249.2 185.7 249.5 184.4 248.2"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M179.5 240.1C179.2 239.1 179.2 237.9 179.7 237C180.2 236.1 181.6 235.6 182.5 236.2C182.6 235.1 183.7 234.2 184.8 234.2C185.9 234.2 187 234.9 187.5 235.8C188.5 235.3 189.7 235 190.7 235.2C191.8 235.5 192.7 236.4 192.8 237.6C194.1 237.4 195.4 238.1 196 239.3C196.5 240.5 196.2 242 195.2 242.8C196.2 243.1 196.8 244.2 196.5 245.2C196.2 246.2 194.9 246.7 194 246.3C194.3 246.8 194.1 247.4 193.8 247.8C193.4 248.2 192.9 248.4 192.4 248.4C191.3 248.5 190.2 248.2 189.3 247.5C188.3 249.2 185.7 249.5 184.4 248.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M184.9 248.6C184.4 250 183.7 251.3 183 252.6C183.1 252.9 183.5 253.1 183.8 253C184.1 252.9 184.4 252.7 184.6 252.4C184.8 252.1 185 251.9 185.3 251.7C185.4 252 185.5 252.3 185.7 252.5C185.9 252.7 186.2 252.9 186.5 252.9C187 252.9 187.3 252.3 187.5 251.8C187.8 252.3 188.4 252.7 189 252.9C189.1 252.9 189.3 253 189.4 252.9C189.7 252.8 189.8 252.6 189.9 252.3C190 252 189.9 251.8 189.9 251.5C189.7 250.3 189.4 249.2 188.9 248.1"
          fill="#ED5A88"
        />
        <path
          d="M184.9 248.6C184.4 250 183.7 251.3 183 252.6C183.1 252.9 183.5 253.1 183.8 253C184.1 252.9 184.4 252.7 184.6 252.4C184.8 252.1 185 251.9 185.3 251.7C185.4 252 185.5 252.3 185.7 252.5C185.9 252.7 186.2 252.9 186.5 252.9C187 252.9 187.3 252.3 187.5 251.8C187.8 252.3 188.4 252.7 189 252.9C189.1 252.9 189.3 253 189.4 252.9C189.7 252.8 189.8 252.6 189.9 252.3C190 252 189.9 251.8 189.9 251.5C189.7 250.3 189.4 249.2 188.9 248.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M185.6 249.1C184.8 248.2 183.4 247.9 182.3 248.4C181.7 248.6 181 249 180.6 248.6C180.4 248.4 180.4 248 180.5 247.7C180.6 247.4 180.9 247.2 181.2 246.9C180.6 247.1 180 247.2 179.3 247.2C179 247.2 178.7 247.2 178.5 247C178.3 246.8 178.3 246.4 178.4 246.1C178.6 245.8 178.8 245.7 179.1 245.6C178.7 245.5 178.3 245.5 178 245.2C177.7 245 177.5 244.5 177.7 244.1C177.9 243.7 178.5 243.6 179 243.6C178.7 243.1 178.4 242.6 178.3 242.1C178.2 241.5 178.5 240.9 179 240.7C179.7 240.4 180.4 241 180.9 241.5C180.7 240.6 181.4 239.7 182.3 239.6C183.2 239.5 184.1 240.2 184.2 241.1C184.7 240.3 185.5 239.7 186.4 239.8C187.3 239.9 188 241 187.5 241.8C188.1 241.4 189.1 241.8 189.3 242.5C189.5 243.2 189 244.1 188.3 244.2C188.3 244.2 191.7 243.9 189.2 247.5C186.7 251.1 185.6 249.1 185.6 249.1Z"
          fill="#00F1C2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M257.3 174.3C257.6 173.3 257.6 172.1 257.1 171.2C256.5 170.3 255.2 169.8 254.3 170.4C254.2 169.3 253.1 168.4 252 168.4C250.9 168.4 249.8 169.1 249.3 170C248.3 169.5 247.1 169.2 246.1 169.4C245.1 169.6 244.1 170.6 244 171.8C242.7 171.6 241.4 172.3 240.8 173.5C240.3 174.7 240.6 176.2 241.6 177C240.6 177.3 240 178.4 240.3 179.4C240.6 180.4 241.9 180.9 242.8 180.5C242.5 181 242.7 181.6 243 182C243.4 182.4 243.9 182.6 244.4 182.6C245.5 182.7 246.6 182.4 247.5 181.7C248.5 183.4 251.1 183.7 252.4 182.4"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M257.3 174.3C257.6 173.3 257.6 172.1 257.1 171.2C256.5 170.3 255.2 169.8 254.3 170.4C254.2 169.3 253.1 168.4 252 168.4C250.9 168.4 249.8 169.1 249.3 170C248.3 169.5 247.1 169.2 246.1 169.4C245.1 169.6 244.1 170.6 244 171.8C242.7 171.6 241.4 172.3 240.8 173.5C240.3 174.7 240.6 176.2 241.6 177C240.6 177.3 240 178.4 240.3 179.4C240.6 180.4 241.9 180.9 242.8 180.5C242.5 181 242.7 181.6 243 182C243.4 182.4 243.9 182.6 244.4 182.6C245.5 182.7 246.6 182.4 247.5 181.7C248.5 183.4 251.1 183.7 252.4 182.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M251.9 182.8C252.4 184.2 253.1 185.5 253.8 186.8C253.7 187.1 253.3 187.3 253 187.2C252.7 187.1 252.4 186.9 252.2 186.6C252 186.3 251.8 186.1 251.5 185.9C251.4 186.2 251.3 186.5 251.1 186.7C250.9 186.9 250.6 187.1 250.3 187.1C249.8 187.1 249.5 186.5 249.3 186C249 186.5 248.4 186.9 247.8 187.1C247.7 187.1 247.5 187.2 247.4 187.1C247.1 187 247 186.8 246.9 186.5C246.8 186.2 246.9 186 246.9 185.7C247.1 184.5 247.4 183.4 247.9 182.3"
          fill="#ED5A88"
        />
        <path
          d="M251.9 182.8C252.4 184.2 253.1 185.5 253.8 186.8C253.7 187.1 253.3 187.3 253 187.2C252.7 187.1 252.4 186.9 252.2 186.6C252 186.3 251.8 186.1 251.5 185.9C251.4 186.2 251.3 186.5 251.1 186.7C250.9 186.9 250.6 187.1 250.3 187.1C249.8 187.1 249.5 186.5 249.3 186C249 186.5 248.4 186.9 247.8 187.1C247.7 187.1 247.5 187.2 247.4 187.1C247.1 187 247 186.8 246.9 186.5C246.8 186.2 246.9 186 246.9 185.7C247.1 184.5 247.4 183.4 247.9 182.3"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M251.201 183.3C252.001 182.4 253.4 182.1 254.5 182.6C255.1 182.8 255.801 183.2 256.201 182.8C256.401 182.6 256.4 182.2 256.3 181.9C256.2 181.6 255.901 181.4 255.601 181.1C256.201 181.3 256.8 181.4 257.5 181.4C257.8 181.4 258.1 181.4 258.3 181.2C258.5 181 258.5 180.6 258.4 180.3C258.2 180 258.001 179.9 257.701 179.8C258.101 179.7 258.5 179.7 258.8 179.4C259.1 179.2 259.301 178.7 259.101 178.3C258.901 177.9 258.3 177.8 257.8 177.8C258.1 177.3 258.4 176.8 258.5 176.3C258.6 175.7 258.3 175.1 257.8 174.9C257.1 174.6 256.4 175.2 255.9 175.7C256.1 174.8 255.4 173.9 254.5 173.8C253.6 173.7 252.701 174.4 252.601 175.3C252.101 174.5 251.3 173.9 250.4 174C249.5 174.1 248.8 175.2 249.3 176C248.7 175.6 247.7 176 247.5 176.7C247.3 177.4 247.8 178.3 248.5 178.4"
          fill="#00F1C2"
        />
        <path
          d="M251.201 183.3C252.001 182.4 253.4 182.1 254.5 182.6C255.1 182.8 255.801 183.2 256.201 182.8C256.401 182.6 256.4 182.2 256.3 181.9C256.2 181.6 255.901 181.4 255.601 181.1C256.201 181.3 256.8 181.4 257.5 181.4C257.8 181.4 258.1 181.4 258.3 181.2C258.5 181 258.5 180.6 258.4 180.3C258.2 180 258.001 179.9 257.701 179.8C258.101 179.7 258.5 179.7 258.8 179.4C259.1 179.2 259.301 178.7 259.101 178.3C258.901 177.9 258.3 177.8 257.8 177.8C258.1 177.3 258.4 176.8 258.5 176.3C258.6 175.7 258.3 175.1 257.8 174.9C257.1 174.6 256.4 175.2 255.9 175.7C256.1 174.8 255.4 173.9 254.5 173.8C253.6 173.7 252.701 174.4 252.601 175.3C252.101 174.5 251.3 173.9 250.4 174C249.5 174.1 248.8 175.2 249.3 176C248.7 175.6 247.7 176 247.5 176.7C247.3 177.4 247.8 178.3 248.5 178.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M265.1 182.4C265.4 181.4 265.4 180.2 264.9 179.3C264.4 178.4 263 177.9 262.1 178.5C262 177.4 260.9 176.5 259.8 176.5C258.7 176.5 257.6 177.2 257.1 178.1C256.1 177.6 254.9 177.3 253.9 177.5C252.8 177.8 251.9 178.7 251.8 179.9C250.5 179.7 249.2 180.4 248.6 181.6C248.1 182.8 248.4 184.3 249.4 185.1C248.4 185.4 247.8 186.5 248.1 187.5C248.4 188.5 249.7 189 250.6 188.6C250.3 189.1 250.5 189.7 250.8 190.1C251.2 190.5 251.7 190.7 252.2 190.7C253.3 190.8 254.4 190.5 255.3 189.8C256.3 191.5 258.9 191.8 260.2 190.5"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M265.1 182.4C265.4 181.4 265.4 180.2 264.9 179.3C264.4 178.4 263 177.9 262.1 178.5C262 177.4 260.9 176.5 259.8 176.5C258.7 176.5 257.6 177.2 257.1 178.1C256.1 177.6 254.9 177.3 253.9 177.5C252.8 177.8 251.9 178.7 251.8 179.9C250.5 179.7 249.2 180.4 248.6 181.6C248.1 182.8 248.4 184.3 249.4 185.1C248.4 185.4 247.8 186.5 248.1 187.5C248.4 188.5 249.7 189 250.6 188.6C250.3 189.1 250.5 189.7 250.8 190.1C251.2 190.5 251.7 190.7 252.2 190.7C253.3 190.8 254.4 190.5 255.3 189.8C256.3 191.5 258.9 191.8 260.2 190.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M259.7 190.9C260.2 192.3 260.9 193.6 261.6 194.9C261.5 195.2 261.1 195.4 260.8 195.3C260.5 195.2 260.2 195 260 194.7C259.8 194.4 259.6 194.2 259.3 194C259.2 194.3 259.1 194.6 258.9 194.8C258.7 195 258.4 195.2 258.1 195.2C257.6 195.2 257.3 194.6 257.1 194.1C256.8 194.6 256.2 195 255.6 195.2C255.5 195.2 255.3 195.3 255.2 195.2C254.9 195.1 254.8 194.9 254.7 194.6C254.6 194.3 254.7 194.1 254.7 193.8C254.9 192.6 255.2 191.5 255.7 190.4"
          fill="#ED5A88"
        />
        <path
          d="M259.7 190.9C260.2 192.3 260.9 193.6 261.6 194.9C261.5 195.2 261.1 195.4 260.8 195.3C260.5 195.2 260.2 195 260 194.7C259.8 194.4 259.6 194.2 259.3 194C259.2 194.3 259.1 194.6 258.9 194.8C258.7 195 258.4 195.2 258.1 195.2C257.6 195.2 257.3 194.6 257.1 194.1C256.8 194.6 256.2 195 255.6 195.2C255.5 195.2 255.3 195.3 255.2 195.2C254.9 195.1 254.8 194.9 254.7 194.6C254.6 194.3 254.7 194.1 254.7 193.8C254.9 192.6 255.2 191.5 255.7 190.4"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M259 191.4C259.8 190.5 261.2 190.2 262.3 190.7C262.9 190.9 263.6 191.3 264 190.9C264.2 190.7 264.2 190.3 264.1 190C264 189.7 263.7 189.5 263.4 189.2C264 189.4 264.6 189.5 265.3 189.5C265.6 189.5 265.9 189.5 266.1 189.3C266.3 189.1 266.3 188.7 266.2 188.4C266 188.1 265.8 188 265.5 187.9C265.9 187.8 266.3 187.8 266.6 187.5C266.9 187.3 267.1 186.8 266.9 186.4C266.7 186 266.1 185.9 265.6 185.9C265.9 185.4 266.2 184.9 266.3 184.4C266.4 183.8 266.1 183.2 265.6 183C264.9 182.7 264.2 183.3 263.7 183.8C263.9 182.9 263.2 182 262.3 181.9C261.4 181.8 260.5 182.5 260.4 183.4C259.9 182.6 259.1 182 258.2 182.1C257.3 182.2 256.6 183.3 257.1 184.1C256.5 183.7 255.5 184.1 255.3 184.8C255.1 185.5 255.6 186.4 256.3 186.5"
          fill="#00F1C2"
        />
        <path
          d="M259 191.4C259.8 190.5 261.2 190.2 262.3 190.7C262.9 190.9 263.6 191.3 264 190.9C264.2 190.7 264.2 190.3 264.1 190C264 189.7 263.7 189.5 263.4 189.2C264 189.4 264.6 189.5 265.3 189.5C265.6 189.5 265.9 189.5 266.1 189.3C266.3 189.1 266.3 188.7 266.2 188.4C266 188.1 265.8 188 265.5 187.9C265.9 187.8 266.3 187.8 266.6 187.5C266.9 187.3 267.1 186.8 266.9 186.4C266.7 186 266.1 185.9 265.6 185.9C265.9 185.4 266.2 184.9 266.3 184.4C266.4 183.8 266.1 183.2 265.6 183C264.9 182.7 264.2 183.3 263.7 183.8C263.9 182.9 263.2 182 262.3 181.9C261.4 181.8 260.5 182.5 260.4 183.4C259.9 182.6 259.1 182 258.2 182.1C257.3 182.2 256.6 183.3 257.1 184.1C256.5 183.7 255.5 184.1 255.3 184.8C255.1 185.5 255.6 186.4 256.3 186.5"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M234 183.1C233.7 182.1 233.7 180.9 234.2 180C234.8 179.1 236.1 178.6 237 179.2C237.1 178.1 238.2 177.2 239.3 177.2C240.4 177.2 241.5 177.9 242 178.8C243 178.3 244.2 178 245.2 178.2C246.3 178.5 247.2 179.4 247.3 180.6C248.6 180.4 249.9 181.1 250.5 182.3C251 183.5 250.7 185 249.7 185.8C250.7 186.1 251.3 187.2 251 188.2C250.7 189.2 249.4 189.7 248.5 189.3C248.8 189.8 248.6 190.4 248.3 190.8C247.9 191.2 247.4 191.4 246.9 191.4C245.8 191.5 244.7 191.2 243.8 190.5C242.8 192.2 240.2 192.5 238.9 191.2"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
        />
        <path
          d="M234 183.1C233.7 182.1 233.7 180.9 234.2 180C234.8 179.1 236.1 178.6 237 179.2C237.1 178.1 238.2 177.2 239.3 177.2C240.4 177.2 241.5 177.9 242 178.8C243 178.3 244.2 178 245.2 178.2C246.3 178.5 247.2 179.4 247.3 180.6C248.6 180.4 249.9 181.1 250.5 182.3C251 183.5 250.7 185 249.7 185.8C250.7 186.1 251.3 187.2 251 188.2C250.7 189.2 249.4 189.7 248.5 189.3C248.8 189.8 248.6 190.4 248.3 190.8C247.9 191.2 247.4 191.4 246.9 191.4C245.8 191.5 244.7 191.2 243.8 190.5C242.8 192.2 240.2 192.5 238.9 191.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M239.4 191.6C238.9 193 238.2 194.3 237.5 195.6C237.6 195.9 238 196.1 238.3 196C238.6 195.9 238.9 195.7 239.1 195.4C239.3 195.1 239.5 194.9 239.8 194.7C239.9 195 240 195.3 240.2 195.5C240.4 195.7 240.7 195.9 241 195.9C241.5 195.9 241.8 195.3 242 194.8C242.3 195.3 242.9 195.7 243.5 195.9C243.6 195.9 243.8 196 243.9 195.9C244.2 195.8 244.3 195.6 244.4 195.3C244.5 195 244.4 194.8 244.4 194.5C244.2 193.3 243.9 192.2 243.4 191.1"
          fill="#ED5A88"
        />
        <path
          d="M239.4 191.6C238.9 193 238.2 194.3 237.5 195.6C237.6 195.9 238 196.1 238.3 196C238.6 195.9 238.9 195.7 239.1 195.4C239.3 195.1 239.5 194.9 239.8 194.7C239.9 195 240 195.3 240.2 195.5C240.4 195.7 240.7 195.9 241 195.9C241.5 195.9 241.8 195.3 242 194.8C242.3 195.3 242.9 195.7 243.5 195.9C243.6 195.9 243.8 196 243.9 195.9C244.2 195.8 244.3 195.6 244.4 195.3C244.5 195 244.4 194.8 244.4 194.5C244.2 193.3 243.9 192.2 243.4 191.1"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M240.1 192.1C239.3 191.2 237.9 190.9 236.8 191.4C236.2 191.6 235.5 192 235.1 191.6C234.9 191.4 234.9 191 235 190.7C235.1 190.4 235.4 190.2 235.7 189.9C235.1 190.1 234.5 190.2 233.8 190.2C233.5 190.2 233.2 190.2 233 190C232.8 189.8 232.8 189.4 232.9 189.1C233.1 188.8 233.3 188.7 233.6 188.6C233.2 188.5 232.8 188.5 232.5 188.2C232.2 187.9 232 187.5 232.2 187.1C232.4 186.7 233 186.6 233.5 186.6C233.2 186.1 232.9 185.6 232.8 185.1C232.7 184.5 233 183.9 233.5 183.7C234.2 183.4 234.9 184 235.4 184.5C235.2 183.6 235.9 182.7 236.8 182.6C237.7 182.5 238.6 183.2 238.7 184.1C239.2 183.3 240 182.7 240.9 182.8C241.8 182.9 242.5 184 242 184.8C242.6 184.4 243.6 184.8 243.8 185.5C244 186.2 243.5 187.1 242.8 187.2"
          fill="#00F1C2"
        />
        <path
          d="M240.1 192.1C239.3 191.2 237.9 190.9 236.8 191.4C236.2 191.6 235.5 192 235.1 191.6C234.9 191.4 234.9 191 235 190.7C235.1 190.4 235.4 190.2 235.7 189.9C235.1 190.1 234.5 190.2 233.8 190.2C233.5 190.2 233.2 190.2 233 190C232.8 189.8 232.8 189.4 232.9 189.1C233.1 188.8 233.3 188.7 233.6 188.6C233.2 188.5 232.8 188.5 232.5 188.2C232.2 187.9 232 187.5 232.2 187.1C232.4 186.7 233 186.6 233.5 186.6C233.2 186.1 232.9 185.6 232.8 185.1C232.7 184.5 233 183.9 233.5 183.7C234.2 183.4 234.9 184 235.4 184.5C235.2 183.6 235.9 182.7 236.8 182.6C237.7 182.5 238.6 183.2 238.7 184.1C239.2 183.3 240 182.7 240.9 182.8C241.8 182.9 242.5 184 242 184.8C242.6 184.4 243.6 184.8 243.8 185.5C244 186.2 243.5 187.1 242.8 187.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M210.3 278.1C211.3 279 213 278.8 213.7 277.6C214.3 278.1 215.1 278.3 215.8 278.2C216.2 278.2 216.5 278 216.8 277.8C217.1 277.5 217.2 277.1 217 276.8C217.6 277.1 218.5 276.7 218.7 276.1C218.9 275.4 218.5 274.6 217.8 274.4C218.5 273.8 218.7 272.8 218.4 272C218 271.2 217.1 270.7 216.2 270.9C216.2 270.1 215.5 269.5 214.8 269.3C214 269.1 213.2 269.3 212.6 269.7C212.2 269 211.5 268.6 210.7 268.6C209.9 268.6 209.2 269.2 209.1 270C208.5 269.6 207.6 269.9 207.2 270.5C206.8 271.1 206.8 271.9 207 272.7C207 272.7 205.1 273.4 206.5 275.4C206.5 275.4 207.7 276.5 208.4 275.6C208.4 275.6 207.3 276.5 208.5 277.9C209.6 279 210.3 278.1 210.3 278.1Z"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M210.8 278.4C210.4 279.3 210 280.3 209.5 281.2C209.5 281.4 209.8 281.5 210 281.5C210.2 281.4 210.4 281.3 210.5 281.1C210.6 280.9 210.8 280.7 211 280.6C211.1 280.8 211.1 281 211.3 281.2C211.5 281.4 211.6 281.5 211.9 281.5C212.3 281.5 212.5 281.1 212.6 280.7C212.8 281.1 213.2 281.3 213.6 281.4C213.7 281.4 213.8 281.4 213.9 281.4C214.1 281.4 214.2 281.2 214.2 281C214.2 280.8 214.2 280.6 214.2 280.5C214.1 279.7 213.8 278.9 213.5 278.2"
          fill="#ED5A88"
        />
        <path
          d="M210.8 278.4C210.4 279.3 210 280.3 209.5 281.2C209.5 281.4 209.8 281.5 210 281.5C210.2 281.4 210.4 281.3 210.5 281.1C210.6 280.9 210.8 280.7 211 280.6C211.1 280.8 211.1 281 211.3 281.2C211.5 281.4 211.6 281.5 211.9 281.5C212.3 281.5 212.5 281.1 212.6 280.7C212.8 281.1 213.2 281.3 213.6 281.4C213.7 281.4 213.8 281.4 213.9 281.4C214.1 281.4 214.2 281.2 214.2 281C214.2 280.8 214.2 280.6 214.2 280.5C214.1 279.7 213.8 278.9 213.5 278.2"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M240.3 294.5C241.3 295.4 243 295.2 243.7 294C244.3 294.5 245.1 294.7 245.8 294.6C246.2 294.6 246.5 294.4 246.8 294.2C247.1 294 247.2 293.5 247 293.2C247.6 293.5 248.5 293.1 248.7 292.5C248.9 291.8 248.5 291 247.8 290.8C248.5 290.2 248.7 289.2 248.4 288.4C248 287.6 247.1 287.1 246.2 287.3C246.2 286.5 245.5 285.9 244.8 285.7C244 285.5 243.2 285.7 242.6 286.1C242.2 285.4 241.5 285 240.7 285C239.9 285 239.2 285.6 239.1 286.4C238.5 286 237.6 286.3 237.2 286.9C236.8 287.5 236.8 288.3 237 289.1C237 289.1 235.1 289.8 236.5 291.8C236.5 291.8 237.7 292.9 238.4 292C238.4 292 237.3 292.9 238.5 294.3C239.6 295.5 240.3 294.5 240.3 294.5Z"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M240.7 294.9C240.3 295.8 239.9 296.8 239.4 297.7C239.4 297.9 239.7 298 239.9 298C240.1 297.9 240.3 297.8 240.4 297.6C240.5 297.4 240.7 297.2 240.9 297.1C241 297.3 241 297.5 241.2 297.7C241.3 297.9 241.5 298 241.8 298C242.2 298 242.4 297.6 242.5 297.2C242.7 297.6 243.1 297.8 243.5 297.9C243.6 297.9 243.7 297.9 243.8 297.9C244 297.9 244.1 297.7 244.1 297.5C244.1 297.3 244.1 297.1 244.1 297C244 296.2 243.7 295.4 243.4 294.7"
          fill="#ED5A88"
        />
        <path
          d="M240.7 294.9C240.3 295.8 239.9 296.8 239.4 297.7C239.4 297.9 239.7 298 239.9 298C240.1 297.9 240.3 297.8 240.4 297.6C240.5 297.4 240.7 297.2 240.9 297.1C241 297.3 241 297.5 241.2 297.7C241.3 297.9 241.5 298 241.8 298C242.2 298 242.4 297.6 242.5 297.2C242.7 297.6 243.1 297.8 243.5 297.9C243.6 297.9 243.7 297.9 243.8 297.9C244 297.9 244.1 297.7 244.1 297.5C244.1 297.3 244.1 297.1 244.1 297C244 296.2 243.7 295.4 243.4 294.7"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M368.4 377.9C369.4 378.8 371.1 378.6 371.8 377.4C372.4 377.9 373.2 378.1 373.9 378C374.3 378 374.6 377.8 374.9 377.6C375.2 377.4 375.3 376.9 375.1 376.6C375.7 376.9 376.6 376.5 376.8 375.9C377 375.2 376.6 374.4 375.9 374.2C376.6 373.6 376.8 372.6 376.5 371.8C376.1 371 375.2 370.5 374.3 370.7C374.3 369.9 373.6 369.3 372.9 369.1C372.1 368.9 371.3 369.1 370.7 369.5C370.3 368.8 369.6 368.4 368.8 368.4C368 368.4 367.3 369 367.2 369.8C366.6 369.4 365.7 369.7 365.3 370.3C364.9 370.9 364.9 371.7 365.1 372.5C365.1 372.5 363.2 373.2 364.6 375.2C364.6 375.2 365.8 376.3 366.5 375.4C366.5 375.4 365.4 376.3 366.6 377.7C367.7 378.8 368.4 377.9 368.4 377.9Z"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M368.8 378.2C368.4 379.1 368 380.1 367.5 381C367.5 381.2 367.8 381.3 368 381.3C368.2 381.2 368.4 381.1 368.5 380.9C368.6 380.7 368.8 380.5 369 380.4C369.1 380.6 369.1 380.8 369.3 381C369.5 381.2 369.6 381.3 369.9 381.3C370.3 381.3 370.5 380.9 370.6 380.5C370.8 380.9 371.2 381.1 371.6 381.2C371.7 381.2 371.8 381.2 371.9 381.2C372.1 381.2 372.2 381 372.2 380.8C372.2 380.6 372.2 380.4 372.2 380.3C372.1 379.5 371.8 378.7 371.5 378"
          fill="#ED5A88"
        />
        <path
          d="M368.8 378.2C368.4 379.1 368 380.1 367.5 381C367.5 381.2 367.8 381.3 368 381.3C368.2 381.2 368.4 381.1 368.5 380.9C368.6 380.7 368.8 380.5 369 380.4C369.1 380.6 369.1 380.8 369.3 381C369.5 381.2 369.6 381.3 369.9 381.3C370.3 381.3 370.5 380.9 370.6 380.5C370.8 380.9 371.2 381.1 371.6 381.2C371.7 381.2 371.8 381.2 371.9 381.2C372.1 381.2 372.2 381 372.2 380.8C372.2 380.6 372.2 380.4 372.2 380.3C372.1 379.5 371.8 378.7 371.5 378"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M492 403.8C493 404.7 494.7 404.5 495.4 403.3C496 403.8 496.8 404 497.5 403.9C497.9 403.9 498.2 403.7 498.5 403.5C498.8 403.3 498.9 402.8 498.7 402.5C499.3 402.8 500.2 402.4 500.4 401.8C500.6 401.1 500.2 400.3 499.5 400.1C500.2 399.5 500.4 398.5 500.1 397.7C499.7 396.9 498.8 396.4 497.9 396.6C497.9 395.8 497.2 395.2 496.5 395C495.7 394.8 494.9 395 494.3 395.4C493.9 394.7 493.2 394.3 492.4 394.3C491.6 394.3 490.9 394.9 490.8 395.7C490.2 395.3 489.3 395.6 488.9 396.2C488.5 396.8 488.5 397.6 488.7 398.4C488.7 398.4 486.8 399.1 488.2 401.1C488.2 401.1 489.4 402.2 490.1 401.3C490.1 401.3 489 402.2 490.2 403.6C491.3 404.8 492 403.8 492 403.8Z"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M492.401 404.2C492.001 405.1 491.601 406.1 491.101 407C491.101 407.2 491.401 407.3 491.601 407.3C491.801 407.2 492.001 407.1 492.101 406.9C492.201 406.7 492.401 406.5 492.601 406.4C492.701 406.6 492.701 406.8 492.901 407C493.001 407.2 493.201 407.3 493.501 407.3C493.901 407.3 494.101 406.9 494.201 406.5C494.401 406.9 494.801 407.1 495.201 407.2C495.301 407.2 495.401 407.2 495.501 407.2C495.701 407.2 495.801 407 495.801 406.8C495.801 406.6 495.801 406.4 495.801 406.3C495.701 405.5 495.401 404.7 495.101 404"
          fill="#ED5A88"
        />
        <path
          d="M492.401 404.2C492.001 405.1 491.601 406.1 491.101 407C491.101 407.2 491.401 407.3 491.601 407.3C491.801 407.2 492.001 407.1 492.101 406.9C492.201 406.7 492.401 406.5 492.601 406.4C492.701 406.6 492.701 406.8 492.901 407C493.001 407.2 493.201 407.3 493.501 407.3C493.901 407.3 494.101 406.9 494.201 406.5C494.401 406.9 494.801 407.1 495.201 407.2C495.301 407.2 495.401 407.2 495.501 407.2C495.701 407.2 495.801 407 495.801 406.8C495.801 406.6 495.801 406.4 495.801 406.3C495.701 405.5 495.401 404.7 495.101 404"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M161.199 153.9C162.199 154.8 163.899 154.6 164.599 153.4C165.199 153.9 165.999 154.1 166.699 154C167.099 154 167.399 153.8 167.699 153.6C167.999 153.3 168.099 152.9 167.899 152.6C168.499 152.9 169.399 152.5 169.599 151.9C169.799 151.2 169.399 150.4 168.699 150.2C169.399 149.6 169.599 148.6 169.299 147.8C168.899 147 167.999 146.5 167.099 146.7C167.099 145.9 166.399 145.3 165.699 145.1C164.899 144.9 164.099 145.1 163.499 145.5C163.099 144.8 162.399 144.4 161.599 144.4C160.799 144.4 160.099 145 159.999 145.8C159.399 145.4 158.499 145.7 158.099 146.3C157.699 146.9 157.699 147.7 157.899 148.5C157.899 148.5 155.999 149.2 157.399 151.2C157.399 151.2 158.599 152.3 159.299 151.4C159.299 151.4 158.199 152.3 159.399 153.7C160.599 155.1 161.199 153.9 161.199 153.9Z"
          fill="#6ECCC9"
          class="alberello pointer-events-none"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M161.6 154.2C161.2 155.1 160.8 156.1 160.3 157C160.3 157.2 160.6 157.3 160.8 157.3C161 157.2 161.2 157.1 161.3 156.9C161.4 156.7 161.6 156.5 161.8 156.4C161.9 156.6 161.9 156.8 162.1 157C162.2 157.2 162.4 157.3 162.7 157.3C163.1 157.3 163.3 156.9 163.4 156.5C163.6 156.9 164 157.1 164.4 157.2C164.5 157.2 164.6 157.2 164.7 157.2C164.9 157.2 165 157 165 156.8C165 156.6 165 156.4 165 156.3C164.9 155.5 164.6 154.7 164.3 154"
          fill="#ED5A88"
        />
        <path
          d="M161.6 154.2C161.2 155.1 160.8 156.1 160.3 157C160.3 157.2 160.6 157.3 160.8 157.3C161 157.2 161.2 157.1 161.3 156.9C161.4 156.7 161.6 156.5 161.8 156.4C161.9 156.6 161.9 156.8 162.1 157C162.2 157.2 162.4 157.3 162.7 157.3C163.1 157.3 163.3 156.9 163.4 156.5C163.6 156.9 164 157.1 164.4 157.2C164.5 157.2 164.6 157.2 164.7 157.2C164.9 157.2 165 157 165 156.8C165 156.6 165 156.4 165 156.3C164.9 155.5 164.6 154.7 164.3 154"
          stroke="black"
          stroke-width="0.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <MobileMap v-if="miniMap" @expand-map="miniMap = $event" @reset-array="communitiesToDisplay = $event" />
      <div class="welcome-labels-wrapper absolute w-[50%] z-90">
        <div
          class="
            welcome-labels-wrapper-two
            relative
            w-full
            h-full
            flex
            items-center
            justify-center
            pb-32
          "
        >
          <p class="welcome-label welcome-label-first absolute text-center">
            Welcome to the SpaghettETH website!
          </p>
          <p v-if="!isMobile" class="welcome-label welcome-label-second absolute flex text-center">
            Hover
            <span
              ><img class="intro-icon" src="../assets/images/hoverIcon.png"
            /></span>
            to discover, Tap
            <span
              ><img class="intro-icon" src="../assets/images/tapIcon.png"
            /></span>
            to choose!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
//global variables
section {
  overflow: hidden;
  background-color: transparent;

  & p {
    color: white;
  }
}

.map{
  @media(max-width:640px){
    width: 90%;
  }
}

.active {
  opacity: 1 !important;
  color: white !important;
}
.cancel {
  display: none;
}

.region {
  cursor: pointer;
  pointer-events: all;
  &:hover {
    opacity: 0.9;
  }
}

.italian-map-label {
  color: #f2f2f2;
  font-family: MonsterratBold;
  font-size: 8rem;
  color: rgb(23, 23, 23);
  position: absolute;
  max-width: 90%;
  text-align: center;
  top: 25%;

  @media(max-width:1023px){
    font-size: 6rem;
  }
  @media(max-width:640px){
    font-size: 3rem;
  }
}

.welcome-label {
  font-family: MonsterratRegular;
  font-size: 2rem;
}

.welcome-label-second {
  opacity: 0;
}

.intro-icon {
  height: 40px;
  width: auto;
}

.hidden {
  display: none;
  transition: all 0.3s ease-in-out;
}

.communities-wrapper {
  margin-bottom: 10%;
  & li:not(:first-child) {
    margin-left: 15px;
  }
}
</style>