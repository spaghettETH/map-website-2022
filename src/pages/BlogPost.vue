<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { marked } from 'marked';

export default defineComponent({
  name: "BlogPost",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const post = ref(null);
    const content = ref('');

    onMounted(() => {
      try {
        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        post.value = posts.find(p => p.slug === route.params.slug);
        
        if (post.value) {
          content.value = marked(post.value.content);
        } else {
          router.push('/blog');
        }
      } catch (error) {
        console.error('Errore nel recupero del post:', error);
        router.push('/blog');
      }
    });

    const goBack = () => {
      router.push('/blog');
    };

    return {
      post,
      content,
      goBack
    };
  }
});
</script>

<template>
  <div class="blog-post min-h-screen bg-black text-white p-8 overflow-y-auto relative">
    <button @click="goBack" class="back-btn mb-8 flex items-center text-white sticky top-8 z-10">
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna al Blog
    </button>

    <article v-if="post" class="max-w-4xl mx-auto pb-20">
      <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
      <div class="mb-8 text-gray-400">
        <span>{{ new Date(post.date).toLocaleDateString() }}</span>
        <span class="mx-2">•</span>
        <span>{{ post.author }}</span>
      </div>
      <div class="prose prose-invert max-w-none prose-img:rounded-xl prose-img:w-full">
        <div v-html="content"></div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.blog-post {
  font-family: MonsterratRegular;
  background: radial-gradient(circle at center, rgba(15,15,15,1) 0%, rgba(0,0,0,1) 100%);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.gradient-text {
  font-family: MonsterratBlack;
  background: linear-gradient(
    85.18deg,
    #f99bc0 34.19%,
    #aabbc1 54.56%,
    #0ef9c2 72.58%,
    #01fec2 119.57%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.back-btn {
  font-family: MonsterratBold;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  position: sticky;
  top: 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  z-index: 10;

  &:hover {
    opacity: 0.8;
  }

  .back-icon img {
    height: 20px;
  }
}

:deep(.prose) {
  font-family: MonsterratRegular;
  color: #f2f2f2;

  h2, h3, h4 {
    font-family: MonsterratBold;
    background: linear-gradient(
      85.18deg,
      #f99bc0 0%,
      #0ef9c2 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-family: MonsterratRegular;
    margin: 1.5rem 0;
  }

  strong {
    font-family: MonsterratBold;
    color: #f99bc0;
  }

  a {
    color: #0ef9c2;
    text-decoration: none;
    position: relative;
    padding-bottom: 2px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #0ef9c2;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  code {
    background: rgba(58, 58, 58, 0.8);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  pre {
    background: rgba(20, 20, 20, 0.9) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    
    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left-color: #f99bc0;
    background: rgba(249, 155, 192, 0.1);
    border-radius: 0 8px 8px 0;
    padding: 1rem 1.5rem;
  }

  img {
    width: 100%;
    border-radius: 0.75rem;
    margin: 2rem 0;
  }
}
</style> 