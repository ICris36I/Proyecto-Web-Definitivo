<script setup lang="ts">
//variables del formulario que se piden
const email = ref('')
const password = ref('')


//variables visuales
const error = ref('')
const loading = ref(false)

//refrescar la sesión
const { fetch: fetchSession } = useUserSession()

//funcion para el boton
async function enviarLogin() {
  error.value = ''      
  loading.value = true   

  try {
    //llama al endpoint de login
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    
    await fetchSession()       
    await navigateTo('/admin')  //pagina a la que cambia si el inicio fue exitoso

  } catch (e) {
    
    error.value = 'Email o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}
</script>

<template>
      <nav class="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold ">Smart<span class="text-violet-400">Events</span></span>
        </div>
        <div class="flex items-center gap-4">
          <!-- **transition-colors -->
          
          <a href="/"
            class="text-sm bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium transition-colors">Regresar
           </a>
        </div>
      </div>
    </nav>
  <div class="flex flex-col items-center justify-center min-h-screen bg-slate-900">
    <h1 class="text-7xl font-bold text-center py-8 text-white">
      Smart <span class="text-violet-400">Events</span>
    </h1>

    <div class="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4 text-center text-gray-900">
        Iniciar sesión
      </h2>

      <form @submit.prevent="enviarLogin" class="flex flex-col gap-4"> <!--Al presionar el boton de tipo submit se activa la funcion enviarLogin-->
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="usuarioadmin@gmail.com"
            class="border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-medium text-gray-700">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white rounded-md py-2 px-8 mt-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Ingresando...' : 'Ingresar' }} <!--Si loading es true entonces manda el mensaje de ingreso-->
        </button>
      </form>
    </div>
    
  </div>
</template>