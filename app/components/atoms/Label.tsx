export function Label({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) {
  return (
    <label
      {...props}
      className={`content:mb-1 flex flex-col after:mb-5 ${className ?? ''}`}
    >
      {children}
    </label>
  )
}
