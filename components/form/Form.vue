<template>
  <FormKit
    type="form"
    :id="id"
    :actions="false"
    @submit="handleSubmit"
  >
    <h1 v-if="props.title" class="text-3xl form-title">{{ props.title }}</h1>
    <div class="flex flex-col gap-4">
      <FormKit
        v-for="field in props.fields"
        :type="field.type"
        :name="field.name"
        :label="field.label"
        :placeholder="field.placeholder"
        :validation="field.validation"
        :validation-messages="field.validationMessages"
        :classes="{
          input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          messages: 'text-red-600 text-xs',
        }"
      />
      <AuthButton type="submit" :label="submitLabel"/>
    </div>
  </FormKit>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { FormKitProps } from "~/utils/interface/FormKitProps";

const emits = defineEmits(['submit'])
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
  title: {
    type: String,
    default: null,
  },
});

function handleSubmit(formData: any) {
  emits('submit', formData)
}
</script>

<style scoped>
form {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #eee;
  border: none;
  border-radius: 1rem;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.formkit-inner {
  background: red;
}

.form-title {
  font-weight: bold;
  margin: 1rem 0 1rem 0;
}
</style>
