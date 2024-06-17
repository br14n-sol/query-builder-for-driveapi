import type {
  Collection,
  FileProperty,
  Operator,
  OperatorKey,
  VisibilityLevel
} from './enums.js'

type PartialRecord<K extends PropertyKey, T> = Partial<Record<K, T>>

type FileNameOperators =
  | OperatorKey.EQUAL
  | OperatorKey.NOT_EQUAL
  | OperatorKey.CONTAINS

type FileTypeOperators =
  | OperatorKey.EQUAL
  | OperatorKey.NOT_EQUAL
  | OperatorKey.CONTAINS

type VisibilityOperators = OperatorKey.EQUAL | OperatorKey.NOT_EQUAL

/**
 * Common operators for createdAt, updatedAt and viewedAt methods
 */
type DateOperators =
  | OperatorKey.EQUAL
  | OperatorKey.NOT_EQUAL
  | OperatorKey.LESS_THAN
  | OperatorKey.LESS_THAN_OR_EQUAL
  | OperatorKey.GREATER_THAN
  | OperatorKey.GREATER_THAN_OR_EQUAL

type ShortcutTargetIdOperators = OperatorKey.EQUAL | OperatorKey.NOT_EQUAL

export type OperatorKeyMapping = PartialRecord<OperatorKey, string | string[]>

export type CollectionMapping = PartialRecord<Collection, string | string[]>

export type FileNameMapping = PartialRecord<
  FileNameOperators,
  string | string[]
>

export type FileTypeMapping = PartialRecord<
  FileTypeOperators,
  string | string[]
>

export type VisibilityMapping = PartialRecord<
  VisibilityOperators,
  VisibilityLevel | VisibilityLevel[]
>

/**
 * Common mapping with operators for createdAt, updatedAt and viewedAt methods
 */
export type DateMapping = PartialRecord<DateOperators, string | string[]>

export type ShortcutTargetIdMapping = PartialRecord<
  ShortcutTargetIdOperators,
  string | string[]
>

export type QueryTemplateOptions = {
  field: FileProperty | Collection
  operator: Operator
  entry: {
    key: string
    value: unknown
  }
}

export type AddQueryOptions = {
  field: FileProperty | Collection
  defOperator: Operator
  entry: string | string[] | Record<string, unknown> | OperatorKeyMapping
}
