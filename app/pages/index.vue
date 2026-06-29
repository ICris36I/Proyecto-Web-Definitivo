<!-- El template solo debe contener un elemento raíz (el div) -->
<template>
  <!-- "min-h-screen": Ocupa minimo toda la pantalla (explicito lo que es) -->
  <div class="bg-gray-950 min-h-screen flex flex-col text-white">

    <!-- VERIFICAR RESPONSIVIDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD -->

    <!-- NAVBAR -->

    <!-- Border-b: agrega un borde solo en la parte inferior del elemento (b=bottom). -->
    <nav class="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold ">Smart<span class="text-violet-400">Events</span></span>
        </div>
        <div class="flex items-center gap-4">
          <!-- **transition-colors -->
          <a href="/evento" class="text-sm text-gray-400 hover:text-white transition-colors"> Mis Inscripciones </a>
          <a href="/usuario"
            class="text-sm bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium transition-colors">Acceso
            Staff →</a>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="border-b border-gray-800">
      <div class="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <!-- uppercase:  sirve para transformar todo el texto de un elemento a letras mayúsculas.  -->
        <span class="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
          Universidad Tecnica Federico Santa Maria
        </span>
        <h1 class="text-5xl md:text-7xl font-black leading-tight mb-6">Eventos que inspiran</h1>
        <p class="text-gray-400 text-lg max-w-lg mb-10">Descubre los próximos eventos estudiantiles y culturales.
          Inscríbete en segundos.</p>
        <a href="/evento"
          class="border border-gray-700 hover:border-violet-500 text-violet-400 px-6 py-3 rounded-lg text-sm font-medium transition-all">Ver
          mis Inscripciones</a>
      </div>
    </section>

    <!-- EVENTOS R01 CONTENIDO-->
    <main class="flex-1 max-w-6xl mx-auto px-6 py-14 w-full">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-2xl font-bold">Próximos Eventos</h2>
        <span class="text-sm text-gray-500">3 disponibles</span>
      </div>

      <!-- COLUMNAS para los CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- CARD 1 -->
        <div
          class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-violet-600 transition-all group">
          <div class="relative overflow-hidden">
            <img src="/images/evento1.jpg" alt="Evento"
              class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-3 left-3 bg-gray-950 text-xs px-3 py-1 rounded-full text-gray-300">
              Gratis
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-lg mb-3">Festival de Música Universitaria</h3>
            <div class="text-sm text-gray-400 mb-5">
              <p class="mb-1">23 agosto 2026 - 19:00 hrs</p>
              <p class="mb-1">Auditorio Central USM</p>
              <p class="mb-1">120 inscritos</p>
            </div>
            <a href="/evento?id=1"
              class="block text-center bg-violet-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">Inscribirse</a>
          </div>
        </div>

        <!-- CARD 2 -->
        <div
          class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-violet-600 transition-all group">
          <div class="relative overflow-hidden">
            <img src="/images/evento2.jpg" alt="Evento"
              class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-3 left-3 bg-gray-950 text-xs px-3 py-1 rounded-full text-gray-300">
              $2.500
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-lg mb-3">Charla: Inteligencia Artificial Hoy</h3>
            <div class="text-sm text-gray-400 mb-5">
              <p class="mb-1">22 julio 2026 · 10:00 hrs</p>
              <p class="mb-1">Sala de Conferencias B</p>
              <p class="mb-1">45 inscritos</p>
            </div>
            <a href="/evento?id=2"
              class="block text-center bg-violet-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">Inscribirse</a>
          </div>
        </div>


        <!-- CARD 3 -->
        <div
          class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-violet-600 transition-all group">
          <div class="relative overflow-hidden">
            <img src="/images/evento3.jpg" alt="Evento"
              class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-3 left-3 bg-gray-950 text-xs px-3 py-1 rounded-full text-gray-300">
              $5.000
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-lg mb-3">Feria de Emprendimiento 2026</h3>
            <div class="text-sm text-gray-400 mb-5">
              <p class="mb-1"> 30 julio 2026 · 09:00 hrs</p>
              <p class="mb-1"> Patio Central Campus</p>
              <p class="mb-1"> 88 inscritos</p>
            </div>
            <a href="/evento?id=3"
              class="block text-center bg-violet-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">Inscribirse</a>
          </div>
        </div>
      </div>
    </main>
    <!-- FOOTER -->
    <footer class="border-t border-gray-800 mt-auto">
      <div
        class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-shadow-gray-600">
        <span>Smart<span class="text-violet-400">Events</span></span>
        <span>© 2026 · Gestión de eventos estudiantiles y culturales</span>
      </div>
    </footer>
  </div>
</template>