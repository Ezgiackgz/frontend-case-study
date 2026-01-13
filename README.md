# Orphex Frontend Case Study - Support Requests Dashboard

A Vue 3 application for managing and visualizing support requests with real-time filtering, sorting, and data visualization.

## 🚀 How to Run

### Prerequisites
- Node.js (^20.19.0 || >=22.12.0)
- pnpm


### Installation

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal).

### Build for Production

```sh
pnpm build
```

### Preview Production Build

```sh
pnpm preview
```

## 📋 Project Structure

```
src/
├── components/
│   ├── RequestsTable.vue      # Main table view with sorting/filtering
│   ├── RequestDetailsModal.vue # Detail view for editing requests
│   ├── SummaryChart.vue        # Highcharts visualization
│   ├── AddRequestModal.vue     # Modal for adding new requests
│   └── NeedsAttention.vue      # Alternative view component (optional)
├── composables/
│   └── useRequests.js          # State management and data operations
├── utils/
│   ├── needsAttention.js       # Business logic for "Needs Attention"
│   └── csv.js                  # CSV export functionality
├── data/
│   └── seedRequests.js         # Mock data
└── App.vue                     # Main application component
```

## 🎯 Core Features

### 1. Requests List ✅
- **Search**: Filter by title or customer name
- **Status Filter**: Filter by request status (New, In Progress, Waiting on Customer, Done)
- **Sorting**: 
  - Default: Sort by created date (newest first)
  - Column sorting: Click any table header to sort by that column
- **Details View**: Click any row to open detailed modal
- **States**: Loading, empty, and error states with retry functionality

### 2. Request Details ✅
- View all request fields
- **Edit Status**: Change request status
- **Edit Priority**: Change priority level (Low, Medium, High)
- **Add Internal Comments**: Add team notes with timestamps
- **Persistence**: All changes saved to localStorage automatically

### 3. Needs Attention Logic ✅
- **Toggle View**: Switch between "All Requests" and "Needs Attention" views
- **Business Rules**: A request needs attention if:
  1. Status is NOT "Done"
  2. Priority is "High" OR request is older than 7 days
  3. No activity in the last 3 days
- **Activity Definition**: Most recent of `updatedAt` or `lastCommentAt`
- **Reason Labels**: Shows why each request needs attention:
  - "High priority"
  - "Aging request" (older than 7 days)
  - "No recent activity" (no activity in 3+ days)

### 4. Visual Summary (Chart) ✅
- **Chart Type**: Donut chart using Highcharts
- **Data**: Request count by status (New, In Progress, Waiting on Customer, Done)
- **Auto-update**: Chart updates automatically when data changes
- **Integration**: Uses `highcharts-vue` for Vue 3 integration

### 5. Data Integrity ✅
- **Non-mutating Operations**: All filtering and sorting operations use immutable patterns:
  - `filter()` returns new array
  - `slice().sort()` creates copy before sorting
  - `map()` creates new decorated array
- **Documentation**: See `App.vue` line 182-184 for explicit comments

### 6. CSV Export ✅
- **Export Button**: Clear "Export CSV" button in table header
- **Current State**: Exports exactly what's visible (respects search, filters, sorting)
- **Client-side**: Pure JavaScript implementation, no server required
- **Fields Included**: All request fields plus computed "needsAttention" and "reasons"

## 🛠️ Technical Decisions

### Vue 3 Composition API
- All components use `<script setup>` syntax
- Reactive state managed with `ref()` and `computed()`
- Logic extracted to composables for reusability

### State Management
- **Local State**: Component-level state with Vue refs
- **Shared State**: `useRequests()` composable for data operations
- **Persistence**: localStorage with key `support_queue_v1`
- **No Pinia**: Kept simple as per case study requirements

### Data Flow
1. Load from localStorage on mount
2. If empty, load seed data and persist
3. All mutations trigger `persist()` to save to localStorage
4. Computed properties handle filtering/sorting without mutation

### Chart Library
- **Highcharts**: Industry-standard, well-documented
- **highcharts-vue**: Official Vue 3 integration
- **Donut Chart**: Clear visual representation of status distribution

## 📝 Assumptions Made

1. **Data Source**: Treating seed data as mock API response (500ms delay simulation)
2. **localStorage**: Using browser localStorage for persistence (no backend)
3. **Date Handling**: All dates in ISO 8601 format
4. **Activity Logic**: If `lastCommentAt` is null, only `updatedAt` is considered
5. **Aging Threshold**: 7 days from `createdAt` (not `updatedAt`)
6. **Inactivity Threshold**: 3 days from last activity
7. **Priority Order**: High > Medium > Low (for sorting)
8. **Status Order**: New > In Progress > Waiting on Customer > Done (for sorting)

## ✨ Additional Features (Beyond Requirements)

1. **Add New Request**: Modal form to create new support requests
2. **Column Sorting**: Click any table header to sort by that column
3. **Visual Enhancements**: Modern UI with gradients, animations, and icons
4. **Responsive Design**: Works on mobile and desktop
5. **Badge Indicators**: Visual indicators for status, priority, and attention needs

## 🔧 What I Would Improve with One Extra Day

1. **Testing**:
   - Unit tests for `needsAttention.js` logic
   - Component tests for critical user flows
   - Test coverage for edge cases (null dates, empty arrays)

2. **Accessibility**:
   - ARIA labels for interactive elements
   - Keyboard navigation improvements
   - Screen reader optimizations
   - Focus management in modals

3. **Performance**:
   - Virtual scrolling for large datasets
   - Debounced search input
   - Memoization for expensive computations

4. **User Experience**:
   - Toast notifications for successful actions
   - Undo/redo functionality
   - Bulk operations (select multiple, change status)
   - Advanced filters (date range, priority combinations)

5. **Code Quality**:
   - TypeScript migration for type safety
   - More comprehensive error handling
   - Loading skeletons instead of spinners
   - Better separation of concerns

6. **Optional Features**:
   - Vue Router with URL query params for filters
   - Pinia store for more complex state management
   - Real-time updates simulation
   - Export to other formats (JSON, Excel)

## 📦 Dependencies

- **Vue 3.5.26**: Core framework
- **Bootstrap 5.3.8**: UI components and styling
- **Highcharts 12.5.0**: Chart visualization
- **highcharts-vue 2.0.1**: Vue integration for Highcharts
- **Vite 7.3.0**: Build tool and dev server

## 🎨 Design Philosophy

- **Clean & Focused**: Prioritized clarity over feature bloat
- **User-Centric**: Clear visual hierarchy and intuitive interactions
- **Data-Driven**: Visual summary helps understand situation at a glance
- **Responsive**: Works well on all screen sizes
- **Accessible**: Semantic HTML and proper labeling

## 📄 License

This is a case study project for Orphex.
