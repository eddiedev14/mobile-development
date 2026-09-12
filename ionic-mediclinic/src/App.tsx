import { Navigate, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AppTabs from "./components/AppTabs";
import Toast from "./components/Toast";
import { useAuth } from "./hooks/auth/useAuth";
import {
  Login,
  PacientesPage,
  PerfilPage,
  VisitDetailPage,
  VisitsPage,
} from "./pages";
import GuestOnlyRoute from "./router/GuestOnlyRoute";
import PrivateRoute from "./router/PrivateRoute";

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

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const { logged } = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          {/* IonRouterOutlet only discovers <Route> elements that are its direct children */}
          <IonRouterOutlet>
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <GuestOnlyRoute>
                  <Login />
                </GuestOnlyRoute>
              }
            />

            {/* Private Routes */}
            <Route
              path="/visitas"
              element={
                <PrivateRoute>
                  <VisitsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/visitas/:id"
              element={
                <PrivateRoute>
                  <VisitDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pacientes"
              element={
                <PrivateRoute>
                  <PacientesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <PerfilPage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </IonRouterOutlet>

          <Toast />
          {logged && <AppTabs />}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;