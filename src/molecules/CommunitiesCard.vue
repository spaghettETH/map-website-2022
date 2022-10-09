<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CommunitiesCard",
  props: {
    name: { type: String, default: "Eth Turin" },
    focus: { type: String, default: "Eth Turin" },
    meet: { type: String, default: "Eth Turin" },
    format: { type: String, default: "Eth Turin" },
    progetti: { type: String, default: "Eth Turin" },
    membri: { type: Number, default: 1 },
    telegram: { type: String, require: true },
    discord: { type: String, require: true },
    twitter: { type: String, require: true },
    website: { type: String, require: true },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<template>
  <li class="community-card p-4">
    <div class="content w-full h-full flex flex-col justify-between">
      <h1 class="community-name capitalize">{{ name }}</h1>
      <p class="community-focus capitalize">
        <span>Membri:</span> {{ membri }}
      </p>
      <p class="community-focus capitalize"><span>Focus:</span> {{ focus }}</p>
      <p class="community-focus capitalize"><span>Meet:</span> {{ meet }}</p>
      <p class="community-focus capitalize">
        <span>Format:</span> {{ format }}
      </p>
      <p class="community-focus capitalize">
        <span>Progetti:</span> {{ progetti }}
      </p>
      <div class="social-wrapper mt-[4%] flex justify-between">
        <a v-if="discord.length > 1" :href="discord" target="_blank">
          <img class="discord-icon" src="../assets/images/discordIcon.png" />
        </a>
        <a v-if="telegram.length > 1" :href="telegram" target="_blank">
          <img src="../assets/images/telegramIcon.png" />
        </a>
        <a v-if="twitter.length > 1" :href="twitter" target="_blank">
          <img src="../assets/images/twitterIcon.png" />
        </a>
        <a v-if="website.length > 1" :href="website" target="_blank">
          <img src="../assets/svg/websiteIcon.svg" />
        </a>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.community-card {
  background-color: rgb(58, 58, 58);
  max-width: 350px;
  min-width: 350px;
  min-height: 450px;
  border-radius: 10px;
  color: white;
  overflow: hidden;

  @media (max-width: 640px) {
    max-width: 275px;
    min-width: 275px;
  }
}

.community-name {
  color: white;
  font-weight: bold;
  background: linear-gradient(
    50.18deg,
    #f99bc0 10%,
    #0ef9c2 54%,
    #0ef9c2 72%,
    #01fec2 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.5rem;
  animation: gradient 3s linear infinite;

  @keyframes gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}

.social-wrapper {
  width: fit-content;
  & img {
    cursor: pointer;
    height: 25px;
    transition: all 0.1s ease-in;
    margin-right: .4rem;

    &:hover {
      opacity: 0.7;
    }

    /* & a :not(:last-child){
      margin-right: .3rem;
    } */
  }
}

.content {
  & p {
    & span {
      font-size: 1.2em;
      color: #f99bc0;
      font-weight: bold;
    }
  }
}
</style>