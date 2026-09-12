import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PatientProvider } from "./context/PatientContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <ToastContainer />
          <AppRouter />
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
