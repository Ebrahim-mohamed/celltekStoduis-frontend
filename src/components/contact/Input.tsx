type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  isTextArea?: boolean;
};

export const Input = ({ label, error, isTextArea, ...props }: InputProps) => {
  return (
    <div className="text-white flex flex-col gap-1 w-full">
      <label className="text-[1rem] font-normal">{label}</label>

      {isTextArea ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="w-full min-h-10 max-h-40 placeholder:text-white font-[350] text-[0.8rem] outline-0 p-4 rounded-[0.75rem] bg-[#0D0D0D]"
        />
      ) : (
        <input
          {...props}
          className="w-full placeholder:text-white font-[350] text-[0.8rem] outline-0 p-4 rounded-[0.75rem] bg-[#0D0D0D]"
        />
      )}

      {error && <p className="text-red-500 text-[0.75rem]">{error}</p>}
    </div>
  );
};
