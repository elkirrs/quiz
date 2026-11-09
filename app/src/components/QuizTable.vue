<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>{{ $t('Word list') }}</v-toolbar-title>

        <v-btn icon v-if="!showSearch" @click="showSearch = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-text-field
          v-if="showSearch"
          v-model="search"
          ref="searchInput"
          :placeholder="$t('Search')"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          single-line
          density="compact"
          variant="solo-filled"
          class="ml-2"
          @blur="onBlur"
          @click:clear="onClear"
        />

        <v-spacer/>

        <v-btn icon @click="dialogModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">
        <div class="d-none d-md-block">
          <v-data-table
            :headers="headers"
            :items="filteredWords"
            items-per-page="100"
            density="compact"
          >
            <template v-slot:item.example="{ item }">
              <div v-html="item.example"></div>
            </template>
          </v-data-table>
        </div>

        <div class="d-md-none">
          <v-card
            v-for="(word, index) in mobileWords"
            :key="`${word.en || word.infinitive}-${index}`"
            class="mb-3"
            variant="outlined"
          >
            <v-card-title class="text-wrap">
              {{ word.en || word.infinitive }}
            </v-card-title>
            <v-card-text>
              <div
                v-for="header in mobileHeaders(word)"
                :key="header.key"
                class="word-field"
              >
                <strong>{{ header.title }}:</strong>
                <span v-if="header.key === 'example'" v-html="word[header.key]"></span>
                <span v-else>{{ word[header.key] }}</span>
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
      showSearch: false,
      search: '',
      mobilePage: 1,
      mobilePageSize: 20,
    };
  },
  computed: {
    headers() {
      if (!this.words.length) return []
      return Object.keys(this.words[0]).map(key => {
        let width = '120px'
        if (key === 'en') width = '200px'
        if (key === 'ru') width = '350px'
        if (key === 'example') width = '400px'
        return {
          title: this.humanize(key),
          key,
          sortable: true,
          align: 'start',
          headerProps: { style: `width: ${width}; min-width: ${width}; max-width: ${width};` },
          cellProps: { style: `width: ${width}; min-width: ${width}; max-width: ${width}; white-space: normal;` }
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
    filteredWords() {
      const search = this.search.toLowerCase();
      return this.words
        .filter(item => {
          return Object.values(item).some(val => {
            if (typeof val === 'string') {
              const plain = val.replace(/<[^>]+>/g, '').toLowerCase();
              return plain.includes(search);
            }
            return false;
          });
        })
        .map(item => {
          if (this.quiz !== 'verbs') {
            return {
              ...item,
              en: item.en.toLowerCase(),
              ru: item.ru.toLowerCase(),
            }
          }

          return {
            ...item,
            infinitive: item.infinitive.toLowerCase(),
            past: item.past.toLowerCase(),
            past_participle: item.past_participle.toLowerCase(),
          }
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
    },
    words: {
      handler() {
        this.mobilePage = 1
      },
      immediate: true,
    },
    showSearch(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus();
        });
      }
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
        word[header.key] !== '' &&
        word[header.key] !== null &&
        word[header.key] !== undefined
      )
    },
    humanize(str) {
      return this.$t(str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
    },
    onBlur() {
      if (!this.search) this.showSearch = false;
    },
    onClear() {
      this.search = '';
    },
    handleHotkey(event) {
      if (event.ctrlKey && event.key === 't') {
        this.dialogModel = !this.dialogModel
      }
    },
  },
};
</script>

<style scoped>
.word-field {
  display: grid;
  grid-template-columns: minmax(6rem, auto) minmax(0, 1fr);
  gap: 0.5rem;
  overflow-wrap: anywhere;
}

.word-field + .word-field {
  margin-top: 0.5rem;
}
</style>
