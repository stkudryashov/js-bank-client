const NODE_ENV = process.env.NODE_ENV

export const devMode = () => {
  return NODE_ENV ? true : false
}
