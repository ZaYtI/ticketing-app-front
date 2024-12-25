<template>
  <transition
    name="fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="isModalOpen"
      :id="modalId"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeModal"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ props.modalTitle }}
            </h3>
            <button
              @click="closeModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div class="p-4 md:p-5">
            <Form
              :id="props.modalId"
              submit-label="Ajouter"
              :fields="props.fields"
              @submit="handleSubmit"
            >
            </Form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from "vue";
import type { FormKitProps } from "~/utils/interface/FormKitProps";

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  modalTitle: {
    type: String,
    required: true,
  },
  fields:{
    type: Array as () => FormKitProps[][],
    required: true,
    default: () => [],
  },
  modalFunction:{
    type:Function,
    required:true
  }
});

const emit = defineEmits(["close-modal"]);

const closeModal = () => {
  emit("close-modal");
};

const beforeEnter = (el:any) => {
  el.style.opacity = 0;
};

const enter = (el:any, done:any) => {
  el.offsetHeight;
  el.style.transition = "opacity 0.3s";
  el.style.opacity = 1;
  done();
};

const leave = (el:any, done:any) => {
  el.style.transition = "opacity 0.3s";
  el.style.opacity = 0;
  done();
};

const handleSubmit = async (formData: any) => {
  try {
    const result = await props.modalFunction(formData);
    console.log('Ticket créé avec succès', result);
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la création du ticket', error);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
