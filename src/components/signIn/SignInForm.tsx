import { useEffect, useState } from "react";
import useAuth from "../../hooks/authHook/AuthHook";
import { UserData } from "../../services/UserService";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../common/toastAlert/ToastAlert";

const SignInForm = () => {
  const {
    currentUser,
    currentUserData,
    loadingUser,
    loadingUserData,
    error,
    signUp,
  } = useAuth();
  const { setToastMessage, setToastStyle, show } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (
      currentUser &&
      currentUserData &&
      !loadingUser &&
      !loadingUserData &&
      !error
    ) {
      setToastMessage(
        `Welcome, ${currentUserData.firstName} ${currentUserData.lastName}`
      );
      setToastStyle("success");
      show();
      setTimeout(() => navigate("/"), 1000);
    }
    if (error) {
      setToastMessage(error);
      setToastStyle("error");
      show();
    }
  }, [currentUser, loadingUser, loadingUserData, error]);

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUp(email, password, {
      email,
      firstName,
      lastName,
      role: "user",
    } as UserData);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        className="z-10 w-96 max-w-md rounded-md border border-gray-200 bg-gray-50 px-6 py-5 shadow-2xl transition-shadow delay-150 ease-out dark:border-gray-800 dark:bg-gray-900"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email-signin" value="Your email" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password-signin" value="Your password" />
          </div>
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="First name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            placeholder="David"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Last name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            placeholder="McHenry"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {!loadingUser && !loadingUserData ? (
          <Button className="mt-2" type="submit">
            Submit
          </Button>
        ) : (
          <Button className="mt-2" type="button">
            <Spinner aria-label="Spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
