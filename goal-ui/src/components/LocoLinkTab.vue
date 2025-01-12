<template>
    <div>
      <div class="header-container">
        <h3>Loco Link Visualization</h3>
        <!-- <button class="display-btn" @click="handleReset">Reset Filters</button> -->
      </div>
      <ModelStats :stats="modelStats" v-if="modelStats" />
      <div class="pdf-container">
        <iframe 
          id="pdfViewer" 
          frameborder="0" 
          :src="pdfUrl"
          @error="handlePdfError"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ModelStats from '/src/components/ModelStats.vue';
  import { fetchModelStats } from '../services/api';

  
  const pdfUrl = ref('LocoLinkECR.pdf'); // Update this with your actual PDF endpoint
  const pdfError = ref(false);
  
  const modelStats = ref(null);
  const credentials = btoa('ADAOR:GOAL');

  onMounted(async () => {
    try {
      const stats = await fetchModelStats('ECR', credentials);
      modelStats.value = stats;
    } catch (error) {
      console.error('Error fetching model stats:', error);
    }
  });

  const handlePdfError = () => {
    pdfError.value = true;
    console.error('Failed to load PDF');
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
   
  .pdf-container {
    position: relative;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  #pdfViewer {
    width: 100%;
    height: 500px;
    border: 1px solid #ccc;
    overflow: auto;
  }
  </style>