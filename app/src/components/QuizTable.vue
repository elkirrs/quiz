<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>{{ $t('Word list') }}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon :aria-label="$t('Close')" @click="dialogModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="word-list pa-4">
        <div class="word-list-controls">
          <v-text-field
            v-model="search"
            :label="$t('Search words')"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            density="compact"
            variant="outlined"
            color="teal"
            @keydown.stop
          />
          <div class="text-body-2 text-medium-emphasis" aria-live="polite">
            {{ $t('Found') }}: <strong>{{ filteredWords.length }}</strong> / {{ mergedWords.length }}
          </div>
        </div>

        <div class="d-none d-md-block">
          <v-data-table
            v-model:page="desktopPage"
            :headers="headers"
            :items="filteredWords"
            :items-per-page="100"
            :no-data-text="$t('No words found')"
            class="word-table mt-4"
          >
            <template v-slot:item.part_of_speech="{ item }">
              <v-chip v-if="item.part_of_speech" size="small" variant="tonal" color="teal" label>
                {{ item.part_of_speech }}
              </v-chip>
            </template>
            <template v-slot:item.example="{ item }">
              <div v-html="item.example"></div>
            </template>
          </v-data-table>
        </div>

        <div class="d-md-none">
          <v-card
            v-for="(word, index) in mobileWords"
            :key="`${word.en || word.infinitive}-${index}`"
            class="word-card mb-3"
            rounded="lg"
            elevation="2"
          >
            <v-card-title class="word-heading">
              <span class="text-h6 font-weight-bold">{{ word.en || word.infinitive }}</span>
              <v-chip v-if="word.part_of_speech" size="small" variant="tonal" color="teal" label>
                {{ word.part_of_speech }}
              </v-chip>
            </v-card-title>
            <v-card-text class="pt-1">
              <div
                v-for="header in mobileHeaders(word)"
                :key="header.key"
                class="word-field"
              >
                <div class="text-caption text-medium-emphasis">{{ header.title }}</div>
                <div v-if="header.key === 'example'" v-html="word[header.key]"></div>
                <div v-else :class="{ 'text-body-1 font-weight-medium': header.key === 'ru' || header.key === 'translation' }">{{ word[header.key] }}</div>
              </div>
            </v-card-text>
          </v-card>

          <div v-if="!filteredWords.length" class="text-center pa-4">
            {{ $t('No words found') }}
          </div>

          <v-pagination
            v-if="filteredWords.length > mobilePageSize"
            v-model="mobilePage"
            :length="mobilePageCount"
            :total-visible="5"
            density="compact"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mergeWordEntries } from '@/word-list.js'

export default {
  emits: ['update:dialog'],
  props: {
    words: {
      type: Array,
      required: true,
    },
    quiz: {
      type: String,
      required: true
    },
    dialog: Boolean
  },
  data() {
    return {
      search: '',
      mobilePage: 1,
      desktopPage: 1,
      mobilePageSize: 20,
    };
  },
  computed: {
    headers() {
      if (!this.words.length) return []
      const keys = [...new Set(this.words.flatMap(word => Object.keys(word)))]
      return keys.map(key => {
        let width = '120px'
        if (key === 'en') width = '200px'
        if (key === 'ru' || key === 'translation') width = '220px'
        if (key === 'example') width = '260px'
        return {
          title: key === 'en' ? this.$t('English') : key === 'ru' ? this.$t('Translation') : this.humanize(key),
          key,
          sortable: true,
          align: 'start',
          headerProps: { style: `min-width: ${width};` },
          cellProps: { style: `min-width: ${width}; white-space: normal; overflow-wrap: anywhere;` }
        }
      })
    },
    dialogModel: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit('update:dialog', val);
      }
    },
    mergedWords() {
      return mergeWordEntries(this.words, this.quiz)
    },
    filteredWords() {
      const search = (this.search || '').trim().toLowerCase();
      return this.mergedWords
        .filter(item => {
          return Object.values(item).some(val => {
            if (typeof val === 'string') {
              const plain = val.replace(/<[^>]+>/g, '').toLowerCase();
              return plain.includes(search);
            }
            return false;
          });
        })
        .sort((a, b) => {
          const aName = (a.en || a.infinitive || '').toLowerCase();
          const bName = (b.en || b.infinitive || '').toLowerCase();
          return aName.localeCompare(bName);
        });
    },
    mobilePageCount() {
      return Math.ceil(this.filteredWords.length / this.mobilePageSize)
    },
    mobileWords() {
      const start = (this.mobilePage - 1) * this.mobilePageSize
      return this.filteredWords.slice(start, start + this.mobilePageSize)
    },
  },
  watch: {
    search() {
      this.mobilePage = 1
      this.desktopPage = 1
    },
    words: {
      handler() {
        this.mobilePage = 1
        this.desktopPage = 1
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleHotkey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleHotkey);
  },
  methods: {
    mobileHeaders(word) {
      const titleKey = word.en ? 'en' : 'infinitive'
      return this.headers.filter(header =>
        header.key !== titleKey &&
        header.key !== 'part_of_speech' &&
        word[header.key] !== '' &&
        word[header.key] !== null &&
        word[header.key] !== undefined
      ).sort((a, b) => {
        const priority = key => ['ru', 'translation'].includes(key) ? 0 : key === 'example' ? 2 : 1
        return priority(a.key) - priority(b.key)
      })
    },
    humanize(str) {
      return this.$t(str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
    },
    handleHotkey(event) {
      const target = event.target
      if (event.ctrlKey && event.key === 't' && !target.isContentEditable &&
          !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        this.dialogModel = !this.dialogModel
      }
    },
  },
};
</script>

<style scoped>
.word-list { max-width: 1500px; width: 100%; margin: 0 auto; }
.word-list-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.word-list-controls .v-text-field { flex: 1 1 260px; min-width: 0; }
.word-table { border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)); border-radius: 8px; overflow: hidden; }
.word-table :deep(.v-table__wrapper > table > thead > tr > th),
.word-table :deep(.v-table__wrapper > table > tbody > tr > td) { padding: 8px 12px !important; }
.word-card:first-child { margin-top: 16px; }
.word-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; white-space: normal; overflow-wrap: anywhere; }
.word-field { overflow-wrap: anywhere; }
.word-field + .word-field { margin-top: 12px; }
</style>
