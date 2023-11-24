import { FunctionComponent, useEffect } from "react";
import BooksGallery from "../books/BooksGallery";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/authHook/AuthHook";
import { useToast } from "../common/toastAlert/ToastAlert";
import BorrowedBooksList from "../books/BorrowedBooksList";

const Library: FunctionComponent = () => {
  const { currentUserData, loadingUserData } = useAuth();
  const { setToastMessage, setToastStyle, show } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserData && !loadingUserData) {
      navigate("/");
      setToastMessage(
        "You have not permissions to access this feature. Try login with another credentials."
      );
      setToastStyle("info");
      show();
    } else if (
      currentUserData?.role !== "user" &&
      currentUserData?.role !== "admin"
    ) {
      navigate("/");
      setToastMessage(
        "You have not permissions to access this feature. Try login with another credentials."
      );
      setToastStyle("info");
      show();
    }
  }, [currentUserData, loadingUserData]);

  return (
    // Centering Container
    <div className="flex h-full w-full items-center justify-center p-12">
      <div className="grid h-full w-full grid-cols-12 bg-gray-50 p-2 shadow-md dark:bg-gray-900">
        <div className="col-span-9">
          <BooksGallery></BooksGallery>
        </div>
        <div className="col-span-3 border-l border-gray-200 p-2 dark:border-gray-500">
          <BorrowedBooksList></BorrowedBooksList>
        </div>
      </div>
    </div>
  );
};

export default Library;
