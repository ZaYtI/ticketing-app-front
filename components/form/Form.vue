<template>
  <FormKit
    type="form"
    :id="id"
    :submit-label="submitLabel"
    @submit="onSubmit"
  >
  <slot/>
    <FormKit
      v-for="field in props.fields"
      :type="field.type"
      :name="field.name"
      :label="field.label"
      :placeholder="field.placeholder"
      :validation="field.validation"
    />
  </FormKit>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { FormKitProps } from '~/utils/interface/FormKitProps';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  submitLabel: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as () => FormKitProps[],
    required: true,
    default: () => [],
  },
  submitFunction: {
    type: Function,
    required: true,
  },
});

// Émission de l'événement de soumission
const emit = defineEmits(['submit']);

function onSubmit(payload: any) {
  emit('submit', payload);
  props.submitFunction(payload);
}
</script>

<style scoped>
form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.formkit-inner{
  background: red;
}
</style>
