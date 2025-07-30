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
  const baseClasses = "w-full px-4 py-2 text-white rounded-lg transition";
  const getColorClasses = () => {
    if (color === "green") {
      return isActive
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 cursor-pointer";
    }
    if (color === "red") {
      return isActive
        ? "bg-red-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 cursor-pointer";
    }
    return "";
  };

  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`${baseClasses} ${getColorClasses()}`}>
      {isActive ? activeText : text}
    </button>
  );
}
