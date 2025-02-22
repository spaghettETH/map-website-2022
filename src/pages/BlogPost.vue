<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { matter } from '../utils/markdown';
import { marked } from 'marked';

export default defineComponent({
  name: "BlogPost",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const post = ref(null);

    onMounted(async () => {
      try {
        const slug = route.params.slug;
        const postModule = await import(/* @vite-ignore */ `/public/blogposts/${slug}.md?raw`);
        const content = postModule.default;
        const { data: frontmatter, content: markdownContent } = matter(content);
        
        post.value = {
          ...frontmatter,
          content: marked(markdownContent)
        };
      } catch (error) {
        console.error('Errore nel caricamento del post:', error);
        router.push('/blog');
      }
    });

    const goToBlog = () => {
      router.push('/blog');
    };

    return {
      post,
      goToBlog
    };
  }
});
</script>

<template>
  <div v-if="post" class="blog-post min-h-screen bg-black text-white p-8 overflow-y-auto">
    <button 
      @click="goToBlog" 
      class="back-btn mb-12 flex items-center text-white"
    >
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna al Blog
    </button>

    <article class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-black mb-6 gradient-text">{{ post.title }}</h1>
      
      <div class="mb-12 text-gray-400 flex items-center space-x-6">
        <span class="text-pink-400 font-thin">{{ new Date(post.date).toLocaleDateString('it-IT') }}</span>
        <span class="text-cyan-400 font-regular">{{ post.author }}</span>
      </div>

      <div 
        class="prose prose-invert prose-lg max-w-none"
        v-html="post.content"
      ></div>
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
  position: relative;
  padding-bottom: 2px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      #f99bc0,
      #0ef9c2
    );
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
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
}
</style> 