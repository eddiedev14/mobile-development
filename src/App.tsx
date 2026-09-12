import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "./hooks/auth/useAuth";
import { FormPage, ListPage, Login } from "./pages";
import Alert from "./components/Alert";
import AppTabs from "./components/AppTabs";
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
import "./theme/variables.css";

setupIonicReact();

const App = () => {
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
              path="/form"
              element={
                <PrivateRoute>
                  <FormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/lista"
              element={
                <PrivateRoute>
                  <ListPage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </IonRouterOutlet>

          <Alert />
          {logged && <AppTabs />}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
