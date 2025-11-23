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
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          size="small"
          variant="text"
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <div class="mx-auto" style="max-width: 500px;">
            <QuizSettings
              v-if="!settings"
              :key="'settings-' + resetKey"
              @words-selected="updateWords"
              @quiz-type="quizType"
              @quiz-settings="setQuizSettings"
            />

            <QuizQuestion
              v-if="settings"
              :key="'question-' + resetKey"
              :settings="settings"
              @answer-list="updateAnswerList"
              :on-reset="confirmReset"
            />

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

          </div>

          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-title class="text-h6">Reset Quiz</v-card-title>
              <v-card-text>Are you sure you want to reset all quiz settings?</v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
                <v-btn color="red" text @click="confirmReset">Reset</v-btn>
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

          </v-speed-dial>
        </v-fab>
      </div>
    </v-app>
  </v-responsive>
</template>

<script setup>
import {shallowRef, watch, ref} from 'vue'
import logoLight from '@/assets/logo.png'
import logoDark from '@/assets/logoD.png'

const theme = ref('light')
provide('theme', theme)

const selectedQuiz = ref('words')
const selectedWords = ref([])
const settings = ref(null)
const answerWordList = ref([])
const dialog = ref(false)
const resetKey = ref(0)
const showTableWordListDialog = ref(false)
const showTableResultListDialog = ref(false)
const showRuleDialog = ref(false)

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
  settings.value = quizSettings
}

function quizType(type) {
  selectedQuiz.value = type
}

function updateAnswerList(list) {
  answerWordList.value = list
}

function confirmReset() {
  selectedQuiz.value = 'words'
  selectedWords.value = []
  settings.value = null
  answerWordList.value = []
  dialog.value = false
  resetKey.value++
}

</script>

