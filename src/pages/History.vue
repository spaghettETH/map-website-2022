<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "History",
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
            description: "Lancio di Passport.spaghett-eth.com e supporto logistico e educativo per gli eventi NapulETH, ETHMilan, ETHRome. Organizzazione del Digital PA Summit Piemonte con Legal Hackers Torino e Città di Torino",
            tags: ["Education", "Community", "Innovation"]
          },
          {
            date: "Luglio 2024",
            title: "ETHcc Bruxelles",
            description: "Supporto a ETHcc per l'organizzazione della Blockfighters Room e fondazione di SpaghettETH Impact",
            tags: ["Event", "Community", "Milestone"]
          },
          {
            date: "Maggio 2024",
            title: "ETHna e ETHDublin",
            description: "Primo evento Web3 siciliano - Zo, Catania. Mentoring agli hacker durante ETHDublin",
            tags: ["Event", "Education"]
          },
          {
            date: "Marzo 2024",
            title: "Linecheck Partnership",
            description: "Partnership strategica con Linecheck.it Milano",
            tags: ["Partnership", "Event"]
          },
          {
            date: "Febbraio 2024",
            title: "Sanremo e ETHDenver",
            description: "Partecipazione in qualità di speaker su media, decentralizzazione e economie web3 per la musica al Festival di Sanremo - Sanremo Invest e presentazione della community a ETHDenver",
            tags: ["Music","Media", "Community"]
          },
          {
            date: "Gennaio 2024",
            title: "Network State Meetup",
            description: "Presentazione dello sviluppo della community al Network State Meetup Milano",
            tags: ["Technology", "Politics", "Event"]
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
            date: "Ottobre 2023",
            title: "Community Initiatives",
            description: "Lancio del primo numero della Community Zine, sponsorizzazione della Public Goods Track @ ETHRome, lancio del primo Quadratic Funding italiano per Public Goods e partnership con CIFA ONG per il progetto hate-trackers.com",
            tags: ["Publishing", "Public Goods", "Funding", "Partnership"]
          },
          {
            date: "Maggio 2023",
            title: "SpaghettETH II Napoli",
            description: "Secondo evento di Ethereum italiano - Foqus Napoli. Nascita delle community NapulETH ed ETHna, partnership con Mega Tickets e BEN Network",
            tags: ["Event", "Community"]
          },
          {
            date: "Aprile 2023",
            title: "Ethereum Zurich",
            description: "Talk su community e public goods",
            tags: ["Event", "Speaking"]
          },
          {
            date: "Marzo 2023",
            title: "ETHPorto",
            description: "Partecipazione al community panel",
            tags: ["Event", "Community"]
          },
          {
            date: "Febbraio 2023",
            title: "Sanremo Invest",
            description: "Intervento sull'interoperabilità degli NFT nel settore musicale alla side conference del Festival di Sanremo",
            tags: ["Event", "Music", "NFT"]
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
            date: "Settembre 2022",
            title: "Ethereum Merge Party",
            description: "Celebrazione del Merge con Web3Mi a Milano",
            tags: ["Event", "Merge"]
          },
          {
            date: "Maggio 2022",
            title: "SpaghettETH I",
            description: "Prima conferenza di Ethereum italiana - Combo, Milano. Evento di genesi per Urbe.eth e Web3Mi",
            tags: ["Event", "Community", "Milestone"]
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
  <div class="history-page min-h-screen bg-black text-white p-8 overflow-y-auto">
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
      <h1 class="text-5xl font-black mb-16 gradient-text text-center">La Storia di SpaghettETH</h1>
      
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
    </article>
  </div>
</template>

<style scoped lang="scss">
.history-page {
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
