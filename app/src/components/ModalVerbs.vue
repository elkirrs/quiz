<template>
  <v-dialog v-model="dialogModel" fullscreen>
    <v-card>
      <v-toolbar color="teal">
        <v-toolbar-title>{{ $t('Table of modal verbs') }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon :aria-label="$t('Close')" @click="dialogModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="modal-reference">
        <v-text-field
          v-model="search"
          :label="$t('Search modal verbs')"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          color="teal"
          density="compact"
          hide-details
          @keydown.stop
        />
        <p v-if="locale === 'en'" class="text-caption text-medium-emphasis mt-2">
          {{ $t('Modal verb explanations and translations are currently in Russian.') }}
        </p>
        <p v-if="!filtered.length" class="text-medium-emphasis mt-6">{{ $t('No modal verbs found') }}</p>
        <v-expansion-panels v-if="mobile && filtered.length" class="mt-4" variant="accordion">
          <v-expansion-panel v-for="item in filtered" :key="item.name" :title="displayName(item.name)" rounded="lg" elevation="2">
            <v-expansion-panel-text>
              <ModalVerbDetails :item="item" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row v-else dense class="mt-4">
          <v-col v-for="item in filtered" :key="item.name" cols="12" md="6">
            <v-card class="modal-card" rounded="lg" elevation="2">
              <v-card-title class="text-h6 font-weight-bold">{{ displayName(item.name) }}</v-card-title>
              <ModalVerbDetails :item="item" />
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { locale } from '@/i18n'
import { rules } from '@/data/modalVerb.js'
import { filterModalVerbs } from '@/data/modalVerbReference.js'
import ModalVerbDetails from './ModalVerbDetails.vue'

const props = defineProps({ dialog: Boolean })
const emit = defineEmits(['update:dialog'])
const dialogModel = computed({
  get: () => props.dialog,
  set: value => emit('update:dialog', value),
})
const { smAndDown: mobile } = useDisplay()
const search = ref('')
const filtered = computed(() => filterModalVerbs(rules, search.value))
function displayName(name) {
  return locale.value === 'en' ? name.replaceAll(' и ', ' and ') : name
}
function handleHotkey(event) {
  const target = event.target
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f' &&
      !target.isContentEditable && !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
    event.preventDefault()
    dialogModel.value = !dialogModel.value
  }
}
onMounted(() => window.addEventListener('keydown', handleHotkey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleHotkey))
</script>

<style scoped>
.modal-reference { max-width: 1500px; width: 100%; margin: 0 auto; }
.modal-card { height: 100%; }
.modal-card .v-card-title { white-space: normal; }
.modal-reference :deep(.v-expansion-panel-text__wrapper) { padding: 0; }
</style>
