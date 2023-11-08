type QueryBuilderTermMethods = Pick<QueryBuilder, 'inParents' | 'name' | 'fullText' | 'mimeType' | 'modifiedTime' | 'createdTime'>

class QueryBuilder {
  private readonly queries: string[] = []
  private negateNextTerm: boolean = false
  private lastTerm: string = ''

  private addInput(operator: string, value: string): void {
    let query = this.negateNextTerm ? 'not ' : ''
    query += `${this.lastTerm} ${operator} '${value}'`

    this.queries.push(query)
  }

  // Comparison methods

  not(): QueryBuilderTermMethods {
    this.negateNextTerm = true
    return this
  }

  contains(value: string): QueryBuilderTermMethods {
    this.addInput('contains', value)

    return this
  }

  isEqualTo(value: string): QueryBuilderTermMethods {
    this.addInput('=', value)

    return this
  }

  isNotEqualTo(value: string): QueryBuilderTermMethods {
    this.addInput('!=', value)

    return this
  }

  isLessThan(value: string): QueryBuilderTermMethods {
    this.addInput('<', value)

    return this
  }

  isLessThanOrEqualTo(value: string): QueryBuilderTermMethods {
    this.addInput('<=', value)

    return this
  }

  isGreaterThan(value: string): QueryBuilderTermMethods {
    this.addInput('>', value)

    return this
  }

  isGreaterThanOrEqualTo(value: string): QueryBuilderTermMethods {
    this.addInput('>=', value)

    return this
  }

  // Term methods

  inParents(folderId: string): QueryBuilderTermMethods {
    this.queries.push(`'${folderId}' in parents`)
    return this
  }

  name(): Pick<this, 'contains' | 'isEqualTo' | 'isNotEqualTo'> {
    this.lastTerm = 'name'
    return this
  }

  fullText(): Pick<this, 'contains'> {
    this.lastTerm = 'fullText'
    return this
  }

  mimeType(): Pick<this, 'contains' | 'isEqualTo' | 'isNotEqualTo'> {
    this.lastTerm = 'mimeType'
    return this
  }

  modifiedTime(): Pick<this, 'isLessThan' | 'isLessThanOrEqualTo' | 'isEqualTo' | 'isNotEqualTo' | 'isGreaterThanOrEqualTo' | 'isGreaterThan'> {
    this.lastTerm = 'modifiedTime'
    return this
  }

  createdTime(): Pick<this, 'isLessThan' | 'isLessThanOrEqualTo' | 'isEqualTo' | 'isNotEqualTo' | 'isGreaterThanOrEqualTo' | 'isGreaterThan'> {
    this.lastTerm = 'createdTime'
    return this
  }

  build(): string {
    return this.queries.join(' and ')
  }
}

export default QueryBuilder
