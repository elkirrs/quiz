<template>
  <div class="reference-controls" role="group" :aria-label="label">
    <v-tooltip v-for="option in options" :key="option.value" :text="$t(option.label)" location="bottom">
      <template #activator="{ props: tooltipProps }">
        <v-btn
          v-bind="tooltipProps"
          :icon="option.icon"
          :variant="modelValue === option.value ? 'tonal' : 'text'"
          color="teal"
          :aria-label="$t(option.label)"
          :aria-pressed="modelValue === option.value"
          size="small"
          @click="$emit('update:modelValue', option.value)"
        />
      </template>
    </v-tooltip>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: true },
  options: { type: Array, required: true },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.reference-controls { display: flex; gap: 4px; padding: 0 12px; }
.reference-controls .v-btn { flex: 1; min-width: 0; height: 40px; }
.reference-controls :deep(.v-theme--dark.v-btn) { color: #4db6ac !important; }
.reference-controls :deep(.v-theme--dark.v-btn span) { color: inherit; }
</style>
