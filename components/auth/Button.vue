<template>
  <div>
    <button 
      :class="{
        'ghost': overlayButton, 
        'submit-button': !overlayButton
      }" 
      @click="$emit('click')">
      {{ label  }}
    </button>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    overlayButton: {
      type: Boolean,
      default: false
    },
    label:{
      type:String,
      required:true
    }
  })
</script>

<style scoped>
button {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

button.submit-button {
  background-color: #FF4B2B;
  border-color: #FF4B2B;
  color: #FFFFFF;
}
</style>
