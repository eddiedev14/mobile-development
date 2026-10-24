import { useEffect } from 'react';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

import { AuthPage, HomePage, RankingPage, ResultsPage } from './pages';
import AppTabs from './components/shared/AppTabs';
import Alert from './components/shared/Alert';
import { Loader } from './components/shared/Loader';
import { useAuth } from './hooks/auth/useAuth';

setupIonicReact();

//? Rutas accesibles sin sesión iniciada
const AUTH_ROUTES = ['/login', '/signup'];

//? Cubre la pantalla mientras se resuelve la sesión o la redirección.
//? NO es una página de Ionic: se dibuja encima del <IonTabs> sin tocar el árbol
//? del router. Reemplazar el <IonRouterOutlet> (o el <IonPage> de una vista)
//? por un loader durante la navegación deja la transición apuntando a un
//? elemento obsoleto y la página destino queda en blanco (ej. al cerrar sesión).
const LoadingOverlay = () => (
  <div className="fixed inset-0 z-10000 bg-(--ion-background-color)">
    <Loader />
  </div>
);

const AppRoutes = () => {
  const { user, userLoading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isRedirecting = !userLoading && (user ? isAuthRoute : !isAuthRoute);

  useEffect(() => {
    if (isRedirecting) {
      navigate(user ? '/' : '/login', { replace: true });
    }
  }, [isRedirecting, navigate, user]);

  //? Las tabs se muestran en todas las rutas protegidas
  const showAppTabs = !!user && !userLoading;

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          {/* Auth Routes */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage isSignup />} />

          {/* Protected Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/ranking" element={<RankingPage />} />

          <Route
            path="*"
            element={<Navigate to={user ? '/' : '/login'} replace />}
          />
        </IonRouterOutlet>

        <Alert />
        {showAppTabs && <AppTabs />}
      </IonTabs>

      {(userLoading || isRedirecting) && <LoadingOverlay />}
    </>
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
