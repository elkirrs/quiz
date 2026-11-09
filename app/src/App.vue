<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-img
          :src="theme === 'light' ? logoLight : logoDark"
          max-height="40"
          max-width="40"
          class="mr-2"
          contain
          @click="confirmReset"
          style="cursor: pointer;"
        />
        <v-spacer></v-spacer>
        <h2>Word Quiz</h2>
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          size="small"
          :aria-label="$t(locale === 'ru' ? 'Switch to English' : 'Switch to Russian')"
          @click="toggleLanguage"
        >{{ locale === 'ru' ? 'EN' : 'RU' }}</v-btn>
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          size="small"
          variant="text"
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <div class="mx-auto" style="max-width: 500px;">
            <v-alert v-if="storageError" type="error" variant="tonal" class="mt-4" closable @click:close="storageError = ''">
              {{ localizeMessage(storageError) }}
            </v-alert>
            <v-alert v-if="languageError" type="warning" variant="tonal" class="mt-4" closable @click:close="languageError = ''">
              {{ $t('Unable to save language preference.') }} {{ languageError }}
            </v-alert>
            <v-card v-if="!settings && learning.active" class="mt-4" variant="tonal" color="teal">
              <v-card-text>{{ $t('Continue your unfinished quiz?') }}</v-card-text>
              <v-card-actions>
                <v-btn @click="resumeQuiz">{{ $t('Continue') }}</v-btn>
                <v-btn @click="discardQuiz">{{ $t('Start over') }}</v-btn>
              </v-card-actions>
            </v-card>
            <QuizSettings
              v-if="!settings && !learning.active"
              :key="'settings-' + resetKey"
              :favorites="learning.favorites"
              :mistakes="learning.mistakes"
              @words-selected="updateWords"
              @quiz-type="quizType"
              @quiz-settings="setQuizSettings"
            />

            <QuizQuestion
              v-if="settings"
              :key="'question-' + resetKey"
              :settings="settings"
              :count-answer-options="settings.countAnswerOptions"
              :favorites="learning.favorites"
              :mistakes="learning.mistakes"
              :initial-state="resumeState"
              @answer-list="updateAnswerList"
              @toggle-favorite="toggleFavorite"
              @mistake="recordMistake"
              @checkpoint="saveCheckpoint"
              @complete="saveResult"
              :on-reset="confirmReset"
            />

            <v-expansion-panels v-if="!settings && learning.history.length" class="mt-4">
              <v-expansion-panel :title="$t('Quiz history')">
                <v-expansion-panel-text>
                  <div v-for="day in historyByDay" :key="day.date" class="mb-2 text-body-2">
                    {{ day.date }} · {{ day.count }} {{ $t('quizzes') }} · {{ $t('average') }} {{ day.average }}%
                  </div>
                  <v-divider class="my-3" />
                  <div v-for="result in learning.history.slice().reverse()" :key="result.id" class="mb-3">
                    <strong>{{ result.score }}%</strong> · {{ new Date(result.date).toLocaleString() }}
                    <div class="text-body-2">{{ result.total }} {{ $t('words') }} · {{ result.incorrect }} {{ $t('mistakes') }} · {{ result.attempts }} {{ $t('attempts') }}</div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <QuizTable
              v-if="selectedWords.length && !settings"
              :key="'table-' + resetKey"
              :words="selectedWords"
              :quiz="selectedQuiz"
              v-model:dialog="showTableWordListDialog"
            />

            <QuizResult
              v-if="answerWordList.length"
              :key="'answer-' + resetKey"
              :answerList="answerWordList"
              v-model:dialog="showTableResultListDialog"
            />

            <Rule
              :key="'rule-' + resetKey"
              v-model:dialog="showRuleDialog"
            />

            <ModalVerbs
              :key="'rule-' + resetKey"
              v-model:dialog="showModalWerbsDialog"
            />

          </div>

          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-title class="text-h6">{{ $t('Reset Quiz') }}</v-card-title>
              <v-card-text>{{ $t('Are you sure you want to reset all quiz settings?') }}</v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" text @click="dialog = false">{{ $t('Cancel') }}</v-btn>
                <v-btn color="red" text @click="confirmReset">{{ $t('Reset') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-container>

      </v-main>

      <div class="pa-8">
        <v-fab
          :key="fabPosition"
          :absolute="false"
          :app="fabPosition === 'fixed'"
          :color="open ? '' : 'teal'"
          :location="fabLocation"
          size="large"
          icon
        >
          <v-icon>{{ open ? 'mdi-close' : 'mdi-crown' }}</v-icon>
          <v-speed-dial
            v-model="open"
            :location="menuLocation"
            :transition="transition"
            activator="parent"
          >
            <v-btn
              key="1"
              color="red"
              size="large"
              icon="mdi-restore"
              @click="dialog = true"
            >
            </v-btn>
            <v-btn
              v-if="selectedWords.length && !settings"
              key="2"
              color="teal"
              icon="mdi-list-box-outline"
              @click="showTableWordListDialog = true"
              size="large"
            ></v-btn>

            <v-btn
              v-if="answerWordList.length"
              color="teal"
              key="3"
              @click="showTableResultListDialog = true"
              icon="mdi-help-box-multiple-outline"
              size="large"
            >
            </v-btn>

            <v-btn
              color="teal"
              key="3"
              @click="showRuleDialog = true"
              icon="mdi-hexagon-multiple-outline"
              size="large"
            >
            </v-btn>
            <v-btn
              color="teal"
              key="3"
              @click="showModalWerbsDialog = true"
              icon="mdi-chemical-weapon"
              size="large"
            >
            </v-btn>
          </v-speed-dial>
        </v-fab>
      </div>
    </v-app>
  </v-responsive>
</template>

<script setup>
import {computed, inject, shallowRef, watch, ref} from 'vue'
import {useLocale} from 'vuetify'
import {readLearningData, writeLearningData, wordKey} from '@/quiz-storage'
import {locale, translate as t, localizeMessage, LANGUAGE_STORAGE_KEY} from '@/i18n'
import logoLight from '@/assets/logo.png'
import logoDark from '@/assets/logoD.png'

const theme = ref('light')
provide('theme', theme)
const languageError = ref(inject('languageStorageError', ''))
const {current: vuetifyLocale} = useLocale()
watch(locale, value => {
  vuetifyLocale.value = value
  document.documentElement.lang = value
}, {immediate: true})
function toggleLanguage() {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale.value)
    languageError.value = ''
  } catch (error) {
    languageError.value = error.message
  }
}

const learning = ref({ favorites: {}, mistakes: {}, history: [], active: null })
const storageError = ref('')
let storageReadable = true
try {
  learning.value = readLearningData(window.localStorage)
} catch (error) {
  storageReadable = false
  storageError.value = `${t('Unable to load saved learning data:')} ${t(error.message)}`
}
const resumeState = ref(null)
const historyByDay = computed(() => {
  const days = new Map()
  for (const result of learning.value.history) {
    const date = new Date(result.date).toLocaleDateString()
    const day = days.get(date) || {date, count: 0, total: 0}
    day.count++
    day.total += result.score
    days.set(date, day)
  }
  return [...days.values()].reverse().map(day => ({
    ...day, average: Math.round(day.total / day.count),
  }))
})
function persist() {
  if (!storageReadable) {
    storageError.value = t('Saved learning data could not be loaded and will not be overwritten.')
    return
  }
  try {
    writeLearningData(window.localStorage, learning.value)
  } catch (error) {
    storageError.value = `${t('Unable to save learning data:')} ${error.message}`
  }
}
function toggleFavorite(word) {
  const key = wordKey(word, settings.value.quiz)
  if (learning.value.favorites[key]) delete learning.value.favorites[key]
  else learning.value.favorites[key] = true
  persist()
}
function recordMistake(word) {
  const key = wordKey(word, settings.value.quiz)
  learning.value.mistakes[key] = (learning.value.mistakes[key] || 0) + 1
  persist()
}
function saveCheckpoint(state) {
  learning.value.active = { settings: settings.value, state }
  persist()
}
function saveResult(result) {
  learning.value.history.push(result)
  learning.value.active = null
  persist()
}
function resumeQuiz() {
  resumeState.value = learning.value.active.state
  settings.value = learning.value.active.settings
  answerWordList.value = resumeState.value.answerList
}
function discardQuiz() {
  learning.value.active = null
  persist()
}

const selectedQuiz = ref('words')
const selectedWords = ref([])
const settings = ref(null)
const answerWordList = ref([])
const dialog = ref(false)
const resetKey = ref(0)
const showTableWordListDialog = ref(false)
const showTableResultListDialog = ref(false)
const showRuleDialog = ref(false)
const showModalWerbsDialog =  ref(false)

const open = shallowRef(false)
const fabPosition = shallowRef('fixed')
const menuLocation = shallowRef('top center')
const fabLocation = shallowRef('right bottom')
const transition = shallowRef('slide-y-reverse-transition')

watch(menuLocation, reopen)
watch(transition, reopen)
watch(fabLocation, () => open.value = false)
watch(fabPosition, () => open.value = false)

function reopen() {
  open.value = false
  setTimeout(() => open.value = true, 400)
}

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function updateWords(words) {
  selectedWords.value = words
}

function setQuizSettings(quizSettings) {
  if (learning.value.active) discardQuiz()
  resumeState.value = null
  settings.value = quizSettings
}

function quizType(type) {
  selectedQuiz.value = type
}

function updateAnswerList(list) {
  answerWordList.value = list
}

function confirmReset() {
  if (settings.value) discardQuiz()
  resumeState.value = null
  selectedQuiz.value = 'words'
  selectedWords.value = []
  settings.value = null
  answerWordList.value = []
  dialog.value = false
  resetKey.value++
}

</script>
