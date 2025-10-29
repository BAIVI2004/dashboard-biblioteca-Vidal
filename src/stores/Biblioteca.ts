

import type { Libro } from '@/models/libro'
import { defineStore } from 'pinia'

interface BibliotecaState {
  isLoading: boolean
  data: Libro[]
  error: string | null
}

export const useBibliotecaStore = defineStore('biblioteca', {
  state: (): BibliotecaState => ({
    isLoading: false,
    data: [
      {
        id: 1,
        titulo: 'Cien años de soledad',
        autor: 'Gabriel García Márquez',
        paginas: 471,
        disponible: true
      },
      {
        id: 2,
        titulo: 'El Aleph',
        autor: 'Jorge Luis Borges',
        paginas: 203,
        disponible: false
      },
      {
        id: 3,
        titulo: 'Rayuela',
        autor: 'Julio Cortázar',
        paginas: 736,
        disponible: true
      },
      {
        id: 4,
        titulo: 'Ficciones',
        autor: 'Jorge Luis Borges',
        paginas: 174,
        disponible: true
      },
      {
        id: 5,
        titulo: 'El túnel',
        autor: 'Ernesto Sabato',
        paginas: 158,
        disponible: false
      }
    ],
    error: null
  }),

  actions: {
    // 📚 Action: Agregar un libro
    agregarLibro(libro: Omit<Libro, 'id'>) {
      // Generar nuevo ID (mayor que el actual + 1)
      const nuevoId = this.data.length > 0 
        ? Math.max(...this.data.map(l => l.id)) + 1 
        : 1

      const nuevoLibro: Libro = {
        ...libro,
        id: nuevoId
      }

      this.data.push(nuevoLibro)
      this.error = null
      console.log(`✅ Libro agregado: ${nuevoLibro.titulo}`)
    },

    // 🔄 Action: Cambiar el estado de disponibilidad (prestar o devolver)
    cambiarDisponibilidad(id: number) {
      const libro = this.data.find((l) => l.id === id)
      
      if (!libro) {
        this.error = `No se encontró el libro con id ${id}`
        console.error(this.error)
        return
      }

      libro.disponible = !libro.disponible
      this.error = null
      
      const accion = libro.disponible ? 'devuelto' : 'prestado'
      console.log(`📖 Libro ${accion}: ${libro.titulo}`)
    }
  },

  getters: {
    // 🔹 Getter: Ordenar libros alfabéticamente por título
    librosOrdenadosPorTitulo: (state): Libro[] => {
      return [...state.data].sort((a, b) => 
        a.titulo.localeCompare(b.titulo)
      )
    },

    // 🔹 Getter: Ordenar libros alfabéticamente por autor
    librosOrdenadosPorAutor: (state): Libro[] => {
      return [...state.data].sort((a, b) => 
        a.autor.localeCompare(b.autor)
      )
    },

    // 🔹 Getter: Ordenar libros por cantidad de páginas (de menor a mayor)
    librosOrdenadosPorPaginas: (state): Libro[] => {
      return [...state.data].sort((a, b) => a.paginas - b.paginas)
    },

    // 📊 Getters adicionales para estadísticas
    totalLibros: (state): number => state.data.length,
    
    librosDisponibles: (state): number => {
      return state.data.filter((l) => l.disponible).length
    },
    
    librosPrestados: (state): number => {
      return state.data.filter((l) => !l.disponible).length
    }
  }
})