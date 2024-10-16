export const getImageUrl = (name: string) => {
  return new URL(
    // 本地资源路径
    `/src/assets/images/${name}`,
    import.meta.url
  ).href
}
