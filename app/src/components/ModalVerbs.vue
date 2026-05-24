<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>

      <!-- ================================= -->
      <!-- TOOLBAR -->
      <!-- ================================= -->

      <v-toolbar color="teal" dark>
        <v-toolbar-title>
          Table of modal verbs
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          icon
          @click="dialogModel = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- ================================= -->
      <!-- CONTENT -->
      <!-- ================================= -->

      <v-card-text>
        <v-row dense>

          <!-- ================================= -->
          <!-- CARD -->
          <!-- ================================= -->

          <v-col
            v-for="(item, i) in dataRules"
            :key="i"
            cols="12"
            md="6"
            class="pa-1"
          >

            <v-card
                class="mx-auto"
                color="elevated"
                :title="item.name">
              <!-- BODY -->

              <div class="d-flex flex-row">

                <!-- ================================= -->
                <!-- LEFT VERTICAL MENU -->
                <!-- ================================= -->

                <v-tabs
                  v-model="mainTabs[i]"
                  direction="vertical"
                  color="teal"
                  density="compact"
                >

                  <!-- TIMES -->

                  <v-tab
                    value="times"
                    prepend-icon="mdi-progress-clock"
                  >
                  </v-tab>

                  <!-- USES -->

                  <v-tab
                    value="uses"
                    prepend-icon="mdi-book-open-page-variant"
                  >
                  </v-tab>

                  <!-- RULES -->

                  <v-tab
                    value="rules"
                    prepend-icon="mdi-text-box-outline"
                  >
                  </v-tab>

                  <!-- FEATURES -->

                  <v-tab
                    value="features"
                    prepend-icon="mdi-star-outline"
                  >
                  </v-tab>

                </v-tabs>

                <!-- ================================= -->
                <!-- RIGHT CONTENT -->
                <!-- ================================= -->

                <div>

                  <v-tabs-window v-model="mainTabs[i]">

                    <!-- ================================= -->
                    <!-- TIMES -->
                    <!-- ================================= -->

                    <v-tabs-window-item value="times">

                      <v-card flat>

                        <v-card-text>

                          <!-- HORIZONTAL TABS -->

                          <v-tabs
                            v-model="timeTabs[i]"
                            color="teal"
                            density="comfortable"
                            fixed-tabs
                          >

                            <v-tab
                              v-for="(times, j) in item.times"
                              :key="'time-tab-' + i + '-' + j"
                              :value="'time-' + j"
                            >
                              {{ times.name }}
                            </v-tab>

                          </v-tabs>

                          <v-divider />

                          <!-- WINDOW -->

                          <v-tabs-window v-model="timeTabs[i]">

                            <v-tabs-window-item
                              v-for="(times, j) in item.times"
                              :key="'time-window-' + i + '-' + j"
                              :value="'time-' + j"
                            >

                              <div class="pa-2">

                                <p class="font-weight-bold pb-3">
                                  {{ times.name }}
                                </p>

                                <div
                                  v-for="(example, exIndex) in times.example"
                                  :key="'time-example-' + exIndex"
                                  class="mb-3"
                                >

                                  <p v-html="example.first" class="text-wrap break-word font-weight-bold"></p>
                                  <p class="text-wrap break-word">{{ example.second }}</p>


                                </div>

                              </div>

                            </v-tabs-window-item>

                          </v-tabs-window>

                        </v-card-text>

                      </v-card>

                    </v-tabs-window-item>

                    <!-- ================================= -->
                    <!-- USES -->
                    <!-- ================================= -->

                    <v-tabs-window-item value="uses">

                      <v-card flat>

                        <v-card-text>

                          <v-tabs
                            v-model="useTabs[i]"
                            color="teal"
                            density="compact"
                          >

                            <v-tab
                              v-for="(uses, j) in item.uses"
                              :key="'use-tab-' + i + '-' + j"
                              :value="'use-' + j"

                            >
                              {{ uses.name }}
                            </v-tab>

                          </v-tabs>

                          <v-divider />

                          <v-tabs-window v-model="useTabs[i]">

                            <v-tabs-window-item
                              v-for="(uses, j) in item.uses"
                              :key="'use-window-' + i + '-' + j"
                              :value="'use-' + j"
                            >

                              <div class="pa-2">

                                <p class="font-weight-bold pb-3">
                                  {{ uses.name }}
                                </p>

                                <div
                                  v-for="(example, exIndex) in uses.example"
                                  :key="'use-example-' + exIndex"
                                  class="mb-4"
                                >

                                  <p v-html="example.first" class="text-wrap break-word font-weight-bold"></p>
                                  <p class="text-wrap break-word">{{ example.second }}</p>

                                </div>

                              </div>

                            </v-tabs-window-item>

                          </v-tabs-window>

                        </v-card-text>

                      </v-card>

                    </v-tabs-window-item>

                    <!-- ================================= -->
                    <!-- RULES -->
                    <!-- ================================= -->

                    <v-tabs-window-item value="rules">

                      <v-card flat>

                        <v-card-text>
                          <div v-for="(rule, j) in item.rules"
                            :key="'rule-window-' + i + '-' + j"
                            :value="'rule-' + j">

                            <p class="font-weight-bold pb-3">{{ rule.name }}</p>
                            <p v-html="rule.text" class="text-wrap break-word"></p>

                          </div>

                        </v-card-text>

                      </v-card>

                    </v-tabs-window-item>

                    <!-- ================================= -->
                    <!-- FEATURES -->
                    <!-- ================================= -->

                    <v-tabs-window-item value="features">

                      <v-card>

                        <v-card-text>

                          <v-tabs
                            v-model="featureTabs[i]"
                            color="teal"
                            density="compact"
                          >

                            <v-tab
                              v-for="(feature, j) in item.features"
                              :key="'feature-tab-' + i + '-' + j"
                              :value="'feature-' + j"
                            >
                              {{ j + 1 }}
                            </v-tab>

                          </v-tabs>

                          <v-divider />

                          <v-tabs-window v-model="featureTabs[i]">

                            <v-tabs-window-item
                              v-for="(feature, j) in item.features"
                              :key="'feature-window-' + i + '-' + j"
                              :value="'feature-' + j"
                            >

                              <div class="pa-2">

                                <p class="font-weight-bold pb-3">
                                  {{ feature.name }}
                                </p>

                                <div
                                  v-for="(example, exIndex) in feature.example"
                                  :key="'feature-example-' + exIndex"
                                  class="mb-4"
                                >

                                  <p v-html="example.first" class="text-wrap break-word font-weight-bold"></p>

                                  <p class="text-medium-emphasis">
                                    {{ example.second }}
                                  </p>

                                </div>

                              </div>

                            </v-tabs-window-item>

                          </v-tabs-window>

                        </v-card-text>

                      </v-card>

                    </v-tabs-window-item>

                  </v-tabs-window>

                </div>

              </div>

            </v-card>

          </v-col>

        </v-row>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { rules } from '@/data/modalVerb.js'

export default {
  emits: ['update:dialog'],

  props: {
    dialog: Boolean
  },

  data() {
    return {
      dataRules: rules,

      // LEFT MENU
      mainTabs: {},

      // INNER TABS
      timeTabs: {},
      useTabs: {},
      ruleTabs: {},
      featureTabs: {}
    }
  },

  computed: {
    dialogModel: {
      get() {
        return this.dialog
      },

      set(val) {
        this.$emit('update:dialog', val)
      }
    }
  },

  methods: {
    handleHotkey(event) {
      if (event.ctrlKey && event.key === 'f') {
        event.preventDefault()

        this.dialogModel = !this.dialogModel
      }
    }
  },

  mounted() {

    this.dataRules.forEach((item, i) => {

      // MAIN TAB

      this.mainTabs[i] = 'times'

      // TIMES

      this.timeTabs[i] =
        item.times?.length
          ? 'time-0'
          : null

      // USES

      this.useTabs[i] =
        item.use?.length
          ? 'use-0'
          : null

      // RULES

      this.ruleTabs[i] =
        item.rules?.length
          ? 'rule-0'
          : null

      // FEATURES

      this.featureTabs[i] =
        item.features?.length
          ? 'feature-0'
          : null
    })

    window.addEventListener(
      'keydown',
      this.handleHotkey
    )
  },

  beforeUnmount() {
    window.removeEventListener(
      'keydown',
      this.handleHotkey
    )
  }
}
</script>

<style scoped>

</style>
