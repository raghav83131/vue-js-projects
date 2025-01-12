<template>
  <div id="app">
    <div class="title-container">
      <p>Track Degradation Model</p>
    </div>
    <div class="container">
      <div class="wrapper">
        <FilterForm @applyFilters="applyFilters" @resetFilters="resetFilters" />
        <TableView :filteredData="filteredData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilterForm from './components/FilterForm.vue'
import TableView from './components/TableView.vue'

const filteredData = ref([])

const applyFilters = (data) => {
  filteredData.value = data
}

const resetFilters = () => {
  filteredData.value = []
}
</script>


<style>
@import "./assets/index.css";
</style>
