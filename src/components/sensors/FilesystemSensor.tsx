import { useState } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import { toast } from "react-toastify";
import { FileInfo } from "@capacitor/filesystem";
import { useFilesystem } from "../../hooks/sensors/useFilesystem";

const FilesystemSensor = () => {
  const { loading, writeFile, readFile, listFiles, deleteFile } =
    useFilesystem();

  const [data, setData] = useState<unknown>(null);
  const [files, setFiles] = useState<FileInfo[]>([]);

  if (loading) {
    return <IonSpinner />;
  }

  const onWriteFile = async () => {
    const success = await writeFile({
      path: "mi-data.json",
      data: {
        nombre: "Eddie",
        curso: "Ionic",
      },
    });

    if (success) {
      toast.success("Archivo creado");
    } else {
      toast.error("No se pudo crear el archivo");
    }
  };

  const onReadFile = async () => {
    const result = await readFile({
      path: "mi-data.json",
    });

    if (result !== null) {
      setData(result);
      toast.success("Archivo leído");
    } else {
      toast.error("No se pudo leer el archivo");
    }
  };

  const onListFiles = async () => {
    const result = await listFiles({
      path: "",
    });

    setFiles(result);
    toast.success(`${result.length} archivo(s) encontrado(s)`);
  };

  const onDeleteFile = async () => {
    const success = await deleteFile({
      path: "mi-data.json",
    });

    if (success) {
      setData(null);
      toast.success("Archivo eliminado");
    } else {
      toast.error("No se pudo eliminar el archivo");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Filesystem</h2>

      <p className="text-sm font-light opacity-70">
        Prueba de operaciones con archivos usando Capacitor Filesystem.
      </p>

      <div className="flex flex-wrap gap-2">
        <IonButton onClick={onWriteFile}>Crear archivo</IonButton>

        <IonButton onClick={onReadFile}>Leer archivo</IonButton>

        <IonButton onClick={onListFiles}>Listar archivos</IonButton>

        <IonButton color="danger" onClick={onDeleteFile}>
          Eliminar archivo
        </IonButton>
      </div>

      {data !== null && (
        <div>
          <h3 className="font-semibold">Data del archivo:</h3>

          <pre className="rounded bg-gray-100 p-3 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {files.length > 0 && (
        <div>
          <h3 className="font-semibold">Archivos:</h3>

          <ul className="list-disc pl-5">
            {files.map((file) => (
              <li key={file.uri}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FilesystemSensor;
