<template>
  <div class="modal-details">
    <ReferenceControls v-model="section" :label="$t('Modal verb details')" :options="options" />
    <div class="detail-heading text-caption text-medium-emphasis">{{ $t(activeLabel) }}</div>

    <div v-if="section === 'rules'" class="detail-content">
      <div v-for="(rule, index) in item.rules" :key="index" class="detail-entry">
        <p class="font-weight-bold mb-2">{{ localizeHeading(rule.name) }}</p>
        <div class="detail-text" v-html="rule.text"></div>
      </div>
    </div>

    <div v-else class="detail-content">
      <div class="detail-options" role="group" :aria-label="$t(activeLabel)">
        <v-btn
          v-for="(entry, index) in entries"
          :key="index"
          size="small"
          :variant="selectedIndex === index ? 'tonal' : 'outlined'"
          color="teal"
          :aria-pressed="selectedIndex === index"
          @click="selectedIndex = index"
        >{{ localizeHeading(entry.name) }}</v-btn>
      </div>
      <template v-if="entries[selectedIndex]">
        <h3 class="text-subtitle-2 mt-4 mb-3">{{ localizeHeading(entries[selectedIndex].name) }}</h3>
        <div v-for="(example, index) in entries[selectedIndex].example" :key="index" class="detail-entry">
          <div class="font-weight-medium detail-text" lang="en" v-html="example.first"></div>
          <div v-if="example.second" class="text-body-2 detail-text">{{ example.second }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { translate } from '@/i18n'
import ReferenceControls from './ReferenceControls.vue'

const props = defineProps({ item: { type: Object, required: true } })
const section = ref('times')
const selectedIndex = ref(0)
const options = [
  { value: 'times', label: 'Time forms', icon: 'mdi-progress-clock' },
  { value: 'uses', label: 'Sentence forms', icon: 'mdi-format-quote-close' },
  { value: 'rules', label: 'Rules', icon: 'mdi-text-box-outline' },
  { value: 'features', label: 'Features', icon: 'mdi-book-open-variant' },
]
const activeLabel = computed(() => options.find(option => option.value === section.value).label)
const entries = computed(() => props.item[section.value] || [])
const headings = {
  'Прошедшее': 'Past tense',
  'Настоящее': 'Present tense',
  'Будущее': 'Future tense',
  'Утверждение': 'Affirmative',
  'Отрицание': 'Negative',
  'Вопрос': 'Question',
  'Правило': 'Rule',
  'модальный глагол': 'Modal verb',
  'вспомогательный глагол': 'Auxiliary verb',
}
function localizeHeading(value) {
  return headings[value] ? translate(headings[value]) : value
}
watch(section, () => { selectedIndex.value = 0 })
</script>

<style scoped>
.modal-details { min-width: 0; }
.detail-heading { padding: 8px 16px 0; }
.detail-content { padding: 8px 16px 16px; }
.detail-options { display: flex; flex-wrap: wrap; gap: 6px; }
.detail-options .v-btn { max-width: 100%; height: auto; min-height: 36px; padding: 6px 10px; letter-spacing: normal; }
.detail-options :deep(.v-btn__content) { white-space: normal; text-align: center; }
.detail-entry + .detail-entry { margin-top: 12px; }
.detail-text { overflow-wrap: anywhere; }
.detail-text :deep(p) { margin-bottom: 8px; }
</style>
