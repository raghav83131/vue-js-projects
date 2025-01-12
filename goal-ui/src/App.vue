<script setup>
import { ref } from 'vue';
import ZoneTab from '/src/components/ZoneTab.vue';
import TrainDataTab from '/src/components/TrainDataTab.vue';
import RakeLinkTab from '/src/components/RakeLinkTab.vue';
import TrainArcsTab from '/src/components/TrainArcsTab.vue';
import LocoLinkTab from '/src/components/LocoLinkTab.vue';

// Import the images using src path
import irLogo from '/src/assets/ir-logo.png';
import crisLogo from '/src/assets/cris-logo.gif';

const selectedZone = ref(null);
const tabs = ref([
  { id: 'zone', name: 'Zone' },
  { id: 'train-data', name: 'Train Data' },
  { id: 'rake-link', name: 'Rake Link' },
  { id: 'train-arcs', name: 'Train Arcs' },
  { id: 'loco-link', name: 'Loco Link' },
]);

const activeTab = ref('zone');
const trainData = ref(null);
const rakeLink = ref(null);
const trainArcs = ref(null);

const handleImportTrainData = (data) => {
  trainData.value = data;
  activeTab.value = 'train-data';
};

const handleImportRakeLink = (data) => {
  rakeLink.value = data;
  activeTab.value = 'rake-link';
};

const handleProcess = (data) => {  
  trainArcs.value = data;
  activeTab.value = 'train-arcs';
};

const handleGenerateLocoLink = () => {
  activeTab.value = 'loco-link';
};

const handleReset = () => {
    window.location.reload();
  };
</script>

<template>
    <!-- New Header Bar -->
    <header class="header-bar">
    <div class="header-content">
      <div class="left-section">
        <img :src="irLogo" alt="Indian Railways Logo" class="ir-logo" />
        <div class="app-title">
          <h1>LOCO LINK</h1>
           <h3>OPTIMIZATION</h3>
        </div>
      </div>
      <div class="right-section">
        <img :src="crisLogo" alt="CRIS Logo" class="cris-logo" />
      </div>
    </div>
  </header>

  <div class="container">
    <!-- <h1 class="title">Loco Link Optimization</h1> -->

    <div class="tabs-wrapper">
      <ul class="tabs-list">
        <li v-for="tab in tabs" :key="tab.id">
          <button
            @click="activeTab = tab.id"
            :class="['tab-button', activeTab === tab.id ? 'active' : '']"
          >
            {{ tab.name }}
          </button>
        </li>
      </ul>
      <button class="display-btn" @click="handleReset">Reset Filters</button>
    </div>

    <div class="content-wrapper">
      <!-- <div v-if="activeTab === 'zone'">Zone Content</div> -->
      <!-- <ZoneTab v-if="activeTab === 'zone'" /> -->
      <!-- <div v-else-if="activeTab === 'train-data'">Train Data Content</div> -->
      <!-- <div v-else-if="activeTab === 'train-data'">No train data available</div> -->
      <!-- <div v-else-if="activeTab === 'rake-link'">Rake Link Content</div> -->
      <!-- <div v-else-if="activeTab === 'train-arcs'">Train Arcs Content</div> -->
      <!-- <div v-else-if="activeTab === 'loco-link'">Loco Link Content</div> -->
    <ZoneTab 
      v-if="activeTab === 'zone'"
      @zone-selected="selectedZone = $event"
      @import-train-data="handleImportTrainData"
    />
    <TrainDataTab
      v-if="activeTab === 'train-data' && trainData"
      :train-data="trainData"
      :zone="selectedZone"  
      @import-rake-link="handleImportRakeLink"
    />
    <RakeLinkTab
      v-if="activeTab === 'rake-link' && rakeLink"
      :rake-link="rakeLink"
      :zone="selectedZone"
      @process="handleProcess"
    />
    <TrainArcsTab  
      v-if="activeTab === 'train-arcs' && trainArcs"
      :train-arcs="trainArcs"
      :zone="selectedZone"
      @generate-loco-link="handleGenerateLocoLink"
    />
    <LocoLinkTab
      v-if="activeTab === 'loco-link'"
    />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");


.header-bar {
  background-color: #003366; /* Dark blue color */
  width: 100%;
  min-height: 70px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ir-logo {
  height: 50px;
  width: auto;
}

.app-title {
  color: white;
  margin-left: 1rem;
}

.app-title h1 {
  font-size: 1.5rem;
  font-family: 'Poppins',sans-serif;
  font-weight: bold;
  margin: 0;
}

.app-title h2 {
  font-size: 1.25rem;
  font-family: 'Poppins',sans-serif;
  /* font-family: 'Roboto', sans-serif; */
  margin: 0;
}

.app-title h3 {
  /* font-size: 1.25rem; */
  font-family: 'Poppins',sans-serif;
  /* font-family: 'Roboto', sans-serif; */
  margin: 0;
}

.app-title p {
  font-size: 0.8rem;
  margin: 0;
}

.right-section {
  display: flex;
  align-items: center;
}

.cris-logo {
  height: 40px;
  width: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
}

.tabs-list {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 1rem;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-button:hover:not(.active) {
  background-color: #f9fafb;
}

.tab-button.active {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.content-wrapper {
  padding: 1.5rem;
  /* background-color: #F2F4F7; */
  background-color: #F1F2F6;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.display-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  background-color: #dc2626;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  }
  
  .display-btn:hover {
    background-color: #0056b3;
  }
</style>

