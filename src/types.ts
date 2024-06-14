import type { Collection, File, Operator } from './enums.js'

export type QueryTemplateOptions = {
  field: File | Collection
  op: Operator
  entry: {
    key?: string
    value: unknown
  }
}

export type AddQueryOpts = {
  field: File | Collection
  op: Operator
  entry: Record<string, unknown> | string[]
}
