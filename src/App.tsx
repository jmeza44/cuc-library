import { Flowbite } from "flowbite-react";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider } from "./hooks/authHook/AuthHook";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./components/common/toastAlert/ToastAlert";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Flowbite>
        <ToastProvider>
          <Dashboard>
            <Outlet></Outlet>
          </Dashboard>
        </ToastProvider>
      </Flowbite>
    </AuthProvider>
  );
};

export default App;
