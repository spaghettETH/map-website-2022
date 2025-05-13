<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { parseMarkdown } from '../utils/markdown';

export default defineComponent({
  name: "SlidesArchive",
  setup() {
    const slides = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();

    onMounted(async () => {
      try {
        console.log("Iniziando il caricamento degli slides...");
        // Cambiato il percorso da 'blogposts' a 'slideposts'
        const files = import.meta.glob('/public/slideposts/*.md', { as: 'raw', eager: true });
        console.log("File trovati:", Object.keys(files));
        
        const slidesList = Object.entries(files).map(([path, content]) => {
          console.log("Elaborazione file:", path);
          console.log("Contenuto raw:", content);
          
          if (path.includes('README.md')) {
            return null; // Ignorare il file README.md
          }
          
          try {
            const parsedContent = parseMarkdown(content);
            const slug = path.split('/').pop().replace('.md', '');
            
            return {
              slug,
              title: parsedContent.data.title || 'Slide senza titolo',
              date: parsedContent.data.date || new Date().toISOString().split('T')[0],
              description: parsedContent.data.description || 'Nessuna descrizione disponibile',
              author: parsedContent.data.author || 'SpaghettETH Team',
              tags: parsedContent.data.tags || [],
              content: parsedContent.content
            };
          } catch (err) {
            console.error("Errore nella elaborazione del file:", path, err);
            return null;
          }
        }).filter(Boolean); // Rimuove gli elementi nulli
        
        slidesList.sort((a, b) => new Date(b.date) - new Date(a.date));
        slides.value = slidesList;
      } catch (err) {
        console.error("Errore nel caricamento degli slides:", err);
        error.value = err;
      } finally {
        loading.value = false;
      }
    });

    const goToSlide = (slug) => {
      router.push(`/slides-archive/${slug}`);
    };

    const goToHome = () => {
      router.push('/menu');
    };

    return {
      slides,
      loading,
      error,
      goToSlide,
      goToHome
    };
  }
});
</script>

<template>
  <div class="slides-archive min-h-screen bg-black text-white p-8 overflow-y-auto">
    <button 
      @click="goToHome" 
      class="back-btn mb-12 flex items-center text-white"
    >
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna al Menu
    </button>

    <article class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-black mb-6 gradient-text text-center">
        Archivio<br/>Slides SpaghettETH
      </h1>
      
      <p class="text-center mb-12 text-gray-400">
        Esplora le presentazioni dei nostri eventi e conferenze. 
        <a href="https://github.com/spaghettETH/map-website-2022/tree/develop/public/slideposts" 
           class="text-cyan-400 hover:text-cyan-300 transition-colors">
          Vuoi contribuire con le tue slides? Segui le indicazioni su GitHub
        </a>
        e inviaci una email.
      </p>

      <div v-if="loading" class="text-center py-16">
        <div class="loader"></div>
        <p class="mt-4 text-gray-400">Caricamento slides in corso...</p>
      </div>

      <div v-else-if="error" class="error-container">
        <p>Si è verificato un errore nel caricamento degli slides.</p>
        <p class="text-red-400">{{ error.message }}</p>
      </div>

      <div v-else-if="slides.length === 0" class="empty-container">
        <p class="text-xl text-center">Nessuna slide disponibile al momento.</p>
        <p class="text-center mt-4">Torna presto, stiamo lavorando per aggiungere contenuti!</p>
      </div>

      <div v-else class="grid gap-8 md:grid-cols-2">
        <div 
          v-for="slide in slides" 
          :key="slide.slug"
          class="slide-card"
          @click="goToSlide(slide.slug)"
        >
          <div class="slide-date">{{ new Date(slide.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'short', day: 'numeric' }) }}</div>
          <h2 class="slide-title">{{ slide.title }}</h2>
          <div class="slide-author">{{ slide.author }}</div>
          <p class="slide-description">{{ slide.description }}</p>
          
          <div class="flex flex-wrap gap-2 mt-4">
            <span 
              v-for="tag in slide.tags"
              :key="tag"
              class="tag"
            >
              #{{ tag }}
            </span>
          </div>
          
          <div class="read-more">
            Leggi slides →
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.slides-archive {
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

.slide-card {
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      #f99bc0,
      #0ef9c2
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: scaleX(1);
    }
    
    .read-more {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.slide-date {
  font-size: 0.85rem;
  color: #01fbc5;
  margin-bottom: 0.75rem;
  font-family: MonsterratMedium;
}

.slide-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: MonsterratBold;
  color: white;
  line-height: 1.3;
}

.slide-author {
  font-size: 0.9rem;
  color: #f99bc0;
  margin-bottom: 1rem;
  font-family: MonsterratMedium;
}

.slide-description {
  font-size: 1rem;
  color: #aabbc1;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(249, 155, 192, 0.1);
  border: 1px solid rgba(249, 155, 192, 0.2);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #f99bc0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(249, 155, 192, 0.2);
  }
}

.read-more {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.75rem 1.5rem;
  background: rgba(1, 251, 197, 0.1);
  color: #01fbc5;
  font-family: MonsterratBold;
  font-size: 0.9rem;
  border-top-left-radius: 16px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
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

.error-container, .empty-container {
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
}
</style>