export interface UserPhoto {
  //? Ruta para mostrar la foto en un <img>
  webPath: string;

  //? Archivo de la foto, listo para subirlo (ej. al bucket de storage)
  blob: Blob;

  //? Extensión de la imagen (jpeg, png, etc.)
  format: string;
}
