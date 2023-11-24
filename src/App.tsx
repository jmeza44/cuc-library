import { Flowbite } from "flowbite-react";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider } from "./hooks/authHook/AuthHook";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./components/common/toastAlert/ToastAlert";
import { BooksProvider } from "./hooks/booksHook/BooksHook";

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <BooksProvider>
          <Flowbite>
            <Dashboard>
              <Outlet></Outlet>
            </Dashboard>
          </Flowbite>
        </BooksProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
