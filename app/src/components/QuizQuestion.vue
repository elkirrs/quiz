<template>
  <div>
    <div v-if="!isBtnResetQuiz">
      <div class="d-flex align-center justify-space-between mb-4">
        <p class="mb-0 text-h5">How is the word translated?</p>
        <v-btn
          v-if="helper !== null"
          @click="dialog = true"
          icon
          size="small"
          color="primary"
          variant="text"
        >
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">Helper</div>
                <v-btn icon="mdi-close" variant="text" @click="isActive.value = false"></v-btn>
              </v-card-title>
              <v-divider class="mb-4"></v-divider>
              <v-card-text>
                <div class="text-medium-emphasis mb-4" v-html="helper"></div>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </div>

      <div class="text-center mb-4">
        <h2 class="text-h5 mb-1">
          <strong>
            {{ question }}
          </strong>
          <sup
            class="ml-2 mb-3 text-grey"
            style="font-size: 0.6em;"
          >
            {{ currentWordObj.part_of_speech }}
          </sup>
        </h2>
      </div>

      <!-- LIST -->
      <div v-if="mode === 'list'" class="d-flex flex-column gap-2 mb-6">

        <v-row align="center" justify="center" no-gutters>
          <v-col v-for="option in options" cols="6" class="pa-2">
            <v-btn
              @click="handleMultipleChoice(option)"
              variant="outlined"
              block
              color="teal"
              class="custom-button text-lowercase pa-2"
            >
            <span class="btn-text-wrap">
              {{ option }}
            </span>
            </v-btn>
          </v-col>
        </v-row>

      </div>
      <!-- MANUAL -->
      <div v-if="mode === 'manual' && !isBtnContinue" class="pb-1">
        <v-text-field
          v-model="userAnswer"
          clearable
          label="Enter the translation of the word..."
          variant="outlined"
          density="comfortable"
          color="teal"
          autofocus
          :persistent-hint="persistentHint"
          :hint="hint"
        ></v-text-field>
      </div>
    </div>

    <div>
      <v-text-field
        v-if="answeredIsView"
        v-model="answeredFeedback"
        disabled
        label="Entered the translation of the word..."
        variant="outlined"
        density="comfortable"
        color="teal"
      ></v-text-field>
    </div>

    <div class="pb-4">
      <v-alert
        v-if="feedback"
        :type="typeCorrect"
        density="comfortable"
        variant="tonal"
        border="start"
      >
        <div v-html="feedback"></div>
      </v-alert>
    </div>

    <div>
      <v-btn
        block
        size="large"
        color="teal"
        v-if="isBtnAnswer"
        @click="checkAnswer"
      >To answer
      </v-btn>
    </div>

    <div>
      <v-btn
        block
        size="large"
        color="teal"
        v-if="isBtnContinue"
        @click="nextWord"
        ref="continueBtn"
      >
        To continue
      </v-btn>
    </div>

    <v-row justify="center"
           v-if="isBtnResetQuiz"
           class="ma-5"
    >
      <div class="text-center">
        <v-progress-circular
          :model-value="resultPercentage"
          :rotate="360"
          :size="120"
          :width="15"
          :color="resultColor"
        >
          <div class="text-h5 font-weight-bold">
            {{ resultPercentage }}%
          </div>
        </v-progress-circular>
      </div>
    </v-row>

    <v-row justify="center">
      <v-col cols="6">
        <v-btn
          block
          size="large"
          color="teal"
          v-if="isBtnResetQuiz"
          @click="restartQuiz"
        >
          Restart quiz
        </v-btn>
      </v-col>

      <v-col cols="6">
        <v-btn
          block
          size="large"
          color="teal"
          v-if="isBtnResetQuiz"
          @click="onReset"
        >
          New quiz
        </v-btn>
      </v-col>
    </v-row>

    <div class="text-caption mt-4 text-right">
      Total: {{ stats.total }} | Correct: {{ stats.correct }} | Incorrect: {{ stats.incorrect }} | Remaining:
      {{ stats.remained }} | Attempt: {{ stats.attempt }}
    </div>
  </div>
</template>

<script>
import {allWords} from '@/data/words'
import {allIrregularVerbs} from '@/data/irregular-verbs'

export default {
  props: {
    settings: {type: Object, required: true},
    countAnswerOptions: {type: Number, default: 10},
    onReset: Function
  },
  emits: ['answer-list'],
  data() {
    return {
      dialog: false,
      listWords: [],
      userAnswer: '',
      feedback: '',
      answeredFeedback: '',
      answeredIsView: false,
      helper: null,
      isCorrect: false,
      isBtnContinue: false,
      isBtnAnswer: true,
      isBtnResetQuiz: false,
      typeCorrect: null,
      currentIndex: 0,
      usedIndexes: new Set(),
      options: [],
      answerList: [],
      question: '',
      persistentHint: true,
      stats: {
        correct: 0,
        incorrect: 0,
        total: 0,
        remained: 0,
        attempt: 0,
      },
      resultPercentage: 0,
      resultColor: 'pink-darken-4',
      resultColors: [
        '#880E4F',
        '#C2185B',
        '#EC407A',
        '#FF6F00',
        '#FFA000',
        '#FFCA28',
        '#FFD54F',
        '#4DB6AC',
        '#00897B',
        '#00796B',
        '#004D40',
      ]
    }
  },
  computed: {
    mode() {
      return this.settings.mode || 'manual'
    },
    direction() {
      return this.settings.trans || 'en-ru'
    },
    currentWord() {
      return this.listWords[this.currentIndex] || null
    },
    currentWordObj() {
      if (!this.currentWord) return {}

      let current = {};

      if (this.settings.quiz === 'verbs') {
        current = {
          question: this.currentWord.translation,
          correctAnswer: [
            this.currentWord.infinitive,
            this.currentWord.past,
            this.currentWord.past_participle,
          ]
        }
      } else {
        current = {
          question: this.direction === 'en-ru' ? this.currentWord.en : this.currentWord.ru,
          correctAnswer: this.direction === 'en-ru' ? this.currentWord.ru : this.currentWord.en,
          part_of_speech: this.currentWord.part_of_speech,
          pronunciation: this.currentWord.pronunciation,
        }
      }

      return current;
    },
    hint() {
      if (this.settings.quiz === 'verbs') {
        return 'Use for the separator \' , \' in answer'
      }
      return null
    }
  },
  mounted() {
    this.loadWords()
    window.addEventListener('keydown', this.handleKey)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey)
  },
  methods: {
    loadWords() {
      this.listWords = []
      this.stats = {correct: 0, incorrect: 0, total: 0, remained: 0, attempt: 0}

      if (this.settings.quiz === 'verbs') {
        this.settings.verbs.forEach(unitPath => {
          if (allIrregularVerbs?.[unitPath]) {
            this.listWords.push(...allIrregularVerbs[unitPath])
          }
        })
      } else {
        this.settings.units.forEach(unitCode => {
          const [level, unit] = unitCode.split('/')
          if (allWords[level] && allWords[level][unit]) {
            const unitWords = allWords[level][unit]
            this.listWords.push(...unitWords)
          }
        })
      }

      if (this.settings.quiz === 'random') {
        this.listWords = this.listWords
          .sort(() => Math.random() - 0.5)
          .slice(0, this.settings.amount)
      }

      this.listWords = this.shuffle(this.listWords)
      this.stats.total = this.listWords.length
      this.stats.remained = this.stats.total
      this.nextWord()
    },
    shuffle(array) {
      return array.slice().sort(() => Math.random() - 0.5)
    },
    handlerButton(isBtnAnswer, isBtnContinue, isBtnResetQuiz) {
      this.isBtnAnswer = isBtnAnswer
      this.isBtnContinue = isBtnContinue
      this.isBtnResetQuiz = isBtnResetQuiz
    },
    arraysEqual(a, b) {
      if (a.length !== b.length) return false;
      const aCopy = [...a];
      const bCopy = [...b];
      for (const word of aCopy) {
        const index = bCopy.indexOf(word);
        if (index === -1) return false;
        bCopy.splice(index, 1);
      }

      return true;
    },
    checkAnswer() {
      if (this.isBtnContinue) {
        return
      }
      const input = this.normalize(this.userAnswer)
      const correct = this.prepareCorrectWord(this.currentWordObj.correctAnswer);

      this.answeredIsView = false;
      this.isCorrect = false;
      this.typeCorrect = 'error'
      this.feedback = `Incorrect. Correct: <strong>${this.currentWordObj.correctAnswer}</strong>`;

      if (input.length === 0) {
        this.typeCorrect = 'warning'
        this.feedback = 'Enter the answer in the field'
        this.handlerButton(true, false, false)
        return
      }

      let isCorrectAnswer = false;
      if (this.settings.quiz === 'verbs') {
        isCorrectAnswer = this.arraysEqual(input, correct);

        // console.log(input)
        // console.log(correct)
        // const inputUnique = [...new Set(input)];
        // const correctUnique = [...new Set(correct)];
        //
        // const isCorrectLength = inputUnique.length === correctUnique.length;
        // const allWordsMatch = inputUnique.every(word => correctUnique.includes(word));
        // isCorrectAnswer = isCorrectLength && allWordsMatch
      } else {
        isCorrectAnswer = input.every(word => correct.includes(word));
      }

      if (isCorrectAnswer) {
        this.answeredIsView = false;
        this.isCorrect = true;
        this.typeCorrect = 'success'
        this.feedback = 'Correct!'

        setTimeout(() => {
          this.nextWord()
        }, 400)
      } else {
        if (this.settings?.lastMistake) {
          this.listWords.push(this.currentWord)
        }
        this.answeredFeedback = this.userAnswer;
        this.answeredIsView = true;
        this.userAnswer = ''
        this.handlerButton(false, true, false)
      }

      this.answerList.unshift({
        input: input,
        answer: this.currentWordObj,
        isCorrect: this.isCorrect
      })

      this.updateStats(this.isCorrect)

    },
    handleMultipleChoice(option) {
      if (this.isBtnContinue) {
        return
      }

      this.userAnswer = option
      this.checkAnswer()
    },
    nextWord() {
      this.answeredIsView = false;
      this.helper = null

      if (this.usedIndexes.size === this.listWords.length) {
        this.isCorrect = true
        this.feedback = "You have completed all the words!"
        this.calculateProgress()
        this.handlerButton(false, false, true)
        return
      }

      let index
      do {
        index = Math.floor(Math.random() * this.listWords.length)
      } while (this.usedIndexes.has(index))

      this.currentIndex = index
      this.usedIndexes.add(index)
      this.userAnswer = ''
      this.feedback = ''
      this.isCorrect = false

      this.handlerButton(true, false, false)

      const current = this.currentWordObj
      this.question = this.splitWord(current.question)

      if (this.mode === 'list') {
        this.options = this.generateOptions(current.correctAnswer)
        this.handlerButton(false, false, false)
      }

      if (this.settings.quiz === 'verbs') {
        this.helper =  'Verb: <strong>' + this.currentWord?.infinitive + '</strong>';
      } else {
        this.helper = this.currentWord?.example || null;
      }
    },
    generateOptions(correctAnswer) {
      const opts = new Set([this.splitWord(correctAnswer)])
      while (opts.size < this.countAnswerOptions) {
        const randomWord = this.direction === 'en-ru'
          ? this.listWords[Math.floor(Math.random() * this.listWords.length)].ru
          : this.listWords[Math.floor(Math.random() * this.listWords.length)].en
        opts.add(this.splitWord(randomWord))
      }
      return Array.from(opts).sort(() => Math.random() - 0.5)
    },
    splitWord(randomWord) {
      const words = randomWord.split(',');
      const index = Math.floor(Math.random() * words.length)
      return words[index].trim()
        .toLowerCase()
        .replace(/\([^)]*\)/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[!?.]/g, '')
        .replace(/[-]/g, ' ')
        .replace(/[’`]/g, '\'')
        .replace(/\s*[\[\(].*?[\]\)]/g, '')
    },
    updateStats(correct) {
      if (correct) {
        this.stats.correct++;
        this.stats.remained--;
      } else {
        this.stats.incorrect++;
      }
      this.stats.attempt++;

      this.$emit("answer-list", this.answerList)
    },
    normalize(words) {
      return words.trim()
        .toLowerCase()
        .replace(/\([^)]*\)/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[!?.]/g, '')
        .replace(/[-]/g, ' ')
        .replace(/[’`]/g, '\'')
        .replace(/\s*[\[\(].*?[\]\)]/g, '')
        .split(/[,]+/)
        .map(item => item.trim())
        .filter(Boolean);
    },
    normalizeCorrectWords(words) {
      return words.map(w => w.replace(/\s*[\[\(].*?[\]\)]/g, '')
        .replace(/[!?.]/g, '')
        .replace(/[-]/g, ' ')
        .replace(/[’`]/g, '\'')
        .replace(/\s+/g, ' ')
        .replace(/\([^)]*\)/g, '')
        .trim()
      )
    },
    prepareCorrectWord(correctWords) {
      if (correctWords instanceof Object) {
        return this.normalizeCorrectWords(correctWords)
      }

      if (typeof correctWords === 'string') {
        return this.normalize(correctWords);
      }

      return correctWords;
    },
    handleKey(event) {
      if (event.key === 'Enter') {
        if (this.isBtnContinue) {
          this.nextWord();
        } else if (this.isBtnAnswer) {
          this.checkAnswer();
        }
      }
    },
    restartQuiz() {
      this.dialog = false
      this.userAnswer = ''
      this.feedback = ''
      this.isCorrect = false
      this.isBtnContinue = false
      this.isBtnAnswer = true
      this.typeCorrect = null
      this.currentIndex = 0
      this.usedIndexes.clear()
      this.answerList = []
      this.helper = null
      this.loadWords()
    },
    calculateProgress() {
      const totalWords = this.stats.total;
      const correctAnswers = this.stats.total - this.stats.incorrect;
      this.resultPercentage = Math.round((correctAnswers / totalWords) * 100);
      const index = 0;
      if (this.resultPercentage > 0) {
        const index = Math.min(Math.floor(this.resultPercentage / 10), this.resultColors.length - 1);
      } else {
        this.resultPercentage = 0
      }
      this.resultColor = this.resultColors[index];
    },
  }
}
</script>

<style>
.btn-text-wrap {
  white-space: normal !important;
  word-break: break-word;
  display: block;
  width: 100%;
  text-align: center;
  font-weight: 500;
  color: #2b2d42;
}

.custom-button {
  height: 64px;
  min-height: 48px;
}
</style>
