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
        
        const postEntries = Object.entries(postFiles).map(([path, content]) => {
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
      class="back-btn mb-8 flex items-center text-white sticky top-8 z-10"
    >
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna al Menu
    </button>

    <div class="max-w-4xl mx-auto pb-20">
      <h1 class="text-4xl font-bold mb-12">Blog</h1>
      
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
          class="post-card cursor-pointer"
        >
          <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
          <div class="text-gray-400 mb-4">
            <span>{{ new Date(post.date).toLocaleDateString() }}</span>
            <span class="mx-2">•</span>
            <span>{{ post.author }}</span>
          </div>
          <p class="text-gray-300">{{ post.description }}</p>
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

.post-card {
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(25, 25, 25, 0.9);
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
}
</style>