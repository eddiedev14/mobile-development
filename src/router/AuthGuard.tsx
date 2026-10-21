import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import { Loader } from "../components/shared/Loader";
import { useAuth } from "../hooks/auth/useAuth";

//? Página mostrada mientras se resuelve la sesión o la redirección.
export const RedirectLoader = () => (
  <IonPage>
    <IonContent fullscreen>
      <div className="min-h-dvh flex items-center justify-center">
        <Loader />
      </div>
    </IonContent>
  </IonPage>
);

//? Redirige a otra ruta desde DENTRO del <IonRouterOutlet>.
export const Redirect = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return <RedirectLoader />;
};

interface Props {
  //? "private": sólo con sesión. "guest": sólo sin sesión (login y signup)
  access: "private" | "guest";
  children: ReactNode;
}

//? Protege una ruta según la sesión. Se aplica en cada <Route> en lugar de
//? reemplazar todo el <IonRouterOutlet>.
const AuthGuard = ({ access, children }: Props) => {
  const { user, userLoading } = useAuth();
  const navigate = useNavigate();

  //? A dónde hay que ir si la sesión no corresponde a esta ruta (null = nada)
  const redirectTo = userLoading
    ? null
    : access === "private" && !user
      ? "/login"
      : access === "guest" && user
        ? "/"
        : null;

  //? `navigate` cambia en cada cambio de ruta.
  const navigateRef = useRef(navigate);
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    if (redirectTo) navigateRef.current(redirectTo, { replace: true });
  }, [redirectTo]);

  //? Sólo mientras se resuelve la sesión guardada (carga inicial)
  if (userLoading) return <RedirectLoader />;

  //? Aunque haya que redirigir se sigue mostrando la página actual: cambiarla por
  //? otra <IonPage> dentro de la misma vista hace que Ionic no pueda ocultarla al
  //? salir y quede encima de la siguiente. La redirección se hace en el efecto
  return <>{children}</>;
};

export default AuthGuard;
