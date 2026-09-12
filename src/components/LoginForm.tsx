import { IonList, IonItem, IonInput, IonButton } from "@ionic/react";
import ProfilePicture from "/profile-picture.png";
import { useLoginForm } from "../hooks/auth/useLoginForm";

export const LoginForm = () => {
  const { handleLogin } = useLoginForm();

  return (
    <main className="flex flex-col items-center gap-2 w-md border border-gray-300 rounded-xl p-6">
      <img
        src={ProfilePicture}
        alt="Profile Picture"
        className="object-cover size-32"
      />
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="font-light text-sm">
        Inicia Sesión para practicar con los challenges
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
              type="password"
            ></IonInput>
          </IonItem>
        </IonList>

        <IonButton type="submit" className="text-white">
          Iniciar Sesión
        </IonButton>
      </form>
    </main>
  );
};
