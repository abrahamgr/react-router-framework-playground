export function Input({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      {...props}
      className={`min-w-10 rounded-lg border-[1px] border-slate-300 px-4 py-2 hover:border-slate-400 ${className ?? ''}`}
    />
  )
}
