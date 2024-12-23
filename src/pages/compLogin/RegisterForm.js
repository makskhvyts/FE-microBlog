import LoginForm from './LoginForm';
import InputField from './InputField';

const RegisterForm = ({ username, password, fullName, onChange, isError }) => {
  return (
    <>
      <LoginForm
        username={username}
        password={password}
        onChange={onChange}
        isError={isError}
      />
      <InputField
        id="full_name"
        label="Full Name"
        type="text"
        value={fullName}
        onChange={(value) => onChange({ full_name: value })}
        isError={isError}
      />
    </>
  );
};

export default RegisterForm;
