import type {
  Collection,
  FileProperty,
  Operator,
  OperatorKey,
  SharedDriveProperty,
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
 * Common operators for createdAt, updatedAt, viewedAt,
 * organizerCount and memberCount methods
 */
type ComparisonOperators =
  | OperatorKey.EQUAL
  | OperatorKey.NOT_EQUAL
  | OperatorKey.LESS_THAN
  | OperatorKey.LESS_THAN_OR_EQUAL
  | OperatorKey.GREATER_THAN
  | OperatorKey.GREATER_THAN_OR_EQUAL

type ShortcutTargetIdOperators = OperatorKey.EQUAL | OperatorKey.NOT_EQUAL

type OrgDriveIdOperators = OperatorKey.EQUAL | OperatorKey.NOT_EQUAL

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
 * Common mapping with operators for createdAt, updatedAt, viewedAt,
 * organizerCount and memberCount methods
 */
export type ComparisonMapping = PartialRecord<
  ComparisonOperators,
  string | string[]
>

export type ShortcutTargetIdMapping = PartialRecord<
  ShortcutTargetIdOperators,
  string | string[]
>

export type OrgDriveIdMapping = PartialRecord<
  OrgDriveIdOperators,
  string | string[]
>

type Field = Collection | FileProperty | SharedDriveProperty

export type QueryTemplateOptions = {
  field: Field
  operator: Operator
  entry: {
    key: string
    value: unknown
  }
}

export type AddQueryOptions = {
  field: Field
  defOperator: Operator
  entry: string | string[] | Record<string, unknown> | OperatorKeyMapping
}
