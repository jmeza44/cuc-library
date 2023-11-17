import { Button, Label, Spinner, TextInput } from "flowbite-react";
import useAuth from "../../hooks/authHook/AuthHook";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const { currentUser, loading, error, logIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logIn(email, password);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner aria-label="Loading spinner" size="xl" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (currentUser) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-xl">Logged In</h1>
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

        <Button className="mt-2" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
