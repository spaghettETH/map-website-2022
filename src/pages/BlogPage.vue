<script>
import { defineComponent, onMounted, ref } from "vue";
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
        const postFiles = import.meta.glob('/public/blogposts/*.md', { 
          as: 'raw',
          eager: true 
        });
        
        const postEntries = Object.entries(postFiles)
          // Filtriamo README.md
          .filter(([path]) => !path.includes('README.md'))
          .map(([path, content]) => {
            const slug = path.split('/').pop().replace('.md', '');
            const { data: frontmatter, content: postContent } = matter(content);
            
            return {
              slug,
              ...frontmatter,
              date: new Date(frontmatter.date),
              tags: frontmatter.tags || [],
              content: postContent
            };
          });
        
        posts.value = postEntries.sort((a, b) => b.date - a.date);
        localStorage.setItem('blogPosts', JSON.stringify(posts.value));
      } catch (err) {
        console.error('Errore nel caricamento dei post:', err);
        error.value = err;
      } finally {
        loading.value = false;
      }
    });

    const goToPost = (slug) => {
      router.push({
        name: 'BlogPost',
        params: { slug }
      });
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
      class="back-btn mb-12 flex items-center text-white"
    >
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna al Menu
    </button>

    <div class="max-w-4xl mx-auto">
      <h1 class="blog-title text-5xl font-black mb-4">
        Blog<br/>SpaghettETH
      </h1>

      <p class="text-sm text-gray-400 mb-12">
        Vuoi pubblicare un articolo sul nostro blog? Segui le indicazioni su 
        <a 
          href="https://github.com/spaghettETH/map-website-2022/tree/develop/public/blogposts" 
          target="_blank"
          class="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          github
        </a> 
        e inviaci una email
      </p>

      <div v-if="loading" class="text-center py-8">
        Caricamento...
      </div>
      
      <div v-else-if="error" class="text-red-500 py-8">
        Errore nel caricamento dei post
      </div>
      
      <div v-else class="grid gap-8">
        <div 
          v-for="post in posts" 
          :key="post.slug"
          @click="goToPost(post.slug)"
          class="event-card cursor-pointer"
        >
          <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
          <p class="text-gray-400 mb-4">{{ post.description }}</p>
          <div class="event-date">
            <span>{{ new Date(post.date).toLocaleDateString() }}</span>
            <span class="mx-2">•</span>
            <span>{{ post.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-page {
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.blog-title {
  background: linear-gradient(85.18deg, #f99bc0 0%, #0ef9c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.event-card {
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateX(10px);
    background: rgba(25, 25, 25, 0.9);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
}

.event-date {
  font-family: MonsterratBold;
  color: #0ef9c2;
  font-size: 0.9rem;
}

.back-btn {
  font-family: MonsterratBold;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  .back-icon img {
    height: 20px;
  }
}
</style>