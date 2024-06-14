import {
  type Collection,
  File,
  type FileType,
  Operator,
  QueryType,
  type VisibilityLevel
} from './enums.js'

function _escape(input: unknown) {
  return String(input).replace(/'/g, "\\'")
}

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
    `'${_escape(entry.value)}' ${op} ${field}`,
  [QueryType.STRING]: ({ field, op, entry }: QueryTemplateOptions) =>
    `${field} ${op} '${_escape(entry.value)}'`,
  [QueryType.BOOLEAN]: ({ field, op, entry }: QueryTemplateOptions) =>
    `${field} ${op} ${entry.value}`,
  [QueryType.HASH]: ({ field, op, entry }: QueryTemplateOptions) =>
    `${field} ${op} { key='${entry?.key}' and value='${_escape(entry.value)}' }`
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

  /**
   * Negate the immediately following input (query).
   */
  not(): this {
    this.negateNextTerm = true
    return this
  }

  /**
   * Indicates whether the collection contains the specified value.
   */
  getByCollection(collection: Collection, value: string | string[]): this {
    this.addQuery(QueryType.COLLECTION, {
      field: collection,
      op: Operator.IN,
      entry: Array.isArray(value) ? value : [value]
    })
    return this
  }

  /**
   * Indicates whether the file name is equal to the specified file name.
   */
  getByFileName(filename: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.NAME,
      op: Operator.EQUAL,
      entry: Array.isArray(filename) ? filename : [filename]
    })
    return this
  }

  /**
   * Indicates whether the file name, description, indexableText or
   * content text properties or metadata of the file contains the specified value.
   */
  getByContent(value: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.FULL_TEXT,
      op: Operator.CONTAINS,
      entry: Array.isArray(value) ? value : [value]
    })
    return this
  }

  /**
   * Indicates whether the MIME type of the file is equal to the specified file type.
   */
  getByFileType(filetype: string | FileType | (string | FileType)[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.MIME_TYPE,
      op: Operator.EQUAL,
      entry: Array.isArray(filetype) ? filetype : [filetype]
    })
    return this
  }

  /**
   * Indicates whether the creation date of the file is equal to the specified timestamp.
   *
   * Uses RFC 3339 format, the default timezone is UTC, such as 2011-10-05T14:48:00Z.
   */
  getByCreatedAt(timestamp: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.CREATED_TIME,
      op: Operator.EQUAL,
      entry: Array.isArray(timestamp) ? timestamp : [timestamp]
    })
    return this
  }

  /**
   * Indicates whether the modified date of the file is equal to the specified timestamp.
   *
   * Uses RFC 3339 format, the default timezone is UTC, such as 2011-10-05T14:48:00Z.
   */
  getByUpdatedAt(timestamp: string | string[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.MODIFIED_TIME,
      op: Operator.EQUAL,
      entry: Array.isArray(timestamp) ? timestamp : [timestamp]
    })
    return this
  }

  /**
   * Indicates whether the visibility level of the file is equal to the specified visibility level.
   *
   * Valid values are found in the `VisibilityLevel` enumeration.
   */
  getByVisibility(visibilityLevel: VisibilityLevel | VisibilityLevel[]): this {
    this.addQuery(QueryType.STRING, {
      field: File.VISIBILITY,
      op: Operator.EQUAL,
      entry: Array.isArray(visibilityLevel)
        ? visibilityLevel
        : [visibilityLevel]
    })
    return this
  }

  /**
   * Indicates whether the file has the specified public properties.
   */
  getByPublicProp(properties: Record<string, unknown>) {
    this.addQuery(QueryType.HASH, {
      field: File.PROPERTIES,
      op: Operator.HAS,
      entry: properties
    })
    return this
  }

  /**
   * Indicates whether the file has the specified private properties.
   */
  getByPrivateProp(properties: Record<string, unknown>) {
    this.addQuery(QueryType.HASH, {
      field: File.APP_PROPERTIES,
      op: Operator.HAS,
      entry: properties
    })
    return this
  }

  /**
   * Indicates whether the file is in the trash or not.
   */
  isTrashed(value: boolean): this {
    this.addQuery(QueryType.BOOLEAN, {
      field: File.TRASHED,
      op: Operator.EQUAL,
      entry: [`${value}`]
    })
    return this
  }

  /**
   * Indicates whether the file is starred or not.
   */
  isStarred(value: boolean): this {
    this.addQuery(QueryType.BOOLEAN, {
      field: File.STARRED,
      op: Operator.EQUAL,
      entry: [`${value}`]
    })
    return this
  }

  /**
   * Indicates whether the shared drive is hidden or not.
   */
  isHidden(value: boolean): this {
    this.addQuery(QueryType.BOOLEAN, {
      field: File.HIDDEN,
      op: Operator.EQUAL,
      entry: [`${value}`]
    })
    return this
  }

  /**
   * Joins the inputs into a single string with the `and` operator.
   */
  build(): string {
    return this.queries.join(` ${Operator.AND} `)
  }
}

export default QueryBuilder
