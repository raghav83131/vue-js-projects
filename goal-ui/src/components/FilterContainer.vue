<template>
  <div class="filter-box">
    <div v-for="(slider, label) in sliders" :key="label" class="slider-container">
      <label>{{ label }}</label>
      <span>{{ slider.value }}</span>
      <input type="range" v-model="slider.value" :min="slider.min" :max="slider.max" :step="slider.step" class="w-full" />
    </div>

    <div v-for="label in checkboxLabels" :key="label" class="mt-2">
      <input type="checkbox" :id="label.toLowerCase()" v-model="checkboxes[label]">
      <label :for="label.toLowerCase()" class="ml-2">{{ label }}</label>
    </div>

    <button class="display-btn" @click="checkFeasibility">
      Check Feasibility
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['updateFeasibility']);

const sliders = ref({
'Max Time Gap': { value: 1, min: 1, max: 3, step: 0.5 },
'Min Time Gap': { value: 10, min: 10, max: 250, step: 240 }
});

const checkboxLabels = ['Reversal', 'HOG', 'TPWS', 'HRD'];
const checkboxes = ref({});

checkboxLabels.forEach(label => checkboxes.value[label] = false);

const checkFeasibility = async () => {
try {
  const response = await fetch('http://localhost:8080/check-feasibility', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      maxTimeGap: sliders.value['Max Time Gap'].value,
      minTimeGap: sliders.value['Min Time Gap'].value,
      filters: Object.entries(checkboxes.value)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    })
  });

  const data = await response.json();
  emit('updateFeasibility', data);
  console.log('Response:', data);
} catch (error) {
  console.error('Error:', error);
}
};
</script>
  
  <style scoped>
  .filter-box {
  margin: 20px auto;
  padding: 20px;  /* Increased padding */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 15px;  /* Adds consistent spacing between elements */
}


.slider-container {
  display: flex;
  flex-direction: column; /* Stack label and slider vertically */
  align-items: flex-start; /* Align content to the start */
  gap: 5px; /* Add some space between the label and slider */
}

/* input[type="range"] {
  width: 300px; 
} */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  transition: background 0.3s ease;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 24px; /* Taller than width for rectangular shape */
  background: #007BFF;
  border-radius: 2px; /* Slight rounding of corners */
  cursor: pointer;
  transition: background 0.3s ease;
}

/* Firefox */
input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 24px;
  background: #007BFF;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

/* Hover and active states */
input[type="range"]:hover::-webkit-slider-thumb {
  background: #0056b3;
}

input[type="range"]:active::-webkit-slider-thumb {
  background: #003f7f;
}

.slider-container {
  display: flex;
  flex-direction: column; /* Stack label, value, and slider vertically */
  align-items: flex-start;
  gap: 5px;
}

.slider-container span {
  font-size: 14px;
  color: #555;
  font-weight: bold;
}


.checkbox-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}

.display-btn {
  margin: 10px auto;  /* Centers the button */
  padding: 8px 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
  </style>
