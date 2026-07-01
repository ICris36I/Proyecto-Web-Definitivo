export interface Evento {
  id: number
  titulo: string
  fecha: string
  lugar: string
  imagen: string 
  valor: number
}

export interface Inscrito {
  id: number
  email: string
  nombre: string
  apellido: string
  eventoId: number
  evento: Evento
}