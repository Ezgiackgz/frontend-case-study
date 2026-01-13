import { ref } from 'vue'
import { seedRequests } from '../data/seedRequests'

const STORAGE_KEY = 'support_queue_v1'
const SEED_VERSION_KEY = 'support_queue_seed_version'

function getSeedHash() {
    return JSON.stringify(seedRequests).length + '-' + seedRequests.length
}

function safeParse(json) {
    try { return JSON.parse(json) } catch { return null }
}

function nowISO() {
    return new Date().toISOString()
}

export function useRequests() {
    const allRequests = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function load() {
        loading.value = true
        error.value = null

        try {
            const currentSeedHash = getSeedHash()
            const storedSeedVersion = localStorage.getItem(SEED_VERSION_KEY)
            
            // If seed data changed, clear localStorage and reload
            if (storedSeedVersion !== currentSeedHash) {
                localStorage.removeItem(STORAGE_KEY)
                localStorage.setItem(SEED_VERSION_KEY, currentSeedHash)
            }
            
            const cached = safeParse(localStorage.getItem(STORAGE_KEY))
            if (Array.isArray(cached) && cached.length) {
                allRequests.value = cached
                return
            }

            // Mock API delay
            await new Promise(r => setTimeout(r, 500))

            // Load seed data
            allRequests.value = seedRequests
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allRequests.value))
            localStorage.setItem(SEED_VERSION_KEY, currentSeedHash)
        } catch (e) {
            error.value = e?.message || 'Unknown error'
        } finally {
            loading.value = false
        }
    }

    function persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allRequests.value))
    }

    function updateRequest(id, patch) {
        const idx = allRequests.value.findIndex(r => r.id === id)
        if (idx === -1) return

        const current = allRequests.value[idx]
        const updated = {
            ...current,
            ...patch,
            updatedAt: nowISO()
        }

        allRequests.value = [
            ...allRequests.value.slice(0, idx),
            updated,
            ...allRequests.value.slice(idx + 1),
        ]
        persist()
    }

    function addInternalComment(id, text) {
        const trimmed = String(text || '').trim()
        if (!trimmed) return

        const idx = allRequests.value.findIndex(r => r.id === id)
        if (idx === -1) return

        const current = allRequests.value[idx]
        const comment = { id: `c-${Date.now()}`, text: trimmed, createdAt: nowISO() }

        const updated = {
            ...current,
            internalComments: [...(current.internalComments || []), comment],
            lastCommentAt: comment.createdAt,
            updatedAt: comment.createdAt
        }

        allRequests.value = [
            ...allRequests.value.slice(0, idx),
            updated,
            ...allRequests.value.slice(idx + 1),
        ]
        persist()
    }

    function resetToSeed() {
        allRequests.value = seedRequests
        const currentSeedHash = getSeedHash()
        localStorage.setItem(SEED_VERSION_KEY, currentSeedHash)
        persist()
    }

    function clearStorage() {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(SEED_VERSION_KEY)
    }

    function addRequest(requestData) {
        const newRequest = {
            id: `req-${String(Date.now()).slice(-6)}`,
            title: requestData.title || '',
            customer: requestData.customer || '',
            status: requestData.status || 'New',
            priority: requestData.priority || 'Low',
            createdAt: nowISO(),
            updatedAt: nowISO(),
            lastCommentAt: null,
            tags: requestData.tags || [],
            internalComments: []
        }

        allRequests.value = [newRequest, ...allRequests.value]
        persist()
        return newRequest
    }

    return {
        allRequests,
        loading,
        error,
        load,
        updateRequest,
        addInternalComment,
        resetToSeed,
        addRequest,
        clearStorage,
    }
}
