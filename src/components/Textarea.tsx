type TextAreaProps = {
  id: string;
  label: string;
  errorMsg?: string;
  required?: boolean;
  placeholder?: string;
  handleBlurValidation?: (id: string, inputValue: string) => void;
};

const Textarea = ({
  id,
  label,
  required,
  errorMsg,
  handleBlurValidation,
}: TextAreaProps) => {
  const handleBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <textarea
          id={id}
          rows={4}
          className={`block w-full mt-2 border-1 ${borderCss} rounded-md p-2 px-4 h-[200px] sm:h-auto`}
          name={id}
          aria-required={required}
          onBlur={handleBlur}
          aria-describedby="required-field"
        ></textarea>
        {errorMsg !== undefined && errorMsg?.length > 0 && (
          <p className="text-primary-red mt-2">{errorMsg}</p>
        )}
      </div>
    </>
  );
};

export default Textarea;
