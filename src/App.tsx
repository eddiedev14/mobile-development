import { useEffect } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  IonTabs,
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

import { AuthPage, HomePage } from "./pages";
import AppTabs from "./components/shared/AppTabs";
import Alert from "./components/shared/Alert";
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

  if (userLoading || isRedirecting) {
    return <RedirectLoader />;
  }

  //? Las tabs se muestran en todas las rutas protegidas (las rutas de
  //? autenticación nunca llegan aquí con sesión iniciada)
  const showAppTabs = !!user;

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Auth Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage isSignup />} />

        {/* Protected Routes */}
        <Route path="/" element={<HomePage />} />

        {/* TODO: agregar aquí las rutas del parcial.
            Si una pantalla requiere internet, envolverla con <ConnectionGuard>
            (components/shared/ConnectionGuard). */}

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </IonRouterOutlet>

      <Alert />
      {showAppTabs && <AppTabs />}
    </IonTabs>
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
