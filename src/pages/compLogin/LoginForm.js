import InputField from "./InputField";

const LoginForm = ({ username, password, onChange, isError }) => {
  return (
    <>
      <InputField
        id="username"
        label="Email"
        type="text"
        value={username}
        onChange={(value) => onChange({ username: value })}
        isError={isError}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(value) => onChange({ password: value })}
        isError={isError}
      />
    </>
  );
};

export default LoginForm;