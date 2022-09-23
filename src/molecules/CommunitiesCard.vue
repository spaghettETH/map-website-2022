<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CommunitiesCard",
  props: { name: { type: String, default: "Eth Turin" } ,focus: { type: String, default: "Eth Turin" } },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<template>
  <li class="community-card p-4">
    <h1 class="community-name">{{ name }}</h1>
    <p class="community-focus">Focus:{{ focus }}</p>
  </li>
</template>

<style scoped>
.community-card {
  background-color: rgb(58, 58, 58);
  max-width: 350px;
  min-width: 350px;
  min-height: 350px;
  border-radius: 10px;
  color: white;
}

.community-name{
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
</style>