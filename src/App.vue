<template>
  <div class="min-vh-100 app-background">
    <nav class="navbar navbar-expand-lg border-bottom sticky-top">
      <div class="container py-3">
        <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradient1)"/>
            <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="url(#gradient2)"/>
            <defs>
              <linearGradient id="gradient1" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="2" y1="14.5" x2="22" y2="14.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
          Support Queue Dashboard
        </a>

        <div class="ms-auto d-flex gap-3 align-items-center">
          <button 
            class="btn btn-primary btn-sm d-flex align-items-center gap-2"
            @click="showAddModal = true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Request
          </button>
        </div>
      </div>
    </nav>

    <main>
      <!-- Key Metrics Dashboard -->
      <section class="metrics-section">
        <div class="container-fluid px-4 py-4">
          <div class="row g-3">
            <div class="col-6 col-md-3">
              <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div class="metric-content">
                  <div class="metric-label">Total Requests</div>
                  <div class="metric-value">{{ allRequests.length }}</div>
                </div>
              </div>
            </div>
            
            <div class="col-6 col-md-3">
              <div class="metric-card metric-card-warning">
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div class="metric-content">
                  <div class="metric-label">Needs Attention</div>
                  <div class="metric-value">{{ needsAttentionCount }}</div>
                </div>
              </div>
            </div>
            
            <div class="col-6 col-md-3">
              <div class="metric-card metric-card-danger">
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                </div>
                <div class="metric-content">
                  <div class="metric-label">High Priority</div>
                  <div class="metric-value">{{ highCount }}</div>
                </div>
              </div>
            </div>
            
            <div class="col-6 col-md-3">
              <div class="metric-card metric-card-success">
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div class="metric-content">
                  <div class="metric-label">Completed</div>
                  <div class="metric-value">{{ doneCount }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Chart Section -->
      <section class="chart-section">
        <div class="container-fluid px-4 py-4">
          <div class="row">
            <div class="col-12">
              <div class="section-header mb-4">
                <h3 class="section-title">Status Distribution</h3>
                <p class="section-subtitle text-muted">Visual breakdown of request statuses</p>
              </div>
              <SummaryChart :requests="allRequests" />
            </div>
          </div>
        </div>
      </section>

      <!-- Filter & Table Section -->
      <section class="table-section">
        <div class="container-fluid px-4 py-4">
          <!-- Quick Filters -->
          <div class="quick-filters mb-4">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
              <button 
                class="quick-filter-btn"
                :class="{ active: viewMode === 'all' }"
                @click="viewMode = 'all'"
              >
                All Requests
                <span class="badge ms-2">{{ allRequests.length }}</span>
              </button>
              <button 
                class="quick-filter-btn quick-filter-btn-warning"
                :class="{ active: viewMode === 'needs' }"
                @click="viewMode = 'needs'"
              >
                Needs Attention
                <span class="badge ms-2">{{ needsAttentionCount }}</span>
              </button>
              <div class="ms-auto d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2" @click="exportCsv">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export CSV
                </button>
                <button class="btn btn-sm btn-outline-danger d-flex align-items-center gap-2" @click="resetToSeed" title="Reset demo data">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Search and Filters -->
            <div class="filters-row">
              <div class="row g-3">
                <div class="col-md-5">
                  <div class="input-group">
                    <span class="input-group-text">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </span>
                    <input 
                      v-model="search" 
                      class="form-control" 
                      placeholder="Search by title or customer..." 
                    />
                  </div>
                </div>
                
                <div class="col-md-2">
                  <select v-model="statusFilter" class="form-select">
                    <option value="">All Status</option>
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Waiting on Customer</option>
                    <option>Done</option>
                  </select>
                </div>
                
                <div class="col-md-2">
                  <select v-model="sortDir" class="form-select">
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
                
                <div class="col-md-3">
                  <div class="text-muted small text-end">
                    Showing <strong>{{ visibleRows.length }}</strong> of <strong>{{ allRequests.length }}</strong> requests
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Table Card -->
          <div class="table-card">

            <RequestTable
                :title="viewMode === 'needs' ? 'Needs Attention' : 'All Requests'"
                :rows="paginatedRows"
                :loading="loading"
                :error="error"
                :current-page="currentPage"
                :total-pages="totalPages"
                :items-per-page="itemsPerPage"
                @select="openDetails"
                @retry="load"
                @sort="handleTableSort"
                @page-change="handlePageChange"
            />
          </div>
        </div>
      </section>

      <RequestDetailsModal
          :request="selectedRequest"
          @close="selectedId = null"
          @save="onSave"
          @add-comment="onAddComment"
      />

      <AddRequestModal
          :show="showAddModal"
          @close="showAddModal = false"
          @submit="onAddRequest"
      />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import SummaryChart from './components/SummaryChart.vue'
import RequestTable from './components/RequestsTable.vue'
import RequestDetailsModal from './components/RequestDetailsModal.vue'
import AddRequestModal from './components/AddRequestModal.vue'

import { useRequests } from './composables/useRequests'
import { downloadCsv } from './utils/csv'
import { getNeedsAttentionReasons, getLastActivityISO } from './utils/needsAttention'

const { allRequests, loading, error, load, updateRequest, addInternalComment, resetToSeed, addRequest } = useRequests()


const search = ref('')
const statusFilter = ref('')
const sortDir = ref('desc')
const viewMode = ref('all')

const selectedId = ref(null)
const showAddModal = ref(false)
const tableSort = ref({ field: null, direction: 'asc' })


const currentPage = ref(1)
const itemsPerPage = ref(10)

onMounted(load)

const normalizedSearch = computed(() => search.value.trim().toLowerCase())
const decorated = computed(() => {
  return allRequests.value.map(r => {
    const lastActivityAt = getLastActivityISO(r) || r.updatedAt
    const { needsAttention, reasons } = getNeedsAttentionReasons(r)
    return { ...r, lastActivityAt, needsAttention, reasons }
  })
})

const visibleRows = computed(() => {
  let rows = decorated.value
  if (viewMode.value === 'needs') {
    rows = rows.filter(r => r.needsAttention)
  }
  if (statusFilter.value) {
    rows = rows.filter(r => r.status === statusFilter.value)
  }
  if (normalizedSearch.value) {
    const q = normalizedSearch.value
    rows = rows.filter(r =>
        (r.title || '').toLowerCase().includes(q) ||
        (r.customer || '').toLowerCase().includes(q)
    )
  }
  let sorted = rows.slice()
  
  if (tableSort.value.field) {
    const field = tableSort.value.field
    const dir = tableSort.value.direction === 'asc' ? 1 : -1
    
    sorted.sort((a, b) => {
      let aVal = a[field]
      let bVal = b[field]
      

      if (field === 'createdAt' || field === 'updatedAt' || field === 'lastActivityAt') {
        aVal = new Date(aVal || 0).getTime()
        bVal = new Date(bVal || 0).getTime()
      } 

      else if (field === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
        aVal = priorityOrder[aVal] || 0
        bVal = priorityOrder[bVal] || 0
      }

      else if (field === 'status') {
        const statusOrder = { 'New': 1, 'In Progress': 2, 'Waiting on Customer': 3, 'Done': 4 }
        aVal = statusOrder[aVal] || 0
        bVal = statusOrder[bVal] || 0
      }
      else {

        aVal = String(aVal || '').toLowerCase()
        bVal = String(bVal || '').toLowerCase()
      }
      
      if (aVal < bVal) return -1 * dir
      if (aVal > bVal) return 1 * dir
      return 0
    })
  } else {

    sorted.sort((a, b) => {
      const da = new Date(a.createdAt).getTime()
      const db = new Date(b.createdAt).getTime()
      return sortDir.value === 'asc' ? da - db : db - da
    })
  }

  return sorted
})


const totalPages = computed(() => {
  return Math.ceil(visibleRows.value.length / itemsPerPage.value)
})

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return visibleRows.value.slice(start, end)
})


watch([search, statusFilter, viewMode, tableSort], () => {
  currentPage.value = 1
})

const selectedRequest = computed(() => {
  if (!selectedId.value) return null
  return allRequests.value.find(r => r.id === selectedId.value) || null
})

const needsAttentionCount = computed(() => decorated.value.filter(r => r.needsAttention).length)
const doneCount = computed(() => allRequests.value.filter(r => r.status === 'Done').length)
const highCount = computed(() => allRequests.value.filter(r => r.priority === 'High').length)

function openDetails(id) {
  selectedId.value = id
}

function onSave({ id, patch }) {
  updateRequest(id, patch)
}

function onAddComment({ id, text }) {
  addInternalComment(id, text)
}

function exportCsv() {
  const rows = visibleRows.value.map(r => ({
    id: r.id,
    title: r.title,
    customer: r.customer,
    status: r.status,
    priority: r.priority,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    lastCommentAt: r.lastCommentAt ?? '',
    tags: (r.tags || []).join('|'),
    needsAttention: r.needsAttention ? 'YES' : 'NO',
    reasons: (r.reasons || []).join('|')
  }))

  downloadCsv(`support-requests-${viewMode.value}.csv`, rows)
}

function handleTableSort({ field, direction }) {
  tableSort.value = { field, direction }
}

function onAddRequest(requestData) {
  addRequest(requestData)
  showAddModal.value = false
}

function handlePageChange(page) {
  currentPage.value = page
  document.querySelector('.table-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
