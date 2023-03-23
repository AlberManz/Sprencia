// Creamos la interfaz para acceder a los datos de Activities
export interface Activity {
  id?: number,
  title: string,
  description: string,
  resume: string,
  city: string,
  price: number,
  shift: string,
  images: string[],
  category: string
}
