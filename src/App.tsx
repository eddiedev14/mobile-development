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

  //? Mientras Firebase Auth resuelve la sesión NO se decide nada: `user` es null
  //? hasta que llega el documento de Firestore, y durante ese tiempo una ruta
  //? protegida parecería "no autenticada" (p. ej. al recargar /fruits/edit/1,
  //? el usuario saltaba a /login y luego a "/"). Se espera con el loader.
  const isRedirecting = !userLoading && (user ? isAuthRoute : !isAuthRoute);
  const showLoader = userLoading || isRedirecting;

  useEffect(() => {
    if (isRedirecting) {
      navigate(user ? "/" : "/login", { replace: true });
    }
  }, [isRedirecting, navigate, user]);

  //? Las tabs principales sólo se muestran en la página de inicio,
  //? ya que cada app se abre como una página nueva (con botón de "atrás")
  const showAppTabs = user && pathname === "/";

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={showLoader ? <RedirectLoader /> : <AuthPage />}
        />

        <Route
          path="/signup"
          element={showLoader ? <RedirectLoader /> : <AuthPage isSignup />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={showLoader ? <RedirectLoader /> : <HomePage />}
        />

        {/* Cada app se monta con un splat para que sus sub-rutas
            (/contacts/list, /tasks/new, etc.) queden dentro de su alcance */}
        <Route
          path="/contacts/*"
          element={showLoader ? <RedirectLoader /> : <ContactsTabs />}
        />

        <Route
          path="/tasks/*"
          element={showLoader ? <RedirectLoader /> : <TasksTabs />}
        />

        <Route
          path="/fruits/*"
          element={showLoader ? <RedirectLoader /> : <FruitsTabs />}
        />

        <Route
          path="*"
          element={
            //? También espera a que la sesión esté resuelta: si no, una URL
            //? inexistente abierta en caliente expulsaría a /login
            showLoader ? (
              <RedirectLoader />
            ) : (
              <Navigate to={user ? "/" : "/login"} replace />
            )
          }
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
