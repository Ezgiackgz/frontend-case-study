<script setup>
import { getNeedsAttentionReasons } from '../utils/needsAttention'

const props = defineProps({
  requests: Array
})
</script>

<template>
  <section style="margin-top: 32px">
    <h2>Needs Attention</h2>

    <p v-if="!requests.length">No items need attention 🎉</p>

    <div v-for="r in requests" :key="r.id" style="margin-bottom: 12px">
      <strong>{{ r.title }}</strong> – {{ r.customer }}
      <div style="margin-top: 4px">
        <span
          v-for="reason in getNeedsAttentionReasons(r).reasons"
          :key="reason"
          style="
            margin-right: 6px;
            padding: 2px 8px;
            font-size: 12px;
            background: #fee2e2;
            border-radius: 12px;
          "
        >
          {{ reason }}
        </span>
      </div>
    </div>
  </section>
</template>