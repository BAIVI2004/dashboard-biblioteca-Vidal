<script setup lang="ts">
import type { Libro } from '@/models/libro'
import { useBibliotecaStore } from '@/stores/Biblioteca'

defineProps<{
  libro: Libro
}>()

const store = useBibliotecaStore()

function toggleDisponibilidad(id: number) {
  store.cambiarDisponibilidad(id)
}
</script>

<template>
  <div
    :class="[
      'bg-zinc-800 border-2 rounded-lg p-5 transition-all duration-200',
      libro.disponible
        ? 'border-green-600/50 hover:border-green-600'
        : 'border-red-600/50 hover:border-red-600 opacity-75'
    ]">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <h3 class="text-lg font-bold text-white mb-2">{{ libro.titulo }}</h3>
        <p class="text-sm text-zinc-300 mb-1">
          <span class="text-zinc-400">Autor:</span> {{ libro.autor }}
        </p>
        <p class="text-sm text-zinc-300">
          <span class="text-zinc-400">Páginas:</span> {{ libro.paginas }}
        </p>
      </div>

      <div class="flex flex-col items-end gap-3">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold',
            libro.disponible
              ? 'bg-green-600/20 text-green-400 border border-green-600/50'
              : 'bg-red-600/20 text-red-400 border border-red-600/50'
          ]">
          {{ libro.disponible ? 'Disponible' : 'Prestado' }}
        </span>

        <button
          @click="toggleDisponibilidad(libro.id)"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
            libro.disponible
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-zinc-700 hover:bg-zinc-600 text-white'
          ]">
          {{ libro.disponible ? 'Prestar' : 'Devolver' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>