export const Message = ({ label, placeholder, name, register }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-sembold">{label}</label>
      <textarea
        className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
        placeholder={placeholder}
        {...register}
        name={name}
      ></textarea>
    </div>
  );
};

export const Select = ({ label, options, register, name }) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 text-text bg-main border-border rounded"
        {...register}
        name={name}
      >
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </>
  );
};

export const Input = ({
  label,
  placeholder,
  type,
  bg,
  register,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...register}
        type={type}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
          bg ? "bg-main" : "bg-dry"
        }`}
      />
    </div>
  );
};
