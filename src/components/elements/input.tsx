interface Inputprops  extends HTMLInputElement{
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  index?: number,
}

const Input: React.FC<Inputprops> = ({
  className,
  type,
  placeholder,
  onChange,
  id,
  name,
  value,
  index,
}) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      id={id}
      name={name}
      key={index}
    ></input>
  );
};
export default Input;
