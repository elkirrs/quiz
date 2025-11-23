<template>

  <div class="pt-8">
    <v-select
      v-model="selectedQuiz"
      :items="itemsQuiz"
      item-title="name"
      item-value="code"
      :density="settings.density"
      label="Choose quiz"
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
      label="Choose Level"
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
            <span>{{ levels.length }} selected</span>
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
      label="Choose Unit"
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
            <span>{{ units.length }} selected  | {{ countWords }}</span>
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
      label="Choose Unit"
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
            <span>{{ verbs.length }} selected | {{ countWords }}</span>
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
      v-if="selectedQuiz === 'words' || selectedQuiz === 'random' "
      v-model="selectedTrans"
      :items="itemsTrans"
      item-title="name"
      item-value="code"
      :density="settings.density"
      label="Choose the directory of the translation of words"
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
      v-model="selectedMod"
      :items="itemsMods"
      item-title="name"
      item-value="code"
      :density="settings.density"
      label="Choose mode"
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
        Count words: {{ sliderValue }}
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

    <v-switch
      class="mt-n5"
      v-model="checkbox"
      label="Until the last mistake"
      :color="settings.color"
    ></v-switch>

    <v-snackbar
      v-model="snackbar.show"
      :timeout="4000"
      :color="snackbar.color"
      location="top right"
      border="start"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <v-btn
      class="mt-n5"
      block
      :size="settings.btnSizeStart"
      :color="settings.color"
      @click="startQuiz"
    >Start
    </v-btn>
  </div>

</template>

<script>
import {allWords, mapLevel} from '@/data/words'
import {allIrregularVerbs, mapUnit as mapVerbUnit} from '@/data/irregular-verbs'
import {app} from '@/data/const.js'

export default {
  name: 'QuizSettings',
  emits: ['words-selected', 'quiz-settings', 'quiz-type'],
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

    sliderValue: 50,
    sliderMaxValue: 100,
    sliderMinValue: 20,
    sliderStepValue: 1,
    sliderShow: false,
    countWords: 0,

    itemsQuiz: app.settings.itemsQuiz,
    itemsTrans: app.settings.itemsTrans,
    itemsMods: app.settings.itemsMods,

    itemsLevel: [],

    levels: [],
    units: [],
    verbs: [],

  }),
  created() {
    const itemLevels = [];

    Object.keys(mapLevel).forEach((idx) => {
      itemLevels.push({
        name: mapLevel[idx],
        code: idx
      })
    })
    this.itemsLevel = itemLevels
  },
  mounted() {
    this.loadAllWords()
  },
  computed: {
    itemsUnit() {
      const units = [];

      this.levels.forEach(level => {
        const unitMap = allWords[level];
        if (unitMap) {
          Object.keys(unitMap).forEach((unitKey) => {
            units.push({
              name: `${unitKey.replace(/_/g, ' ')} (${mapLevel[level]}) | ${allWords[level][unitKey].length}`,
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
          name: `${mapVerbUnit[item[0]]} | ${item[1].length}`,
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

      if (this.selectedQuiz === 'verbs' && (!this.selectedTrans || this.verbs.length === 0)) {
        showError('All quiz settings are required');
        return;
      }

      if (this.selectedQuiz === 'words' && (!this.selectedTrans || !this.selectedMod || this.levels.length === 0 || this.units.length === 0)) {
        showError('All quiz settings are required');
        return;
      }

      if (this.selectedQuiz === 'random' && (!this.selectedTrans || !this.selectedMod || this.levels.length === 0 || this.units.length === 0 || this.sliderValue <= 0)) {
        showError('All quiz settings are required');
        return;
      }

      if (this.selectedMod === 'list' && this.countWords < 10) {
        showError('There must be more than 10 words.');
        return;
      }

      this.$emit("quiz-settings", {
        quiz: this.selectedQuiz,
        trans: this.selectedTrans,
        mode: this.selectedMod,
        levels: this.levels,
        units: this.units,
        verbs: this.verbs,
        lastMistake: this.checkbox,
        amount: this.sliderValue
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
      const selected = []
      const seen = new Set()

      if (this.selectedQuiz === 'verbs') {
        this.verbs.forEach(unitCode => {
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
        this.units.forEach(unitCode => {
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

      this.countWords = selected.length
      this.$emit('words-selected', selected)
      this.$emit('quiz-type', this.selectedQuiz)
    }
  },
  watch: {
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



