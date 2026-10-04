import { useState } from "react";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

/**
 * Datos necesarios para las acciones con archivos y carpetas
 */
interface FilesystemAction {
  path: string;
  data?: string | Blob | object;
  directory?: Directory;
  isJson?: boolean;
  recursive?: boolean;
}

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Escribe contenido en un archivo dentro del dispositivo.
   */
  const writeFile = async ({
    path,
    data,
    directory = Directory.Documents,
    isJson = true,
  }: FilesystemAction) => {
    try {
      setLoading(true);
      setError(null);

      const content = isJson ? JSON.stringify(data) : data;

      await Filesystem.writeFile({
        path,
        data: content as string | Blob,
        directory,
        encoding: Encoding.UTF8,
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al escribir el archivo."));
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Lee el contenido de un archivo dentro del dispositivo.
   */
  const readFile = async ({
    path,
    directory = Directory.Documents,
    isJson = true,
  }: FilesystemAction) => {
    try {
      setLoading(true);
      setError(null);

      const result = await Filesystem.readFile({
        path,
        directory,
        encoding: Encoding.UTF8,
      });

      return isJson ? JSON.parse(result.data as string) : result.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al leer el archivo."));
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async ({
    path,
    directory = Directory.Documents,
  }: FilesystemAction) => {
    try {
      setLoading(true);
      setError(null);

      await Filesystem.deleteFile({
        path,
        directory,
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al eliminar el archivo."));
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  const listFiles = async ({
    path = "",
    directory = Directory.Documents,
  }: FilesystemAction) => {
    try {
      setLoading(true);
      setError(null);

      const result = await Filesystem.readdir({
        path,
        directory,
      });

      return result.files;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al listar los archivo."));
      }

      return [];
    } finally {
      setLoading(false);
    }
  };

  const createDir = async ({
    path,
    directory = Directory.Documents,
  }: FilesystemAction) => {
    try {
      setLoading(true);
      setError(null);

      await Filesystem.mkdir({
        path,
        directory,
        recursive: true,
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al crear el directorio."));
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeDir = async ({
    path,
    directory = Directory.Documents,
    recursive = true,
  }: FilesystemAction) => {
    try {
      setLoading(true);
      setError(null);

      await Filesystem.rmdir({
        path,
        directory,
        recursive,
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al eliminar el directorio."));
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    writeFile,
    readFile,
    deleteFile,
    listFiles,
    createDir,
    removeDir,
  };
};
