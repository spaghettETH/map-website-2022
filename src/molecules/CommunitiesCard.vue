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
    telegram: { type: String, require:true },
    discord: { type: String, require:true },
    twitter: { type: String, require:true },
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
      <h1 class="community-name">{{ name }}</h1>
      <p class="community-focus">Membri: {{ membri }}</p>
      <p class="community-focus">Focus: {{ focus }}</p>
      <p class="community-focus">Meet: {{ meet }}</p>
      <p class="community-focus">Format: {{ format }}</p>
      <p class="community-focus">Progetti: {{ progetti }}</p>
      <div class="social-wrapper w-[50%] mt-[4%] flex justify-between">
        <a v-if="discord.length > 1" :href="discord" target="_blank">
            <img src="../assets/svg/discordIcon.svg" />
        </a>
        <a v-if="telegram.length > 1" :href="telegram" target="_blank">
            <img src="../assets/svg/telegramIcon.svg" />
        </a>
        <a v-if="twitter.length > 1" :href='twitter' target="_blank">
            <img src="../assets/svg/twitterIcon.svg" />
        </a>
        <img src="../assets/svg/websiteIcon.svg" />
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.community-card {
  background-color: rgb(58, 58, 58);
  max-width: 350px;
  min-width: 350px;
  min-height: 350px;
  border-radius: 10px;
  color: white;
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
}

.social-wrapper {
  & img {
    cursor: pointer;
    height: 25px;
  }
}
</style>