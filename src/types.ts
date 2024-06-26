import type {
  Collection,
  FileProperty,
  Operator,
  OperatorKey,
  SharedDriveProperty,
  VisibilityLevel
} from './enums.js'

type PartialRecord<K extends PropertyKey, T> = Partial<Record<K, T>>

type EqualityOps = OperatorKey.EQUAL | OperatorKey.NOT_EQUAL

type StringOps = EqualityOps | OperatorKey.CONTAINS

type ComparisonOps =
  | EqualityOps
  | OperatorKey.LESS_THAN
  | OperatorKey.LESS_THAN_OR_EQUAL
  | OperatorKey.GREATER_THAN
  | OperatorKey.GREATER_THAN_OR_EQUAL

export type OpKeyMap = PartialRecord<
  OperatorKey,
  string | number | (string | number)[]
>

export type CollectionMap = PartialRecord<Collection, string | string[]>

export type FileNameOpMap = PartialRecord<StringOps, string | string[]>

export type FileTypeOpMap = PartialRecord<StringOps, string | string[]>

export type VisibilityOpMap = PartialRecord<
  EqualityOps,
  VisibilityLevel | VisibilityLevel[]
>

/**
 * Common mapping with operators for createdAt, updatedAt, viewedAt,
 * organizerCount and memberCount methods.
 */
export type ComparisonOpMap<T> = PartialRecord<ComparisonOps, T | T[]>

export type ShortcutTargetIdOpMap = PartialRecord<
  EqualityOps,
  string | string[]
>

export type OrgDriveIdOpMap = PartialRecord<EqualityOps, string | string[]>

type Field = Collection | FileProperty | SharedDriveProperty

export type QueryTemplateOptions = {
  field: Field
  operator: Operator
  entry: {
    key: string
    value: unknown
  }
}

type EntryType =
  | string
  | number
  | (string | number)[]
  | OpKeyMap
  | Record<string, unknown | unknown[]>

export type AddQueryOptions = {
  field: Field
  defOperator: Operator
  entry: EntryType
}
