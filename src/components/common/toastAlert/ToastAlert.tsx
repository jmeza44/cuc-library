import React, { ReactNode, createContext, useContext, useState } from "react";
import { Progress, Toast } from "flowbite-react";
import {
  IoAlertCircleOutline,
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

type ToastAlertStyle = "info" | "success" | "error" | "warning";

interface ToastAlertContext {
  showToast: boolean;
  setToastMessage: (message: string) => void;
  setToastStyle: (style: ToastAlertStyle) => void;
  show: () => void;
  hide: () => void;
}

// Create a ToastContext
const ToastContext = React.createContext<ToastAlertContext | undefined>(
  undefined
);

// Create a ToastProvider to manage the state of the Toast
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState<ToastAlertStyle>("info");
  const [showDuringTimeout, setShowDuringTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const TOAST_ALERT_DURATION = 5000;
  const show = () => {
    if (showDuringTimeout) clearTimeout(showDuringTimeout);
    setShowToast(true);
    setShowDuringTimeout(
      setTimeout(() => {
        hide();
      }, TOAST_ALERT_DURATION)
    );
  };
  const hide = () => setShowToast(false);
  const setToastMessage = (message: string) => setMessage(message);
  const setToastStyle = (style: ToastAlertStyle) => setStyle(style);

  // Provide the state and functions to the children
  const contextValue: ToastAlertContext = {
    showToast,
    setToastMessage,
    setToastStyle,
    show,
    hide,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {/* Render the Toast component */}
      {showToast && (
        <div className="fixed right-5 top-5 ">
          <Toast>
            <div
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                style == "info"
                  ? "bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200"
                  : style == "success"
                  ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                  : style == "error"
                  ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                  : style == "warning"
                  ? "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200"
                  : ""
              }`}
            >
              {style == "info" ? (
                <IoInformationCircleOutline />
              ) : style == "success" ? (
                <IoCheckmarkDoneCircleOutline />
              ) : style == "error" ? (
                <IoCloseCircleOutline />
              ) : style == "warning" ? (
                <IoAlertCircleOutline />
              ) : null}
            </div>
            <div className="text-md mx-3 font-medium">{message}</div>
            <Toast.Toggle onClick={hide} />
          </Toast>
        </div>
      )}

      {/* Render the child components */}
      {children}
    </ToastContext.Provider>
  );
};

// Create a custom hook to use the ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
