  <template>
    <div class="container">
      <div class="input-container">
        <label for="zone">Select Zone:</label>
        <select id="zone" v-model="selectedZone">
          <option value="">-Select One-</option>
          <option v-for="zone in zones" :key="zone" :value="zone">
            {{ zone }}
          </option>
        </select>
        <button 
          class="display-btn" 
          @click="handleDisplayTrains"
          :disabled="!selectedZone"
        >
          Display Trains
        </button>
      </div>
  
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
      </div>
  
      <div v-if="showTable">
        <div class="header-container">
          <h3>Zone wise Trains</h3>
          <button 
            class="display-btn" 
            @click="handleImportTrainData"
          >
            Import Train Data
          </button>
        </div>
        
        <DataTable 
          v-if="zoneTrains.length" 
          :data="zoneTrains" 
          :items-per-page="15" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { fetchZoneData, fetchZoneTrains, fetchTrainData } from '../services/api';
  import DataTable from './DataTable.vue';
  
  const credentials = btoa('ADAOR:GOAL');
  const zones = ref([]);
  const selectedZone = ref('');
  const zoneTrains = ref([]);
  const loading = ref(false);
  const showTable = ref(false);
  const emit = defineEmits(['importTrainData', 'zone-selected']);

  // Add a watch on selectedZone
  watch(selectedZone, (newZone) => {
    if (newZone) {
      emit('zone-selected', newZone);
    }
  });

  const handleDisplayTrains = async () => {
    if (!selectedZone.value) {
      alert('Please select a zone first.');
      return;
    }
  
    loading.value = true;
    try {
      zoneTrains.value = await fetchZoneTrains(selectedZone.value, credentials);
      showTable.value = true;
    } catch (error) {
      console.error('Error processing zone trains:', error);
      alert('Error fetching train data');
    } finally {
      loading.value = false;
    }
  };
  
  const handleImportTrainData = async () => {
    loading.value = true;
    try {
      const data = await fetchTrainData(selectedZone.value, credentials);
      // Emit event to parent to switch tab and pass data
      // You'll need to implement this in App.vue
      emit('importTrainData', data);
    } catch (error) {
      console.error('Error importing train data:', error);
      alert('Failed to import train data. Please try again.');
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(async () => {
    try {
      const data = await fetchZoneData(credentials);
      zones.value = [...new Set(data.map(item => item.locoLinkRly))];
    } catch (error) {
      console.error('Error fetching zones:', error);
      alert('Failed to fetch zones');
    }
  });
  </script>
  
  <style scoped>  
  /* @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap"); */

  /* .header-container h3 {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  } */

  .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 2px;
  }
  
  .input-container select {
    width: 110px;
    padding: 3px;
  }
  
  /* .display-btn {
    margin-left: auto;
    padding: 6px 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  } */

  .display-btn {
  margin: 20px 0 0 auto;
  padding: 8px 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }
  
  .display-btn:hover {
    background-color: #0056b3;
  }
  
  .display-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
  }
  
  .header-container p {
    margin: 0;
  }
  
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .loading-spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #007BFF;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  </style>