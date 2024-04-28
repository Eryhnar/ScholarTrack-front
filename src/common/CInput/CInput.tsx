// import "./CInput.css"

interface CInputProps {
    className?: string
    type: string
    placeholder: string
    name: string
    disabled?: boolean
    value: string
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void
    min?: string
}

export const CInput: React.FC<CInputProps> = ({
  className = "default-custom-input",
  type,
  placeholder,
  name,
  disabled = false,
  value,
  onChangeFunction,
  min,
}: CInputProps): JSX.Element => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChangeFunction}
      min={min}
    />
  );
};