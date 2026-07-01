import { writeFile } from 'fs/promises' //import necesario para crear archivo de imagen
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  // Lee multipart ( mezcla texto y el archivo)
  const form = await readMultipartFormData(event)

  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'No se recibieron datos' })
  }

  // Saca cada campo de texto del formulario buscandolo por nombre
  const titulo = form.find(f => f.name === 'titulo')?.data.toString()
  const fecha = form.find(f => f.name === 'fecha')?.data.toString()
  const lugar = form.find(f => f.name === 'lugar')?.data.toString()
  const valor = form.find(f => f.name === 'valor')?.data.toString()

  if (!titulo || !fecha || !lugar || !valor) {
    throw createError({ statusCode: 400, statusMessage: 'Todos los campos son obligatorios' })
  }

  // Busca si viene un archivo de imagen en el formulario
  const archivo = form.find(f => f.name === 'imagen' && f.filename)

  // Si no viene imagen, usa la imagen por defecto
  let nombreImagen = 'default.jpg'

  if (archivo && archivo.filename) {
    // Genera un nombre único para el archivo usando la fecha actual evitando que dos imagenes con el mismo nombre se sobreescriban
    const extension = archivo.filename.split('.').pop()
    nombreImagen = `evento_${Date.now()}.${extension}`

    // Guarda el archivo físicamente en la carpeta public/uploads/
    await writeFile(`public/uploads/${nombreImagen}`, archivo.data)
  }

  // Crea el evento en la BD con todos los datos
  const nuevoEvento = await prisma.evento.create({
    data: {
      titulo,
      fecha: new Date(fecha),
      lugar,
      valor: parseFloat(valor),
      imagen: nombreImagen,
    },
  })

  return nuevoEvento
})