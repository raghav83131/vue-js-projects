<template>
    <div v-if="stats" class="stats-container">
      <div v-for="(column, title) in columns" :key="title">
        <p class="mb-3">{{ title }}</p>
        <p v-for="stat in column" :key="stat.label" class="stat-row">
          <strong>{{ stat.label }}</strong> {{ stat.value }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    stats: {
      type: Object,
      required: true
    }
  });
  
  const columns = computed(() => ({
    'Model Statistics': [
      { label: 'Number of locomotives used:', value: `${props.stats.num_locomotives_used} Nos` },
      { label: 'Average Loco Run Time:', value: `${props.stats.avg_LocoRunTime} Hours` },
      { label: 'Average Run Distance:', value: `${props.stats.avg_LocoRunDistance} Kms` },
      { label: 'Average Link Trains:', value: `${props.stats.avg_NoOfLinkTrains} Nos` },
      { label: 'Average Total Lie Over:', value: `${props.stats.avg_LocoTotalLieOver} Hours` },
      { label: 'Average Km Per Day:', value: `${props.stats.avg_LocoKmPerDay} Kms` },
      { label: 'Average Run Time Per Day:', value: `${props.stats.avg_LocoRunTimePerDay} Hours` }
    ],
    'Lie Over Statistics': [
      { label: 'Minimum Lie Over:', value: `${props.stats.min_lie_over_hours} Hours` },
      { label: 'Maximum Lie Over:', value: `${props.stats.max_lie_over_hours} Hours` },
      { label: 'Average Lie Over:', value: `${props.stats.avg_lie_over_hours} Hours` },
      { label: 'Total Lie Overs:', value: props.stats.total_lie_overs },
      { label: 'Total Number of Lie Overs:', value: props.stats.total_number_of_lie_overs }
    ]
  }));
  </script>
  
  <style scoped>
  .stats-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .stat-row {
    margin: 5px 0;
    font-size: 14px;
  }
  </style>