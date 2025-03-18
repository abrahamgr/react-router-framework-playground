export function FormField({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HtmlHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      {...props}
      className={`mb-3 flex flex-col *:mb-2 ${className ?? ''}`}
    />
  )
}
