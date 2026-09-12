import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import ProfilePicture from "/profile-picture.png";
import { useLoginForm } from "../hooks/auth/useLoginForm";

export const LoginForm = () => {
  const { handleLogin } = useLoginForm();

  return (
    <main className="w-full max-w-md m-4 flex flex-col items-center gap-3 p-6 border border-[var(--ion-color-light)] rounded-xl">
      <img
        src={ProfilePicture}
        alt="Profile Picture"
        className="size-32 object-cover rounded-full"
      />
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <p className="text-sm font-light text-center">
        Inicia Sesión para consultar tus visitas
      </p>

      <form onSubmit={handleLogin} className="w-full mt-2 flex flex-col gap-4">
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

        <IonButton type="submit">Iniciar Sesión</IonButton>
      </form>
    </main>
  );
};