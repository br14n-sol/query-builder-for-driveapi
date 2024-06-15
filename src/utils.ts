import { Operator, OperatorKey, QueryType } from './enums.js'
import type { QueryTemplateOptions } from './types.js'

/** Check if value is object. e.g. { a: 1 } => true */
export function isObject<K extends string, V>(
  value: unknown
): value is Record<K, V> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/** Return object entries preserving the type of key and value. */
export function objectEntries<K extends string, V>(
  obj: { [P in K]?: V } | ArrayLike<V>
): [K, V][] {
  return Object.entries(obj) as [K, V][]
}

/** Get operator key by value. e.g. Operator.EQUAL => '$eq' */
export function getOperatorKeyByValue(value: Operator): OperatorKey {
  return objectEntries(OperatorKey).find(
    ([operator, _]) => Operator[operator] === value
  )?.[1] as OperatorKey
}

/**
 * Get operator value by key. e.g. '$eq' => Operator.EQUAL
 * @returns Valid operator or undefined if key is not found.
 */
export function getOperatorValueByKey(key: string): Operator | undefined {
  const operatorName = objectEntries(OperatorKey).find(
    ([_, operatorKey]) => operatorKey === key
  )?.[0]
  return operatorName ? Operator[operatorName] : undefined
}

/** Ensure value is array. if not, convert to array */
export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

/** Escape single quotes in text. e.g. "'hello'" => "\'hello\'" */
export function escapeSingleQuotes(value: string): string {
  return value.replace(/'/g, "\\'")
}

/**
 * Generate query string.
 * @example
 * ```js
 * generateQuery(QueryType.STRING, { field: 'name', operator: Operator.EQUAL, entry: { key: '', value: 'name-1' } }
 * //=> "name = 'name-1'"
 * ```
 */
export function generateQuery(
  type: QueryType,
  options: QueryTemplateOptions
): string {
  const { field, operator, entry } = options
  const key = escapeSingleQuotes(entry.key)
  const value = escapeSingleQuotes(String(entry.value))

  return {
    [QueryType.COLLECTION]: `'${value}' ${operator} ${field}`,
    [QueryType.STRING]: `${field} ${operator} '${value}'`,
    [QueryType.BOOLEAN]: `${field} ${operator} ${value}`,
    [QueryType.HASH]: `${field} ${operator} { key='${key}' and value='${value}' }`
  }[type]
}
