
export const mergePath = (parentPath, path) => {
  return `${parentPath.replace(/\/$/,'')}${path}`
}
