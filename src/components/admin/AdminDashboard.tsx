import BooksTable from "../books/BooksTable";
import BooksForm from "../books/BooksForm";
import useAuth from "../../hooks/authHook/AuthHook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../common/toastAlert/ToastAlert";

function AdminDashboard() {
  const { currentUserData, loadingUserData } = useAuth();
  const { setToastMessage, setToastStyle, show } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (!currentUserData || currentUserData.role !== "admin") &&
      !loadingUserData
    ) {
      navigate("/");
      setToastMessage(
        "You have not permissions to access this feature. Try login with another credentials."
      );
      setToastStyle("info");
      show();
    }
  }, [currentUserData]);

  return (
    // Centering Container
    <div className="flex h-full w-full items-center justify-center p-12">
      {/* Grid Container */}
      <div className="grid h-full w-full grid-cols-12 bg-gray-50 p-2 shadow-md dark:bg-gray-900">
        {/* Book Form */}
        <div className="col-span-12 p-2 lg:col-span-3">
          <BooksForm></BooksForm>
        </div>
        {/* Books Table */}
        <div className="col-span-12 p-2 lg:col-span-9">
          <BooksTable></BooksTable>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
