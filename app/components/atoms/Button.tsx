import { cva, type VariantProps } from 'class-variance-authority'

const getButtonClass = cva(
  [
    'rounded-lg',
    'bg-slate-200',
    'px-4',
    'py-2',
    'hover:bg-slate-100',
    'dark:bg-slate-400',
    'hover:dark:bg-slate-500',
    'dark:disabled:text-slate-300',
    'dark:disabled:hover:bg-slate-500',
  ],
  {
    variants: {
      buttonType: {
        primary: ['hover:cursor-pointer'],
        secondary: [],
      },
      disabled: {
        false: null,
        true: ['disabled:text-slate-400', 'disabled:hover:bg-slate-300'],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      disabled: false,
      buttonType: 'primary',
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof getButtonClass> {}

export function Button({
  className,
  buttonType,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClass({ buttonType, disabled, className })}
      {...props}
    />
  )
}
