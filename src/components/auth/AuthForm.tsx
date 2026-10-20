import { Link } from "react-router-dom";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonSpinner,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import ProfilePicture from "/profile-picture.png";
import { useAuthForm } from "../../hooks/auth/useAuthForm";
import { useCamera } from "../../hooks/sensors/useCamera";

interface Props {
  isSignup: boolean;
}

export const AuthForm = ({ isSignup }: Props) => {
  const { handleSubmit, submitting } = useAuthForm(isSignup);
  const { photo, takePhoto } = useCamera();

  return (
    <main className="w-full max-w-md m-4 flex flex-col items-center gap-3 p-6 border border-(--ion-color-light) rounded-xl">
      <img
        src={isSignup && photo ? photo.webPath : ProfilePicture}
        alt="Profile Picture"
        className="size-32 object-cover rounded-full"
      />
      <h1 className="text-2xl font-bold text-center">
        {isSignup ? "Sign Up" : "Login"}
      </h1>
      <p className="text-sm font-light text-center">
        {isSignup
          ? "Regístrate para empezar a gestionar tus tareas"
          : "Inicia Sesión para seguir gestionando tus tareas"}
      </p>

      <form
        onSubmit={(e) => handleSubmit(e, photo)}
        className="w-full mt-2 flex flex-col gap-4"
      >
        <IonList>
          {/* Email */}
          <IonItem>
            <IonInput
              name="email"
              label="Email"
              labelPlacement="floating"
              placeholder="e.g. user@mail.com"
              type="email"
            ></IonInput>
          </IonItem>

          {/* Username */}
          {isSignup && (
            <IonItem>
              <IonInput
                name="username"
                label="Username"
                labelPlacement="floating"
                placeholder="e.g. user123"
              ></IonInput>
            </IonItem>
          )}

          {/* Password */}
          <IonItem>
            <IonInput
              name="password"
              label="Contraseña"
              labelPlacement="floating"
              placeholder="••••••"
              type="password"
            ></IonInput>
          </IonItem>
        </IonList>

        {/* Foto de perfil (obligatoria en el registro) */}
        {isSignup && (
          <IonButton type="button" fill="outline" onClick={takePhoto}>
            <IonIcon slot="start" icon={cameraOutline} />
            {photo ? "Volver a tomar foto" : "Tomar foto de perfil"}
          </IonButton>
        )}

        <IonButton type="submit" disabled={submitting}>
          {submitting ? (
            <IonSpinner name="crescent" className="size-5"></IonSpinner>
          ) : isSignup ? (
            "Registrarse"
          ) : (
            "Iniciar Sesión"
          )}
        </IonButton>

        <p className="text-sm font-light text-center">
          {isSignup ? (
            <>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-primary">
                Inicia sesión
              </Link>
            </>
          ) : (
            <>
              ¿Aún no tienes una cuenta?{" "}
              <Link to="/signup" className="text-primary">
                Regístrate
              </Link>
            </>
          )}
        </p>
      </form>
    </main>
  );
};
