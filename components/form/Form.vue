<template>
  <FormKit
    type="form"
    :id="id"
    :actions="false"
    @submit="handleSubmit"
  >
    <h1 v-if="props.title" class="text-3xl form-title">{{ props.title }}</h1>
    
    <div class="flex flex-col gap-4">
      <div v-for="(field, index) in props.fields" :key="index" class="field-wrapper">
        <div v-if="Array.isArray(field)" class="flex gap-4">
          <div v-for="(subField, subIndex) in field" :key="subIndex" class="flex-1">
            <div>
              <FormKit
              :type="subField.type"
              :name="subField.name"
              :label="subField.label"
              :placeholder="subField.placeholder"
              :validation="subField.validation"
              :validation-messages="subField.validationMessages"
              :options="subField.options"
              :classes="{
                input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                messages: 'text-red-600 text-xs',
                label: 'text-gray-500 text-sm font-normal text-left'
              }"
            />
            </div>
          </div>
        </div>
      </div>
      <AuthButton type="submit" :label="submitLabel" class="mx-auto"/>
    </div>
  </FormKit>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { FormKitProps } from "~/utils/interface/FormKitProps";

const emits = defineEmits(['submit']);
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
    type: Array as () => FormKitProps[][],
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    default: null,
  },
});

function handleSubmit(formData: any) {
  emits('submit', formData);
}
</script>

<style scoped>
form {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.input {
  background-color: #eee;
  border: none;
  border-radius: 1rem;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.form-title {
  font-weight: bold;
  margin: 1rem 0 1rem 0;
}

.flex {
  display: flex;
}

.gap-4 {
  gap: 1rem;
}

.flex-1 {
  flex: 1;
}

.field-item {
  flex: 1;
  min-width: 200px;
}
</style>
