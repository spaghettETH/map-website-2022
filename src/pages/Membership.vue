<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import MembershipCard from '../assets/images/projects/MembershipCard_Speth.png';

export default defineComponent({
  name: "Membership",
  setup() {
    const router = useRouter();

    const benefits = [
      "Accesso esclusivo agli eventi SpaghettETH e opportunità di networking",
      "Workshop pratici su Web3, smart contract e DeFi",
      "Community call mensili",
      "Sconti su piattaforme partner e servizi crypto-friendly",
      "Accesso anticipato a nuove release e collaborazioni",
      "Beta testing e whitelist priority per progetti partner",
      "Diritto di voto comunitario sui progetti futuri tramite Snapshot",
      "Possibilità di proporre iniziative per la community",
      "Accesso esclusivo al gruppo Telegram",
      "Discussioni private con esperti del settore",
      "Merchandising esclusivo per i membri",
      "Priorità per borse di studio e grant Web3",
      "Mentorship e \"office hours\" con esperti Web3",
      "Visibilità sui canali ufficiali di SpaghettETH"
    ];

    const goToHome = () => {
      router.push('/menu');
    };

    return {
      benefits,
      goToHome,
      MembershipCard
    };
  }
});
</script>

<template>
  <div class="membership-page min-h-screen bg-black text-white p-8 overflow-y-auto">
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
      <div class="card-image-wrapper mb-12">
        <img 
          :src="MembershipCard"
          alt="SpaghettETH Membership Card"
          class="membership-card"
        />
      </div>

      <h1 class="text-5xl font-black mb-8 gradient-text text-center">SpaghettETH Impact Membership Campaign</h1>
      
      <div class="prose prose-invert prose-lg max-w-none">
        <div class="mb-12">
          <p class="text-xl font-bold mb-4">| LEGGI ATTENTAMENTE |</p>
          <p class="text-xl leading-relaxed">
            <strong>SpaghettETH Impact</strong> è un'associazione non profit dedicata alla promozione della cultura Web3 in Italia, alla creazione di eventi e strumenti educativi e Open Source dell'ecosistema Ethereum, nonché al finanziamento di altre iniziative non profit con la stessa mission.
          </p>
        </div>

        <div class="membership-benefits mb-12">
          <h2 class="text-3xl font-bold mb-8 gradient-text-secondary">Vantaggi dell'Iscrizione:</h2>
          <ul class="space-y-4">
            <li 
              v-for="benefit in benefits" 
              :key="benefit"
              class="benefit-card"
            >
              {{ benefit }}
            </li>
          </ul>
        </div>

        <div class="disclaimer-section space-y-4 mb-12">
          <p class="text-gray-300">
            Possedendo questa carta, accetti di sostenere i valori della comunità SpaghettETH e di contribuire alla sua crescita e innovazione.
          </p>
          <p class="text-sm text-gray-400">
            Procedendo, autorizzi il trattamento dei dati personali in base all'art. 13 del D. Lgs. 196/2003 e all'art. 13 del Regolamento UE 2016/679.
          </p>
        </div>

        <div class="join-section">
          <a 
            href="https://app.mego.tickets/event/eb736f22-949c-4f5c-8a49-e09b1d2b126b" 
            class="join-btn"
            target="_blank"
          >
            Associati Ora
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.membership-page {
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

.benefit-card {
  position: relative;
  padding: 1.5rem;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateX(10px);
    background: rgba(25, 25, 25, 0.9);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border-image: linear-gradient(to right, #f99bc0, #0ef9c2) 1;
  }
}

.join-btn {
  display: block;
  width: 100%;
  text-align: center;
  background: linear-gradient(
    85.18deg,
    #f99bc0 0%,
    #0ef9c2 100%
  );
  color: black;
  padding: 1.5rem;
  text-decoration: none;
  font-size: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  font-family: MonsterratBold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(249, 155, 192, 0.3);
    opacity: 0.9;
  }
}

:deep(.prose) {
  font-family: MonsterratRegular;
  color: #f2f2f2;

  h2 {
    font-family: MonsterratBold;
  }

  p {
    font-family: MonsterratRegular;
    line-height: 1.8;
  }
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 4rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &::after {
    content: '';
    position: absolute;
    inset: -10px;
    background: linear-gradient(
      85.18deg,
      #f99bc0 0%,
      #0ef9c2 100%
    );
    border-radius: 20px;
    z-index: -1;
    opacity: 0.5;
    filter: blur(15px);
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 0.7;
  }
}

.membership-card {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}
</style>
