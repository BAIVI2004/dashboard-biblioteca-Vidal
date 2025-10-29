<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBibliotecaStore } from '@/stores/Biblioteca'
import { useRouter } from 'vue-router'
import LibroCard from '@/components/LibroCard.vue'

const store = useBibliotecaStore()
const router = useRouter()

// Ordenamiento
type OrdenTipo = 'titulo' | 'autor' | 'paginas'
const ordenSeleccionado = ref<OrdenTipo>('titulo')

const librosOrdenados = computed(() => {
  switch (ordenSeleccionado.value) {
    case 'titulo':
      return store.librosOrdenadosPorTitulo
    case 'autor':
      return store.librosOrdenadosPorAutor
    case 'paginas':
      return store.librosOrdenadosPorPaginas
    default:
      return store.data
  }
})

function irANuevoLibro() {
  router.push('/libros/nuevo')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-900 text-zinc-200">
    <!-- Header -->
    <header class="border-b border-zinc-700/60 bg-zinc-950 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-4xl">📚</span>
          <h1 class="text-2xl font-bold">Biblioteca - Listado de Libros</h1>
        </div>
        <nav class="flex gap-3">
          <button
            @click="router.push('/')"
            class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md font-medium border border-zinc-700 transition">
            Dashboard
          </button>
          <button
            @click="router.push('/libros')"
            class="px-4 py-2 bg-zinc-800 text-white rounded-md font-medium border border-zinc-700">
            Libros
          </button>
          <button
            @click="irANuevoLibro"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition">
            + Nuevo
          </button>
        </nav>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Controles de ordenamiento -->
      <div class="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-lg font-semibold text-white">
            Lista de Libros
            <span class="text-sm text-zinc-400 ml-2">(Total: {{ store.totalLibros }})</span>
          </h2>
          
          <div class="flex flex-wrap gap-2">
            <button
              @click="ordenSeleccionado = 'titulo'"
              :class="[
                'px-4 py-2 text-sm rounded-md border font-medium transition-colors duration-200',
                ordenSeleccionado === 'titulo'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-zinc-700 border-zinc-600 text-zinc-300 hover:bg-zinc-600'
              ]">
              📖 Por Título
            </button>
            <button
              @click="ordenSeleccionado = 'autor'"
              :class="[
                'px-4 py-2 text-sm rounded-md border font-medium transition-colors duration-200',
                ordenSeleccionado === 'autor'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-zinc-700 border-zinc-600 text-zinc-300 hover:bg-zinc-600'
              ]">
              ✍️ Por Autor
            </button>
            <button
              @click="ordenSeleccionado = 'paginas'"
              :class="[
                'px-4 py-2 text-sm rounded-md border font-medium transition-colors duration-200',
                ordenSeleccionado === 'paginas'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-zinc-700 border-zinc-600 text-zinc-300 hover:bg-zinc-600'
              ]">
              📄 Por Páginas
            </button>
          </div>
        </div>
      </div>

      <!-- Lista de libros -->
      <div v-if="librosOrdenados.length === 0" class="bg-zinc-800 border border-zinc-700 rounded-lg p-12 text-center">
        <p class="text-zinc-400 text-lg italic">No hay libros registrados aún.</p>
        <button
          @click="irANuevoLibro"
          class="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition">
          Agregar Primer Libro
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LibroCard
          v-for="libro in librosOrdenados"
          :key="libro.id"
          :libro="libro"
        />
      </div>
    </main>
  </div>
</template>

<style scoped></style>