<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface Section {
    name: string,
    route: string,
    isActive: boolean
}

const sections: Ref<Section[]> = ref<Section[]>([
    { name: 'Dashboard', route: '/', isActive: false },
    { name: 'Libros', route: '/libros', isActive: false }
]);
</script>

<template>
    <div class="w-full h-[100px] overflow-hidden relative rounded-md">
        <div class="w-full h-full  from-purple-600 to-blue-600 flex items-center justify-center">
            <span class="text-6xl">📚</span>
        </div>
    </div>

    <!-- Navegación -->
    <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink 
            v-for="(section, index) in sections" 
            :key="index" 
            :to="section.route" 
            class="flex items-center px-4 py-2.5 rounded-lg border border-transparent text-sm font-medium transition-colors duration-200
               hover:bg-zinc-800 hover:border-zinc-700 hover:text-zinc-100"
            active-class="bg-zinc-800 border-zinc-700 text-white">
            <span class="ml-1">{{ section.name }}</span>
        </RouterLink>
    </nav>

    <!-- Pie de barra lateral -->
    <div class="border-t border-zinc-700/60 px-4 py-3 text-xs text-zinc-500">
        © 2025 Biblioteca ITS
    </div>
</template>

<style scoped></style>