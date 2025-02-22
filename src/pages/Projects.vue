<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
// Importa le immagini
import passportImg from '../assets/images/projects/passport.webp';
import radioImg from '../assets/images/projects/web3radio.webp';
import zineImg from '../assets/images/projects/zine.webp';
import mapImg from '../assets/images/projects/italymap.webp';

export default defineComponent({
  name: "Projects",
  setup() {
    const router = useRouter();

    const projects = [
      {
        title: 'Passport',
        description: 'Passport è un libretto accademico digitale decentralizzato. Ti permette di tracciare i tuoi percorsi di apprendimento nelle conferenze Web3, raccogliendo "checkpoint" basati sui talk a cui partecipi e creando così nel tempo un albero unico del tuo percorso formativo. Il Passport è anche la chiave di accesso per utilizzare le altre dapps di SpaghettETH.',
        image: new URL('../assets/images/projects/passport.webp', import.meta.url).href,
        links: [
          { text: 'Visita Passport', url: 'https://passport-spaghett-eth.com' },
          { text: '→ repo', url: 'https://github.com/spaghettETH/passport-spaghett-eth-main' }
        ],
        tags: ['Education', 'DApp', 'Web3']
      },
      {
        title: 'web3radio.it',
        description: 'La prima radio decentralizzata italiana. Una proof of concept funzionante di community-curated radio che utilizza gli smart contract per gestire le playlist e le dirette audio dal vivo.',
        image: new URL('../assets/images/projects/web3radio.webp', import.meta.url).href,
        links: [
          { text: 'Coming Soon', url: '#' }
        ],
        tags: ['Media', 'Music', 'Community']
      },
      {
        title: 'Zine',
        description: 'Ogni anno curiamo una raccolta di articoli e approfondimenti della community italiana, con l\'obiettivo di introdurre il Web3 a chi ne è ancora fuori e offrire nuove prospettive a chi già ne fa parte. Questo lavoro prende forma nella nostra Zine, un free-press cartaceo a tiratura limitata, distribuito durante le conferenze Ethereum italiane.',
        image: new URL('../assets/images/projects/zine.webp', import.meta.url).href,
        links: [
          { text: 'Zine#1', url: 'https://spaghetteth.mypinata.cloud/ipfs/bafybeigho7543eqdd5yl3zhfo3cjvzwdpwdylaafalgncffwcbposoh2py' },
          { text: 'Zine#2', url: 'https://spaghetteth.mypinata.cloud/ipfs/bafybeiaux26nuvahpq3vpbwhtitsu4v7vspcm4srlz2horumgvd26hatae' },
          { text: 'Candida un articolo per la Zine #3', url: 'https://docs.google.com/forms/d/1j5ml7bvkbGXJyF502y8HlLkN-IurLMZCOOe8nb2Vsl0/preview' }
        ],
        tags: ['Publishing', 'Community', 'Education']
      },
      {
        title: 'Mappa',
        description: 'Questo sito è nel suo piccolo un Public Good! il nostro approccio per mappare le community locali è stato adottato da altre community Ethereum in giro per il mondo, che hanno forkato il codebase di questo sito.',
        image: new URL('../assets/images/projects/italymap.webp', import.meta.url).href,
        links: [
          { text: 'Vedi la Repo su github', url: 'https://github.com/spaghettETH/map-website-2022' }
        ],
        tags: ['Community', 'Maps', 'Public Good']
      }
    ];

    const goToHome = () => {
      router.push('/menu');
    };

    return {
      projects,
      goToHome
    };
  }
});
</script>

<template>
  <div class="projects-page min-h-screen bg-black text-white p-8 overflow-y-auto">
    <button 
      @click="goToHome" 
      class="back-btn mb-12 flex items-center text-white"
    >
      <span class="back-icon mr-2">
        <img src="../assets/images/backIcn.png" />
      </span>
      Torna al Menu
    </button>

    <article class="max-w-7xl mx-auto">
      <h1 class="text-5xl font-black mb-16 gradient-text text-center">I Nostri Progetti</h1>
      
      <div class="space-y-32">
        <div 
          v-for="(project, index) in projects" 
          :key="project.title"
          class="project-container"
          :class="{ 'flex-row-reverse': index % 2 !== 0 }"
        >
          <div class="project-content" :class="{ 'items-end text-right': index % 2 !== 0 }">
            <h2 class="text-4xl font-bold mb-6 gradient-text-secondary">{{ project.title }}</h2>
            
            <p class="text-lg text-gray-300 mb-8 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="space-y-4">
              <div class="flex gap-4" :class="{ 'justify-end': index % 2 !== 0 }">
                <a 
                  v-for="link in project.links"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                >
                  {{ link.text }}
                </a>
              </div>

              <div class="flex flex-wrap gap-2" :class="{ 'justify-end': index % 2 !== 0 }">
                <span 
                  v-for="tag in project.tags"
                  :key="tag"
                  class="tag"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <div class="project-image">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.projects-page {
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

.gradient-text-secondary {
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

.project-container {
  display: flex;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column !important;
    gap: 2rem;

    .project-content {
      align-items: flex-start !important;
      text-align: left !important;

      h2, p {
        text-align: left !important;
      }

      .flex {
        justify-content: flex-start !important;
      }
    }

    .project-image {
      order: -1; // Mette sempre l'immagine sopra in mobile
      width: 100%;
    }
  }
}

.project-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-image {
  flex: 1;
  
  img {
    width: 100%;
    height: auto;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
}

.project-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #0ef9c2;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(25, 25, 25, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-color: #0ef9c2;
  }
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: rgba(249, 155, 192, 0.2);
  }
}
</style>

