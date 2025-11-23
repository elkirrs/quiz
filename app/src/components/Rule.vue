<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>Table of all tenses of the English language</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="dialogModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row dense>
          <v-col
              v-for="(item, i) in dataRules"
              :key="i"
              cols="12"
              md="4"
              class="pa-1"
          >

            <v-card
                class="mx-auto"
                color="elevated"
                :title="item.name"
            >
              <div class="d-flex flex-row">
                <v-tabs
                    v-model="tab[i]"
                    color="teal"
                    direction="vertical"
                    density="compact"
                >
                  <v-tab prepend-icon="mdi-hexagon-outline" value="option-1"></v-tab>
                  <v-tab prepend-icon="mdi-hexagon-slice-2" value="option-2"></v-tab>
                  <v-tab prepend-icon="mdi-hexagon-slice-4" value="option-3"></v-tab>
                  <v-tab prepend-icon="mdi-hexagon-slice-6" value="option-4"></v-tab>
                </v-tabs>

                <v-tabs-window v-model="tab[i]">
                  <v-tabs-window-item value="option-1">
                    <v-card flat>
                      <v-card-text>
                        <p class="font-weight-bold pb-3">Пример:</p>
                        <div v-for="ruleItem in item.rule">
                          <p v-html="ruleItem.en" class="text-wrap break-word font-weight-bold"></p>
                          <p class="text-wrap break-word">{{ ruleItem.ru }}</p>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-tabs-window-item>

                  <v-tabs-window-item value="option-2">
                    <v-card flat>
                      <v-card-text>
                        <p class="font-weight-bold pb-3">Схема:</p>
                        <div>
                          <v-table density="compact">
                            <tbody>
                            <tr v-for="schema in item.schema">
                              <template v-for="(cell, cellIndex) in schema" :key="cellIndex">
                                <th class="text-center align-middle">
                                  <span v-html="renderCell(cell)"></span>
                                </th>
                                <th v-if="cellIndex < schema.length - 1"
                                    class="plus-cell"
                                >+
                                </th>
                              </template>
                            </tr>
                            </tbody>
                          </v-table>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-tabs-window-item>

                  <v-tabs-window-item value="option-3">
                    <v-card flat>
                      <v-card-text>
                        <p class="font-weight-bold pb-3">Правила:</p>
                        <p v-for="(use) in item.use">
                          {{ use.text }}
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-tabs-window-item>

                  <v-tabs-window-item value="option-4">
                    <v-card flat>
                      <v-card-text>
                        <p class="font-weight-bold pb-3">Маркеры:</p>
                        <p>
                          {{ item.markers }}
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-tabs-window-item>

                </v-tabs-window>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {rules} from '@/data/rule.js'

export default {
  emits: ['update:dialog'],
  props: {
    dialog: Boolean
  },
  data() {
    return {
      dataRules: rules,
      usageVisible: {},
      tab: {}
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
  },
  methods: {
    handleHotkey(event) {
      if (event.ctrlKey && event.key === 'f') {
        this.dialogModel = !this.dialogModel
      }
    },
    renderCell(cell) {
      if (cell === '@') {
        return `<i class="text-h5 mdi mdi-emoticon-happy-outline"></i>`;
      } else if (Array.isArray(cell)) {
        return cell.join('<br>');
      } else if (cell === '*') {
        return '...'
      } else {
        return cell;
      }
    }
  },
  mounted() {
    this.dataRules.forEach((_, i) => {
      this.usageVisible[i] = false;
      this.tab[i] = 'option-1';
    });
    window.addEventListener('keydown', this.handleHotkey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleHotkey);
  },
};
</script>

<style>
.list-item-tight {
  min-height: 28px !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}

.v-tab.v-tab.v-btn {
  min-width: 60px !important;
  justify-content: right;
}

.sub {
  font-size: 0.75em;
  vertical-align: sub;
}

.text-size {
  font-size: 1.2em !important;
}

th.narrow {
  width: 1%;
  white-space: nowrap;
}

th.plus-cell {
  width: 2px;
  text-align: center;
  color: #888;
}

.v-table > .v-table__wrapper > table > tbody > tr > td, .v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > td, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > td, .v-table > .v-table__wrapper > table > tfoot > tr > th {
  padding: 0 2px !important;
  justify-content: center;
}
</style>
