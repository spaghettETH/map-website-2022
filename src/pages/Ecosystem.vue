<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Ecosystem",
  setup() {
    const router = useRouter();

    const ecosystem = {
      Institutional: [
        { name: 'Ethereum Foundation', url: 'https://ethereum.foundation' },
        { name: 'Optimism Foundation', url: 'https://optimism.io' },
        { name: 'Arbitrum Foundation', url: 'https://arbitrum.foundation' },
        { name: 'Ethereum Community Fund', url: 'https://ecf.network' },
        { name: 'Music Innovation Hub', url: 'https://musicinnovationhub.org' },
        { name: 'CIFA ONG', url: 'https://www.cifaong.it/' },
        { name: 'Università di Torino', url: 'https://en.unito.it/' },
        { name: 'Università di Bologna', url: 'https://www.unibo.it/' },
        { name: 'Università Bocconi', url: 'https://www.unibocconi.it/en' },
        { name: 'H Farm', url: 'https://www.h-farm.com/en' },
        { name: 'Politecnico di Torino', url: 'https://www.polito.it/' },
        { name: 'Links Foundation', url: 'https://linksfoundation.com/en/' },
      ],
      projects: [
        { name: 'YOMI', url: 'https://yomi.digital' },
        { name: 'Argot Collective', url: 'https://argot.org/' },
        { name: 'Idle Finance', url: 'https://idle.finance' },
        { name: 'Stake Capital', url: 'https://stake.capital' },
        { name: 'Rekt', url: 'https://rekt.news' },
        { name: 'Remix IDE', url: 'https://remix.ethereum.org' },
        { name: 'Swarm', url: 'https://www.ethswarm.org' },
        { name: 'etherna', url: 'https://etherna.io' },
        { name: 'Livepeer', url: 'https://livepeer.org' },
        { name: 'Streameth', url: 'https://streameth.org' },
        { name: 'OnlyMusix', url: 'https://www.onlymusix.com/' },
        { name: 'Bankless Academy', url: 'https://app.banklessacademy.com/' },
      ],
      communities: [
        { name: 'Urbe', url: 'https://urbe.build/' },
        { name: 'ETHna', url: 'https://ethna.rocks/' },
        { name: 'NapulETH', url: 'https://www.napuleth.org/' },
        { name: 'ETHVenice', url: 'https://ethvenice.com/' },
        { name: 'ETHMilan', url: 'https://www.ethmilan.xyz/' },
        { name: 'ETHBologna', url: 'https://www.ethbologna.com/' },
        { name: 'ReFi Italia', url: 'https://linktr.ee/refi_italia' },
        { name: 'Legal Hackers', url: 'https://legalhackers.org' },
        { name: 'Liminal Village', url: 'https://liminalvillage.com/' },
        { name: 'Digitalia', url: 'https://explorer.gitcoin.co/?#/round/10/0xf89aad3fad6c3e79ffa3ccc835620fcc7e55f919/0xf89aad3fad6c3e79ffa3ccc835620fcc7e55f919-15' },
        { name: 'Akasha', url: 'https://akasha.org' },
        { name: 'Crypto Canal', url: 'https://cryptocanal.substack.com/' },
        { name: 'ETH Kipu', url: 'https://ethkipu.org/en' },
        { name: 'ETH Safari', url: 'https://ethsafari.xyz/' },
        { name: 'ITU Blockchain Istanbul', url: 'https://www.linkedin.com/company/itublockchain/posts/?feedView=all' },
        { name: 'The Open Source Orchestra', url: 'https://x.com/opensourceorch' },
      ],
      conferences: [
        { name: 'Devcon', url: 'https://devcon.org/en/' },
        { name: 'PartyActionPeople', url: 'https://partyactionpeople.com/' },
        { name: 'Stable Summit', url: 'https://www.stablesummit.xyz/' },
        { name: 'ETHcc', url: 'https://ethcc.io/' },
        { name: 'Linecheck', url: 'https://www.linecheck.it' },
        { name: 'ETHZurich', url: 'https://ethereumzuri.ch/' },
        { name: 'ETHPrague', url: 'https://ethprague.com/' },
        { name: 'Protocol Berg', url: 'https://protocol.berlin/' },
        { name: 'ETHBerlin', url: 'https://ethberlin.org/' },
        { name: 'ETHDublin', url: 'https://www.ethdublin.io/' },
        { name: 'ETHDam', url: 'https://www.ethdam.com/' },
        { name: 'ETHGlobal', url: 'https://ethglobal.com/' },
      ],
      partners: [
        { name: 'Futura Legal', url: 'https://www.futura.legal/' },
        { name: 'Uncommon Digital', url: 'https://www.uncommon-digital.it/' },
        { name: 'World Radio Day', url: 'https://www.worldradioday.it/' },

      ],
    };

    const goToHome = () => {
      router.push('/menu');
    };

    return {
      ecosystem,
      goToHome
    };
  }
});
</script>

<template>
  <div class="ecosystem-page min-h-screen bg-black text-white p-8 overflow-y-auto">
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
      <h1 class="text-5xl font-black mb-12 gradient-text text-center">Ecosystem & Partners</h1>
      
      <div class="space-y-16">
        <!-- Institutional -->
        <section>
          <h2 class="text-3xl font-bold mb-8 gradient-text-secondary">Institutional</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a 
              v-for="entity in ecosystem.Institutional" 
              :key="entity.name"
              :href="entity.url"
              target="_blank"
              rel="noopener noreferrer"
              class="entity-card"
            >
              <span class="text-xl font-bold">{{ entity.name }}</span>
            </a>
          </div>
        </section>

        <!-- Projects -->
        <section>
          <h2 class="text-3xl font-bold mb-8 gradient-text-secondary">Projects</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <a 
              v-for="entity in ecosystem.projects" 
              :key="entity.name"
              :href="entity.url"
              target="_blank"
              rel="noopener noreferrer"
              class="entity-card"
            >
              <span class="text-lg font-bold">{{ entity.name }}</span>
            </a>
          </div>
        </section>

        <!-- Conferences -->
        <section>
          <h2 class="text-3xl font-bold mb-8 gradient-text-secondary">Conferences</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <a 
              v-for="entity in ecosystem.conferences" 
              :key="entity.name"
              :href="entity.url"
              target="_blank"
              rel="noopener noreferrer"
              class="entity-card"
            >
              <span class="text-lg font-bold">{{ entity.name }}</span>
            </a>
          </div>
        </section>

        <!-- Communities -->
        <section>
          <h2 class="text-3xl font-bold mb-8 gradient-text-secondary">Communities</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <a 
              v-for="entity in ecosystem.communities" 
              :key="entity.name"
              :href="entity.url"
              target="_blank"
              rel="noopener noreferrer"
              class="entity-card"
            >
              <span class="text-lg font-bold">{{ entity.name }}</span>
            </a>
          </div>
        </section>

        <!-- Partners -->
        <section>
          <h2 class="text-3xl font-bold mb-8 gradient-text-secondary">Partners</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              v-for="entity in ecosystem.partners" 
              :key="entity.name"
              :href="entity.url"
              target="_blank"
              rel="noopener noreferrer"
              class="entity-card"
            >
              <span class="text-lg font-bold">{{ entity.name }}</span>
            </a>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.ecosystem-page {
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

.entity-card {
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100px;
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

    span {
      background: linear-gradient(
        85.18deg,
        #f99bc0 0%,
        #0ef9c2 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  span {
    transition: all 0.3s ease;
  }
}
</style>
