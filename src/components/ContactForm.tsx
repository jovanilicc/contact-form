import { useActionState, useState, useEffect } from "react";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import SubmitButton from "./SubmitButton";
import Textarea from "./Textarea";
import SuccessToast from "./SuccessToast";

type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  queryType: string;
  userConsent: string;
};

type ContactFormProps = {
  title: string;
};
type userConsentCheckType = undefined | true | false;

const basicErrorMsg = "This field is required.";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ title }: ContactFormProps) => {
  const [userConsentCheck, setUserConsentCheck] =
    useState<userConsentCheckType>();
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleConsent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserConsentCheck(event.target.checked);
  };

  console.log(userConsentCheck);
  const handleSubmit = async (
    _prevState: null | { success: boolean },
    formData: FormData
  ) => {
    const raw = Object.fromEntries(formData);
    const data = raw as ContactFormFields;
    let hasError;

    if (data.firstName.trim().length === 0) {
      setErrorMessages((messages) => ({
        ...messages,
        firstName: basicErrorMsg,
      }));

      hasError = true;
    }
    if (data.lastName.trim().length <= 0) {
      setErrorMessages((messages) => ({
        ...messages,
        lastName: basicErrorMsg,
      }));

      hasError = true;
    }
    if (data.email.trim().length <= 0) {
      setErrorMessages((messages) => ({ ...messages, email: basicErrorMsg }));
      hasError = true;
    } else if (!emailPattern.test(data.email)) {
      setErrorMessages((messages) => ({
        ...messages,
        email: "Please enter a valid email address",
      }));
      hasError = true;
    }
    if (data.message.trim().length <= 0) {
      setErrorMessages((messages) => ({ ...messages, message: basicErrorMsg }));
      hasError = true;
    }
    if (!data.queryType) {
      setErrorMessages((messages) => ({
        ...messages,
        queryType: basicErrorMsg,
      }));
      hasError = true;
    }
    if (!data.userConsent) {
      setUserConsentCheck(false);
      hasError = true;
    }

    if (hasError) {
      return { success: false };
    }

    // send data
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitted");
    return { success: true };
  };

  const [formState, formAction, isPending] = useActionState<
    { success: boolean } | null,
    FormData
  >(handleSubmit, null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (formState?.success) {
      setShowSuccessModal(true);

      timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formState]);

  const handleBlurValidation = (id: string, inputValue: string) => {
    let error = "";

    if (inputValue.trim().length <= 0) {
      error = basicErrorMsg;
    } else if (id === "email" && !emailPattern.test(inputValue)) {
      error = "Please enter a valid email address";
    }

    setErrorMessages((prevMessages) => {
      return {
        ...prevMessages,
        [id]: error,
      };
    });
  };

  return (
    <>
      <div aria-live="polite">{showSuccessModal && <SuccessToast />}</div>
      <div className="bg-white w-3xl p-5 sm:p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-secondary-grey-900 tracking-tight pb-7">
          {title}
        </h1>

        <form action={formAction}>
          <p id="required-field" className="sr-only">
            Note: * denotes a required field
          </p>
          <div className="sm:flex gap-4">
            <Input
              id="firstName"
              label="First Name"
              required
              errorMsg={errorMessages.firstName}
              type="text"
              handleBlurValidation={handleBlurValidation}
            />
            <Input
              id="lastName"
              label="Last Name"
              required
              errorMsg={errorMessages.lastName}
              type="text"
              handleBlurValidation={handleBlurValidation}
            />
          </div>
          <Input
            id="email"
            type="email"
            label="Email Address"
            required
            errorMsg={errorMessages.email}
            handleBlurValidation={handleBlurValidation}
          />
          <RadioGroup
            id="queryType"
            label="Query Type"
            required
            options={["General Enquiry", "Support Request"]}
            errorMsg={errorMessages.queryType}
          />
          <Textarea
            id="message"
            label="Message"
            required
            errorMsg={errorMessages.message}
            handleBlurValidation={handleBlurValidation}
          />
          <div>
            <div className="flex">
              <label htmlFor="userConsent" className="flex item-center">
                <input
                  className="mr-4 checked:accent-primary-green "
                  type="checkbox"
                  id="userConsent"
                  name="userConsent"
                  value="userConsent"
                  aria-required="true"
                  onChange={handleConsent}
                  onBlur={handleConsent}
                />
                <span>
                  I consent to being contacted by the team.
                  <span className="text-primary-green ml-2">*</span>
                </span>
              </label>
            </div>
            {userConsentCheck === false && (
              <p className="text-primary-red mt-2">
                To submit this form, please consent to being contacted.
              </p>
            )}
          </div>
          <SubmitButton isLoading={isPending} />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
