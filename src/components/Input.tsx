type InputProps = {
  id: string;
  label: string;
  errorMsg?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  handleBlurValidation?: (id: string, inputValue: string) => void;
};

const Input = ({
  id,
  label,
  required,
  errorMsg,
  type = "text",
  handleBlurValidation,
}: InputProps) => {
  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    handleBlurValidation?.(id, inputValue);
  };
  let borderCss = errorMsg ? "border-primary-red" : "border-secondary-grey-500";

  return (
    <>
      <div className="w-full mb-7" aria-live="polite">
        <label className="font-semibold text-secondary-grey-900" htmlFor={id}>
          {label}
        </label>
        {required && <span className="text-primary-green ml-2">*</span>}
        <input
          className={`block w-full mt-2 border-1 transition-all hover:border-primary-green cursor-pointer rounded-md pl-4 p-2 ${borderCss}`}
          type={type}
          id={id}
          name={id}
          aria-required={required}
          onBlur={handleBlur}
          aria-describedby="required-field"
        />

        {errorMsg !== undefined && errorMsg?.length > 0 && (
          <p className="text-primary-red mt-2">{errorMsg}</p>
        )}
      </div>
    </>
  );
};

export default Input;
