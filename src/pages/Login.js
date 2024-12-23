import { useState } from "react";
import useUserLogin from "../stores/actions/user/useUserLogin";
import useUserRegistration from "../stores/actions/user/useUserRegistration";
import LoginForm from "./compLogin/LoginForm";
import RegisterForm from "./compLogin/RegisterForm";

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFullName, setUserFullName] = useState("");

  const { mutate: loginMutation, isError: isLoginError } = useUserLogin();
  const { mutate: registerMutation, isError: isRegisterError } = useUserRegistration();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignUpMode) {
      registerMutation({ username: userEmail, password: userPassword, full_name: userFullName });
    } else {
      loginMutation({ username: userEmail, password: userPassword });
    }
  };

  const handleInputChange = ({ username, password, full_name }) => {
    if (username) setUserEmail(username);
    if (password) setUserPassword(password);
    if (full_name) setUserFullName(full_name);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {isSignUpMode ? "Register" : "Login"}
        </h1>
        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          {isSignUpMode ? (
            <RegisterForm
              username={userEmail}
              password={userPassword}
              fullName={userFullName}
              onChange={handleInputChange}
              isError={isRegisterError || isLoginError}
            />
          ) : (
            <LoginForm
              username={userEmail}
              password={userPassword}
              onChange={handleInputChange}
              isError={isLoginError || isRegisterError}
            />
          )}
          {(isLoginError || isRegisterError) && (
            <p className="text-red-500 text-sm text-center mt-2">
              Invalid username or password {isSignUpMode && "or full name"}
            </p>
          )}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUpMode((prev) => !prev)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isSignUpMode ? "Already have an account?" : "Create an account"}
            </button>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {isSignUpMode ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
