import { Navigate, Route } from "react-router-dom";
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

import GuestOnlyRoute from "./router/GuestOnlyRoute";
import { AuthPage, ListPage } from "./pages";
import PrivateRoute from "./router/PrivateRoute";
import AppTabs from "./components/shared/AppTabs";
import Alert from "./components/shared/Alert";
import { useAuth } from "./hooks/auth/useAuth";

setupIonicReact();

const App = () => {
  const { user } = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <GuestOnlyRoute>
                  <AuthPage />
                </GuestOnlyRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <GuestOnlyRoute>
                  <AuthPage isSignup />
                </GuestOnlyRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/list"
              element={
                <PrivateRoute>
                  <ListPage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </IonRouterOutlet>

          <Alert />
          {user && <AppTabs />}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
