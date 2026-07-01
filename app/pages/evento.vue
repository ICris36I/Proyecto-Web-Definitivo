
<script setup lang="ts">
import type { Evento, Inscrito } from '~~/app/types/evento'


const { data: eventos, error: errorEventos } = await useFetch<Evento[]>('/api/evento')//useFetch se ejecuta automaticamente al cargar la pagina
//console.log('eventos:',eventos.value)
//console.log('error:',errorEventos.value)

const email = ref('')
const nombre = ref('')
const apellido = ref('')
const eventoId = ref('')

const errorInscripcion = ref('')
const exitoInscripcion = ref('')
const loadingInscripcion = ref(false)

async function confirmarInscripcion() {
  errorInscripcion.value = ''
  exitoInscripcion.value = ''
  loadingInscripcion.value = true

  try {
    await $fetch('/api/evento/inscripcion', { //fetch sirve para entregar datos de manera mas eficiente dentro de funciones - botón que te lleva pa otro lao
      method: 'POST',
      body: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
        eventoId: eventoId.value,
      },
    })
    exitoInscripcion.value = 'Inscripción confirmada'
    email.value = ''
    nombre.value = ''
    apellido.value = ''
    eventoId.value = ''

  } catch (err: any) {
    if (err?.response?.status === 409) {
      errorInscripcion.value = 'Ya estás inscrito en este evento'
    } else {
      errorInscripcion.value = 'Ocurrió un error, intenta de nuevo'
    }
  } finally {
    loadingInscripcion.value = false
  }
}

const emailBusqueda = ref('')
const misInscripciones = ref<Inscrito[]>([])
const errorBusqueda = ref('')
const loadingBusqueda = ref(false)
const buscado = ref(false)

async function buscarInscripciones() {
  errorBusqueda.value = ''
  misInscripciones.value = []
  loadingBusqueda.value = true
  buscado.value = false

  try {
    const resultado = await $fetch('/api/evento/inscripcion', {
      query: { email: emailBusqueda.value }
    })

    misInscripciones.value = resultado as any []
    buscado.value = true

  } catch (err) {
    errorBusqueda.value = 'Ocurrió un error al buscar'
  } finally {
    loadingBusqueda.value = false
  }
}
</script>

<template>
  <div class="bg-black min-h-screen flex flex-col text-white">

    <!-- NAVBAR -->
    <nav class="border-b border-gray-900 bg-black sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" class="text-xl font-bold">Smart<span class="text-emerald-400">Events</span></a>
        <div class="flex items-center gap-4">
          <a href="/" class="text-sm text-gray-400 hover:text-white transition-colors">Inicio</a>
        </div>
      </div>
    </nav>

    <main class="flex-1 max-w-6xl mx-auto px-6 py-14 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <!-- SECCIÓN 1: Inscribirse (R02) -->
        <div>
          <h2 class="text-2xl font-black mb-1">Inscribirse en un evento</h2>
          <p class="text-gray-400 text-sm mb-8">Completa el formulario para reservar tu lugar.</p>

          <div class="bg-gray-950 border border-gray-900 rounded-2xl p-8">
            <form @submit.prevent="confirmarInscripcion" class="space-y-5">

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="tucorreo@usm.cl"
                  required
                  class="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                <input
                  v-model="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  class="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
                <input
                  v-model="apellido"
                  type="text"
                  placeholder="Tu apellido"
                  required
                  class="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Evento</label>
                <select
                  v-model="eventoId"
                  required
                  class="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="" disabled>Selecciona un evento</option>
                  <!-- v-for recorre los eventos de la base de datos -->
                  <option 
                     v-for="evento in eventos" 
                    :key="evento.id"
                    :value="evento.id"
                  >
                    {{ evento.titulo }}
                  </option>
                </select>
              </div>

              <p v-if="errorInscripcion" class="text-red-400 text-sm">{{ errorInscripcion }}</p>
              <p v-if="exitoInscripcion" class="text-emerald-400 text-sm">{{ exitoInscripcion }}</p>

              <button
                type="submit"
                :disabled="loadingInscripcion"
                class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {{ loadingInscripcion ? 'Procesando...' : 'Confirmar inscripción' }}
              </button>

            </form>
          </div>
        </div>

        <!-- SECCIÓN 2: Mis inscripciones (R03) -->
        <div>
          <h2 class="text-2xl font-black mb-1">Mis inscripciones</h2>
          <p class="text-gray-400 text-sm mb-8">Ingresa tu email para ver los eventos en que estás inscrito.</p>

          <div class="bg-gray-950 border border-gray-900 rounded-2xl p-8">
            <form @submit.prevent="buscarInscripciones" class="space-y-5">

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  v-model="emailBusqueda"
                  type="email"
                  placeholder="tucorreo@usm.cl"
                  required
                  class="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <p v-if="errorBusqueda" class="text-red-400 text-sm">{{ errorBusqueda }}</p>

              <button
                type="submit"
                :disabled="loadingBusqueda"
                class="w-full border border-emerald-600 hover:bg-emerald-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {{ loadingBusqueda ? 'Buscando...' : 'Buscar inscripciones' }}
              </button>

            </form>

            <!-- Resultados cuando hay inscripciones -->
            <div v-if="misInscripciones.length > 0" class="mt-8 space-y-3">
              <div
                v-for="inscripcion in misInscripciones"
                :key="inscripcion.id"
                class="bg-black border border-gray-800 rounded-xl px-5 py-4"
              >
              <img
                    :src="inscripcion.evento.imagen"
                    :alt="inscripcion.evento.titulo"
                    
                    />
                <p class="font-semibold text-sm">{{ inscripcion.evento.titulo }}</p>
                <div class="flex items-center gap-4 mt-1 text-xs text-gray-400">
                  <span>{{ new Date(inscripcion.evento.fecha).toLocaleDateString('es-CL') }}</span>
                  <span>{{ inscripcion.evento.lugar }}</span>

                </div>
              </div>
            </div>

            <!-- Solo aparece si ya se buscó y no hubo resultados -->
            <p v-else-if="buscado" class="mt-8 text-gray-500 text-sm text-center">
              No se encontraron inscripciones para ese email.
            </p>

          </div>
        </div>

      </div>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-gray-900 mt-auto">
      <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <span>Smart<span class="text-emerald-400">Events</span></span>
        <span>2026 Gestión de eventos estudiantiles y culturales</span>
      </div>
    </footer>

  </div>
</template>