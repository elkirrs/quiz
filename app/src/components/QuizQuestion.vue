<template>
  <div class="quiz-layout">
    <div v-if="studying">
      <v-card class="progress-card mb-4" rounded="lg" variant="tonal" color="teal">
        <v-card-text class="pa-4 d-flex align-center justify-space-between">
          <div>
            <div class="text-caption text-medium-emphasis">STUDY CARDS</div>
            <div class="text-body-1 font-weight-medium">Review words before the quiz</div>
          </div>
          <v-chip size="small" variant="flat" color="teal">
            {{ studyIndex + 1 }} / {{ studyWords.length }}
          </v-chip>
        </v-card-text>
      </v-card>

      <v-card class="study-card mb-4" rounded="lg" elevation="2">
        <v-card-text class="text-center pa-5 pa-sm-7">
          <div class="study-heading">
            <div class="text-caption text-medium-emphasis">ENGLISH</div>
            <v-btn class="study-favorite"
              :icon="isFavorite(studyWords[studyIndex]) ? 'mdi-star' : 'mdi-star-outline'"
              :aria-label="isFavorite(studyWords[studyIndex]) ? 'Remove from favorites' : 'Add to favorites'"
              color="teal" variant="text" @click="$emit('toggle-favorite', studyWords[studyIndex])" />
          </div>
          <div class="study-english mt-2">
            <div class="study-word text-h5 font-weight-bold">{{ studyWordEnglish }}</div>
            <v-btn icon="mdi-volume-high" aria-label="Listen to English"
              color="teal" variant="text" @click="speakEnglish(studyWords[studyIndex])" />
          </div>
          <v-divider class="my-4" />
          <div class="text-caption text-medium-emphasis">TRANSLATION</div>
          <div class="study-word text-h6 mt-2">{{ studyWordRussian }}</div>
          <v-alert v-if="speechError" class="mt-3" type="warning" variant="tonal" density="comfortable">
            {{ speechError }}
          </v-alert>
        </v-card-text>
      </v-card>

      <v-row dense class="mb-2">
        <v-col cols="6">
          <v-btn block rounded="lg" variant="outlined" color="teal"
            :disabled="studyIndex === 0" @click="changeStudyIndex(-1)">
            Previous
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block rounded="lg" variant="outlined" color="teal"
            :disabled="studyIndex >= studyWords.length - 1" @click="changeStudyIndex(1)">
            Next
          </v-btn>
        </v-col>
      </v-row>
      <v-btn block size="large" color="teal" rounded="lg" class="quiz-action" @click="startStudiedQuiz">
        Start quiz
      </v-btn>
    </div>
    <div v-else-if="!isBtnResetQuiz">
      <v-card class="progress-card mb-4" rounded="lg" variant="tonal" color="teal">
        <v-card-text class="pa-4">
          <div class="d-flex align-center justify-space-between mb-3">
            <div>
              <div class="text-caption text-medium-emphasis">LEARNING PROGRESS</div>
              <div class="text-body-1 font-weight-medium">
                {{ stats.correct }} of {{ stats.total }} learned
              </div>
            </div>
            <v-chip size="small" variant="flat" color="teal">
              {{ Math.round(progressPercentage) }}%
            </v-chip>
          </div>
          <v-progress-linear
            :model-value="progressPercentage"
            color="teal"
            bg-color="surface"
            rounded
            height="8"
          />
        </v-card-text>
      </v-card>

      <div class="d-flex align-center justify-space-between mb-4">
        <p class="mb-0 text-h5">How is the word translated?</p>
        <v-btn
          v-if="helper !== null"
          icon="mdi-information-outline"
          size="small"
          color="primary"
          variant="text"
          aria-label="Show hint"
          @click="dialog = true"
        />
      </div>

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

      <div class="text-center mb-4">
        <h2 class="text-h5 mb-1">
          <strong>{{ question }}</strong>
          <sup
            class="ml-2 mb-3 text-grey"
            style="font-size: 0.6em;"
          >
            {{ currentWordObj.part_of_speech }}
          </sup>
        </h2>
        <v-btn
          :icon="isFavorite(currentWord) ? 'mdi-star' : 'mdi-star-outline'"
          :aria-label="isFavorite(currentWord) ? 'Remove from favorites' : 'Add to favorites'"
          color="teal"
          size="small"
          variant="text"
          @click="$emit('toggle-favorite', currentWord)"
        />
      </div>

      <div v-if="mode === 'list'" class="d-flex flex-column gap-2 mb-6">
        <v-row align="stretch" justify="center" no-gutters>
          <v-col
            v-for="(option, index) in options"
            :key="`${index}-${option}`"
            cols="12"
            sm="6"
            class="pa-2"
          >
            <v-btn
              class="custom-button text-lowercase pa-2"
              :class="{ 'answer-submitted': answerSubmitted }"
              variant="outlined"
              block
              rounded="lg"
              :color="answerSubmitted && selectedOption === option ? (isCorrect ? 'success' : 'error') : 'teal'"
              :aria-disabled="answerSubmitted"
              :aria-keyshortcuts="index < 10 ? String((index + 1) % 10) : undefined"
              @click="handleMultipleChoice(option)"
            >
              <span v-if="index < 10" class="option-shortcut" aria-hidden="true">{{ (index + 1) % 10 }}</span>
              <span class="btn-text-wrap">{{ option }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div v-if="mode === 'manual' && !isBtnContinue" class="mb-4">
        <v-text-field
          v-model="userAnswer"
          clearable
          label="Enter your answer"
          variant="outlined"
          density="comfortable"
          color="teal"
          autofocus
          :persistent-hint="persistentHint"
          :hint="hint"
          @update:model-value="$nextTick(saveState)"
        />
      </div>

      <div v-if="mode === 'manual' && answeredIsView" class="mb-4">
        <v-text-field
          v-model="answeredFeedback"
          disabled
          label="Your answer"
          variant="outlined"
          density="comfortable"
          color="teal"
          hide-details
        />
      </div>

      <v-alert
        v-if="feedback"
        class="mb-4"
        :type="typeCorrect"
        density="comfortable"
        variant="tonal"
        rounded="lg"
      >
        <div v-html="feedback"></div>
        <v-btn
          v-if="typeCorrect === 'error'"
          class="mt-2"
          size="small"
          variant="outlined"
          color="teal"
          prepend-icon="mdi-volume-high"
          @click="speakCorrectAnswer"
        >
          Listen to English
        </v-btn>
      </v-alert>

      <v-alert v-if="speechError" class="mb-4" type="warning" variant="tonal" density="comfortable">
        {{ speechError }}
      </v-alert>

      <v-btn
        v-if="isBtnAnswer"
        block
        size="large"
        color="teal"
        rounded="lg"
        class="quiz-action"
        :disabled="mode === 'manual' && !userAnswer.trim()"
        @click="checkAnswer"
      >
        Check answer
      </v-btn>

      <v-btn
        v-if="isBtnContinue"
        block
        size="large"
        color="teal"
        rounded="lg"
        class="quiz-action"
        @click="nextWord"
        ref="continueBtn"
      >
        Continue
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <v-card v-if="isBtnResetQuiz" class="result-card" rounded="xl" elevation="2">
      <v-card-text class="pa-5 pa-sm-7">
        <div class="text-center mb-5">
          <v-avatar color="teal" variant="tonal" size="56" class="mb-3">
            <v-icon size="30">mdi-trophy-outline</v-icon>
          </v-avatar>
          <div class="text-h5 font-weight-bold">Quiz complete</div>
          <div class="text-body-2 text-medium-emphasis mt-1">Here is your result</div>
        </div>

        <div class="result-score">
          <v-progress-circular
            :model-value="resultPercentage"
            :rotate="360"
            :size="128"
            :width="12"
            :color="resultColor"
          >
            <div class="text-h4 font-weight-bold">{{ resultPercentage }}%</div>
          </v-progress-circular>
          <div class="text-body-2 text-medium-emphasis mt-3">Final score</div>
        </div>

        <v-divider class="my-5" />

        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ stats.correct }}</span>
            <span class="stat-label">Correct</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.incorrect }}</span>
            <span class="stat-label">Mistakes</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.attempt }}</span>
            <span class="stat-label">Attempts</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ spentTime }}</span>
            <span class="stat-label">Time</span>
          </div>
        </div>

        <v-row class="mt-4" dense>
          <v-col v-if="mistakenWords.length" cols="12">
            <v-btn block size="large" color="teal" rounded="lg" @click="reviewMistakes">
              <v-icon start>mdi-repeat</v-icon>
              Review mistakes ({{ mistakenWords.length }})
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block size="large" color="teal" rounded="lg" @click="restartQuiz">
              <v-icon start>mdi-refresh</v-icon>
              Restart
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block size="large" variant="outlined" color="teal" rounded="lg" @click="onReset">
              New quiz
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div v-if="!isBtnResetQuiz && !studying" class="quiz-stats mt-4">
      <v-chip size="small" variant="tonal" color="teal">
        <v-icon start size="small">mdi-check-circle-outline</v-icon>
        {{ stats.correct }} correct
      </v-chip>
      <v-chip size="small" variant="tonal" color="error">
        <v-icon start size="small">mdi-close-circle-outline</v-icon>
        {{ stats.incorrect }} mistakes
      </v-chip>
      <v-chip size="small" variant="tonal">
        <v-icon start size="small">mdi-counter</v-icon>
        {{ stats.attempt }} attempts
      </v-chip>
      <v-chip size="small" variant="tonal">
        <v-icon start size="small">mdi-counter</v-icon>
        {{ stats.remained }} left
      </v-chip>
    </div>
  </div>
</template>

<script>
import {allWords} from '@/data/words'
import {allIrregularVerbs} from '@/data/irregular-verbs'
import {wordKey} from '@/quiz-storage'

export default {
  props: {
    settings: {type: Object, required: true},
    countAnswerOptions: {type: Number, default: 10},
    favorites: {type: Object, default: () => ({})},
    mistakes: {type: Object, default: () => ({})},
    initialState: {type: Object, default: null},
    onReset: Function
  },
  emits: ['answer-list', 'toggle-favorite', 'mistake', 'checkpoint', 'complete'],
  data() {
    return {
      dialog: false,
      studying: false,
      studyIndex: 0,
      studyWords: [],
      listWords: [],
      userAnswer: '',
      answerSubmitted: false,
      selectedOption: null,
      mistakenWords: [],
      reviewWords: null,
      initialWords: null,
      optionWords: [],
      speechError: '',
      nextWordTimeout: null,
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
      startTime: null,
      endTime: null,
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
    progressPercentage() {
      return this.stats.total
        ? (this.stats.correct / this.stats.total) * 100
        : 0
    },
    currentWord() {
      return this.listWords[this.currentIndex] || null
    },
    studyWordEnglish() {
      const word = this.studyWords[this.studyIndex]
      return this.settings.quiz === 'verbs'
        ? [word.infinitive, word.past, word.past_participle].join(', ')
        : word.en
    },
    studyWordRussian() {
      const word = this.studyWords[this.studyIndex]
      return this.settings.quiz === 'verbs' ? word.translation : word.ru
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
    },
    spentTime() {

      const start = this.startTime;
      const end = this.endTime;

      const diffMs = end - start;

      const seconds = Math.floor(diffMs / 1000) % 60;
      const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));

      return `${hours.toString().padStart(2, '0')}:` +
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    if (this.initialState) {
      this.restoreState(this.initialState)
    } else {
      this.loadWords()
    }
    window.addEventListener('keydown', this.handleKey)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey)
    clearTimeout(this.nextWordTimeout)
  },
  methods: {
    loadWords() {
      this.listWords = []
      if (!this.startTime) {
        this.startTime = new Date()
      }
      this.stats = {correct: 0, incorrect: 0, total: 0, remained: 0, attempt: 0}

      if (this.reviewWords) {
        this.listWords = [...this.reviewWords]
      } else if (this.settings.quiz === 'verbs') {
        const units = this.settings.verbs.length ? this.settings.verbs
          : (this.settings.wordFilter !== 'all' ? Object.keys(allIrregularVerbs) : [])
        units.forEach(unitPath => {
          if (allIrregularVerbs?.[unitPath]) {
            this.listWords.push(...allIrregularVerbs[unitPath])
          }
        })
      } else {
        const units = this.settings.units.length ? this.settings.units
          : (this.settings.wordFilter !== 'all' && !this.settings.levels.length
              ? Object.entries(allWords).flatMap(([level, words]) => Object.keys(words).map(unit => `${level}/${unit}`))
              : [])
        units.forEach(unitCode => {
          const [level, unit] = unitCode.split('/')
          if (allWords[level] && allWords[level][unit]) {
            const unitWords = allWords[level][unit]
            this.listWords.push(...unitWords)
          }
        })
      }

      if (!this.reviewWords) {
        this.optionWords = [...this.listWords]
        const filter = this.settings.wordFilter || 'all'
        if (filter !== 'all' && this.initialWords) {
          this.listWords = [...this.initialWords]
        } else {
          this.listWords = this.listWords.filter(word => {
            const key = wordKey(word, this.settings.quiz)
            return filter === 'all' ||
              (filter === 'favorites' && this.favorites[key]) ||
              (filter === 'difficult' && (this.mistakes[key] || 0) >= 2)
          })
        }
        const limit = this.settings.quiz === 'random' ? this.settings.amount : null
        if (limit) {
          this.listWords = this.shuffle(this.listWords).slice(0, limit)
        }
        if (filter !== 'all' && !this.initialWords) this.initialWords = [...this.listWords]
      }
      this.listWords = this.shuffle(this.listWords)
      this.stats.total = this.listWords.length
      this.stats.remained = this.stats.total
      if (!this.reviewWords && this.settings.studyFirst) {
        this.studyWords = [...this.listWords]
        this.studyIndex = 0
        this.studying = true
        this.saveState()
        return
      }
      this.nextWord()
    },
    isFavorite(word) {
      return word && !!this.favorites[wordKey(word, this.settings.quiz)]
    },
    changeStudyIndex(delta) {
      this.studyIndex += delta
      this.speechError = ''
      this.saveState()
    },
    startStudiedQuiz() {
      this.studying = false
      this.startTime = new Date()
      this.nextWord()
    },
    saveState() {
      const keys = ['studying', 'studyIndex', 'studyWords', 'listWords', 'userAnswer',
        'answerSubmitted', 'selectedOption', 'mistakenWords', 'reviewWords', 'initialWords', 'optionWords',
        'feedback', 'answeredFeedback', 'answeredIsView', 'helper', 'isCorrect',
        'isBtnContinue', 'isBtnAnswer', 'isBtnResetQuiz', 'typeCorrect', 'currentIndex',
        'options', 'answerList', 'question', 'stats', 'resultPercentage', 'resultColor']
      const state = Object.fromEntries(keys.map(key => [key, this[key]]))
      state.usedIndexes = [...this.usedIndexes]
      state.startTime = this.startTime?.toISOString()
      state.savedAt = new Date().toISOString()
      this.$emit('checkpoint', state)
    },
    restoreState(state) {
      const {usedIndexes, startTime, savedAt, ...fields} = state
      Object.assign(this, fields)
      this.usedIndexes = new Set(usedIndexes)
      this.startTime = new Date(Date.parse(startTime) + Date.now() - Date.parse(savedAt))
      if (this.answerSubmitted && this.isCorrect && !this.studying) {
        this.nextWord()
      } else {
        this.saveState()
      }
    },
    shuffle(array) {
      return array.slice().sort(() => Math.random() - 0.5)
    },
    handlerButton(isBtnAnswer, isBtnContinue, isBtnResetQuiz) {
      this.isBtnAnswer = isBtnAnswer
      this.isBtnContinue = isBtnContinue
      this.isBtnResetQuiz = isBtnResetQuiz
    },
    normalizeVerbForms(forms) {
      return forms.map(form => {
        const alternatives = [...form.matchAll(/\(([^()]*)\)/g)]
          .flatMap(([, alternative]) => this.normalize(alternative))
        const primary = this.normalize(form.replace(/\([^()]*\)/g, ''))

        return [...new Set([...primary, ...alternatives])]
      })
    },
    matchesVerbForms(input, acceptableForms) {
      if (input.length !== acceptableForms.length) return false

      const matchForms = (formIndex, unmatchedInput) => {
        if (formIndex === acceptableForms.length) return unmatchedInput.length === 0

        return unmatchedInput.some((word, index) =>
          acceptableForms[formIndex].includes(word) &&
          matchForms(formIndex + 1, [
            ...unmatchedInput.slice(0, index),
            ...unmatchedInput.slice(index + 1)
          ])
        )
      }

      return matchForms(0, input)
    },
    checkAnswer() {
      if (this.isBtnContinue || this.answerSubmitted) {
        return
      }
      const ignoreParenthetical = this.mode === 'manual' &&
        this.settings.quiz !== 'verbs' &&
        this.direction === 'en-ru'
      const input = this.normalize(this.userAnswer, ignoreParenthetical)
      const correct = this.settings.quiz === 'verbs'
        ? this.normalizeVerbForms(this.currentWordObj.correctAnswer)
        : this.prepareCorrectWord(this.currentWordObj.correctAnswer, ignoreParenthetical)

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

      this.answerSubmitted = true
      let isCorrectAnswer = false;
      if (this.settings.quiz === 'verbs') {
        isCorrectAnswer = this.matchesVerbForms(input, correct);
      } else {
        isCorrectAnswer = input.every(word => correct.includes(word));
      }

      if (isCorrectAnswer) {
        this.answeredIsView = false;
        this.isCorrect = true;
        this.typeCorrect = 'success'
        this.feedback = 'Correct!'

        this.nextWordTimeout = setTimeout(() => {
          this.nextWordTimeout = null
          this.nextWord()
        }, 400)
      } else {
        this.$emit('mistake', this.currentWord)
        const key = this.wordKey(this.currentWord)
        if (!this.mistakenWords.some(word => this.wordKey(word) === key)) {
          this.mistakenWords.push(this.currentWord)
        }
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
      this.saveState()

    },
    handleMultipleChoice(option) {
      if (this.isBtnContinue || this.answerSubmitted) {
        return
      }

      this.selectedOption = option
      this.userAnswer = option
      this.checkAnswer()
    },
    nextWord() {
      clearTimeout(this.nextWordTimeout)
      this.nextWordTimeout = null
      this.answeredIsView = false;
      this.helper = null
      this.speechError = ''

      if (this.usedIndexes.size === this.listWords.length) {
        this.answerSubmitted = true
        this.isCorrect = true
        this.feedback = "You have completed all the words!"
        this.calculateProgress()
        this.handlerButton(false, false, true)
        this.endTime = new Date()
        this.$emit('complete', {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          date: this.endTime.toISOString(),
          score: this.resultPercentage,
          total: this.stats.total,
          incorrect: this.stats.incorrect,
          attempts: this.stats.attempt,
        })
        return
      }

      let index
      do {
        index = Math.floor(Math.random() * this.listWords.length)
      } while (this.usedIndexes.has(index))

      this.currentIndex = index
      this.usedIndexes.add(index)
      this.answerSubmitted = false
      this.selectedOption = null
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
      this.saveState()
    },
    generateOptions(correctAnswer) {
      const answers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]
      const correct = this.splitWord(answers[0] || '')
      const availableOptions = new Set(
        this.optionWords
          .map(word => this.direction === 'en-ru' ? word.ru : word.en)
          .map(answer => this.splitWord(answer))
          .filter(Boolean)
      )
      availableOptions.add(correct)

      const distractors = this.shuffle(
        [...availableOptions].filter(option => option !== correct)
      )
      const optionCount = Math.max(1, this.countAnswerOptions)
      return this.shuffle([correct, ...distractors.slice(0, optionCount - 1)])
    },
    splitWord(randomWord) {
      const words = []
      let start = 0
      let parenthesesDepth = 0

      for (let index = 0; index < randomWord.length; index++) {
        if (randomWord[index] === '(') parenthesesDepth++
        if (randomWord[index] === ')') parenthesesDepth--
        if (randomWord[index] === ',' && parenthesesDepth === 0) {
          words.push(randomWord.slice(start, index))
          start = index + 1
        }
      }
      words.push(randomWord.slice(start))

      const index = Math.floor(Math.random() * words.length)
      return words[index]
        .trim()
        .split(/(\([^)]*\))/g)
        .map((part, partIndex) => {
          if (partIndex % 2 === 1) return part

          return part
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .replace(/[!?.]/g, '')
            .replace(/[-]/g, ' ')
            .replace(/[’`]/g, '\'')
        })
        .join('')
        .replace(/\s+/g, ' ')
        .trim()
    },
    updateStats(correct) {
      if (correct) {
        this.stats.correct++;
        this.stats.remained--;
      } else {
        this.stats.incorrect++;
        if (!this.settings.lastMistake) {
          this.stats.remained--;
        }
      }
      this.stats.attempt++;

      this.$emit("answer-list", this.answerList)
    },
    normalize(words, ignoreParenthetical = false) {
      const normalizedWords = words.trim().toLowerCase()
      return (ignoreParenthetical
        ? normalizedWords.replace(/\([^)]*\)/g, '')
        : normalizedWords)
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[!?.]/g, '')
        .replace(/[-]/g, ' ')
        .replace(/[’`]/g, '\'')
        .replace(/\s*\[[^\]]*\]/g, '')
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
    prepareCorrectWord(correctWords, ignoreParenthetical = false) {
      if (correctWords instanceof Object) {
        return this.normalizeCorrectWords(correctWords)
      }

      if (typeof correctWords === 'string') {
        return this.normalize(correctWords, ignoreParenthetical);
      }

      return correctWords;
    },
    wordKey(word) {
      return this.settings.quiz === 'verbs'
        ? JSON.stringify([word.infinitive, word.past, word.past_participle, word.translation])
        : JSON.stringify([word.en, word.ru, word.part_of_speech])
    },
    speakCorrectAnswer() {
      this.speakEnglish(this.currentWord)
    },
    speakEnglish(word) {
      this.speechError = ''
      if (typeof window.speechSynthesis?.speak !== 'function' ||
          typeof window.SpeechSynthesisUtterance !== 'function') {
        this.speechError = 'Speech playback is not supported in this browser.'
        return
      }

      const english = this.settings.quiz === 'verbs'
        ? [word.infinitive, word.past, word.past_participle].join(', ')
        : word.en
      const utterance = new window.SpeechSynthesisUtterance(english)
      utterance.lang = 'en-US'
      utterance.onerror = () => {
        this.speechError = 'Unable to play pronunciation. Check your browser and audio settings.'
      }
      window.speechSynthesis.speak(utterance)
    },
    handleKey(event) {
      if (this.studying || this.isBtnResetQuiz) return
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
          event.isComposing || document.querySelector('.v-overlay--active')) return

      const target = event.target
      const isEditable = target instanceof HTMLElement &&
        (target.isContentEditable || target.matches('input, textarea, select'))
      if (this.mode === 'list' && !isEditable && !this.answerSubmitted && /^[0-9]$/.test(event.key)) {
        const option = this.options[event.key === '0' ? 9 : Number(event.key) - 1]
        if (option !== undefined) {
          event.preventDefault()
          this.handleMultipleChoice(option)
        }
      } else if (event.key === 'Enter' &&
          (!isEditable || (this.mode === 'manual' && target.matches('input'))) &&
          !(target instanceof HTMLElement && target.closest('button, a, [role="button"]'))) {
        if (this.isBtnContinue) {
          event.preventDefault()
          this.nextWord();
        } else if (this.isBtnAnswer) {
          event.preventDefault()
          this.checkAnswer();
        }
      }
    },
    reviewMistakes() {
      if (!this.mistakenWords.length) return
      this.reviewWords = [...this.mistakenWords]
      this.restartQuiz()
    },
    restartQuiz() {
      clearTimeout(this.nextWordTimeout)
      this.nextWordTimeout = null
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
      this.$emit('answer-list', this.answerList)
      this.mistakenWords = []
      this.speechError = ''
      this.resultPercentage = 0
      this.resultColor = this.resultColors[0]
      this.endTime = null
      this.answerSubmitted = false
      this.selectedOption = null
      this.helper = null
      this.startTime = new Date()
      this.loadWords()
    },
    calculateProgress() {
      const totalWords = this.stats.total;
      const score = Math.max(0, totalWords - this.stats.incorrect);
      this.resultPercentage = totalWords
        ? Math.round((score / totalWords) * 100)
        : 0
      const index = Math.min(
        Math.floor(this.resultPercentage / 10),
        this.resultColors.length - 1
      )
      this.resultColor = this.resultColors[index];
    },
  }
}
</script>

<style scoped>
.quiz-layout {
  padding: clamp(0.75rem, 3vw, 1.5rem) 0 6rem;
}

.progress-card,
.answer-card,
.study-card,
.result-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.study-word {
  min-width: 0;
  overflow-wrap: anywhere;
}

.study-heading {
  position: relative;
}

.study-favorite {
  position: absolute;
  right: -0.75rem;
  top: 50%;
  transform: translateY(-50%);
}

.study-english {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.study-english :deep(.v-btn) {
  flex-shrink: 0;
}

.progress-card.v-theme--dark {
  color: #80cbc4 !important;
}

.btn-text-wrap {
  white-space: normal !important;
  overflow-wrap: anywhere;
  display: block;
  width: 100%;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
}

.custom-button {
  height: auto;
  min-height: 64px;
  padding: 0.75rem 1.75rem !important;
  border-width: 1px;
}

.option-shortcut {
  display: none;
  position: absolute;
  top: 0.4rem;
  left: 0.5rem;
  font-size: 0.75rem;
  line-height: 1;
  opacity: 0.75;
}

@media (hover: hover) and (pointer: fine) {
  .option-shortcut {
    display: block;
  }
}

.custom-button.v-theme--dark.text-teal {
  color: #80cbc4 !important;
}

.custom-button.v-theme--dark.text-success {
  color: #a5d6a7 !important;
}

.custom-button.v-theme--dark.text-error {
  color: #ff8a80 !important;
}

.custom-button :deep(.v-btn__content) {
  white-space: normal;
  width: 100%;
}

.custom-button:not(.answer-submitted):hover,
.custom-button:not(.answer-submitted):active {
  background-color: rgba(0, 150, 136, 0.08);
}

.custom-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.quiz-action {
  min-height: 3.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.quiz-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.result-card {
  max-width: 34rem;
  margin: 1.5rem auto;
}

.result-score {
  display: grid;
  justify-items: center;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.stat-item {
  display: grid;
  justify-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  border-radius: 0.75rem;
  background: rgba(var(--v-theme-teal), 0.06);
  text-align: center;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.stat-label {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.75rem;
}

@media (min-width: 600px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
