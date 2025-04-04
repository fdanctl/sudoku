export function InputWithLabel({
  checked,
  id,
  name,
  labelText,
  onChange,
}: {
  checked: boolean;
  id: string;
  name: string;
  labelText: string;
  onChange: () => void;
}) {
  return (
    <div>
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        id={id}
        name={name}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}
