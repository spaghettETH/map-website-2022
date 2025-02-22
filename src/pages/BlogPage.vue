<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { matter } from '../utils/markdown';

export default defineComponent({
  name: "BlogPage",
  setup() {
    const router = useRouter();
    const posts = ref([]);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        console.log('Iniziando il caricamento dei post...');
        const postFiles = import.meta.glob('/public/blogposts/*.md', { as: 'raw', eager: true });
        console.log('File trovati:', Object.keys(postFiles));
        
        const postEntries = Object.entries(postFiles).map(([path, content]) => {
          console.log('Elaborazione file:', path);
          const slug = path.split('/').pop().replace('.md', '');
          console.log('Contenuto raw:', content);
          const { data: frontmatter } = matter(content);
          console.log('Frontmatter:', frontmatter);
          
          return {
            slug,
            ...frontmatter,
            date: new Date(frontmatter.date),
            tags: frontmatter.tags || []
          };
        });
        
        posts.value = postEntries.sort((a, b) => b.date - a.date);
        console.log('Post caricati:', posts.value);
      } catch (error) {
        console.error('Errore nel caricamento dei post:', error);
        error.value = error;
      } finally {
        loading.value = false;
      }
    });

    const goToPost = (slug) => {
      router.push(`/blog/${slug}`);
    };

    const goToHome = () => {
      router.push('/menu');
    };

    return {
      posts,
      loading,
      error,
      goToPost,
      goToHome
    };
  }
});
</script>

<template>
  <div class="blog-page min-h-screen bg-black text-white p-8 overflow-y-auto">
    <button 
      @click="goToHome" 
      class="back-btn mb-8 flex items-center text-white"
    >
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna al Menu
    </button>

    <h1 class="text-5xl font-black mb-12 text-center gradient-text font-black">Blog SpaghettETH</h1>

    <div v-if="loading" class="text-center">
      Caricamento post in corso...
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      Si è verificato un errore nel caricamento dei post: {{ error.message }}
    </div>

    <div v-else-if="posts.length === 0" class="text-center">
      Nessun post trovato.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article 
        v-for="post in posts" 
        :key="post.slug"
        @click="goToPost(post.slug)"
        class="blog-card cursor-pointer p-8 group hover:scale-105"
      >
        <h2 class="text-2xl font-bold mb-3 font-bold gradient-text-hover">{{ post.title }}</h2>
        <p class="text-gray-400 mb-6 font-regular">{{ post.description }}</p>
        <div class="flex justify-between items-center text-sm mb-4">
          <span class="text-pink-400 font-thin">{{ post.date.toLocaleDateString('it-IT') }}</span>
          <span class="text-cyan-400 font-regular">{{ post.author }}</span>
        </div>
        <div class="tags mt-2 space-x-2">
          <span 
            v-for="tag in post.tags" 
            :key="tag" 
            class="tag bg-gradient-to-r from-pink-400/20 to-cyan-400/20 text-white px-3 py-1 text-xs rounded-full font-thin"
          >
            #{{ tag }}
          </span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-page {
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

.gradient-text-hover {
  transition: all 0.3s ease;
  background: linear-gradient(
    85.18deg,
    #f99bc0 0%,
    #f99bc0 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.group:hover .gradient-text-hover {
  background: linear-gradient(
    85.18deg,
    #f99bc0 0%,
    #0ef9c2 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-card {
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(249, 155, 192, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: all 0.5s ease;
  }

  &:hover {
    background: rgba(25, 25, 25, 0.9);
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

    &::before {
      transform: translateX(100%);
    }
  }
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
}

.tag {
  display: inline-block;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}
</style>