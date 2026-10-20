// Función para obtener el mensaje de error de Supabase a la hora de autenticarse
const getAuthErrorMessage = (error: unknown): string => {
  // TODO: Traducir los códigos de error de Supabase Auth (error.code)
  if (error instanceof Error) return error.message;

  return "An unexpected error occurred";
};

export { getAuthErrorMessage };
