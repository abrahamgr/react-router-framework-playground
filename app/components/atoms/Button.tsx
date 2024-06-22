export function Button({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...props}
      className={`lastPage rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-100 disabled:text-slate-400 disabled:hover:bg-slate-300 ${className ?? ''}`}
    />
  )
}
