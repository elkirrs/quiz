<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal">
        <v-toolbar-title>{{ $t('Table of all tenses of the English language') }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon :aria-label="$t('Close')" @click="dialogModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="tense-reference">
        <div class="tense-controls">
          <v-text-field
            v-model="search"
            :label="$t('Search tenses')"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            color="teal"
            density="compact"
            hide-details
            @keydown.stop
          />
          <v-btn-toggle v-model="period" mandatory class="tense-filters" :aria-label="$t('Filter by period')">
            <v-btn
              v-for="option in filterOptions"
              :key="option"
              :value="option"
              :aria-pressed="period === option"
              :variant="period === option ? 'tonal' : 'text'"
              color="teal"
              rounded="lg"
              size="small"
            >
              {{ $t(filterLabels[option]) }}
            </v-btn>
          </v-btn-toggle>
        </div>

        <p v-if="!filtered.length" class="text-medium-emphasis mt-6">{{ $t('No tenses found') }}</p>
        <v-row v-if="period !== 'All' && !mobile" dense class="selected-period">
          <v-col v-for="item in filtered" :key="item.name" cols="12" md="3">
            <v-card class="tense-card" rounded="lg" elevation="2">
              <v-card-title class="text-h6 font-weight-bold">{{ item.name }}</v-card-title>
              <TenseDetails :item="item" />
            </v-card>
          </v-col>
        </v-row>
        <section v-for="group in (period !== 'All' && !mobile ? [] : groups)" :key="group.aspect" class="tense-group">
          <h2 class="text-subtitle-1 font-weight-bold mb-2">{{ group.aspect }}</h2>
          <v-expansion-panels v-if="mobile" variant="accordion">
            <v-expansion-panel v-for="item in group.items" :key="item.name" :title="item.name" rounded="lg" elevation="2">
              <v-expansion-panel-text>
                <TenseDetails :item="item" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-row v-else dense>
            <v-col
              v-for="column in group.columns"
              :key="column.period"
              cols="12"
              md="4"
            >
              <v-card v-if="column.item" class="tense-card" rounded="lg" elevation="2">
                <v-card-title class="text-h6 font-weight-bold">{{ column.item.name }}</v-card-title>
                <TenseDetails :item="column.item" />
              </v-card>
            </v-col>
          </v-row>
        </section>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useDisplay } from 'vuetify'
import TenseDetails from './TenseDetails.vue'
import { locale } from '@/i18n'
import { aspects, filterTenses, periods, tenses } from '@/data/tenseReference.js'

const props = defineProps({ dialog: Boolean })
const emit = defineEmits(['update:dialog'])
const dialogModel = computed({
  get: () => props.dialog,
  set: value => emit('update:dialog', value),
})
const { smAndDown: mobile } = useDisplay()
const search = ref('')
const period = ref('All')
const filterOptions = ['All', ...periods]
const filterLabels = { All: 'All', Past: 'Past tense', Present: 'Present tense', Future: 'Future tense' }
const filtered = computed(() => filterTenses(tenses, period.value, search.value, locale.value))
const groups = computed(() => aspects.map(aspect => {
  const items = filtered.value.filter(item => item.aspect === aspect)
  const columns = (period.value === 'All' ? periods : [period.value])
    .map(value => ({ period: value, item: items.find(item => item.period === value) }))
  return { aspect, items, columns }
}).filter(group => group.items.length))

function handleHotkey(event) {
  const target = event.target
  if (event.ctrlKey && event.key === 'f' && !target.isContentEditable &&
      !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
    dialogModel.value = !dialogModel.value
  }
}

onMounted(() => window.addEventListener('keydown', handleHotkey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleHotkey))
</script>

<style scoped>
.tense-reference { max-width: 1500px; width: 100%; margin: 0 auto; }
.tense-controls { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.tense-controls .v-text-field { min-width: 200px; flex: 1 1 260px; }
.tense-filters { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); flex: 0 1 420px; width: 100%; max-width: 100%; height: 44px; padding: 3px; border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)); border-radius: 8px; background: rgba(var(--v-theme-on-surface), 0.04); }
.tense-filters .v-btn { min-width: 0; height: 38px !important; padding-inline: 4px; letter-spacing: normal; font-size: 0.75rem; }
.tense-filters :deep(.v-btn__content) { white-space: normal; text-align: center; line-height: 1.1; }
.tense-filters :deep(.v-theme--dark.v-btn--active) { color: #4db6ac !important; }
.tense-filters :deep(.v-theme--dark.v-btn--active span) { color: inherit; }
.selected-period { margin-top: 20px; }
.tense-group { margin-top: 24px; }
.tense-card { height: 100%; }
.tense-card .v-card-title { white-space: normal; }
.tense-reference :deep(.v-expansion-panel-text__wrapper) { padding: 0; }
</style>

<style>
.v-tab.v-tab.v-btn {
  min-width: 60px !important;
  justify-content: right;
}

.v-table > .v-table__wrapper > table > tbody > tr > td, .v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > td, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > td, .v-table > .v-table__wrapper > table > tfoot > tr > th {
  padding: 0 2px !important;
  justify-content: center;
}
</style>
