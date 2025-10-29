<script setup lang="ts">
import { ref } from 'vue'
import { useBibliotecaStore } from '@/stores/Biblioteca'
import { useRouter } from 'vue-router'

const store = useBibliotecaStore()
const router = useRouter()

// Formulario
const titulo = ref('')
const autor = ref('')
const paginas = ref<number | ''>('')

function agregarLibro() {
  if (!titulo.value || !autor.value || !paginas.value) {
    alert('⚠️ Por favor completa todos los campos')
    return
  }

  if (Number(paginas.value) <= 0) {
    alert('⚠️ El número de páginas debe ser mayor a 0')
    return
  }

  store.agregarLibro({
    titulo: titulo.value,
    autor: autor.value,
    paginas: Number(paginas.value),
    disponible: true
  })

  alert('✅ Libro agregado correctamente')
  
  // Redirigir a la lista de libros
  router.push('/libros')
}

function cancelar() {
  router.push('/libros')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-900 text-zinc-200">
    <!-- Header -->
    <header class="border-b border-zinc-700/60 bg-zinc-950 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-4xl">📚</span>
          <h1 class="text-2xl font-bold">Agregar Nuevo Libro</h1>
        </div>
        <nav class="flex gap-3">
          <button
            @click="router.push('/')"
            class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md font-medium border border-zinc-700 transition">
            Dashboard
          </button>
          <button
            @click="router.push('/libros')"
            class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md font-medium border border-zinc-700 transition">
            Libros
          </button>
          <button
            @click="cancelar"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition">
            Cancelar
          </button>
        </nav>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-2xl mx-auto px-6 py-8">
      <div class="bg-zinc-800 border border-zinc-700 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-white mb-2 italic">Ingresar nuevo libro</h2>
        <p class="text-zinc-400 mb-6">Completa la información del libro que deseas agregar</p>
        
        <form @submit.prevent="agregarLibro" class="space-y-6">
          <!-- Título -->
          <div>
            <label for="titulo" class="block text-sm font-medium text-zinc-300 mb-2 italic">
              Título
            </label>
            <input
              id="titulo"
              v-model="titulo"
              type="text"
              required
              class="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-zinc-400 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ej: Cien años de soledad"
            />
          </div>

          <!-- Autor -->
          <div>
            <label for="autor" class="block text-sm font-medium text-zinc-300 mb-2 italic">
              Autor
            </label>
            <input
              id="autor"
              v-model="autor"
              type="text"
              required
              class="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-zinc-400 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ej: Gabriel García Márquez"
            />
          </div>

          <!-- Páginas -->
          <div>
            <label for="paginas" class="block text-sm font-medium text-zinc-300 mb-2 italic">
              Número de páginas
            </label>
            <input
              id="paginas"
              v-model.number="paginas"
              type="number"
              required
              min="1"
              class="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-zinc-400 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ej: 471"
            />
          </div>

          <!-- Botones -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md 
                     transition-colors duration-200 flex items-center justify-center gap-2">
              <span>✓</span>
              <span>Agregar Libro</span>
            </button>
            <button
              type="button"
              @click="cancelar"
              class="flex-1 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-md 
                     transition-colors duration-200 flex items-center justify-center gap-2">
              <span>✕</span>
              <span>Cancelar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Información adicional -->
      <div class="mt-6 bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
        <p class="text-sm text-zinc-400">
          <strong class="text-zinc-300">Nota:</strong> El libro se agregará como "Disponible" por defecto. 
          Luego podrás cambiar su estado desde la lista de libros.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped></style>