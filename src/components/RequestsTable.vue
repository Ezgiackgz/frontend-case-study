<template>
  <div>

    <div v-if="loading" class="alert alert-info mb-0 d-flex align-items-center gap-2">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span>Loading requests…</span>
    </div>

    <div v-else-if="error" class="alert alert-danger d-flex align-items-center justify-content-between mb-0">
      <div class="d-flex align-items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ error }}</span>
      </div>
      <button class="btn btn-light btn-sm" @click="$emit('retry')">Retry</button>
    </div>

    <div v-else-if="!rows.length" class="alert alert-warning mb-0 d-flex align-items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>No results. Try clearing filters/search.</span>
    </div>

    <template v-else>
      <div class="table-responsive">
        <table class="table align-middle table-hover">
          <thead class="table-light">
          <tr>
            <th 
              style="width: 110px;" 
              class="sortable"
              :class="{ 'sort-asc': sortField === 'id' && sortDirection === 'asc', 'sort-desc': sortField === 'id' && sortDirection === 'desc' }"
              @click="handleSort('id')"
            >
              <div class="d-flex align-items-center gap-2">
                ID
                <svg v-if="sortField === 'id'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="sortDirection === 'asc'" d="M12 19V5M5 12l7-7 7 7"/>
                  <path v-else d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-25">
                  <path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                </svg>
              </div>
            </th>
            <th 
              class="sortable"
              :class="{ 'sort-asc': sortField === 'title' && sortDirection === 'asc', 'sort-desc': sortField === 'title' && sortDirection === 'desc' }"
              @click="handleSort('title')"
            >
              <div class="d-flex align-items-center gap-2">
                Title
                <svg v-if="sortField === 'title'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="sortDirection === 'asc'" d="M12 19V5M5 12l7-7 7 7"/>
                  <path v-else d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-25">
                  <path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                </svg>
              </div>
            </th>
            <th 
              style="width: 220px;" 
              class="sortable"
              :class="{ 'sort-asc': sortField === 'customer' && sortDirection === 'asc', 'sort-desc': sortField === 'customer' && sortDirection === 'desc' }"
              @click="handleSort('customer')"
            >
              <div class="d-flex align-items-center gap-2">
                Customer
                <svg v-if="sortField === 'customer'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="sortDirection === 'asc'" d="M12 19V5M5 12l7-7 7 7"/>
                  <path v-else d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-25">
                  <path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                </svg>
              </div>
            </th>
            <th 
              style="width: 170px;" 
              class="sortable"
              :class="{ 'sort-asc': sortField === 'status' && sortDirection === 'asc', 'sort-desc': sortField === 'status' && sortDirection === 'desc' }"
              @click="handleSort('status')"
            >
              <div class="d-flex align-items-center gap-2">
                Status
                <svg v-if="sortField === 'status'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="sortDirection === 'asc'" d="M12 19V5M5 12l7-7 7 7"/>
                  <path v-else d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-25">
                  <path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                </svg>
              </div>
            </th>
            <th 
              style="width: 120px;" 
              class="sortable"
              :class="{ 'sort-asc': sortField === 'priority' && sortDirection === 'asc', 'sort-desc': sortField === 'priority' && sortDirection === 'desc' }"
              @click="handleSort('priority')"
            >
              <div class="d-flex align-items-center gap-2">
                Priority
                <svg v-if="sortField === 'priority'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="sortDirection === 'asc'" d="M12 19V5M5 12l7-7 7 7"/>
                  <path v-else d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-25">
                  <path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                </svg>
              </div>
            </th>
            <th 
              style="width: 170px;" 
              class="sortable"
              :class="{ 'sort-asc': sortField === 'createdAt' && sortDirection === 'asc', 'sort-desc': sortField === 'createdAt' && sortDirection === 'desc' }"
              @click="handleSort('createdAt')"
            >
              <div class="d-flex align-items-center gap-2">
                Created
                <svg v-if="sortField === 'createdAt'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="sortDirection === 'asc'" d="M12 19V5M5 12l7-7 7 7"/>
                  <path v-else d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-25">
                  <path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                </svg>
              </div>
            </th>
            <th 
              style="width: 170px;" 
              class="sortable"
              :class="{ 'sort-asc': sortField === 'lastActivityAt' && sortDirection === 'asc', 'sort-desc': sortField === 'lastActivityAt' && sortDirection === 'desc' }"
              @click="handleSort('lastActivityAt')"
            >
              <div class="d-flex align-items-center gap-2">
                Last activity
                <svg v-if="sortField === 'lastActivityAt'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="sortDirection === 'asc'" d="M12 19V5M5 12l7-7 7 7"/>
                  <path v-else d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-25">
                  <path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                </svg>
              </div>
            </th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="r in rows"
              :key="r.id"
              role="button"
              :class="{ 'needs-attention': r.needsAttention }"
              @click="$emit('select', r.id)"
          >
            <td class="text-muted">{{ r.id }}</td>
            <td>
              <div class="fw-semibold mb-1">{{ r.title }}</div>
              <div class="d-flex flex-wrap gap-1">
                  <span v-for="t in r.tags" :key="t" class="badge text-bg-light border">
                    #{{ t }}
                  </span>
              </div>
            </td>
            <td>{{ r.customer }}</td>
            <td>
              <div class="d-flex flex-wrap gap-1 align-items-center">
                <span class="badge" :class="statusClass(r.status)">{{ r.status }}</span>
                <span v-if="r.needsAttention" class="badge text-bg-warning" title="Needs Attention">
                  ⚠️
                </span>
              </div>
            </td>
            <td>
              <span class="badge" :class="priorityClass(r.priority)">{{ r.priority }}</span>
            </td>
            <td>{{ formatDate(r.createdAt) }}</td>
            <td>
              <div>{{ formatDate(r.lastActivityAt) }}</div>
              <div v-if="r.reasons?.length" class="mt-1 d-flex flex-wrap gap-1">
                <span 
                  v-for="reason in r.reasons" 
                  :key="reason" 
                  class="badge text-bg-warning"
                  style="font-size: 0.7rem; padding: 0.25rem 0.5rem;"
                >
                  {{ reason }}
                </span>
              </div>
            </td>
          </tr>
          </tbody>

        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
        <div class="text-muted small">
          Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} entries
        </div>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </li>
            
            <li 
              v-for="(page, index) in visiblePages" 
              :key="`page-${index}-${page}`" 
              class="page-item"
              :class="{ active: page === currentPage, disabled: page === '...' }"
            >
              <button 
                v-if="page !== '...'"
                class="page-link" 
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
              <span v-else class="page-link">{{ page }}</span>
            </li>
            
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Requests' },
  rows: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 10 }
})

const emit = defineEmits(['select', 'retry', 'export', 'reset', 'sort', 'page-change'])

const sortField = ref(null)
const sortDirection = ref('asc')

function handleSort(field) {
  if (sortField.value === field) {
    // Toggle direction if same field
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // New field, start with ascending
    sortField.value = field
    sortDirection.value = 'asc'
  }
  emit('sort', { field: sortField.value, direction: sortDirection.value })
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString()
}

function statusClass(status) {
  if (status === 'Done') return 'text-bg-success'
  if (status === 'In Progress') return 'text-bg-primary'
  if (status === 'Waiting on Customer') return 'text-bg-secondary'
  return 'text-bg-dark'
}

function priorityClass(p) {
  if (p === 'High') return 'text-bg-danger'
  if (p === 'Medium') return 'text-bg-warning'
  return 'text-bg-info'
}

// Pagination helpers
const totalItems = computed(() => props.rows.length)
const startItem = computed(() => {
  if (totalItems.value === 0) return 0
  return (props.currentPage - 1) * props.itemsPerPage + 1
})
const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, totalItems.value)
})

const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    // Show pages around current
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    pages.push(total)
  }
  
  return pages
})

function goToPage(page) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
