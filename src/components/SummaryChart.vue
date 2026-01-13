<template>
  <div>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  requests: { type: Array, required: true }
})

const isDarkMode = ref(document.documentElement.getAttribute('data-theme') === 'dark')

// Watch for theme changes
let observer = null

onMounted(() => {
  observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.getAttribute('data-theme') === 'dark'
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const chartOptions = computed(() => {
  const statuses = ['New', 'In Progress', 'Waiting on Customer', 'Done']
  const counts = Object.fromEntries(statuses.map(s => [s, 0]))

  for (const r of props.requests) {
    if (counts[r.status] !== undefined) counts[r.status]++
  }

  const dark = isDarkMode.value

  return {
    title: { text: '' },
    credits: { enabled: false },
    chart: { 
      type: 'pie',
      backgroundColor: 'transparent',
      spacing: [10, 10, 10, 10],
      height: 400
    },
    tooltip: { 
      pointFormat: '<b>{point.y}</b> requests',
      backgroundColor: dark ? 'rgba(31, 31, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderColor: dark ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
      borderRadius: 8,
      shadow: true,
      style: {
        color: dark ? '#f9fafb' : '#111827'
      }
    },
    plotOptions: {
      pie: {
        innerSize: '60%', // donut
        dataLabels: { 
          enabled: true, 
          format: '<b>{point.name}</b><br/>{point.y}',
          style: {
            fontWeight: '500',
            fontSize: '12px',
            color: dark ? '#f9fafb' : '#111827'
          }
        },
        borderWidth: 2,
        borderColor: dark ? '#1f1f1f' : '#ffffff',
        states: {
          hover: {
            brightness: 0.1
          }
        }
      }
    },
    colors: [
      '#667eea', // New - purple
      '#3b82f6', // In Progress - blue
      '#f59e0b', // Waiting on Customer - amber
      '#10b981'  // Done - green
    ],
    series: [
      {
        name: 'Requests',
        data: statuses.map(s => ({ name: s, y: counts[s] }))
      }
    ]
  }
})
</script>
