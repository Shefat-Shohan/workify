interface MagicButtonProps {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClases?: string;
  disabled?: boolean;
}
export default function MagicButton({
  title,
  icon,
  position,
  handleClick,
  otherClases,
  disabled = false
}: MagicButtonProps) {
  return (
    <button
    disabled={disabled}
      onClick={handleClick}
      className={`relative whitespace-nowrap inline-flex h-12 overflow-hidden rounded-lg p-[1px] w-full md:w-50`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={`inline-flex h-full w-full  ${disabled ? "cursor:not-allowed" : "cursor-pointer"} items-center justify-center rounded-lg bg-slate-950 px-7 py-1 text-sm font-medium text-white-200 backdrop-blur-3xl gap-2 ${otherClases}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
}