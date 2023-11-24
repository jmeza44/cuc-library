import { DarkThemeToggle, Sidebar } from "flowbite-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/authHook/AuthHook";
import {
  IoEnterOutline,
  IoFingerPrintSharp,
  IoGridOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useToast } from "../common/toastAlert/ToastAlert";
import useBooks from "../../hooks/booksHook/BooksHook";

const Dashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, currentUserData, logOut } = useAuth();
  const { resetStates } = useBooks();
  const { setToastMessage, setToastStyle, show } = useToast();

  const handleOnLogOutClick = (): void => {
    setToastMessage("Come back soon!");
    setToastStyle("info");
    show();
    logOut();
    resetStates();
  };

  return (
    <div className="grid w-full grid-cols-12 bg-gray-100 dark:bg-gray-900">
      {/* Side Bar */}
      <div className="col-span-0 hidden min-h-screen rounded-r border-r border-gray-200 bg-gray-50 dark:z-10 dark:border-0 dark:border-gray-500 dark:bg-gray-800 dark:shadow-lg lg:col-span-2 lg:block">
        <Sidebar className="h-full w-full text-center">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Logo
                href="/"
                img="../../assets/library-icon.png"
                imgAlt=""
                className="mb-8"
              >
                CUC-Library
              </Sidebar.Logo>

              {currentUser && currentUserData ? (
                <Sidebar.Item icon={IoPersonOutline}>
                  <div className="h-full w-full p-2">
                    <b className="cursor-default font-semibold">
                      {currentUserData.firstName} {currentUserData.lastName}
                    </b>
                  </div>
                </Sidebar.Item>
              ) : null}

              <NavLink to={"/"}>
                <Sidebar.Item icon={IoHomeOutline}>
                  <div className="h-full w-full p-2">Home</div>
                </Sidebar.Item>
              </NavLink>

              {currentUser && currentUserData?.role === "admin" ? (
                <NavLink to={"/admin"}>
                  <Sidebar.Item icon={IoGridOutline}>
                    <div className="h-full w-full p-2">Admin dashboard</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}

              {currentUser &&
              (currentUserData?.role === "admin" ||
                currentUserData?.role === "user") ? (
                <NavLink to={"/library"}>
                  <Sidebar.Item icon={IoLibraryOutline}>
                    <div className="h-full w-full p-2">Library</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {!currentUser && !currentUserData ? (
                <NavLink to={"/login"}>
                  <Sidebar.Item icon={IoFingerPrintSharp}>
                    <div className="h-full w-full p-2">Log In</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}

              {!currentUser && !currentUserData ? (
                <NavLink to={"/signin"}>
                  <Sidebar.Item icon={IoEnterOutline}>
                    <div className="h-full w-full p-2">Sign In</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}

              {currentUser && currentUserData ? (
                <Sidebar.Item icon={IoLogOutOutline}>
                  <button
                    className="h-full w-full p-2"
                    onClick={() => handleOnLogOutClick()}
                  >
                    Log Out
                  </button>
                </Sidebar.Item>
              ) : null}

              <Sidebar.Item>
                <DarkThemeToggle className="flex h-full w-full items-center justify-center focus:ring-0"></DarkThemeToggle>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      {/* Dashboard Content */}
      <div className="col-span-12 overflow-y-auto bg-gray-100 dark:bg-gray-950 dark:text-white lg:col-span-10">
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
