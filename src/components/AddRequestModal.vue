<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,.45);">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0 shadow">
        <div class="modal-header">
          <div class="flex-grow-1">
            <h5 class="modal-title mb-0 fw-bold">Add New Request</h5>
            <small class="opacity-90">Create a new support request</small>
          </div>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label fw-semibold">Title <span class="text-danger">*</span></label>
                <input 
                  v-model="formData.title" 
                  class="form-control" 
                  placeholder="e.g. Cannot login to dashboard"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Customer <span class="text-danger">*</span></label>
                <input 
                  v-model="formData.customer" 
                  class="form-control" 
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Status</label>
                <select v-model="formData.status" class="form-select">
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Waiting on Customer</option>
                  <option>Done</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Priority</label>
                <select v-model="formData.priority" class="form-select">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Tags</label>
                <input 
                  v-model="tagsInput" 
                  class="form-control" 
                  placeholder="e.g. auth, urgent, bug (comma separated)"
                />
                <small class="text-muted">Separate tags with commas</small>
              </div>

              <div class="col-12">
                <div v-if="formData.tags.length" class="d-flex flex-wrap gap-2 mb-2">
                  <span 
                    v-for="tag in formData.tags" 
                    :key="tag" 
                    class="badge text-bg-light border px-3 py-2 d-flex align-items-center gap-2"
                  >
                    #{{ tag }}
                    <button 
                      type="button" 
                      class="btn-close btn-close-sm" 
                      @click="removeTag(tag)"
                      style="font-size: 0.6rem;"
                    ></button>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" @click="$emit('close')">Cancel</button>
          <button class="btn btn-primary d-flex align-items-center gap-2" @click="handleSubmit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Create Request
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  title: '',
  customer: '',
  status: 'New',
  priority: 'Low',
  tags: []
})

const tagsInput = ref('')

watch(tagsInput, (newVal) => {
  if (newVal) {
    formData.value.tags = newVal
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
  } else {
    formData.value.tags = []
  }
})

watch(() => props.show, (isShowing) => {
  if (isShowing) {
    // Reset form when modal opens
    formData.value = {
      title: '',
      customer: '',
      status: 'New',
      priority: 'Low',
      tags: []
    }
    tagsInput.value = ''
  }
})

function removeTag(tag) {
  formData.value.tags = formData.value.tags.filter(t => t !== tag)
  tagsInput.value = formData.value.tags.join(', ')
}

function handleSubmit() {
  if (!formData.value.title || !formData.value.customer) {
    return
  }
  
  emit('submit', {
    title: formData.value.title,
    customer: formData.value.customer,
    status: formData.value.status,
    priority: formData.value.priority,
    tags: formData.value.tags
  })
  
  emit('close')
}
</script>

