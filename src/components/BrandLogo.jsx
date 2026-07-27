/**
 * BrandLogo — Single Official TIME2TRADE Logo Component.
 * Displays the single trimmed official logo asset (logo-tight.png).
 * Zero duplicate text, zero duplicate images, single clean logo mark.
 *
 * @param {string} variant - 'navbar' | 'footer'
 */
export default function BrandLogo({ variant = 'navbar' }) {
  const isFooter = variant === 'footer'
  const targetHeight = isFooter ? 56 : 46

  return (
    <div
      className={`brand-logo brand-logo--${variant}`}
      style={{
        height: `${targetHeight}px`,
        maxHeight: `${targetHeight}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <img
        src="/logo-tight.png"
        alt="TIME2TRADE"
        className="brand-logo__img"
        height={targetHeight}
        style={{
          height: `${targetHeight}px`,
          maxHeight: `${targetHeight}px`,
          width: 'auto',
          maxWidth: isFooter ? '200px' : '160px',
          objectFit: 'contain',
          display: 'block',
        }}
        draggable={false}
      />
    </div>
  )
}
