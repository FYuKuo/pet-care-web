<template>
    <footer class="text-center p-4 w-full">
        © {{ year }} DearFur All rights reserved.
    </footer>
</template>

<script setup>
var year = new Date().getFullYear();
</script>

<style scoped>
footer {
    background-color: #233D4D;
    margin-top: auto;
    color: white;
}
</style>