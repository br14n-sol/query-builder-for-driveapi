import type { Collection, FileProperty, Operator } from './enums.js'

export type QueryTemplateOptions = {
  field: FileProperty | Collection
  op: Operator
  entry: {
    key: string
    value: unknown
  }
}

export type AddQueryOpts = {
  field: FileProperty | Collection
  op: Operator
  entry: Record<string, unknown> | string[]
}
