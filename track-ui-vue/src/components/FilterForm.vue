<template>
    <div class="form-container">
      <div class="input-container">
        <div class="input-group">
          <label for="tmsSection">Section:</label>
          <select id="tmsSection" v-model="filters.section" @change="updateLines">
            <option value="">-Select One-</option>
            <option v-for="section in uniqueSections" :key="section" :value="section">
              {{ section }}
            </option>
          </select>
        </div>
        <div class="input-group">
          <label for="line">Line:</label>
          <select id="line" v-model="filters.line" :disabled="!filters.section" @change="updateDates">
            <option value="">-ALL-</option>
            <option v-for="line in uniqueLines" :key="line" :value="line">
              {{ line }}
            </option>
          </select>
        </div>
        <div class="input-group">
          <label for="rundate">Date:</label>
          <select id="rundate" v-model="filters.date" :disabled="!filters.line">
            <option value="">-ALL-</option>
            <option v-for="date in uniqueDates" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
        </div>
        <div class="input-group">
          <label for="kmFrom">Km From:</label>
          <input type="number" id="kmFrom" v-model.number="filters.kmFrom" :disabled="!filters.line" />
        </div>
        <div class="input-group">
          <label for="kmTo">Km To:</label>
          <input type="number" id="kmTo" v-model.number="filters.kmTo" :disabled="!filters.line" />
        </div>
      </div>
      <div class="button-container">
        <button class="generate-btn" @click="applyFilters">Generate Prediction</button>
        <button class="reset-btn" @click="resetFilters">Reset Filter</button>
      </div>
    </div>
  </template>



  <script setup>
  import { ref, reactive, onMounted, defineEmits} from 'vue'
  import axios from 'axios'
  
  const emit = defineEmits(['applyFilters', 'resetFilters'])
  
  const filters = reactive({
    section: '',
    line: '',
    date: '',
    kmFrom: null,
    kmTo: null
  })
  
  const allData = ref([])
  const uniqueSections = ref([])
  const uniqueLines = ref([])
  const uniqueDates = ref([])
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dair/get-predictions', {
        auth: { username: 'DAIR_ML', password: 'TDMDATAPREP' }
      })
      allData.value = response.data
      uniqueSections.value = [...new Set(allData.value.map(item => item.TMS_SECTION))]
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  const updateLines = () => {
    const filtered = allData.value.filter(item => item.TMS_SECTION === filters.section)
    uniqueLines.value = [...new Set(filtered.map(item => item.LINE))]
  }
  
  const updateDates = () => {
    const filtered = allData.value.filter(item => 
      item.TMS_SECTION === filters.section && item.LINE === filters.line
    )
    uniqueDates.value = [...new Set(filtered.map(item => item.RUNDATE))]
  }
  
  const applyFilters = () => {
    const filtered = allData.value.filter(item => (
      (!filters.section || item.TMS_SECTION === filters.section) &&
      (!filters.line || item.LINE === filters.line) &&
      (!filters.date || item.RUNDATE === filters.date) &&
      (!filters.kmFrom || item.KM >= filters.kmFrom) &&
      (!filters.kmTo || item.KM <= filters.kmTo)
    ))
    emit('applyFilters', filtered)
  }
  
  const resetFilters = () => {
    Object.assign(filters, {
      section: '',
      line: '',
      date: '',
      kmFrom: null,
      kmTo: null
    })
    emit('resetFilters')
  }
  
  onMounted(fetchData)
  </script>