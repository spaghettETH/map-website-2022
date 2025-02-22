<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Intro",
  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push('/menu');
    };

    return {
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
</style>
