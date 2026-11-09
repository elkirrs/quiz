<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>{{ $t('Answer Result') }}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon :aria-label="$t('Close')" @click="dialogModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="answer-list pa-4">
        <div class="answer-controls">
          <v-text-field
            v-model="search"
            :label="$t('Search answers')"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            density="compact"
            variant="outlined"
            color="teal"
            @keydown.stop
          />
          <div class="text-body-2 text-medium-emphasis" aria-live="polite">
            {{ $t('Found') }}: <strong>{{ filteredAnswers.length }}</strong> / {{ flattenedAnswers.length }}
          </div>
        </div>

        <div class="d-none d-md-block">
          <v-data-table
            v-model:page="desktopPage"
            :headers="headers"
            :items="filteredAnswers"
            :items-per-page="100"
            :no-data-text="$t('No answers found')"
            class="answer-table mt-4"
          >
            <template v-slot:item.isCorrect="{ item }">
              <v-chip :color="item.isCorrect ? 'success' : 'error'" variant="tonal" size="small" label>
                <v-icon start :icon="item.isCorrect ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'" />
                {{ $t(item.isCorrect ? 'Correct' : 'Incorrect') }}
              </v-chip>
            </template>
          </v-data-table>
        </div>

        <div class="d-md-none">
          <v-card
            v-for="(answer, index) in mobileAnswers"
            :key="`${index}-${answer.question}`"
            class="answer-card mb-3"
            rounded="lg"
            elevation="2"
          >
            <v-card-title class="answer-heading">
              <span class="answer-question text-h6 font-weight-bold">{{ answer.question }}</span>
              <v-chip class="answer-status" :color="answer.isCorrect ? 'success' : 'error'" variant="tonal" size="small" label>
                <v-icon start :icon="answer.isCorrect ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'" />
                {{ $t(answer.isCorrect ? 'Correct' : 'Incorrect') }}
              </v-chip>
            </v-card-title>
            <v-card-text class="pt-1">
              <div class="answer-field">
                <div class="text-caption text-medium-emphasis">{{ $t('Correct answer') }}</div>
                <div class="text-body-1 font-weight-medium">{{ answer.correctAnswer }}</div>
              </div>
              <div class="answer-field">
                <div class="text-caption text-medium-emphasis">{{ $t('Your answer') }}</div>
                <div>{{ answer.userAnswer }}</div>
              </div>
            </v-card-text>
          </v-card>

          <div v-if="!filteredAnswers.length" class="text-center pa-4">
            {{ $t('No answers found') }}
          </div>

          <v-pagination
            v-if="filteredAnswers.length > mobilePageSize"
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
    answerList: {
      type: Array,
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
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleHotkey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleHotkey);
  },
  computed: {
    headers() {
      return [
        { title: this.$t('Question'), key: 'question', sortable: true, cellProps: { class: 'answer-cell' } },
        { title: this.$t('Correct answer'), key: 'correctAnswer', sortable: true, cellProps: { class: 'answer-cell' } },
        { title: this.$t('Your answer'), key: 'userAnswer', sortable: true, cellProps: { class: 'answer-cell' } },
        { title: this.$t('Status'), key: 'isCorrect', sortable: true }
      ]
    },
    dialogModel: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit('update:dialog', val);
      }
    },
    flattenedAnswers() {
      return this.answerList.map(item => {
        const correctArr = Array.isArray(item.answer?.correctAnswer)
          ? item.answer.correctAnswer.slice().sort()
          : [item.answer?.correctAnswer || ''];

        const inputArr = Array.isArray(item.input)
          ? item.input.slice().sort()
          : [item.input || ''];

        const isCorrect = item.isCorrect;

        return {
          question: item.answer?.question || '',
          correctAnswer: correctArr.join(', '),
          userAnswer: inputArr.join(', '),
          isCorrect: isCorrect,
        };
      });
    },
    filteredAnswers() {
      const query = (this.search || '').trim().toLowerCase();
      return this.flattenedAnswers.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(query)
        )
      );
    },
    mobilePageCount() {
      return Math.ceil(this.filteredAnswers.length / this.mobilePageSize)
    },
    mobileAnswers() {
      const start = (this.mobilePage - 1) * this.mobilePageSize
      return this.filteredAnswers.slice(start, start + this.mobilePageSize)
    }
  },
  watch: {
    search() {
      this.mobilePage = 1
      this.desktopPage = 1
    },
    answerList() {
      this.mobilePage = 1
      this.desktopPage = 1
    },
  },
  methods: {
    handleHotkey(event) {
      const target = event.target
      if (event.ctrlKey && event.key === 'r' && !target.isContentEditable &&
          !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        this.dialogModel = !this.dialogModel
      }
    },
  }
}
</script>

<style scoped>
.answer-list { max-width: 1500px; width: 100%; margin: 0 auto; }
.answer-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.answer-controls .v-text-field { flex: 1 1 260px; min-width: 0; }
.answer-table { border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)); border-radius: 8px; overflow: hidden; }
.answer-table :deep(.v-table__wrapper > table > thead > tr > th),
.answer-table :deep(.v-table__wrapper > table > tbody > tr > td) { padding: 8px 12px !important; }
.answer-table :deep(.answer-cell) { min-width: 160px; white-space: normal; overflow-wrap: anywhere; }
.answer-card:first-child { margin-top: 16px; }
.answer-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; white-space: normal; overflow-wrap: anywhere; }
.answer-question { flex: 1 1 0; min-width: 0; }
.answer-status { flex-shrink: 0; margin-left: auto; }
.answer-field { overflow-wrap: anywhere; }
.answer-field + .answer-field { margin-top: 12px; }
</style>
