const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  let loadingCSS = isLoading
    ? "bg-secondary-grey-500"
    : "bg-primary-green hover:bg-[hsl(168,_80%,_16%)] ";
  return (
    <button
      disabled={isLoading}
      className={`${loadingCSS} block  transition-colors  w-full mt-10 py-3 text-white rounded-md cursor-pointer`}
    >
      {isLoading ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
