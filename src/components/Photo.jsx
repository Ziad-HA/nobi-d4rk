// <img> that hides itself if the photo fails to load, so the grey panel behind it still looks intentional.
export default function Photo({ alt = '', className = '', ...props }) {
  return (
    <img
      alt={alt}
      decoding="async"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.visibility = 'hidden'
      }}
      className={className}
      {...props}
    />
  )
}
