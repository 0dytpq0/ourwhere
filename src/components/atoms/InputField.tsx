interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder }) => (
  <div>
    <div>{label}</div>
    <input type={type} placeholder={placeholder} className="border-2 rounded-md border-gray-500 p-1 w-full" />
  </div>
);
