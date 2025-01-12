<template>
    <div v-if="rakeLink">
      <div class="header-container">
        <h3>Rake Link Data</h3>
        <button class="display-btn" @click="handleProcess">Process</button>
      </div>
      <DataTable :data="rakeLink" :items-per-page="15" />
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import DataTable from './DataTable.vue';
  import { processTrainArcs } from '../services/api';

  
  const props = defineProps({
  rakeLink: {
    type: Array,
    required: true
  },
  zone: {      
    type: String,
    required: true
  }
  });
  
  const emit = defineEmits(['process']);

  const handleProcess = async () => {
    try {
      const credentials = btoa('ADAOR:GOAL');
      const arcsData = await processTrainArcs(props.zone, credentials);
      emit('process', arcsData);
    } catch (error) {
      console.error('Error processing train arcs:', error);
    }
  };

  </script>
  
  <style scoped>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0px;
  }
  
  .header-container p {
    margin: 0;
  }
  
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
  </style>