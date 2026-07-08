import type {BadgeProps} from '../../types/interface'

const variantStyles = {
  inProgress: "bg-blue-500/10 border-blue-500 text-blue-500",
  success: "bg-emerald-500/10 border-emerald-500 text-emerald-500",
  pending: "bg-amber-500/10 border-amber-500 text-amber-500",
  urgent: "bg-red-500/10 border-red-500 text-red-500",
  technology: "bg-slate-500/10 border-slate-500 text-slate-400",
}

export const Badge = ({ text, variant }: BadgeProps) => {

  return (
    <div className={`px-2 py-1 rounded border flex justify-center items-center transition-all ${variantStyles[variant]}`}>
      <p className={`text-[10px] uppercase font-bold leading-none`}>
        {text}
      </p>
    </div>
  );
};