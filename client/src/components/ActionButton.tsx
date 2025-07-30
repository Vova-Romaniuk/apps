export default function ActionButton({
  isActive,
  onClick,
  text,
  activeText,
  color,
}: {
  isActive: boolean;
  onClick: () => void;
  text: string;
  activeText: string;
  color: "green" | "red";
}) {
  const base = "w-full px-4 py-2 text-white rounded-lg transition";
  const styles = isActive
    ? `bg-${color}-400 cursor-not-allowed`
    : `bg-${color}-500 hover:bg-${color}-600 cursor-pointer`;

  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`${base} ${styles}`}>
      {isActive ? activeText : text}
    </button>
  );
}
