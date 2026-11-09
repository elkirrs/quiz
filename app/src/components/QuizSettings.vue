<template>

  <div class="pt-8">
    <v-select
      v-model="selectedQuiz"
      :items="itemsQuiz"
      item-title="name"
      item-value="code"
      :density="settings.density"
      :label="$t('Choose quiz')"
      :variant="settings.variant"
      :color="settings.color"
    >
      <template #selection="{ item }" v-if="settings.chips">
        <v-chip
          size="small"
          color="teal"
          label
        >
          <span>{{ item.title }}</span>
        </v-chip>
      </template>
    </v-select>

    <v-select
      v-if="selectedQuiz === 'words' || selectedQuiz === 'random' "
      clearable
      v-model="levels"
      :items="itemsLevel"
      item-title="name"
      item-value="code"
      :label="$t('Choose Level')"
      multiple
      :density="settings.density"
      persistent-hint
      :variant="settings.variant"
      :color="settings.color"
    >
      <template #selection="{ index, item }" v-if="settings.chips">
        <template v-if="settings.maxChip > index && settings.maxChip <= 1">
          <v-chip
            size="small"
            color="teal"
            label
          >
            <span>{{ levels.length }} {{ $t('selected') }}</span>
          </v-chip>

        </template>

        <template v-if="settings.maxChip > index && settings.maxChip > 1">
          <v-chip
            size="small"
            :closable="settings.closableChips"
          >
            <span>{{ item.title }}</span>
          </v-chip>
        </template>

      </template>
    </v-select>


    <v-select
      v-if="selectedQuiz === 'words' || selectedQuiz === 'random'"
      clearable
      v-model="units"
      :items="itemsUnit"
      item-title="name"
      item-value="code"
      :label="$t('Choose Unit')"
      multiple
      :density="settings.density"
      persistent-hint
      :variant="settings.variant"
      :color="settings.color"
    >
      <template #selection="{ index, item }" v-if="settings.chips">
        <template v-if="settings.maxChip > index && settings.maxChip <= 1">
          <v-chip
            size="small"
            color="teal"
            label
          >
            <span>{{ units.length }} {{ $t('selected') }} | {{ countWords }}</span>
          </v-chip>

        </template>

        <template v-if="settings.maxChip > index && settings.maxChip > 1">
          <v-chip
            size="small"
            :closable="settings.closableChips"
          >
            <span>{{ item.title }}</span>
          </v-chip>
        </template>

      </template>
    </v-select>

    <v-select
      v-if="selectedQuiz === 'verbs'"
      clearable
      v-model="verbs"
      :items="itemsVerbs"
      item-title="name"
      item-value="code"
      :label="$t('Choose Unit')"
      multiple
      :density="settings.density"
      persistent-hint
      :variant="settings.variant"
      :color="settings.color"
    >
      <template #selection="{ index, item }" v-if="settings.chips">
        <template v-if="settings.maxChip > index && settings.maxChip <= 1">
          <v-chip
            size="small"
            color="teal"
            label
          >
            <span>{{ verbs.length }} {{ $t('selected') }} | {{ countWords }}</span>
          </v-chip>

        </template>

        <template v-if="settings.maxChip > index && settings.maxChip > 1">
          <v-chip
            size="small"
            :closable="settings.closableChips"
          >
            <span>{{ item.title }}</span>
          </v-chip>
        </template>

      </template>

    </v-select>

    <v-select
      v-if="(selectedQuiz === 'words' || selectedQuiz === 'random') && ['manual', 'list'].includes(selectedMod)"
      v-model="selectedTrans"
      :items="itemsTrans"
      item-title="name"
      item-value="code"
      :density="settings.density"
      :label="$t('Choose the directory of the translation of words')"
      :variant="settings.variant"
      :color="settings.color"
    >
      <template #selection="{ item }" v-if="settings.chips">
        <v-chip
          size="small"
          color="teal"
          label
        >
          <span>{{ item.title }}</span>
        </v-chip>
      </template>
    </v-select>

    <v-select
      v-if="selectedQuiz === 'words' || selectedQuiz === 'random'"
      v-model="selectedMod"
      :items="itemsMods"
      item-title="name"
      item-value="code"
      :density="settings.density"
      :label="$t('Choose mode')"
      :variant="settings.variant"
      :color="settings.color"
    >
      <template #selection="{ item }" v-if="settings.chips">
        <v-chip
          size="small"
          color="teal"
          label
        >
          <span>{{ item.title }}</span>
        </v-chip>
      </template>
    </v-select>

    <v-text-field
      v-if="xs && selectedMod === 'list' && (selectedQuiz === 'words' || selectedQuiz === 'random')"
      :model-value="mobileAnswerOptions"
      :density="settings.density"
      :label="$t('Number of answer options')"
      :variant="settings.variant"
      :color="settings.color"
      readonly
    >
      <template #prepend-inner>
        <v-btn
          icon="mdi-minus"
          size="small"
          variant="text"
          :aria-label="$t('Decrease answer options')"
          :disabled="mobileAnswerOptions <= 4"
          @click="mobileAnswerOptions--"
        />
      </template>
      <template #append-inner>
        <v-btn
          icon="mdi-plus"
          size="small"
          variant="text"
          :aria-label="$t('Increase answer options')"
          :disabled="mobileAnswerOptions >= 10"
          @click="mobileAnswerOptions++"
        />
      </template>
    </v-text-field>

    <v-text-field
      v-if="xs && selectedMod === 'pairs' && (selectedQuiz === 'words' || selectedQuiz === 'random')"
      :model-value="mobilePairCount"
      :density="settings.density"
      :label="$t('Pairs per round')"
      :variant="settings.variant"
      :color="settings.color"
      readonly
    >
      <template #prepend-inner>
        <v-btn icon="mdi-minus" size="small" variant="text"
          :aria-label="$t('Decrease pairs per round')"
          :disabled="mobilePairCount <= 4" @click="mobilePairCount--" />
      </template>
      <template #append-inner>
        <v-btn icon="mdi-plus" size="small" variant="text"
          :aria-label="$t('Increase pairs per round')"
          :disabled="mobilePairCount >= 6" @click="mobilePairCount++" />
      </template>
    </v-text-field>

    <v-select
      v-if="filterOptions.length > 1"
      v-model="wordFilter"
      :items="filterOptions"
      item-title="title"
      item-value="value"
      :label="$t('Words to study')"
      :density="settings.density"
      :variant="settings.variant"
      :color="settings.color"
    >
      <template #selection="{ item }" v-if="settings.chips">
        <v-chip
          size="small"
          color="teal"
          label
        >
          <span>{{ item.title }}</span>
        </v-chip>
      </template>
    </v-select>

    <div v-if="selectedQuiz === 'random' && sliderShow">
      <div class="text-caption">
        {{ $t('Count words') }}: {{ sliderValue }}
      </div>
      <v-slider
        v-model="sliderValue"
        thumb-label
        :glow="true"
        :max="sliderMaxValue"
        :min="sliderMinValue"
        :step="sliderStepValue"
        color="teal"
      >
        <template v-slot:prepend>
          <v-btn
            color="teal"
            icon="mdi-minus"
            size="small"
            variant="text"
            @click="decrement"
          ></v-btn>
        </template>

        <template v-slot:append>
          <v-btn
            color="teal"
            icon="mdi-plus"
            size="small"
            variant="text"
            @click="increment"
          ></v-btn>
        </template>

      </v-slider>
    </div>

    <v-switch v-if="selectedQuiz === 'verbs'" v-model="separateVerbForms"
      :label="$t('Separate fields for verb forms')" :color="settings.color" density="compact" hide-details />
    <v-switch v-model="studyFirst" :label="$t('Study cards before the quiz')" :color="settings.color" density="compact" hide-details />
    <v-switch v-model="spacedReview" :label="$t('Spaced review')"
      :color="settings.color" density="compact" hide-details />
    <v-switch v-if="selectedQuiz === 'verbs' || selectedMod !== 'pairs'" v-model="checkbox"
      :label="$t('Until the last mistake')" :color="settings.color" density="compact" hide-details />
    <v-alert v-if="selectedQuiz !== 'verbs' && selectedMod === 'pairs'" class="mt-3"
      type="info" variant="tonal" density="comfortable">
      {{ $t('Maximum pairs per round') }}: {{ xs ? mobilePairCount : 6 }}.
      {{ $t('Match every pair to continue.') }}
    </v-alert>
    <v-alert v-if="selectedQuiz !== 'verbs' && selectedMod === 'gap' && eligibleWords.length"
      class="mt-3" type="info" variant="tonal" density="comfortable">
      {{ $t('Words excluded because no suitable example was found') }}: {{ excludedGapCount }}
    </v-alert>

    <v-snackbar
      v-model="snackbar.show"
      :timeout="4000"
      :color="snackbar.color"
      location="top right"
      border="start"
    >
      {{ $t(snackbar.text) }}
    </v-snackbar>

    <v-btn
      class="mt-2"
      block
      :size="settings.btnSizeStart"
      :color="settings.color"
      @click="startQuiz"
    >{{ $t('Start') }}
    </v-btn>
  </div>

</template>

<script>
import {allWords, mapLevel} from '@/data/words'
import {allIrregularVerbs, mapUnit as mapVerbUnit} from '@/data/irregular-verbs'
import {app} from '@/data/const.js'
import {useDisplay} from 'vuetify'
import {wordKey} from '@/quiz-storage'
import {isReviewDue} from '@/review-schedule'
import {gapExample, pairTokens} from '@/quiz-modes'
import {translate as t} from '@/i18n'

export default {
  name: 'QuizSettings',
  props: {
    favorites: {type: Object, default: () => ({})},
    mistakes: {type: Object, default: () => ({})},
    reviews: {type: Object, default: () => ({})},
  },
  emits: ['words-selected', 'quiz-settings', 'quiz-type'],
  setup() {
    const {xs} = useDisplay()
    return {xs}
  },
  data: () => ({
    settings: app.settings,

    snackbar: {
      show: false,
      text: '',
      color: 'error'
    },

    checkbox: true,

    selectedQuiz: app.settings.default.quiz,
    selectedTrans: app.settings.default.trans,
    selectedMod: app.settings.default.mod,
    mobileAnswerOptions: 4,
    mobilePairCount: 4,
    wordFilter: 'all',
    studyFirst: false,
    spacedReview: false,
    separateVerbForms: false,

    sliderValue: 50,
    sliderMaxValue: 100,
    sliderMinValue: 20,
    sliderStepValue: 1,
    sliderShow: true,
    countWords: 0,

    levels: [],
    units: [],
    verbs: [],

  }),
  mounted() {
    this.loadAllWords()
  },
  computed: {
    itemsQuiz() {
      return app.settings.itemsQuiz.map(item => ({...item, name: t(item.name)}))
    },
    itemsTrans() {
      return app.settings.itemsTrans.map(item => ({...item, name: t(item.name)}))
    },
    itemsMods() {
      return app.settings.itemsMods.map(item => ({...item, name: t(item.name)}))
    },
    eligibleWords() {
      return this.getSelectedWords().filter(word => {
        const key = wordKey(word, this.selectedQuiz)
        const matches = this.wordFilter === 'all' ||
          (this.wordFilter === 'favorites' && this.favorites[key]) ||
          (this.wordFilter === 'difficult' && (this.mistakes[key] || 0) >= 2)
        return matches && (!this.spacedReview || isReviewDue(this.reviews[key]))
      })
    },
    excludedGapCount() {
      return this.eligibleWords.filter(word => !gapExample(word)).length
    },
    itemsLevel() {
      return Object.keys(mapLevel).map(code => ({name: t(mapLevel[code]), code}))
    },
    filterOptions() {
      const prefix = this.selectedQuiz === 'verbs' ? '["verbs",' : '["words",'
      const options = [{title: t('All selected words'), value: 'all'}]
      if (Object.entries(this.favorites).some(([key, favorite]) => key.startsWith(prefix) && favorite)) {
        options.push({title: t('Favorites'), value: 'favorites'})
      }
      if (Object.entries(this.mistakes).some(([key, count]) => key.startsWith(prefix) && count >= 2)) {
        options.push({title: t('Difficult words (2+ mistakes)'), value: 'difficult'})
      }
      return options
    },
    itemsUnit() {
      const units = [];

      this.levels.forEach(level => {
        const unitMap = allWords[level];
        if (unitMap) {
          Object.keys(unitMap).forEach((unitKey) => {
            units.push({
              name: `${t(unitKey.replace(/_/g, ' ')).replace(/^Unit /, `${t('Unit')} `)} (${t(mapLevel[level])}) | ${allWords[level][unitKey].length}`,
              code: `${level}/${unitKey}`
            });
          });
        }
      });

      return units;
    },
    itemsVerbs() {
      const units = [];

      Object.entries(allIrregularVerbs).forEach((item) => {
        units.push({
          name: `${t(mapVerbUnit[item[0]])} | ${item[1].length}`,
          code: `${item[0]}`
        });
      });

      return units;
    },
  },
  methods: {
    startQuiz() {
      const showError = (message) => {
        this.snackbar.text = message;
        this.snackbar.color = 'error';
        this.snackbar.show = true;
      };

      if (this.selectedQuiz === 'verbs' && (!this.selectedTrans || (this.wordFilter === 'all' && this.verbs.length === 0))) {
        showError('All quiz settings are required');
        return;
      }

      const needsUnits = this.wordFilter === 'all' || this.levels.length > 0
      if (this.selectedQuiz === 'words' && (!this.selectedTrans || !this.selectedMod || (needsUnits && (this.levels.length === 0 || this.units.length === 0)))) {
        showError('All quiz settings are required');
        return;
      }

      if (this.selectedQuiz === 'random' && (!this.selectedTrans || !this.selectedMod || (needsUnits && (this.levels.length === 0 || this.units.length === 0)) || this.sliderValue <= 0)) {
        showError('All quiz settings are required');
        return;
      }

      const filteredWords = this.eligibleWords
      if (!filteredWords.length) {
        showError(this.spacedReview ? 'No words are due for review.' : 'No words match the selected filter.')
        return
      }
      const specialMode = this.selectedQuiz !== 'verbs' && ['gap', 'pairs'].includes(this.selectedMod)
      const pool = !specialMode ? null : filteredWords.filter(word =>
        this.selectedMod === 'gap' ? gapExample(word) :
          typeof word.en === 'string' && typeof word.ru === 'string' &&
          pairTokens(word.en).length && pairTokens(word.ru).length
      )
      if (specialMode && !pool.length) {
        showError(this.selectedMod === 'gap' ? 'No suitable examples found.' : 'No suitable pairs found.')
        return
      }
      const countAnswerOptions = this.xs ? this.mobileAnswerOptions : 10
      this.$emit("quiz-settings", {
        quiz: this.selectedQuiz,
        trans: this.selectedTrans,
        mode: this.selectedMod,
        levels: this.levels,
        units: this.units,
        verbs: this.verbs,
        lastMistake: this.checkbox,
        amount: this.sliderValue,
        countAnswerOptions,
        pairCount: this.xs ? this.mobilePairCount : 6,
        wordFilter: this.wordFilter,
        studyFirst: this.studyFirst,
        spacedReview: this.spacedReview,
        separateVerbForms: this.selectedQuiz === 'verbs' && this.separateVerbForms,
        selectedPool: pool
      });
    },
    decrement() {
      this.sliderValue--
    },
    increment() {
      this.sliderValue++
    },
    loadAllWords() {
      const selected = []

      if (this.selectedQuiz === 'verbs') {
        Object.values(allIrregularVerbs).forEach(unit => {
          selected.push(...unit)
        })
      } else {
        Object.values(allWords).forEach(level => {
          Object.values(level).forEach(unit => {
            selected.push(...unit)
          })
        })
      }

      this.countWords = selected.length
      this.$emit('words-selected', selected)
      this.$emit('quiz-type', this.selectedQuiz)
    },
    filterWordsBySelection() {
      const selected = this.getSelectedWords()
      this.countWords = selected.length
      this.$emit('words-selected', selected)
      this.$emit('quiz-type', this.selectedQuiz)
    },
    getSelectedWords() {
      const selected = []
      const seen = new Set()

      if (this.selectedQuiz === 'verbs') {
        const units = this.verbs.length ? this.verbs : (this.wordFilter !== 'all' ? Object.keys(allIrregularVerbs) : [])
        units.forEach(unitCode => {
          if (allIrregularVerbs?.[unitCode]) {
            allIrregularVerbs[unitCode].forEach(word => {
              const key = word.infinitive
              if (!seen.has(key)) {
                seen.add(key)
                selected.push(word)
              }
            })
          }
        })
      } else {
        const units = this.units.length ? this.units : (this.wordFilter !== 'all' && !this.levels.length
          ? Object.entries(allWords).flatMap(([level, words]) => Object.keys(words).map(unit => `${level}/${unit}`))
          : [])
        units.forEach(unitCode => {
          const [level, unit] = unitCode.split('/')
          if (allWords[level] && allWords[level][unit]) {
            allWords[level][unit].forEach(word => {
              const key = word.en + word.part_of_speech
              if (!seen.has(key)) {
                seen.add(key)
                selected.push(word)
              }
            })
          }
        })
      }

      return selected
    }
  },
  watch: {
    filterOptions(options) {
      if (!options.some(option => option.value === this.wordFilter)) {
        this.wordFilter = 'all'
      }
    },
    units: {
      handler(newUnits) {
        if (!newUnits.length && !this.verbs.length && !this.levels.length) {
          this.loadAllWords()
        } else {
          this.filterWordsBySelection()
        }
      },
      immediate: true
    },
    verbs: {
      handler(newVerbs) {
        if (!newVerbs.length && !this.units.length && !this.levels.length) {
          this.loadAllWords()
        } else {
          this.filterWordsBySelection()
        }
      },
      immediate: true
    },
    levels: {
      handler() {
        this.units = this.units.filter(unitCode => {
          const [level] = unitCode.split('/')
          return this.levels.includes(level)
        })

        if (this.selectedQuiz === 'random' && this.levels.length > 0) {
          const allUnits = []
          this.levels.forEach(level => {
            const unitMap = allWords[level]
            if (unitMap) {
              Object.keys(unitMap).forEach(unitKey => {
                allUnits.push(`${level}/${unitKey}`)
              })
            }
          })
          this.units = allUnits
        }

        if (!this.units.length && !this.verbs.length) {
          this.loadAllWords()
        } else {
          this.filterWordsBySelection()
        }
      },
      immediate: true
    },
    selectedQuiz: {
      handler(newQuiz) {
        // Сбрасываем фильтры при смене режима
        this.units = []
        this.levels = []
        this.verbs = []

        if (newQuiz === 'verbs') {
          this.selectedMod = 'manual'
        }

        // Загружаем полный набор слов для нового режима
        this.loadAllWords()
      },
      immediate: true
    },
  }
}
</script>
