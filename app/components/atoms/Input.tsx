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
      className={`min-w-10 rounded-lg px-4 py-2 ${className ?? ''}`}
    />
  )
}
