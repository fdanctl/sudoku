export function Button({
  text,
  onClick,
  type = "button",
}: {
  text: string;
  onClick: () => void;
  type?: "button" | "reset" | "submit";
}) {
  return (
    <button 
      className="border border-amber-200 cursor-pointer"
      type={type} 
      onClick={onClick}>
      {text}
    </button>
  );
}
