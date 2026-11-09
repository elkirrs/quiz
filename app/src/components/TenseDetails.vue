<template>
  <div class="tense-details">
    <ReferenceControls v-model="tab" :label="$t('Tense details')" :options="options" />
    <div class="detail-heading text-caption text-medium-emphasis">{{ $t(activeLabel) }}</div>

    <v-window v-model="tab">
      <v-window-item value="examples">
        <div v-for="form in forms" :key="form" class="tense-entry">
          <div class="text-caption text-medium-emphasis">{{ $t(formLabels[form]) }}</div>
          <div class="font-weight-medium" lang="en" v-html="item.examples[form].en"></div>
          <div v-if="locale === 'ru'" class="text-body-2">{{ item.examples[form].ru }}</div>
        </div>
      </v-window-item>

      <v-window-item value="formula">
        <div v-for="(form, index) in forms" :key="form" class="tense-entry">
          <div class="text-caption text-medium-emphasis">{{ $t(formLabels[form]) }}</div>
          <div class="font-weight-medium formula" lang="en">{{ item.formulas[index] }}</div>
        </div>
        <p class="text-caption text-medium-emphasis mt-3">{{ $t('Subject is the person or thing doing the action; V is the base verb; V₂ is the past form; V₃ is the past participle; V-ing is the -ing form. Choose the auxiliary verb to match the subject.') }}</p>
        <p v-if="item.aspect === 'Simple'" class="text-caption text-medium-emphasis mt-1">
          {{ $t('Simple formulas are for ordinary verbs; be forms negatives and questions differently.') }}
        </p>
        <p v-if="item.name === 'Present Simple'" class="text-caption text-medium-emphasis mt-1">
          {{ $t('Use the -s or -es form with he, she and it.') }}
        </p>
      </v-window-item>

      <v-window-item value="usage">
        <ul class="tense-usage">
          <li v-for="use in item.use[locale]" :key="use">{{ use }}</li>
        </ul>
      </v-window-item>

      <v-window-item value="markers">
        <p lang="en">{{ item.markers }}</p>
        <p class="text-caption text-medium-emphasis mt-3">{{ $t('Markers are clues, not rules.') }}</p>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ReferenceControls from './ReferenceControls.vue'
import { locale } from '@/i18n'
import { forms } from '@/data/tenseReference.js'

defineProps({ item: { type: Object, required: true } })

const tab = ref('examples')
const formLabels = { positive: 'Affirmative', negative: 'Negative', question: 'Question' }
const options = [
  { value: 'examples', label: 'Examples', icon: 'mdi-format-quote-close' },
  { value: 'formula', label: 'Formula', icon: 'mdi-function-variant' },
  { value: 'usage', label: 'When to use', icon: 'mdi-book-open-variant' },
  { value: 'markers', label: 'Markers', icon: 'mdi-tag-outline' },
]
const activeLabel = computed(() => options.find(option => option.value === tab.value).label)
</script>

<style scoped>
.tense-details { min-width: 0; }
.detail-heading { padding: 8px 16px 0; }
.tense-details :deep(.v-window-item) { padding: 8px 16px 16px; }
.tense-entry + .tense-entry { margin-top: 12px; }
.formula { overflow-wrap: anywhere; }
.tense-usage { padding-left: 20px; }
.tense-usage li + li { margin-top: 8px; }
</style>
