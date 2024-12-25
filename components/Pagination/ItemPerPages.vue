  <template>
    <div class="flex justify-center items-center">
      <span>item per pages</span>
      <form class="ms-2">
        <select
          id="item_per_page"
          class="block text-xs text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 p-0 m-0 w-13 h-6"
          @change="handleItemsPerPageChange"
        >
          <option
            v-for="option in options"
            :key="option"
            :value="option"
            :selected="option === currentItemsPerPage"
          >
            {{ option }}
          </option>
        </select>
      </form>
    </div>
  </template>

  <script setup lang="ts">
  import { computed } from "vue";

  const emit = defineEmits(["items-per-page-change"]);
  const props = defineProps({
    maxSelect: {
      type: Number,
      required: true,
    },
    steps: {
      type: Number,
      required: true,
    },
    currentItemsPerPage:{
      type : Number,
      default : 10
    }
  });

  const options = computed(() => {
    const result = [];
    for (let i = props.steps; i <= props.maxSelect; i += props.steps) {
      result.push(i);
    } 
    return result;
  });

  const handleItemsPerPageChange = (event: Event) => {
    const newItemsPerPage = Number((event.target as HTMLSelectElement).value);
    emit("items-per-page-change", newItemsPerPage);
  };
  </script>
