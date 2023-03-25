export const checkImageUrl = (url) => {
  if (!url) return false

  const pattern = /^https?:\/\/.+\.(png|jpg|jpeg|gif|svg|webp|bmp|ico|tiff)$/i

  return pattern.test(url)
}
