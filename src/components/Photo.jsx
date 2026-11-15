
export default function Photo({
  alt = '',
  className = '',
  ...props
}) {
  return (
    <img
      alt={alt}
      decoding="async"
      loading="lazy"
      sizes="(max-width: 640px) 50vw, 312px"
      onError={(e) => {
        e.currentTarget.style.visibility = 'hidden'
      }}
      className={className}
      {...props}
    />
  )
}
