<template>
  <div v-if="!data?.length" class="error">No data available</div>
  <div v-else class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in currentPageData" :key="index" 
        @click="handleRowClick(row)"
        class="table-row">
          <td v-for="(value, key) in row" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['rowClick']);

const handleRowClick = (row) => {
  emit('rowClick', row);
};

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 50
  }
})

const currentPage = ref(1)

const headers = computed(() => props.data.length ? Object.keys(props.data[0]) : [])
const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage))

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return props.data.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
.table-wrapper {
  max-height: 600px;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  overflow: auto;
  height: 100%; /* Add this */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  display: table;
}

th {
  /* border: 1px solid #ccc;
  padding: 10px;
  background-color: #f1f1f1;
  text-align: left; */
  border: 1px solid #ccc;
  padding: 8px 10px;  /* Reduced padding */
  background-color: #f1f1f1;
  text-align: left;
  white-space: nowrap;  /* Prevent header text wrapping */
  overflow: hidden;
  text-overflow: ellipsis;
}

td {
  /* border: 1px solid #ccc;
  height: 24px;
  padding: 4px 10px; */
  border: 1px solid #ccc;
  height: 20px;  /* Reduced height */
  padding: 2px 10px;  /* Reduced padding */
  white-space: nowrap;  /* Prevent text wrapping */
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.error {
  text-align: center;
  padding: 20px;
}

.table-row {
  cursor: pointer;
}

.table-row:hover {
  background-color: #f5f5f5;
}
</style>