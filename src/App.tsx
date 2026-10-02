import { useEffect, type ReactElement } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

import {
  AuthPage,
  HomePage,
  GeolocationPage,
  CameraPage,
  MotionPage,
  DevicePage,
  HapticsPage,
  FilesystemPage,
  LocalNotificationsPage,
  PushNotificationsPage,
} from "./pages";
import { Loader } from "./components/shared/Loader";
import { useAuth } from "./hooks/auth/useAuth";

setupIonicReact();

//? Rutas accesibles sin sesión iniciada
const AUTH_ROUTES = ["/login", "/signup"];

//? Página mostrada mientras se resuelve la redirección de autenticación.
//? Debe ser un <IonPage> real: si la vista entrante no registra una página,
//? el router no puede completar la transición.
const RedirectLoader = () => (
  <IonPage>
    <IonContent fullscreen>
      <div className="min-h-dvh flex items-center justify-center">
        <Loader />
      </div>
    </IonContent>
  </IonPage>
);

const AppRoutes = () => {
  const { user, userLoading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isRedirecting = !userLoading && (user ? isAuthRoute : !isAuthRoute);

  useEffect(() => {
    if (isRedirecting) {
      navigate(user ? "/" : "/login", { replace: true });
    }
  }, [isRedirecting, navigate, user]);

  //? El <IonRouterOutlet> debe permanecer siempre montado: si se reemplaza por
  //? un loader mientras se redirige, al volver a montarlo Ionic no completa la
  //? transición y la página entrante queda invisible (pantalla en blanco).
  //? Por eso el loader se renderiza dentro de cada ruta, no en lugar del outlet.
  const pending = userLoading || isRedirecting;
  const guest = (page: ReactElement) => (pending ? <RedirectLoader /> : page);
  const protectedPage = (page: ReactElement) =>
    pending || !user ? <RedirectLoader /> : page;

  return (
    <IonRouterOutlet>
      {/* Auth Routes */}
      <Route path="/login" element={guest(<AuthPage />)} />
      <Route path="/signup" element={guest(<AuthPage isSignup />)} />

      {/* Protected Routes */}
      <Route path="/" element={protectedPage(<HomePage />)} />

      {/* Sensores de Capacitor */}
      <Route
        path="/sensors/geolocation"
        element={protectedPage(<GeolocationPage />)}
      />
      <Route path="/sensors/camera" element={protectedPage(<CameraPage />)} />
      <Route path="/sensors/motion" element={protectedPage(<MotionPage />)} />
      <Route path="/sensors/device" element={protectedPage(<DevicePage />)} />
      <Route
        path="/sensors/haptics"
        element={protectedPage(<HapticsPage />)}
      />
      <Route
        path="/sensors/filesystem"
        element={protectedPage(<FilesystemPage />)}
      />
      <Route
        path="/sensors/local-notifications"
        element={protectedPage(<LocalNotificationsPage />)}
      />
      <Route
        path="/sensors/push-notifications"
        element={protectedPage(<PushNotificationsPage />)}
      />

      <Route
        path="*"
        element={
          pending ? (
            <RedirectLoader />
          ) : (
            <Navigate to={user ? "/" : "/login"} replace />
          )
        }
      />
    </IonRouterOutlet>
  );
};

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AppRoutes />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
