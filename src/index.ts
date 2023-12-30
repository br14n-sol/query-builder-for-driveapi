import { Collection, File, Operator, QueryType } from './constants.js'

type QueryTerm = Collection | File

const QueryTemplate = {
  [QueryType.COLLECTION]: (
    value: string,
    operator: Operator,
    collection: QueryTerm
  ) => `'${value}' ${operator} ${collection}`,
  [QueryType.STRING]: (value: string, operator: Operator, term: QueryTerm) =>
    `${term} ${operator} '${value}'`,
  [QueryType.BOOLEAN]: (value: string, operator: Operator, term: QueryTerm) =>
    `${term} ${operator} ${value}`
}

class QueryBuilder {
  private readonly queries: string[] = []
  private negateNextTerm = false
  private lastTerm: QueryTerm = Collection.PARENTS

  private addQuery(
    type: QueryType,
    operator: Operator,
    values: string | string[]
  ): void {
    let query = ''

    if (this.negateNextTerm) {
      this.negateNextTerm = false
      query += `${Operator.NOT} `
    }

    if (typeof values === 'string') {
      query += QueryTemplate[type](values, operator, this.lastTerm)
    }

    if (Array.isArray(values)) {
      query += `(${values
        .map(v => QueryTemplate[type](v, operator, this.lastTerm))
        .join(` ${Operator.OR} `)})`
    }

    this.queries.push(query)
  }

  // Comparison methods (query operators)

  not(): this {
    this.negateNextTerm = true

    return this
  }

  contains(value: string): this {
    this.addQuery(QueryType.STRING, Operator.CONTAINS, value)

    return this
  }

  isEqualTo(value: string): this {
    this.addQuery(QueryType.STRING, Operator.EQUAL, value)

    return this
  }

  isNotEqualTo(value: string): this {
    this.addQuery(QueryType.STRING, Operator.UNEQUAL, value)

    return this
  }

  isLessThan(value: string): this {
    this.addQuery(QueryType.STRING, Operator.LESS_THAN, value)

    return this
  }

  isLessThanOrEqualTo(value: string): this {
    this.addQuery(QueryType.STRING, Operator.LESS_THAN_OR_EQUAL, value)

    return this
  }

  isGreaterThan(value: string): this {
    this.addQuery(QueryType.STRING, Operator.GREATER_THAN, value)

    return this
  }

  isGreaterThanOrEqualTo(value: string): this {
    this.addQuery(QueryType.STRING, Operator.GREATER_THAN_OR_EQUAL, value)

    return this
  }

  // Term methods (query terms)

  inCollection(collection: Collection, values: string | string[]): this {
    this.lastTerm = collection
    this.addQuery(QueryType.COLLECTION, Operator.IN, values)

    return this
  }

  isTrashed(value: boolean): this {
    this.lastTerm = File.TRASHED
    this.addQuery(QueryType.BOOLEAN, Operator.EQUAL, `${value}`)

    return this
  }

  name(): this {
    this.lastTerm = File.NAME

    return this
  }

  fullText(): this {
    this.lastTerm = File.FULL_TEXT

    return this
  }

  mimeType(): this {
    this.lastTerm = File.MIME_TYPE

    return this
  }

  modifiedTime(): this {
    this.lastTerm = File.MODIFIED_TIME

    return this
  }

  createdTime(): this {
    this.lastTerm = File.CREATED_TIME

    return this
  }

  build(): string {
    return this.queries.join(` ${Operator.AND} `)
  }
}

export { Collection }

export default QueryBuilder
