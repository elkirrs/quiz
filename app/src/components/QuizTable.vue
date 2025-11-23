<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>Word list</v-toolbar-title>

        <v-btn icon v-if="!showSearch" @click="showSearch = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-text-field
          v-if="showSearch"
          v-model="search"
          ref="searchInput"
          placeholder="Search"
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
      headers: [],
    };
  },
  computed: {
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
  },
  watch: {
    words: {
      handler(newWords) {
        if (newWords.length > 0) {
          this.headers = Object.keys(newWords[0]).map(key => {
            let width = '120px' // значение по умолчанию

            // для некоторых полей делаем шире
            if (['en'].includes(key)) {
              width = '200px'
            }
            if (['ru'].includes(key)) {
              width = '350px'
            }

            if (['example'].includes(key)) {
              width = '400px'
            }

            return {
              title: this.humanize(key),
              key: key,
              sortable: true,
              align: 'start',
              headerProps: { style: `width: ${width}; min-width: ${width}; max-width: ${width};` },
              cellProps: { style: `width: ${width}; min-width: ${width}; max-width: ${width}; white-space: normal;` }
            }
          })
        }
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
    humanize(str) {
      return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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
