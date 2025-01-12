<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  filteredData: {
    type: Array,
    required: true
  }
})

const headers = computed(() => 
  props.filteredData.length > 0 ? Object.keys(props.filteredData[0]) : []
)
</script>

<template>
  <div v-if="filteredData.length" class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in filteredData" :key="row.id">
          <td v-for="(value, key) in row" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>