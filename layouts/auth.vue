<template>
    <div class="default-layout">
        <main class="default-layout-content">
            <slot />
        </main>
    </div>
</template>

<style>

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.default-layout{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.default-layout-content {
    flex-grow: 1;
}
</style>
