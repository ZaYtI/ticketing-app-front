<template>
  <div class="default-layout">
    <NavNavbar />
    <main class="default-layout-content p-4 sm:ml-64">
      <NavBreadCrumbs class="p-2 mt-12" />
      <div class="p-4">
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
}
</style>
