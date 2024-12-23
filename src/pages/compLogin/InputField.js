const InputField = ({ id, label, type, value, onChange, isError }) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${isError ? "border-red-500" : "border-gray-300"}`}
          placeholder={label}
        />
        {isError && <p className="text-sm text-red-500 mt-2">This field is required</p>}
      </div>
    );
  };
  
  export default InputField;