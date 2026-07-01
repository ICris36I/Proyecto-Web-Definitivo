<script setup lang="ts">
const { data: eventos } = await useFetch('/api/evento')

//si es 0 muestra "Gratis"
function formatoValor(valor: number) {
  if (valor === 0) return 'Gratis'
  return `$${valor.toLocaleString('es-CL')}`//moneda chilena
}


function formatoFecha(fecha: string) {
  const date = new Date(fecha)
  const dia = date.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
  const hora = date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
  return `${dia} - ${hora} hrs` //retorna el dia y hora establecidos
}
</script>

<template>
  <div class="bg-black min-h-screen flex flex-col text-white">

    <!-- NAVBAR -->
    <nav class="border-b border-gray-900 bg-black sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold">Smart<span class="text-emerald-400">Events</span></span>
        </div>
        <div class="flex items-center gap-4">
          <a href="/evento" class="text-sm text-gray-400 hover:text-white transition-colors">Mis Inscripciones</a>
          <a href="/usuario" class="text-sm bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg font-medium transition-colors">
            Acceso Staff →
          </a>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="border-b border-gray-900">
      <div class="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <span class="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4">
          Universidad Tecnica Federico Santa Maria
        </span>
        <h1 class="text-5xl md:text-7xl font-black leading-tight mb-6">
          Eventos que <span class="text-emerald-400">inspiran.</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-lg mb-10">
          Descubre los próximos eventos estudiantiles y culturales. Inscríbete en segundos.
        </p>
        <a href="/evento" class="border border-gray-700 hover:border-emerald-500 hover:text-emerald-400 px-6 py-3 rounded-lg text-sm font-medium transition-all">
          Ver mis Inscripciones
        </a>
      </div>
    </section>

    <!-- EVENTOS -->
    <main class="flex-1 max-w-6xl mx-auto px-6 py-14 w-full">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-2xl font-bold">Próximos Eventos</h2>
        <span class="text-sm text-gray-500">{{ eventos?.length || 0 }} disponibles</span> <!--pregunta si eventos es distinto de 0, cuantos hay-->
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- recorre cada evento traído de la base de datos-->
        <div
          v-for="evento in eventos"
          :key="evento.id"
          class="bg-gray-950 border border-gray-900 rounded-2xl overflow-hidden hover:border-emerald-500 transition-all group"
        >
          <div class="relative overflow-hidden">
           <img
                
                :src="`/uploads/${evento.imagen}`"
                :alt="evento.titulo"
                class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            >
            <div class="absolute top-3 left-3 bg-black/80 text-xs px-3 py-1 rounded-full text-gray-300">
              {{ formatoValor(evento.valor) }}
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-lg mb-3">{{ evento.titulo }}</h3>
            <div class="text-sm text-gray-400 mb-5">
              <p class="mb-1">{{ formatoFecha(evento.fecha) }}</p>
              <p class="mb-1">{{ evento.lugar }}</p>
              <p class="mb-1">{{ evento._count.inscritos }} inscritos</p>
            </div>
            <a :href="`/evento?id=${evento.id}`"
            class="block text-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
            Inscribirse
            </a>
            
             
          </div>
        </div>

      </div>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-gray-900 mt-auto">
      <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <span>Smart<span class="text-emerald-400">Events</span></span>
        <span>© 2026 · Gestión de eventos estudiantiles y culturales</span>
      </div>
    </footer>

  </div>
</template>