<template>
  <div class="quiz-layout">
    <div v-if="studying">
      <v-card class="progress-card mb-4" rounded="lg" variant="tonal" color="teal">
        <v-card-text class="pa-4 d-flex align-center justify-space-between">
          <div>
            <div class="text-caption text-medium-emphasis">{{ $t('STUDY CARDS') }}</div>
            <div class="text-body-1 font-weight-medium">{{ $t('Review words before the quiz') }}</div>
          </div>
          <v-chip size="small" variant="flat" color="teal">
            {{ studyIndex + 1 }} / {{ studyWords.length }}
          </v-chip>
        </v-card-text>
      </v-card>

      <v-card class="study-card mb-4" rounded="lg" elevation="2">
        <v-card-text class="text-center pa-5 pa-sm-7">
          <div class="study-heading">
            <div class="text-caption text-medium-emphasis">{{ $t('ENGLISH') }}</div>
            <v-btn class="study-favorite"
              :icon="isFavorite(studyWords[studyIndex]) ? 'mdi-star' : 'mdi-star-outline'"
              :aria-label="$t(isFavorite(studyWords[studyIndex]) ? 'Remove from favorites' : 'Add to favorites')"
              color="teal" variant="text" @click="$emit('toggle-favorite', studyWords[studyIndex])" />
          </div>
          <div class="study-english mt-2">
            <div class="study-word text-h5 font-weight-bold">{{ studyWordEnglish }}</div>
            <v-btn icon="mdi-volume-high" :aria-label="$t('Listen to English')"
              color="teal" variant="text" @click="speakEnglish(studyWords[studyIndex])" />
          </div>
          <v-divider class="my-4" />
          <div class="text-caption text-medium-emphasis">{{ $t('TRANSLATION') }}</div>
          <div class="study-word text-h6 mt-2">{{ studyWordRussian }}</div>
          <v-alert v-if="speechError" class="mt-3" type="warning" variant="tonal" density="comfortable">
            {{ $localizeMessage(speechError) }}
          </v-alert>
        </v-card-text>
      </v-card>

      <v-row dense class="mb-2">
        <v-col cols="6">
          <v-btn block rounded="lg" variant="outlined" color="teal"
            :disabled="studyIndex === 0" @click="changeStudyIndex(-1)">
            {{ $t('Previous') }}
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block rounded="lg" variant="outlined" color="teal"
            :disabled="studyIndex >= studyWords.length - 1" @click="changeStudyIndex(1)">
            {{ $t('Next') }}
          </v-btn>
        </v-col>
      </v-row>
      <v-btn block size="large" color="teal" rounded="lg" class="quiz-action" @click="startStudiedQuiz">
        {{ $t('Start quiz') }}
      </v-btn>
    </div>
    <div v-else-if="!isBtnResetQuiz">
      <v-card class="progress-card mb-4" rounded="lg" variant="tonal" color="teal">
        <v-card-text class="pa-4">
          <div class="d-flex align-center justify-space-between mb-3">
            <div>
              <div class="text-caption text-medium-emphasis">{{ $t('LEARNING PROGRESS') }}</div>
              <div class="text-body-1 font-weight-medium">
                {{ stats.correct }} {{ $t('of') }} {{ stats.total }} {{ $t('learned') }}
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
            rounded="lg"
            height="8"
          />
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:default="{ isActive }">
          <v-card rounded="lg">
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2">{{ $t('Helper') }}</div>
              <v-btn icon="mdi-close" variant="text" @click="isActive.value = false"></v-btn>
            </v-card-title>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
              <div class="text-medium-emphasis mb-4" v-html="$localizeMessage(helper)"></div>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>

      <v-card class="study-card mb-4" rounded="lg" elevation="2">
        <v-card-text class="text-center pa-3 pa-sm-4">
          <div class="question-heading">
            <div class="text-body-1 text-medium-emphasis">
              {{ $t(mode === 'gap' ? 'Fill in the missing word' : mode === 'pairs' ? 'Match the pairs' : 'How is the word translated?') }}
            </div>
            <div class="question-actions">
              <v-btn
                v-if="helper !== null && mode !== 'pairs' && (mode !== 'gap' || answerSubmitted)"
                icon="mdi-information-outline"
                size="small"
                color="primary"
                variant="text"
                :aria-label="$t('Show hint')"
                @click="dialog = true"
              />
              <v-btn
                v-if="mode !== 'pairs'"
                :icon="isFavorite(currentWord) ? 'mdi-star' : 'mdi-star-outline'"
                :aria-label="$t(isFavorite(currentWord) ? 'Remove from favorites' : 'Add to favorites')"
                color="teal"
                size="small"
                variant="text"
                @click="$emit('toggle-favorite', currentWord)"
              />
            </div>
          </div>
          <div class="question-word">
            <h2 v-if="mode !== 'pairs'" class="study-word text-h5 font-weight-bold">
              {{ question }}
            </h2>
            <div v-else class="text-body-2">{{ $t('Choose an English word and its translation') }}</div>
            <v-chip
              v-if="mode !== 'pairs' && currentWordObj.part_of_speech"
              size="small"
              variant="tonal"
              color="teal"
              label
            >
              {{ currentWordObj.part_of_speech }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <div v-if="mode === 'pairs'" class="pair-grid mb-4">
        <div class="pair-column">
          <div class="text-caption text-medium-emphasis">{{ $t('ENGLISH') }}</div>
          <v-btn v-for="index in pairRound" :key="index" block variant="outlined" rounded="lg"
            class="custom-button pair-button text-lowercase pa-2" color="teal"
            :class="{ 'pair-selected': pairSelected === index }"
            :disabled="usedIndexes.has(index)" :aria-pressed="pairSelected === index"
            @click="selectPairWord(index)">
            <span class="btn-text-wrap">{{ listWords[index].en }}</span>
          </v-btn>
        </div>
        <div class="pair-column">
          <div class="text-caption text-medium-emphasis">{{ $t('TRANSLATION') }}</div>
          <v-btn v-for="index in pairTranslations" :key="index" block variant="outlined" rounded="lg"
            class="custom-button pair-button text-lowercase pa-2" color="teal"
            :disabled="usedIndexes.has(index)" @click="selectPairTranslation(index)">
            <span class="btn-text-wrap">{{ listWords[index].ru }}</span>
          </v-btn>
        </div>
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

      <div v-if="separateVerbForms && !isBtnContinue" class="mb-4">
        <v-text-field
          v-model="verbPast" :label="$t('Past simple')" variant="outlined"
          density="comfortable" color="teal" autofocus @update:model-value="$nextTick(saveState)" />
        <v-text-field
          v-model="verbParticiple" :label="$t('Past participle')" variant="outlined"
          density="comfortable" color="teal" @update:model-value="$nextTick(saveState)" />
      </div>
      <div v-else-if="(mode === 'manual' || mode === 'gap') && !isBtnContinue" class="mb-4">
        <v-text-field
          v-model="userAnswer"
          clearable
          :label="$t('Enter your answer')"
          variant="outlined"
          density="comfortable"
          color="teal"
          autofocus
          :persistent-hint="persistentHint"
          :hint="hint"
          @update:model-value="$nextTick(saveState)"
        />
      </div>

      <div v-if="(mode === 'manual' || mode === 'gap') && answeredIsView" class="mb-4">
        <v-text-field
          v-model="answeredFeedback"
          disabled
          :label="$t('Your answer')"
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
        <div v-html="$localizeMessage(feedback)"></div>
        <div v-if="separateVerbForms && typeCorrect === 'error'" class="mt-2">
          <div v-for="(form, index) in verbFormFeedback" :key="form.label">
            <v-icon :icon="form.correct ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
              :color="form.correct ? 'success' : 'error'" size="small" />
            {{ $t(form.label) }}: {{ form.value }} — {{ currentWordObj.correctAnswer[index] }}
          </div>
        </div>
        <v-btn
          v-if="typeCorrect === 'error' && mode !== 'pairs'"
          class="mt-2"
          size="small"
          variant="outlined"
          color="teal"
          prepend-icon="mdi-volume-high"
          @click="speakCorrectAnswer"
        >
          {{ $t('Listen to English') }}
        </v-btn>
      </v-alert>

      <v-alert v-if="speechError" class="mb-4" type="warning" variant="tonal" density="comfortable">
        {{ $localizeMessage(speechError) }}
      </v-alert>

      <v-btn
        v-if="isBtnAnswer"
        block
        size="large"
        color="teal"
        rounded="lg"
        class="quiz-action"
        :disabled="(mode === 'manual' || mode === 'gap') && (separateVerbForms
          ? !verbPast.trim() || !verbParticiple.trim() : !(userAnswer || '').trim())"
        @click="checkAnswer"
      >
        {{ $t('Check answer') }}
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
        {{ $t('Continue') }}
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <v-card v-if="isBtnResetQuiz" class="result-card" rounded="lg" elevation="2">
      <v-card-text class="pa-5 pa-sm-7">
        <div class="text-center mb-5">
          <v-avatar color="teal" variant="tonal" size="56" class="mb-3">
            <v-icon size="30">mdi-trophy-outline</v-icon>
          </v-avatar>
          <div class="text-h5 font-weight-bold">{{ $t('Quiz complete') }}</div>
          <div class="text-body-2 text-medium-emphasis mt-1">{{ $t('Here is your result') }}</div>
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
          <div class="text-body-2 text-medium-emphasis mt-3">{{ $t('Final score') }}</div>
        </div>

        <v-divider class="my-5" />

        <div class="stats-grid">
          <div class="stat-item rounded-lg">
            <span class="stat-value">{{ stats.correct }}</span>
            <span class="stat-label">{{ $t('Correct') }}</span>
          </div>
          <div class="stat-item rounded-lg">
            <span class="stat-value">{{ stats.incorrect }}</span>
            <span class="stat-label">{{ $t('Mistakes') }}</span>
          </div>
          <div class="stat-item rounded-lg">
            <span class="stat-value">{{ stats.attempt }}</span>
            <span class="stat-label">{{ $t('Attempts') }}</span>
          </div>
          <div class="stat-item rounded-lg">
            <span class="stat-value">{{ spentTime }}</span>
            <span class="stat-label">{{ $t('Time') }}</span>
          </div>
        </div>

        <v-row class="mt-4" dense>
          <v-col v-if="mistakenWords.length" cols="12">
            <v-btn block size="large" color="teal" rounded="lg" @click="reviewMistakes">
              <v-icon start>mdi-repeat</v-icon>
              {{ $t('Review mistakes') }} ({{ mistakenWords.length }})
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block size="large" color="teal" rounded="lg" @click="restartQuiz">
              <v-icon start>mdi-refresh</v-icon>
              {{ $t('Restart') }}
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block size="large" variant="outlined" color="teal" rounded="lg" @click="onReset">
              {{ $t('New quiz') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div v-if="!isBtnResetQuiz && !studying" class="quiz-stats mt-4">
      <v-chip size="small" variant="tonal" color="teal">
        <v-icon start size="small">mdi-check-circle-outline</v-icon>
        {{ stats.correct }} {{ $t('correct') }}
      </v-chip>
      <v-chip size="small" variant="tonal" color="error">
        <v-icon start size="small">mdi-close-circle-outline</v-icon>
        {{ stats.incorrect }} {{ $t('mistakes') }}
      </v-chip>
      <v-chip size="small" variant="tonal">
        <v-icon start size="small">mdi-counter</v-icon>
        {{ stats.attempt }} {{ $t('attempts') }}
      </v-chip>
      <v-chip size="small" variant="tonal">
        <v-icon start size="small">mdi-counter</v-icon>
        {{ stats.remained }} {{ $t('left') }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import {allWords} from '@/data/words'
import {allIrregularVerbs} from '@/data/irregular-verbs'
import {wordKey} from '@/quiz-storage'
import {isReviewDue} from '@/review-schedule'
import {gapExample, pairConflicts} from '@/quiz-modes'
import {translate as t} from '@/i18n'

export default {
  props: {
    settings: {type: Object, required: true},
    countAnswerOptions: {type: Number, default: 10},
    favorites: {type: Object, default: () => ({})},
    mistakes: {type: Object, default: () => ({})},
    reviews: {type: Object, default: () => ({})},
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
      verbPast: '',
      verbParticiple: '',
      answerSubmitted: false,
      selectedOption: null,
      mistakenWords: [],
      reviewedKeys: [],
      pairRound: [],
      pairTranslations: [],
      pairSelected: null,
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
      return this.separateVerbForms || this.settings.quiz === 'verbs' ? 'manual' : (this.settings.mode || 'manual')
    },
    separateVerbForms() {
      return this.settings.quiz === 'verbs' && !!this.settings.separateVerbForms
    },
    verbFormFeedback() {
      if (!this.separateVerbForms || !this.currentWord) return []
      const correct = this.normalizeVerbForms(this.currentWordObj.correctAnswer)
      return [
        {label: 'Past simple', value: this.verbPast},
        {label: 'Past participle', value: this.verbParticiple},
      ].map((form, index) => {
        const normalized = this.normalize(form.value)
        return {...form, correct: normalized.length === 1 && correct[index].includes(normalized[0])}
      })
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

      if (this.mode === 'gap') {
        const gap = gapExample(this.currentWord)
        return {question: gap.question, correctAnswer: gap.answers, part_of_speech: this.currentWord.part_of_speech}
      }

      let current = {};

      if (this.settings.quiz === 'verbs') {
        current = {
          question: this.separateVerbForms
            ? `${this.currentWord.infinitive} — ${this.currentWord.translation}`
            : this.currentWord.translation,
          ordered: this.separateVerbForms,
          correctAnswer: this.separateVerbForms ? [this.currentWord.past, this.currentWord.past_participle] : [
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
        return t('Use for the separator \' , \' in answer')
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
      } else if (this.settings.selectedPool && ['gap', 'pairs'].includes(this.mode)) {
        this.listWords = [...this.settings.selectedPool]
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
        this.optionWords = ['gap', 'pairs'].includes(this.mode) ? [] : [...this.listWords]
        const filter = this.settings.wordFilter || 'all'
        if ((filter !== 'all' || this.settings.spacedReview || ['gap', 'pairs'].includes(this.mode)) && this.initialWords) {
          this.listWords = [...this.initialWords]
        } else {
          this.listWords = this.listWords.filter(word => {
            const key = wordKey(word, this.settings.quiz)
            return filter === 'all' ||
              (filter === 'favorites' && this.favorites[key]) ||
              (filter === 'difficult' && (this.mistakes[key] || 0) >= 2)
          })
        }
        if (this.settings.spacedReview && !this.initialWords && !this.settings.selectedPool) {
          this.listWords = this.listWords.filter(word => isReviewDue(this.reviews[wordKey(word, this.settings.quiz)]))
        }
        const limit = this.settings.quiz === 'random' ? this.settings.amount : null
        if (limit) {
          this.listWords = this.shuffle(this.listWords).slice(0, limit)
        }
        if ((filter !== 'all' || this.settings.spacedReview || this.settings.selectedPool) && !this.initialWords) this.initialWords = [...this.listWords]
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
    saveState(reviewAnswer = null) {
      const keys = ['studying', 'studyIndex', 'studyWords', 'listWords', 'userAnswer', 'verbPast', 'verbParticiple',
        'answerSubmitted', 'selectedOption', 'mistakenWords', 'reviewedKeys', 'reviewWords', 'initialWords', 'optionWords',
        'pairRound', 'pairTranslations', 'pairSelected',
        'feedback', 'answeredFeedback', 'answeredIsView', 'helper', 'isCorrect',
        'isBtnContinue', 'isBtnAnswer', 'isBtnResetQuiz', 'typeCorrect', 'currentIndex',
        'options', 'answerList', 'question', 'stats', 'resultPercentage', 'resultColor']
      const state = Object.fromEntries(keys.map(key => [key, this[key]]))
      state.usedIndexes = [...this.usedIndexes]
      state.startTime = this.startTime?.toISOString()
      state.savedAt = new Date().toISOString()
      this.$emit('checkpoint', state, reviewAnswer)
    },
    restoreState(state) {
      const {usedIndexes, startTime, savedAt, ...fields} = state
      Object.assign(this, fields)
      this.usedIndexes = new Set(usedIndexes)
      this.startTime = new Date(Date.parse(startTime) + Date.now() - Date.parse(savedAt))
      if (this.answerSubmitted && this.typeCorrect === 'error' && this.mode !== 'pairs') {
        this.feedback = `${t('Incorrect. Correct:')} <strong>${this.currentWordObj.correctAnswer}</strong>`
      } else if (this.typeCorrect === 'warning') {
        this.feedback = t('Enter the answer in the field')
      }
      if (this.settings.quiz === 'verbs' && this.helper) {
        this.helper = t('Verb:') + ' <strong>' + this.currentWord?.infinitive + '</strong>'
      }
      if (!this.studying && this.mode === 'pairs' && this.pairRound.length &&
          this.pairRound.every(index => this.usedIndexes.has(index))) {
        this.nextWord()
      } else if (this.answerSubmitted && this.isCorrect && !this.studying && this.mode !== 'pairs') {
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
    startPairRound() {
      this.pairRound = []
      for (let index = 0; index < this.listWords.length && this.pairRound.length < (this.settings.pairCount ?? 4); index++) {
        if (!this.usedIndexes.has(index) &&
            this.pairRound.every(other => !pairConflicts(this.listWords[index], this.listWords[other]))) {
          this.pairRound.push(index)
        }
      }
      this.pairTranslations = this.shuffle(this.pairRound)
      this.pairSelected = null
      this.feedback = ''
      this.answerSubmitted = false
      this.handlerButton(false, false, false)
      this.saveState()
    },
    selectPairWord(index) {
      this.pairSelected = index
      this.feedback = ''
      this.saveState()
    },
    selectPairTranslation(index) {
      if (this.pairSelected === null) {
        this.feedback = t('Choose an English word first.')
        this.typeCorrect = 'warning'
        return
      }
      const selected = this.pairSelected
      const word = this.listWords[selected]
      const correct = selected === index
      let reviewAnswer = null
      if (this.settings.spacedReview) {
        const key = wordKey(word, this.settings.quiz)
        if (!this.reviewedKeys.includes(key)) {
          this.reviewedKeys.push(key)
          reviewAnswer = {word, correct}
        }
      }
      this.answerList.unshift({
        input: this.listWords[index].ru,
        answer: {question: word.en, correctAnswer: word.ru},
        isCorrect: correct,
      })
      this.stats.attempt++
      this.typeCorrect = correct ? 'success' : 'error'
      this.feedback = t(correct ? 'Correct!' : 'Incorrect. Try another pair.')
      if (correct) {
        this.usedIndexes.add(selected)
        this.stats.correct++
        this.stats.remained--
      } else {
        this.stats.incorrect++
        this.$emit('mistake', word)
        if (!this.mistakenWords.some(item => this.wordKey(item) === this.wordKey(word))) {
          this.mistakenWords.push(word)
        }
      }
      this.pairSelected = null
      this.$emit('answer-list', this.answerList)
      const roundComplete = this.pairRound.every(item => this.usedIndexes.has(item))
      this.saveState(reviewAnswer)
      if (roundComplete) {
        this.nextWordTimeout = setTimeout(() => {
          this.nextWordTimeout = null
          this.nextWord()
        }, 400)
      }
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
      const input = this.separateVerbForms
        ? [this.normalize(this.verbPast), this.normalize(this.verbParticiple)]
        : this.normalize(this.userAnswer || '', ignoreParenthetical)
      const correct = this.settings.quiz === 'verbs'
        ? this.normalizeVerbForms(this.currentWordObj.correctAnswer)
        : this.mode === 'gap'
          ? this.currentWordObj.correctAnswer.flatMap(answer => this.normalize(answer))
          : this.prepareCorrectWord(this.currentWordObj.correctAnswer, ignoreParenthetical)

      this.answeredIsView = false;
      this.isCorrect = false;
      this.typeCorrect = 'error'
      this.feedback = `${t('Incorrect. Correct:')} <strong>${this.currentWordObj.correctAnswer}</strong>`;

      if (input.length === 0 || (this.separateVerbForms && input.some(form => form.length !== 1))) {
        this.typeCorrect = 'warning'
        this.feedback = t('Enter the answer in the field')
        this.handlerButton(true, false, false)
        return
      }

      this.answerSubmitted = true
      let isCorrectAnswer = false;
      if (this.separateVerbForms) {
        isCorrectAnswer = input.every((form, index) => correct[index].includes(form[0]))
      } else if (this.settings.quiz === 'verbs') {
        isCorrectAnswer = this.matchesVerbForms(input, correct);
      } else if (this.mode === 'gap') {
        isCorrectAnswer = input.length === 1 && correct.includes(input[0])
      } else {
        isCorrectAnswer = input.every(word => correct.includes(word));
      }
      let reviewAnswer = null
      if (this.settings.spacedReview) {
        const key = wordKey(this.currentWord, this.settings.quiz)
        if (!this.reviewedKeys.includes(key)) {
          this.reviewedKeys.push(key)
          reviewAnswer = {word: this.currentWord, correct: isCorrectAnswer}
        }
      }

      if (isCorrectAnswer) {
        this.answeredIsView = false;
        this.isCorrect = true;
        this.typeCorrect = 'success'
        this.feedback = t('Correct!')

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
        this.answeredFeedback = this.separateVerbForms
          ? [this.verbPast, this.verbParticiple].join(', ') : this.userAnswer;
        this.answeredIsView = true;
        this.userAnswer = ''
        this.handlerButton(false, true, false)
      }

      this.answerList.unshift({
        input: this.separateVerbForms ? input.map(form => form[0]) : input,
        answer: this.currentWordObj,
        isCorrect: this.isCorrect
      })

      this.updateStats(this.isCorrect)
      this.saveState(reviewAnswer)

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

      if (this.mode === 'pairs' && this.usedIndexes.size < this.listWords.length) {
        this.startPairRound()
        return
      }

      if (this.usedIndexes.size === this.listWords.length) {
        this.answerSubmitted = true
        this.isCorrect = true
        this.feedback = t('You have completed all the words!')
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
      this.verbPast = ''
      this.verbParticiple = ''
      this.feedback = ''
      this.isCorrect = false

      this.handlerButton(true, false, false)

      const current = this.currentWordObj
      this.question = this.mode === 'gap' ? current.question : this.separateVerbForms
        ? `${this.currentWord.infinitive} — ${this.splitWord(this.currentWord.translation)}`
        : this.splitWord(current.question)

      if (this.mode === 'list') {
        this.options = this.generateOptions(current.correctAnswer)
        this.handlerButton(false, false, false)
      }

      if (this.settings.quiz === 'verbs') {
        this.helper =  t('Verb:') + ' <strong>' + this.currentWord?.infinitive + '</strong>';
      } else if (this.mode !== 'gap') {
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
        this.speechError = t('Speech playback is not supported in this browser.')
        return
      }

      const english = this.settings.quiz === 'verbs'
        ? [word.infinitive, word.past, word.past_participle].join(', ')
        : word.en
      const utterance = new window.SpeechSynthesisUtterance(english)
      utterance.lang = 'en-US'
      utterance.onerror = () => {
        this.speechError = t('Unable to play pronunciation. Check your browser and audio settings.')
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
      } else if (event.key === 'Enter' && this.mode !== 'pairs' &&
          (!isEditable || (['manual', 'gap'].includes(this.mode) && target.matches('input'))) &&
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
      this.verbPast = ''
      this.verbParticiple = ''
      this.feedback = ''
      this.isCorrect = false
      this.isBtnContinue = false
      this.isBtnAnswer = true
      this.typeCorrect = null
      this.currentIndex = 0
      this.usedIndexes.clear()
      this.pairRound = []
      this.pairTranslations = []
      this.pairSelected = null
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
.pair-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.pair-column { min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.pair-button { min-width: 0; }
.pair-button.pair-selected {
  border-width: 2px;
  box-shadow: inset 0 0 0 999px rgba(0, 150, 136, 0.16);
}
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

.question-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: left;
}

.question-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.question-word {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
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

@media (max-width: 599px) {
  .pair-grid {
    gap: 8px;
  }

  .custom-button.pair-button {
    min-height: 48px;
    padding: 8px !important;
  }

  .pair-button .btn-text-wrap {
    font-size: 0.875rem;
    line-height: 1.35;
  }
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
