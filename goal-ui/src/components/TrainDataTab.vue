<template>
  <div v-if="trainData">
    <div class="train-data-container">
      <!-- Train Master Section -->
      <div class="train-master-section">
        <div class="header-container">
          <h3>Train Master Data</h3>

        </div>
        <div class="table-wrapper">
          <DataTable 
            :data="trainData.trainMaster" 
            :items-per-page="15"
            @row-click="handleTrainSelect"
          />
        </div>
      </div>
  
      <!-- Train Schedule Section -->
      <div class="train-schedule-section">
        <div class="header-container">
          <h3>Train Schedule Data</h3>
          <button 
            class="display-btn" 
            @click="handleImportRakeLink"
          >
            Import Rake Link Data
          </button>
        </div>
        <div class="table-wrapper">
          <DataTable 
            :data="trainData.trainSchedule" 
            :items-per-page="15"
          />
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { fetchFilteredSchedule } from '../services/api';
import DataTable from './DataTable.vue';

const credentials = btoa('ADAOR:GOAL');


const props = defineProps({
  trainData: {
    type: Object,
    required: true
  },
  zone: {
    type: String,
    required: true,
    validator: (value) => {
      return typeof value === 'string' && value.length > 0;
    }
  }
});

const handleTrainSelect = async (row) => {
  try {
    const filteredData = await fetchFilteredSchedule(
      props.zone,
      row.trainId, 
      credentials
    );
    if (filteredData && filteredData.trainSchedule) {
      // trainData.value.trainSchedule = filteredData.trainSchedule;
      props.trainData.trainSchedule = filteredData.trainSchedule;  // Update to use props
    }
  } catch (error) {
    console.error('Error fetching filtered schedule:', error);
  }
};


const emit = defineEmits(['importRakeLink']);

const handleImportRakeLink = () => {
  emit('importRakeLink', props.trainData.rakeLink);
};
</script>


<style scoped>
.train-data-container {
  display: flex;
  gap: 2rem;
  height: calc(100vh - 100px);
  padding: 0.5rem;
  overflow: hidden; /* Change from auto to hidden */
}

.train-master-section,
.train-schedule-section {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  margin-top: 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.header-container p {
  margin: 0;
  /* font-weight: bold; */
}

.table-wrapper {
  flex: 1;
  overflow: auto;
  border: 1px solid #eee;
  border-radius: 4px;
}

.display-btn {
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
</style>