export function _escape(input: unknown) {
  return String(input).replace(/'/g, "\\'")
}
