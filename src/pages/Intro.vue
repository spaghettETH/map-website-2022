<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Intro",
  setup() {
    const router = useRouter();

    const timeline = [
      {
        year: 2025,
        events: [
          {
            date: "Febbraio 2025",
            title: "Urbe.eth Hub e WorldRadioDay",
            description: "Media partner di Worldradioday.it a Milano e partecipazione all'inaugurazione dell'Urbe.eth Hub",
            tags: ["Event", "Media", "Community"]
          },
          {
            date: "Gennaio 2025",
            title: "Radio Decentralizzata e Passport dApp",
            description: "Continuano i lavori alla prima web radio decentralizzata e rilascio open source della dApp passport.spaghett-eth.com",
            tags: ["Innovation", "Open Source", "DApp"]
          }
        ]
      },
      {
        year: 2024,
        events: [
          {
            date: "Dicembre 2024",
            title: "ETHVenice II",
            description: "Sponsorizzazione e supporto alla seconda edizione di ETHVenice",
            tags: ["Event", "Community"]
          },
          {
            date: "Ottobre 2024",
            title: "Devcon Bangkok e Linecheck",
            description: "Partecipazione a Devcon Bangkok e organizzazione della sibling conference Web3 per Linecheck.it",
            tags: ["Event", "Community", "Music", "Technology"]
          },
          {
            date: "Settembre 2024",
            title: "Italian Ethereum Grand Tour",
            description: "Educational and Logistical Support to all ETH Events in Italy and Digitalia Network State pilot. Launch of Passport Dapp",
            tags: ["Event", "Community", "Music", "Technology"]
          }
        ]
      },
      {
        year: 2023,
        events: [
          {
            date: "Dicembre 2023",
            title: "ETHVenice e ETHBologna",
            description: "Prima edizione di ETHVenice, workshop all'Università di Bologna e nascita di ETHBologna",
            tags: ["Event", "Education", "Community"]
          },
          {
            date: "Novembre 2023",
            title: "Devconnect Istanbul",
            description: "Meetup degli ESP Grantee e ospiti su theherd.radio",
            tags: ["Event", "Media"]
          },
          {
            date: "May 2023",
            title: "SpaghettETH II - Naples",
            description: "Seconda conferenza nazionale e genesi delle community NapulETH e ETHna",
            tags: ["Event", "Community"]
          }
        ]
      },
      {
        year: 2022,
        events: [
          {
            date: "Dicembre 2022",
            title: "Educational Initiatives",
            description: "Workshop NFT all'Accademia di Belle Arti di Torino e co-organizzazione dell'evento genesis di ETHRome rivolto a studenti universitari, Talen Garden Roma",
            tags: ["Education", "NFT"]
          },
          {
            date: "Ottobre 2022",
            title: "Devcon Bogotà",
            description: "Presentazione globale della community, lancio del sito-mappa open source e organizzazione della Chiva Lounge con la Open Source Orchestra",
            tags: ["Event", "Community", "Open Source", "Music"]
          },
          {
            date: "May 2022",
            title: "SpaghettETH I - Milan",
            description: "Prima conferenza nazionale e genesis delle community Urbe.eth e ETHMilan",
            tags: ["Event", "Community"]
          }
        ]
      },
      {
        year: 2021,
        events: [
          {
            date: "Luglio 2021",
            title: "ETHcc Parigi Genesis Meeting",
            description: "Il team ESP incontra Maria e Matteo per discutere il lancio di una community italiana",
            tags: ["Event", "Community", "Genesis"]
          }
        ]
      }
    ];

    const goToHome = () => {
      router.push('/menu');
    };

    return {
      timeline,
      goToHome
    };
  }
});
</script>

<template>
  <div class="intro-page min-h-screen bg-black text-white p-8 overflow-y-auto">
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
      <h1 class="text-5xl font-black mb-12 gradient-text">SpaghettETH: your friendly Web3 community in Italy</h1>
      
      <div class="prose prose-invert prose-lg max-w-none">
        <p class="text-xl leading-relaxed mb-12">
          SpaghettETH è un collettivo multi-skill Ethereum e Web3 nato nel 2022 con l'obiettivo di attivare, connettere e potenziare l'ecosistema delle community italiane legate alla blockchain, promuovendo l'adozione delle tecnologie decentralizzate attraverso iniziative educative, eventi, collaborazioni istituzionali e lo sviluppo di progetti open-source. Il nostro impegno si sviluppa in diverse macroaree di impatto:
        </p>

        <div class="space-y-12">
          <section>
            <h2 class="text-3xl font-bold mb-4">1. Genesi e Armonizzazione delle Community Web3 in Italia</h2>
            <p>SpaghettETH favorisce la crescita dell'ecosistema Ethereum locale, supportando e connettendo iniziative come ETHRome, NapulETH, ETHMilan, ETHna, ETHVenice, ETHBologna ed ETHTurin, facilitando la condivisione di risorse e conoscenze tra le community.</p>
          </section>

          <section>
            <h2 class="text-3xl font-bold mb-4">2. Integrazione con l'Ecosistema Ethereum Globale</h2>
            <p>Il collettivo agisce come ponte tra l'Italia e la scena internazionale di Ethereum e Web3, partecipando a eventi globali, contribuendo a discussioni su governance decentralizzata, e costruendo sinergie con attori chiave del settore.</p>
          </section>

          <section>
            <h2 class="text-3xl font-bold mb-4">3. Sviluppo di Iniziative Open-Source e Creazione di Tool Web3 Public Goods</h2>
            <p>SpaghettETH è attivo nella realizzazione di strumenti open-source destinati al bene pubblico, incentivando la collaborazione con sviluppatori, aziende e istituzioni per creare soluzioni Web3 che migliorino trasparenza, accessibilità e decentralizzazione.</p>
          </section>

          <section>
            <h2 class="text-3xl font-bold mb-4">4. Creazione di Moduli Educativi e Conferenze Web3</h2>
            <p>Promuoviamo l'alfabetizzazione blockchain attraverso moduli educativi, workshop e sibling conferences per altre conferenze non direttamente collegate all'ecosistema blockchain, contribuendo alla diffusione delle conoscenze nel settore.</p>
          </section>

          <section>
            <h2 class="text-3xl font-bold mb-4">5. Grant e Supporto per Iniziative ad Impatto Territoriale</h2>
            <p>Tramite il programma SpaghettETH Impact, offriamo grant e finanziamenti per progetti locali che promuovano la sostenibilità e l'adozione di Ethereum come tecnologia di impatto sociale.</p>
          </section>

          <section>
            <h2 class="text-3xl font-bold mb-4">6. Lobbying e Collaborazione con Istituzioni e Università</h2>
            <p>Lavoriamo a stretto contatto con università, enti governativi e associazioni per integrare la blockchain nei percorsi di studio, supportare la ricerca e costruire un dialogo costruttivo con i policy maker per un'adozione consapevole della tecnologia.</p>
          </section>
        </div>

        <div class="mt-16 space-y-6">
          <div class="bg-gradient-to-r from-pink-400/20 to-cyan-400/20 p-8 rounded-2xl border border-white/10">
            <h3 class="text-2xl font-bold mb-4 gradient-text">👉 Associati a SpaghettETH Impact!</h3>
            <a href="https://app.mego.tickets/event/eb736f22-949c-4f5c-8a49-e09b1d2b126b" class="text-cyan-400 hover:text-cyan-300 transition-colors">Richiedi la tessera associativa SBT</a>
          </div>

          <div class="text-center">
            <p class="text-sm">SpaghettETH Impact, via Treviso 36, 10144 Torino | 12 ASSOCIAZIONI NON RICONOSCIUTE E COMITATI 949920 | ATTIVITA' DI ORGANIZZAZIONI CON FINI CULTURALI E RICREATIVI | CF: 97905760019</p>
            <p class="text-xl">📧 Per maggiori informazioni:</p>
            <a href="mailto:ciao@spaghett-eth.com" class="text-cyan-400 hover:text-cyan-300 transition-colors">ciao@spaghett-eth.com</a>
          </div>
        </div>

        <div class="mt-24">
          <h2 class="text-4xl font-black mb-16 gradient-text text-center">La Nostra Storia</h2>
          
          <div class="timeline-wrapper">
            <div 
              v-for="period in timeline" 
              :key="period.year"
              class="year-section mb-24"
            >
              <div class="year-marker">
                <h2 class="text-6xl font-black gradient-text-secondary mb-12">{{ period.year }}</h2>
                <div class="year-line"></div>
              </div>

              <div class="events-container">
                <div 
                  v-for="event in period.events" 
                  :key="event.date"
                  class="event-card"
                >
                  <div class="event-date">{{ event.date }}</div>
                  <div class="event-content">
                    <h3 class="text-2xl font-bold mb-3 gradient-text-hover">{{ event.title }}</h3>
                    <p class="text-gray-300 mb-4">{{ event.description }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="tag in event.tags" 
                        :key="tag"
                        class="tag"
                      >
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.intro-page {
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

  &:hover {
    background: linear-gradient(
      85.18deg,
      #f99bc0 0%,
      #0ef9c2 100%
    );
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

  .back-icon img {
    height: 20px;
  }
}

:deep(.prose) {
  font-family: MonsterratRegular;
  color: #f2f2f2;

  h2 {
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
    line-height: 1.8;
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
}

.year-section {
  position: relative;
}

.year-marker {
  position: relative;
  margin-bottom: 2rem;

  .year-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      #f99bc0,
      transparent 80%
    );
    margin-top: -1rem;
  }
}

.events-container {
  padding-left: 2rem;
  border-left: 1px solid rgba(249, 155, 192, 0.2);
}

.event-card {
  position: relative;
  padding: 2rem;
  margin-bottom: 2rem;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    left: -2.5rem;
    top: 2.5rem;
    width: 1rem;
    height: 1rem;
    background: #f99bc0;
    border-radius: 50%;
    border: 2px solid black;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateX(10px);
    background: rgba(25, 25, 25, 0.9);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

    &::before {
      background: #0ef9c2;
      transform: scale(1.2);
    }
  }
}

.event-date {
  font-family: MonsterratBold;
  color: #f99bc0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(249, 155, 192, 0.1);
  border: 1px solid rgba(249, 155, 192, 0.2);
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #0ef9c2;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: rgba(249, 155, 192, 0.2);
  }
}

@media (max-width: 768px) {
  .events-container {
    padding-left: 1.5rem;
  }

  .event-card {
    &::before {
      left: -2rem;
    }
  }
}
</style>
