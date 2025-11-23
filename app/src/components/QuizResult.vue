<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>Answer Result</v-toolbar-title>

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
          :items="filteredAnswers"
          items-per-page="100"
          density="compact"
        >
          <template v-slot:item="{ item }">
            <tr :class="item.isCorrect ? 'bg-green-lighten-4' : 'bg-red-lighten-4'">
              <td>{{ item.question }}</td>
              <td>{{ item.correctAnswer }}</td>
              <td>{{ item.userAnswer }}</td>
              <td>
        <span :class="item.isCorrect ? 'text-green' : 'text-red'">
          {{ item.isCorrect ? '✔️' : '❌' }}
        </span>
              </td>
            </tr>
          </template>

          <template v-slot:item.isCorrect="{ item }">
            <span :class="item.isCorrect ? 'text-green' : 'text-red'">
              {{ item.isCorrect ? '✔️' : '❌' }}
            </span>
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
    answerList: {
      type: Array,
      required: true
    },
    dialog: Boolean
  },
  data() {
    return {
      showSearch: false,
      search: '',
      headers: [
        { title: 'Question', key: 'question', sortable: true },
        { title: 'Correct Answer', key: 'correctAnswer', sortable: true },
        { title: 'Your Answer', key: 'userAnswer', sortable: true },
        { title: 'Correct', key: 'isCorrect', sortable: true }
      ]
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleHotkey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleHotkey);
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
      const query = this.search.toLowerCase();
      return this.flattenedAnswers.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(query)
        )
      );
    }
  },
  methods: {
    onBlur() {
      if (!this.search) this.showSearch = false;
    },
    onClear() {
      this.search = '';
    },
    handleHotkey(event) {
      if (event.ctrlKey && event.key === 'r') {
        this.dialogModel = !this.dialogModel
      }
    },
  }
}
</script>
