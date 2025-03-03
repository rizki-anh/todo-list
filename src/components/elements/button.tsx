interface ButtonProps {
  children?: string;
  className: string;
  id?: string;
  type?: "submit" | "reset" | "button";
  event?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  id,
  type,
  event,
}) => {
  return (
    <button className={className} id={id} type={type} onClick={event}>
      {children}
    </button>
  );
};

export default Button;
