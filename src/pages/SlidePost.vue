<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { parseMarkdown } from '../utils/markdown';
import { marked } from 'marked';

export default defineComponent({
  name: "SlidePost",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const slide = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const htmlContent = ref('');

    onMounted(async () => {
      try {
        const slug = route.params.slug;
        // Cambiato il percorso da 'blogposts' a 'slideposts'
        const files = import.meta.glob('/public/slideposts/*.md', { as: 'raw', eager: true });
        const filePath = Object.keys(files).find(path => path.includes(`/${slug}.md`));
        
        if (!filePath || !files[filePath]) {
          throw new Error('Slide non trovata');
        }
        
        const content = files[filePath];
        const parsedContent = parseMarkdown(content);
        
        slide.value = {
          slug,
          title: parsedContent.data.title || 'Slide senza titolo',
          date: parsedContent.data.date || new Date().toISOString().split('T')[0],
          description: parsedContent.data.description || 'Nessuna descrizione disponibile',
          author: parsedContent.data.author || 'SpaghettETH Team',
          tags: parsedContent.data.tags || [],
          content: parsedContent.content
        };
        
        // Converte il markdown in HTML
        htmlContent.value = marked(parsedContent.content);
      } catch (err) {
        console.error("Errore nel caricamento della slide:", err);
        error.value = err;
      } finally {
        loading.value = false;
      }
    });

    const goBackToArchive = () => {
      router.push('/slides-archive');
    };

    return {
      slide,
      loading,
      error,
      htmlContent,
      goBackToArchive
    };
  }
});
</script>

<template>
  <div class="slide-post min-h-screen bg-black text-white p-8 overflow-y-auto">
    <button 
      @click="goBackToArchive" 
      class="back-btn mb-12 flex items-center text-white"
    >
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna all'Archivio Slides
    </button>

    <article v-if="slide" class="max-w-4xl mx-auto">
      <div class="mb-8">
        <div class="slide-meta mb-4">
          <span class="slide-date">{{ new Date(slide.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          <span class="mx-2">•</span>
          <span class="slide-author">{{ slide.author }}</span>
        </div>
        
        <h1 class="text-4xl font-black mb-6 gradient-text">{{ slide.title }}</h1>
        
        <p class="text-xl text-gray-300 mb-8">{{ slide.description }}</p>
        
        <div class="flex flex-wrap gap-2 mb-8">
          <span 
            v-for="tag in slide.tags"
            :key="tag"
            class="tag"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
      
      <div class="slide-content prose prose-invert prose-lg max-w-none" v-html="htmlContent"></div>
    </article>

    <div v-else-if="loading" class="text-center py-16">
      <div class="loader"></div>
      <p class="mt-4 text-gray-400">Caricamento slide in corso...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>Si è verificato un errore nel caricamento della slide.</p>
      <p class="text-red-400">{{ error.message }}</p>
      <button @click="goBackToArchive" class="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">
        Torna all'archivio
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide-post {
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

.slide-meta {
  font-size: 1rem;
  color: #aabbc1;
}

.slide-date {
  color: #01fbc5;
  font-family: MonsterratMedium;
}

.slide-author {
  color: #f99bc0;
  font-family: MonsterratMedium;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(249, 155, 192, 0.1);
  border: 1px solid rgba(249, 155, 192, 0.2);
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #f99bc0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(249, 155, 192, 0.2);
  }
}

.slide-content {
  line-height: 1.8;
  
  :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
    font-family: MonsterratBold;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  :deep(h1) {
    font-size: 2.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }
  
  :deep(h2) {
    font-size: 1.8rem;
    color: #01fbc5;
  }
  
  :deep(h3) {
    font-size: 1.5rem;
    color: #f99bc0;
  }
  
  :deep(p) {
    margin-bottom: 1.25rem;
  }
  
  :deep(a) {
    color: #01fbc5;
    text-decoration: none;
    border-bottom: 1px dashed rgba(1, 251, 197, 0.5);
    transition: all 0.2s ease;
    
    &:hover {
      border-bottom: 1px solid #01fbc5;
    }
  }
  
  :deep(ul), :deep(ol) {
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }
  
  :deep(li) {
    margin-bottom: 0.5rem;
  }
  
  :deep(blockquote) {
    border-left: 4px solid #01fbc5;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
    color: #aabbc1;
  }
  
  :deep(pre) {
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :deep(code) {
    font-family: monospace;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
  }
  
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    
    th, td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem;
      text-align: left;
    }
    
    th {
      background: rgba(0, 0, 0, 0.3);
    }
    
    tr:nth-child(even) {
      background: rgba(0, 0, 0, 0.15);
    }
  }
}

.loader {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(1, 251, 197, 0.3);
  border-radius: 50%;
  border-top-color: #01fbc5;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container {
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
}
</style> 