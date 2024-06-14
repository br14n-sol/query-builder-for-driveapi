/** Escape single quotes in text. e.g. "'hello'" => "\'hello\'" */
export function escapeSingleQuotes(value: string): string {
  return value.replace(/'/g, "\\'")
}
