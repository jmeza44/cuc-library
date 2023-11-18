import { DarkThemeToggle, Sidebar, Spinner } from "flowbite-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/authHook/AuthHook";
import {
  HiArrowSmRight,
  HiChartPie,
  HiTable,
  HiUser,
  HiHome,
  HiOutlineLogout,
} from "react-icons/hi";
import { PiBooks } from "react-icons/pi";

const Dashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, currentUserData, logOut } = useAuth();

  return (
    <div className="grid w-full grid-cols-12 bg-gray-100 dark:bg-gray-900">
      {/* Side Bar */}
      <div className="col-span-2 min-h-screen rounded-r border-r border-gray-200 bg-gray-50 dark:z-10 dark:border-0 dark:border-gray-500 dark:bg-gray-800 dark:shadow-lg">
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
                <Sidebar.Item icon={HiUser}>
                  <div className="h-full w-full p-2">
                    <b className="cursor-default font-semibold">
                      {currentUserData.firstName} {currentUserData.lastName}
                    </b>
                  </div>
                </Sidebar.Item>
              ) : null}

              <NavLink to={"/"}>
                <Sidebar.Item icon={HiHome}>
                  <div className="h-full w-full p-2">Home</div>
                </Sidebar.Item>
              </NavLink>

              {currentUser && currentUserData?.role === "admin" ? (
                <NavLink to={"/admin"}>
                  <Sidebar.Item icon={HiChartPie}>
                    <div className="h-full w-full p-2">Admin dashboard</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}

              {currentUser &&
              (currentUserData?.role === "admin" ||
                currentUserData?.role === "user") ? (
                <NavLink to={"/library"}>
                  <Sidebar.Item icon={PiBooks}>
                    <div className="h-full w-full p-2">Library</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {!currentUser && !currentUserData ? (
                <NavLink to={"/login"}>
                  <Sidebar.Item icon={HiArrowSmRight}>
                    <div className="h-full w-full p-2">Log In</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}

              {!currentUser && !currentUserData ? (
                <NavLink to={"/signin"}>
                  <Sidebar.Item icon={HiTable}>
                    <div className="h-full w-full p-2">Sign In</div>
                  </Sidebar.Item>
                </NavLink>
              ) : null}

              {currentUser && currentUserData ? (
                <Sidebar.Item icon={HiOutlineLogout}>
                  <button className="h-full w-full p-2" onClick={logOut}>
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
      <div className="col-span-10 overflow-y-auto bg-gray-100 dark:bg-gray-950 dark:text-white">
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
