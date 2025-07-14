import successIcon from "../assets/images/icon-success-check.svg";
const SuccessToast = () => {
  return (
    <div className="animate-fade-in  bg-[hsl(168,_80%,_16%)] w-xs md:w-md rounded-xl text-white absolute top-5 left-1/2 -translate-x-1/2 p-4">
      <p className="text font-bold flex items-center gap-4 mb-2">
        <img src={successIcon} alt="Success!" />
        Message Sent!
      </p>
      <p>Thanks for completing the form. We'll be in touch soon!</p>
    </div>
  );
};

export default SuccessToast;
