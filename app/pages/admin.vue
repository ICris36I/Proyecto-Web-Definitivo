<script setup lang="ts">
// Trae los datos del usuario logueado y la función para cerrar sesión
const { user, clear } = useUserSession()

// Carga los 3 datasets desde sus respectivos endpoints
const { data: eventos, refresh: refreshEventos } = await useFetch('/api/evento')
const { data: inscritos, refresh: refreshInscritos } = await useFetch('/api/admin')
const { data: staff, refresh: refreshStaff } = await useFetch('/api/usuario')

//llama al endpoint de logout, limpia la sesión local y redirige al login
async function cerrarSesion() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await clear()
    await navigateTo('/usuario')
}

// Formatea una fecha tipo Date a texto
function formatFecha(fecha: string) {
    return new Date(fecha).toLocaleString('es-CL', {
        dateStyle: 'long',
        timeStyle: 'short',
    })
}

// Formulario de nuevo evento 
const nuevoEvento = reactive({
    titulo: '',
    fecha: '',
    lugar: '',
    valor: '',
})

const creandoEvento = ref(false)
const errorEvento = ref('')

// Guarda el archivo seleccionado con UFileUpload
const imagenArchivo = ref<File | null>(null)

async function agregarEvento() {
  errorEvento.value = ''
  creandoEvento.value = true

  try {
    // FormData permite enviar texto + archivo juntos en una sola petición
    const formData = new FormData()
    formData.append('titulo', nuevoEvento.titulo)
    formData.append('fecha', nuevoEvento.fecha)
    formData.append('lugar', nuevoEvento.lugar)
    formData.append('valor', nuevoEvento.valor)

    // Solo agrega la imagen si el usuario seleccionó una
    if (imagenArchivo.value) {
      formData.append('imagen', imagenArchivo.value)
    }

    await $fetch('/api/evento', {
      method: 'POST',
      body: formData,
    })

    // Limpia el formulario tras crear con éxito
    nuevoEvento.titulo = ''
    nuevoEvento.fecha = ''
    nuevoEvento.lugar = ''
    nuevoEvento.valor = ''
    imagenArchivo.value = null // limpia el UFileUpload

    await refreshEventos()

  } catch (e) {
    errorEvento.value = 'No se pudo crear el evento, revisa los datos'
  } finally {
    creandoEvento.value = false
  }
}

//Formulario de nuevo staff
const nuevoStaff = reactive({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
})

const creandoStaff = ref(false)
const errorStaff = ref('')

async function agregarStaff() {
    errorStaff.value = ''
    creandoStaff.value = true

    try {
        await $fetch('/api/usuario', {
            method: 'POST',
            body: nuevoStaff,
        })

        nuevoStaff.email = ''
        nuevoStaff.password = ''
        nuevoStaff.nombre = ''
        nuevoStaff.apellido = ''

        await refreshStaff()

    } catch (err) {
        errorStaff.value = 'No se pudo crear el usuario, revisa los datos'
    } finally {
        creandoStaff.value = false
    }
}

//inscritos por evento
const eventoSeleccionado = ref<number | undefined>(undefined)

// computed: se recalcula automáticamente cada vez que cambian "inscritos" o "eventoSeleccionado"
const inscritosFiltrados = computed(() => {
    if (!eventoSeleccionado.value || !inscritos.value) return []
    return (inscritos.value as any[]).filter((i: any) => i.eventoId === eventoSeleccionado.value)
})
// Borra un evento llamando al endpoint DELETE, y refresca la lista
async function eliminarEvento(id: number) {
    await $fetch(`/api/evento/${id}`, { method: 'DELETE' })
    await refreshEventos()
}

// Borra un miembro del STAFF y lo mismo q evento
async function eliminarStaff(email: string) {
    await $fetch(`/api/usuario/${email}`, { method: 'DELETE' })
    await refreshStaff()
}

//Borra un evento inscrito y lo mismo
async function eliminarInscrito(id: number) {
    await $fetch(`/api/admin/${id}`, { method: 'DELETE' })
    await refreshInscritos()
}
</script>

<template>
    <div class="bg-black min-h-screen flex flex-col text-white">

        <!-- NAVBAR ADMIN (R07) -->
        <nav class="border-b border-gray-900 bg-black sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <span class="text-xl font-bold">
                    Smart<span class="text-emerald-400">Events</span>
                    <span class="text-xs font-normal text-gray-500 ml-2">Panel Admin</span>
                </span>
                <div class="flex items-center gap-6">
                    <span class="text-sm text-gray-400">
                         {{ user?.nombre }} {{ user?.apellido }}
                    </span>
                    <UButton color="primary" variant="outline" label="Cerrar sesión" @click="cerrarSesion" />
                </div>
            </div>
        </nav>

        <main class="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">

            <!--SECCIÓN EVENTOS -->
            <section class="mb-16">
                <div class="mb-8">
                    <h2 class="text-2xl font-black">Gestión de Eventos</h2>
                    <p class="text-gray-400 text-sm mt-1">Agrega, visualiza y elimina eventos.</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    <UCard class="bg-gray-950 border border-gray-900">
                        <template #header>
                            <h3 class="font-bold text-lg">Agregar evento</h3>
                        </template>

                        <form @submit.prevent="agregarEvento" class="space-y-4">

                            <UFormField label="Título">
                                <UInput v-model="nuevoEvento.titulo" placeholder="Nombre del evento" class="w-full" />
                            </UFormField>

                            <UFormField label="Fecha y hora">
                                <UInput v-model="nuevoEvento.fecha" type="datetime-local" class="w-full" />
                            </UFormField>

                            <UFormField label="Lugar">
                                <UInput v-model="nuevoEvento.lugar" placeholder="Lugar del evento" class="w-full" />
                            </UFormField>

                            <UFormField label="Valor">
                                <UInput v-model="nuevoEvento.valor" type="number" placeholder="0 si es gratis"
                                    class="w-full" />
                            </UFormField>

                            <UFormField label="Imagen del evento">
                                <UFileUpload
                                    v-model="imagenArchivo"
                                    accept="image/*"
                                    label="Sube una imagen para el evento"
                                    description="Si no subes imagen se usará una por defecto"
                                    class="w-full"
                                />
                            </UFormField>    

                            <UAlert v-if="errorEvento" color="error" variant="soft" :title="errorEvento" />

                            <UButton type="submit" color="primary" block :loading="creandoEvento"
                                label="Agregar evento" />

                        </form>
                    </UCard>

                    <div>
                        <h3 class="font-bold text-lg mb-6">Eventos registrados</h3>
                        <div class="space-y-3">

                            <div v-for="evento in eventos" :key="evento.id"
                                class="bg-gray-950 border border-gray-900 rounded-xl px-5 py-4 flex justify-between items-center">
                                <div>
                                    <p class="font-semibold text-sm">{{ evento.titulo }}</p>
                                    <p class="text-xs text-gray-500 mt-1">
                                        {{ formatFecha(evento.fecha) }} · {{ evento.lugar }} ·
                                        {{ evento.valor === 0 ? 'Gratis' : `$${evento.valor}` }}
                                    </p>
                                </div>
                                <UButton color="error" variant="outline" size="xs" label="Eliminar"
                                    @click="eliminarEvento(evento.id)" />
                            </div>

                            <p v-if="!eventos || eventos.length === 0" class="text-gray-500 text-sm text-center py-8">
                                No hay eventos registrados todavía.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            <!--SECCIÓN STAFF-->
            <section class="mb-16">
                <div class="mb-8">
                    <h2 class="text-2xl font-black">Gestión de Staff</h2>
                    <p class="text-gray-400 text-sm mt-1">Agrega y elimina cuentas de acceso al panel.</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    <UCard class="bg-gray-950 border border-gray-900">
                        <template #header>
                            <h3 class="font-bold text-lg">Agregar miembro staff</h3>
                        </template>

                        <form @submit.prevent="agregarStaff" class="space-y-4">

                            <UFormField label="Email">
                                <UInput v-model="nuevoStaff.email" type="email" placeholder="correo@usm.cl"
                                    class="w-full" />
                            </UFormField>

                            <UFormField label="Nombre">
                                <UInput v-model="nuevoStaff.nombre" placeholder="Nombre" class="w-full" />
                            </UFormField>

                            <UFormField label="Apellido">
                                <UInput v-model="nuevoStaff.apellido" placeholder="Apellido" class="w-full" />
                            </UFormField>

                            <UFormField label="Contraseña">
                                <UInput v-model="nuevoStaff.password" type="password" placeholder="••••••••"
                                    class="w-full" />
                            </UFormField>

                            <UAlert v-if="errorStaff" color="error" variant="soft" :title="errorStaff" />

                            <UButton type="submit" color="primary" block :loading="creandoStaff"
                                label="Agregar staff" />

                        </form>
                    </UCard>

                    <div>
                        <h3 class="font-bold text-lg mb-6">Miembros registrados</h3>
                        <div class="space-y-3">

                            <div v-for="miembro in staff" :key="miembro.email"
                                class="bg-gray-950 border border-gray-900 rounded-xl px-5 py-4 flex justify-between items-center">
                                <div>
                                    <p class="font-semibold text-sm">{{ miembro.nombre }} {{ miembro.apellido }}</p>
                                    <p class="text-xs text-gray-500 mt-1">{{ miembro.email }}</p>
                                </div>
                                <UButton color="error" variant="outline" size="xs" label="Eliminar"
                                    @click="eliminarStaff(miembro.email)" />
                            </div>

                            <p v-if="!staff || staff.length === 0" class="text-gray-500 text-sm text-center py-8">
                                No hay miembros del staff registrados todavía.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            <!--SECCIÓN INSCRITOS -->
            <section>
                <div class="mb-8">
                    <h2 class="text-2xl font-black">Inscritos por evento</h2>
                    <p class="text-gray-400 text-sm mt-1">Visualiza y elimina inscripciones.</p>
                </div>

                <div class="mb-6 max-w-sm">
                    <!--map recorre cada objeto y lo transforma en objeto, label miestra al usuario en el menu desplegable y value guarda dato en v-model-->
                    <USelect v-model="eventoSeleccionado"
                        :items="eventos?.map(e => ({ label: e.titulo, value: e.id })) ?? []" 
                        placeholder="Selecciona un evento" class="w-full" />
                </div>

                <div class="bg-gray-950 border border-gray-900 rounded-2xl overflow-hidden">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-gray-900 text-gray-500 text-left">
                                <th class="px-6 py-4 font-medium">Nombre</th>
                                <th class="px-6 py-4 font-medium">Apellido</th>
                                <th class="px-6 py-4 font-medium">Email</th>
                                <th class="px-6 py-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inscrito in inscritosFiltrados" :key="inscrito.id"
                                class="border-b border-gray-900 hover:bg-black transition-colors">
                                <td class="px-6 py-4">{{ inscrito.nombre }}</td>
                                <td class="px-6 py-4">{{ inscrito.apellido }}</td>
                                <td class="px-6 py-4 text-gray-400">{{ inscrito.email }}</td>
                                <td class="px-6 py-4 text-right">
                                    <UButton color="error" variant="outline" size="xs" label="Eliminar"
                                        @click="eliminarInscrito(inscrito.id)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p v-if="!eventoSeleccionado" class="text-gray-500 text-sm text-center py-8">
                        Selecciona un evento para ver sus inscritos.
                    </p>
                    <p v-else-if="inscritosFiltrados.length === 0" class="text-gray-500 text-sm text-center py-8">
                        Este evento no tiene inscritos todavía.
                    </p>
                </div>

            </section>
        </main>

    </div>
</template>