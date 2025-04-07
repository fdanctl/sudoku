export function Button({
  style,
  text,
  onClick,
  type = "button",
}: {
  style?: string;
  text: string;
  onClick: () => void;
  type?: "button" | "reset" | "submit";
}) {
  return (
    <button
      className={`py-1 w-28 border border-outerBorderColor cursor-pointer hover:brightness-80 ${style}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
