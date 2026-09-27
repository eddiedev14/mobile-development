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

import {
  AuthPage,
  ContactsTabs,
  FruitsTabs,
  HomePage,
  TasksTabs,
} from "./pages";
import AppTabs from "./components/shared/AppTabs";
import Alert from "./components/shared/Alert";
import ConnectionGuard from "./components/shared/ConnectionGuard";
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

  //? Las tabs principales sólo se muestran en la página de inicio,
  //? ya que cada app se abre como una página nueva (con botón de "atrás")
  const showAppTabs = user && pathname === "/";

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Auth Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage isSignup />} />

        {/* Protected Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Cada app se monta con un splat para que sus sub-rutas
            (/contacts/list, /tasks/new, etc.) queden dentro de su alcance */}
        {/* Tasks y Contacts necesitan internet: el guard muestra la pantalla de
            aviso si se entra sin conexión o si se cae estando dentro.
            Fruits se queda fuera porque funciona con IndexedDB (local) */}
        <Route
          path="/contacts/*"
          element={
            <ConnectionGuard>
              <ContactsTabs />
            </ConnectionGuard>
          }
        />

        <Route
          path="/tasks/*"
          element={
            <ConnectionGuard>
              <TasksTabs />
            </ConnectionGuard>
          }
        />

        <Route path="/fruits/*" element={<FruitsTabs />} />

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
