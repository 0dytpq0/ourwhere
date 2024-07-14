import { ComponentProps, useId } from 'react';

type InputProps = {
  label?: string;
  required?: boolean;
  identity?: string;
  warnning?: string;
  innerClassName?: string;
} & ComponentProps<'input'>;

const loginStyle = 'border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-950 transition';
const modalStyle = '';
const scheduleStyle = '';
const editStyle = '';

function Input({ label, required, id, identity, warnning, innerClassName, ...props }: InputProps) {
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
      {label && identity !== 'login' && (
        <label htmlFor={inputId} className={`text-sm font-semibold ${label && 'h-4'}`}>
          {label}
        </label>
      )}
      <input id={inputId} {...props} className={inputStyle + innerClassName} />
      <label htmlFor={inputId} className={`text-sm font-semibold ${label && 'h-4'}`}>
        {warnning && required && (
          <span className="text-xs font-semibold text-gray-400 p-1">
            {warnning}
            <span className="text-red-500">*</span>{' '}
          </span>
        )}
      </label>
    </div>
  );
}

export default Input;
