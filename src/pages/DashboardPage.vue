
<script setup lang="ts">
import { computed } from 'vue'
import { useBibliotecaStore } from '@/stores/Biblioteca'
import { useRouter } from 'vue-router'

const store = useBibliotecaStore()
const router = useRouter()

const totalLibros = computed(() => store.totalLibros)
const librosDisponibles = computed(() => store.librosDisponibles)
const librosPrestados = computed(() => store.librosPrestados)

function irALibros() {
  router.push('/libros')
}

function irANuevoLibro() {
  router.push('/libros/nuevo')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-900 text-zinc-200">
    <!-- Header con fondo oscuro -->
    <header class="border-b border-zinc-700/60 bg-zinc-950 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center gap-3">
          <span class="text-4xl">📚</span>
          <h1 class="text-2xl font-bold text-white">Dashboard Biblioteca</h1>
        </div>
        <nav class="flex gap-3">
          <button
            @click="router.push('/')"
            class="px-4 py-2 bg-zinc-800 text-white rounded-md font-medium border border-zinc-700">
            Dashboard
          </button>
          <button
            @click="irALibros"
            class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md font-medium border border-zinc-700 transition">
            Libros
          </button>
        </nav>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Título de bienvenida -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Bienvenido a la Biblioteca</h2>
        <p class="text-zinc-400">Sistema de gestión de libros</p>
      </div>

      <!-- Grid de estadísticas - 3 tarjetas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Card: Total de Libros -->
        <div class="bg-zinc-800 border border-zinc-700 rounded-lg p-6 hover:border-zinc-600 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-zinc-400 mb-1 font-medium">Total de Libros</p>
              <p class="text-4xl font-bold text-white">{{ totalLibros }}</p>
            </div>
            <div class="text-5xl opacity-80">📚</div>
          </div>
        </div>

        <!-- Card: Disponibles -->
        <div class="bg-zinc-800 border border-zinc-700 rounded-lg p-6 hover:border-green-700 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-zinc-400 mb-1 font-medium">Disponibles</p>
              <p class="text-4xl font-bold text-green-400">{{ librosDisponibles }}</p>
            </div>
            <div class="text-5xl opacity-80">✅</div>
          </div>
        </div>

        <!-- Card: Prestados -->
        <div class="bg-zinc-800 border border-zinc-700 rounded-lg p-6 hover:border-red-700 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-zinc-400 mb-1 font-medium">Prestados</p>
              <p class="text-4xl font-bold text-red-400">{{ librosPrestados }}</p>
            </div>
            <div class="text-5xl opacity-80">📖</div>
          </div>
        </div>
      </div>

      <!-- Sección de acciones rápidas -->
      <div class="bg-zinc-800 border border-zinc-700 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-semibold text-white mb-4">Acciones Rápidas</h3>
        <div class="flex gap-4 flex-wrap">
          <button
            @click="irALibros"
            class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg">
            Ver Todos los Libros
          </button>
          <button
            @click="irANuevoLibro"
            class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg">
            + Agregar Nuevo Libro
          </button>
        </div>
      </div>

      
    </main>
  </div>
</template>

<style scoped></style>