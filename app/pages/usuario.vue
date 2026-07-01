<script setup lang="ts">
import { z } from 'zod' // libreria de zod para validación de datos
import type { FormSubmitEvent } from '@nuxt/ui'

// Esquema de validación
const schema = z.object({ // aqui le decimos a zod que obligatoriamente tienen que ser datos los que se van a validar
  email: z.string().email('Email inválido'), // validando email con zod, que sea un string, y que tenga formato @, dominio y etc, sino email invalido
  password: z.string().min(6, 'Mínimo 6 caracteres'), // validando la contraseña con zod, lo mismo q con email
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

const error = ref('')
const loading = ref(false)

const { fetch: fetchSession } = useUserSession()

async function enviarLogin(event: FormSubmitEvent<Schema>) {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: event.data,
    })

    await fetchSession()
    await navigateTo('/admin')

  } catch (e) {
    error.value = 'Email o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-black min-h-screen flex flex-col text-white">

    <!-- NAVBAR -->
    <nav class="border-b border-gray-900 bg-black sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span class="text-xl font-bold">Smart<span class="text-emerald-400">Events</span></span>
        <UButton to="/" color="primary" label="Regresar" />
      </div>
    </nav>

    <!-- CONTENIDO -->
    <div class="flex flex-col items-center justify-center flex-1 px-6">

      <h1 class="text-6xl font-black text-center mb-10">
        Smart <span class="text-emerald-400">Events</span>
      </h1>

      <div class="w-full max-w-sm bg-gray-950 border border-gray-900 rounded-2xl p-8">
        <h2 class="text-xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <UForm :schema="schema" :state="state" class="flex flex-col gap-5" @submit="enviarLogin">

          <UFormField label="Email" name="email">
            <UInput v-model="state.email" type="email" placeholder="usuarioadmin@gmail.com" class="w-full" />
          </UFormField>

          <UFormField label="Contraseña" name="password">
            <UInput v-model="state.password" type="password" placeholder="••••••••" class="w-full" />
          </UFormField>

          <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

          <UButton type="submit" color="primary" block :loading="loading"
            :label="loading ? 'Ingresando...' : 'Ingresar'" />

        </UForm>
      </div>

    </div>

    <!-- FOOTER -->
    <footer class="border-t border-gray-900">
      <div
        class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <span>Smart<span class="text-emerald-400">Events</span></span>
        <span>© 2026 · Gestión de eventos estudiantiles y culturales</span>
      </div>
    </footer>

  </div>
</template>