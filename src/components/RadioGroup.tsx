import iconRadioSelected from "../assets/images/icon-radio-selected.svg";
type RadioGroupProps = {
  id: string;
  label: string;
  options: string[];
  errorMsg?: string;
  required?: boolean;
};

const RadioGroup = ({
  id,
  label,
  required,
  errorMsg,
  options,
}: RadioGroupProps) => {
  return (
    <>
      <div className="w-full mb-7">
        <p id={id} className=" font-semibold text-secondary-grey-900">
          {label}
          {required && <span className="text-primary-green ml-2">*</span>}
        </p>
        <div
          className="sm:flex gap-4"
          aria-live="polite"
          role="radiogroup"
          aria-labelledby={id}
        >
          {options.map((option) => (
            <div key={option} className="w-full">
              <label className="flex gap-3 items-center mt-2 border-1 border-secondary-grey-500 has-checked:bg-secondary-green has-checked:border-primary-green  has-[input:focus-visible]:outline rounded-md pl-4 p-2 transition-colors">
                <input
                  className="peer opacity-0 absolute"
                  type="radio"
                  name={id}
                  value={option}
                  aria-required={required}
                  aria-describedby="required-field"
                />
                <img
                  src={iconRadioSelected}
                  alt=""
                  className="hidden peer-checked:block"
                />
                <span className="w-4.5 h-4.5 rounded-full border-1 border-secondary-grey-900 transition peer-checked:opacity-0 peer-checked:hidden"></span>
                {option}
              </label>
            </div>
          ))}
        </div>
        {errorMsg !== undefined && errorMsg?.length > 0 && (
          <p className="text-primary-red mt-2">{errorMsg}</p>
        )}
      </div>
    </>
  );
};

export default RadioGroup;
