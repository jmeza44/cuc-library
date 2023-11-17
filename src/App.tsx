import { Flowbite } from "flowbite-react";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider } from "./hooks/authHook/AuthHook";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Flowbite>
        <Dashboard>
          <Outlet></Outlet>
        </Dashboard>
      </Flowbite>
    </AuthProvider>
  );
};

export default App;
