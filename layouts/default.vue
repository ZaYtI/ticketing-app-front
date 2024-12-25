<template>
  <div class="default-layout">
    <NavNavbar />
    <main class="default-layout-content p-4 sm:ml-64">
      <div class="p-4 mt-12">
        <slot />
      </div>
    </main>
    <div class="toast-wrapper">
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.default-layout-content {
  flex-grow: 1;
}

.toast-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 350px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
}
</style>
