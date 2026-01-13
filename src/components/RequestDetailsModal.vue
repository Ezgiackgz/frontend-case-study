<template>
  <div v-if="request" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,.45);">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0 shadow">
        <div class="modal-header">
          <div class="flex-grow-1">
            <h5 class="modal-title mb-1 fw-bold">{{ request.title }}</h5>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <small class="opacity-90">ID: {{ request.id }}</small>
              <span class="opacity-50">•</span>
              <small class="opacity-90">{{ request.customer }}</small>
            </div>
          </div>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Status</label>
              <select v-model="localStatus" class="form-select">
                <option>New</option>
                <option>In Progress</option>
                <option>Waiting on Customer</option>
                <option>Done</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Priority</label>
              <select v-model="localPriority" class="form-select">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div class="col-12">
              <div class="p-4 rounded-3 bg-light border">
                <h6 class="mb-3 fw-semibold text-muted text-uppercase" style="font-size: 0.75rem; letter-spacing: 0.05em;">
                  Metadata
                </h6>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  <span class="badge text-bg-light border px-3 py-2">
                    <strong>Created:</strong> {{ formatDate(request.createdAt) }}
                  </span>
                  <span class="badge text-bg-light border px-3 py-2">
                    <strong>Updated:</strong> {{ formatDate(request.updatedAt) }}
                  </span>
                  <span class="badge text-bg-light border px-3 py-2">
                    <strong>Last comment:</strong> {{ formatDate(request.lastCommentAt) }}
                  </span>
                </div>

                <div v-if="request.tags?.length" class="mt-3 pt-3 border-top">
                  <h6 class="mb-2 fw-semibold text-muted text-uppercase" style="font-size: 0.75rem; letter-spacing: 0.05em;">
                    Tags
                  </h6>
                  <div>
                    <span v-for="t in request.tags" :key="t" class="badge text-bg-light border me-2 mb-2 px-3 py-2">#{{ t }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <label class="form-label fw-semibold">Add Internal Comment</label>
              <div class="input-group mb-3">
                <input v-model="commentText" class="form-control" placeholder="Type a note for the team…" @keyup.enter="submitComment" />
                <button class="btn btn-primary d-flex align-items-center gap-2" @click="submitComment">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Add
                </button>
              </div>

              <div class="mt-4">
                <div class="fw-semibold mb-3 d-flex align-items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Internal Comments
                </div>

                <div v-if="!request.internalComments?.length" class="text-muted text-center py-4 bg-light rounded-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-2 opacity-50">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <div>No comments yet.</div>
                </div>

                <div v-else class="list-group">
                  <div v-for="c in request.internalComments" :key="c.id" class="list-group-item">
                    <div class="d-flex justify-content-between align-items-start">
                      <div class="flex-grow-1">{{ c.text }}</div>
                      <small class="text-muted ms-3">{{ formatDate(c.createdAt) }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" @click="$emit('close')">Close</button>
          <button class="btn btn-primary d-flex align-items-center gap-2" @click="save">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  request: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save', 'add-comment'])

const localStatus = ref('New')
const localPriority = ref('Low')
const commentText = ref('')

watch(
    () => props.request,
    (r) => {
      if (!r) return
      localStatus.value = r.status
      localPriority.value = r.priority
      commentText.value = ''
    },
    { immediate: true }
)

function save() {
  emit('save', {
    id: props.request.id,
    patch: { status: localStatus.value, priority: localPriority.value }
  })
}

function submitComment() {
  emit('add-comment', { id: props.request.id, text: commentText.value })
  commentText.value = ''
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString()
}
</script>
