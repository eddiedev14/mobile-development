import { Route, useLocation } from "react-router-dom";
import {
  IonApp,
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

import { AuthPage, HomePage, TasksTabs } from "./pages";
import AppTabs from "./components/shared/AppTabs";
import Alert from "./components/shared/Alert";
import AuthGuard, { Redirect } from "./router/AuthGuard";
import { useAuth } from "./hooks/auth/useAuth";

setupIonicReact();

const AppRoutes = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  //? Las tabs principales sólo se muestran en la página de inicio,
  //? ya que cada app se abre como una página nueva (con botón de "atrás")
  const showAppTabs = user && pathname === "/";

  //? El <IonTabs> y el <IonRouterOutlet> nunca se desmontan: las redirecciones
  //? por sesión las hace <AuthGuard/> dentro de cada ruta
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthGuard access="guest">
              <AuthPage />
            </AuthGuard>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthGuard access="guest">
              <AuthPage isSignup />
            </AuthGuard>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AuthGuard access="private">
              <HomePage />
            </AuthGuard>
          }
        />

        {/* La app se monta con un splat para que sus sub-rutas
            (/tasks/list, /tasks/new, etc.) queden dentro de su alcance */}
        <Route
          path="/tasks/*"
          element={
            <AuthGuard access="private">
              <TasksTabs />
            </AuthGuard>
          }
        />

        {/* Cualquier otra ruta va a "/", y ahí la guarda decide si hay sesión */}
        <Route path="*" element={<Redirect to="/" />} />
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
