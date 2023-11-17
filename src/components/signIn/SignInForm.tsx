import { useState } from "react";
import useAuth from "../../hooks/authHook/AuthHook";
import { UserData } from "../../services/UserService";
import { Button, Label, Spinner, TextInput } from "flowbite-react";

const SignInForm = () => {
  const { loading, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUp(email, password, {
      email,
      firstName,
      lastName,
      role: "user",
    } as UserData);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner aria-label="Loading spinner" size="xl" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        className="z-10 mx-auto mt-8 w-96 max-w-md rounded-md border border-gray-200 px-6 py-5 shadow-2xl dark:border-gray-800"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="Your first name" />
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
            <Label htmlFor="lastName" value="Your last name" />
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

        <Button className="mt-2" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
