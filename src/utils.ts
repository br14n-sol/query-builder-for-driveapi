import { Operator, OperatorKey } from './enums.js'

/** Check if value is object. e.g. { a: 1 } => true */
export function isObject(
  value: unknown
): value is Record<PropertyKey, unknown> {
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

/** Get operator value by key. e.g. '$eq' => Operator.EQUAL */
export function getOperatorValueByKey(key: OperatorKey): Operator {
  return objectEntries(OperatorKey).find(
    ([_, operatorKey]) => operatorKey === key
  )?.[0] as Operator
}

/** Ensure value is array. if not, convert to array */
export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

/** Escape single quotes in text. e.g. "'hello'" => "\'hello\'" */
export function escapeSingleQuotes(value: string): string {
  return value.replace(/'/g, "\\'")
}
