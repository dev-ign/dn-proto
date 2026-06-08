import './Button.scss'

type ButtonVariant = 'primary' | 'outline' | 'outline-dark' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
}

export default function Button({
  variant = 'primary',
  size,
  children,
  onClick,
  href,
  className = '',
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size ? `btn--${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
