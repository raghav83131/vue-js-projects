<template>
  <div v-if="trainArcs">
    <div class="header-container">
      <h3>Train Arcs</h3>
      <button class="display-btn" @click="handleGenerateLocoLink">
        Generate Loco Link
      </button>
    </div>
    <DataTable :data="trainArcs" :items-per-page="15" />
    <FilterContainer @update-feasibility="handleCheckFeasibility" />
  </div>
</template>
  
  <script setup>
  import { defineProps, defineEmits, ref, onMounted } from 'vue';
  import DataTable from './DataTable.vue';
  import FilterContainer from './FilterContainer.vue';
  
  const props = defineProps({
  trainArcs: {
    type: Array,
    required: true
  },
  zone: {
    type: String,
    required: true
  }
});
  
  const emit = defineEmits(['generateLocoLink']);
  const loading = ref(false);
  const handleGenerateLocoLink = () => {
    emit('generateLocoLink');
  };
  const handleCheckFeasibility = (data) => {
  console.log(data);
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