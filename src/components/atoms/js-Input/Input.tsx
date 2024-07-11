import { ComponentProps, useId } from 'react';

type InputProps = {
  label?: string;
  required?: boolean;
  identity?: string;
} & ComponentProps<'input'>;

const loginStyle = 'border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-950 transition';
const modalStyle = '';
const editStyke = '';

function Input({ label, required, id, identity, ...props }: InputProps) {
  const inputUid = useId();
  const inputId = id || inputUid;

  let inputStyle = '';
  if (identity === 'login') {
    inputStyle = loginStyle;
  } else if (identity === 'modal') {
    inputStyle = modalStyle;
  }

  return (
    <div className="flex flex-col gap-y-1.5 [&+&]:mt-8 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold">
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input id={inputId} {...props} className={inputStyle} />
    </div>
  );
}

export default Input;
