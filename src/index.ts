import { Collection, File, Operator, QueryType } from './constants.js'

type QueryTemplateOptions = {
  field: File | Collection
  op: Operator
  entry: {
    key?: string
    value: unknown
  }
}

const QueryTemplate = {
  [QueryType.COLLECTION]: ({ field, op, entry }: QueryTemplateOptions) =>
    `'${entry.value}' ${op} ${field}`,
  [QueryType.STRING]: ({ field, op, entry }: QueryTemplateOptions) =>
    `${field} ${op} '${entry.value}'`,
  [QueryType.BOOLEAN]: ({ field, op, entry }: QueryTemplateOptions) =>
    `${field} ${op} ${entry.value}`
}

type AddQueryOpts = {
  field: File | Collection
  op: Operator
  entry: Record<string, unknown> | string[]
}

class QueryBuilder {
  private readonly queries: string[] = []
  private negateNextTerm = false

  private addQuery(type: QueryType, options: AddQueryOpts): void {
    const { field, op, entry } = options
    let query = ''

    if (this.negateNextTerm) {
      this.negateNextTerm = false
      query += `${Operator.NOT} `
    }

    const _queries = []
    for (const key in entry) {
      const value = entry[key as keyof typeof entry]
      _queries.push(
        QueryTemplate[type]({ field, op, entry: { key: `${key}`, value } })
      )
    }

    query += `(${_queries.join(
      ` ${Array.isArray(entry) ? Operator.OR : Operator.AND} `
    )})`
    this.queries.push(query)
  }

  not(): this {
    this.negateNextTerm = true
    return this
  }

  getByCollection(collection: Collection, value: string | string[]): this {
    this.addQuery(QueryType.COLLECTION, {
      field: collection,
      op: Operator.IN,
      entry: Array.isArray(value) ? value : [value]
    })
    return this
  }

  getByFileName(filename: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.NAME,
      op: Operator.EQUAL,
      entry: Array.isArray(filename) ? filename : [filename]
    })
    return this
  }

  getByContent(value: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.FULL_TEXT,
      op: Operator.EQUAL,
      entry: Array.isArray(value) ? value : [value]
    })
    return this
  }

  getByFileType(filetype: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.MIME_TYPE,
      op: Operator.EQUAL,
      entry: Array.isArray(filetype) ? filetype : [filetype]
    })
    return this
  }

  getByCreatedAt(timestamp: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.CREATED_TIME,
      op: Operator.EQUAL,
      entry: Array.isArray(timestamp) ? timestamp : [timestamp]
    })
    return this
  }

  getByUpdatedAt(timestamp: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.MODIFIED_TIME,
      op: Operator.EQUAL,
      entry: Array.isArray(timestamp) ? timestamp : [timestamp]
    })
    return this
  }

  isTrashed(value: boolean): this {
    this.addQuery(QueryType.BOOLEAN, {
      field: File.TRASHED,
      op: Operator.EQUAL,
      entry: [`${value}`]
    })
    return this
  }

  build(): string {
    return this.queries.join(` ${Operator.AND} `)
  }
}

export { Collection }

export default QueryBuilder
