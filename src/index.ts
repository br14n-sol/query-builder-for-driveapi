class QueryBuilder {
  private readonly queries: string[] = []
  private negateNextTerm: boolean = false
  private lastTerm: string = ''

  private addInput (operator: string, value: string): void {
    let query = this.negateNextTerm ? 'not ' : ''
    query += `${this.lastTerm} ${operator} '${value}'`

    this.queries.push(query)
  }

  not (): this {
    this.negateNextTerm = true
    return this
  }

  contains (value: string): this {
    this.addInput('contains', value)

    return this
  }

  isEqualTo (value: string): this {
    this.addInput('=', value)

    return this
  }

  isNotEqualTo (value: string): this {
    this.addInput('!=', value)

    return this
  }

  isLessThan (value: string): this {
    this.addInput('<', value)

    return this
  }

  isLessThanOrEqualTo (value: string): this {
    this.addInput('<=', value)

    return this
  }

  isGreaterThan (value: string): this {
    this.addInput('>', value)

    return this
  }

  isGreaterThanOrEqualTo (value: string): this {
    this.addInput('>=', value)

    return this
  }

  inParents (folders: string | string[]): this {
    const query = Array.isArray(folders)
      ? `(${folders.map((id) => `'${id}' in parents`).join(' or ')})`
      : `'${folders}' in parents`
    this.queries.push(query)
    return this
  }

  name (): this {
    this.lastTerm = 'name'
    return this
  }

  fullText (): this {
    this.lastTerm = 'fullText'
    return this
  }

  mimeType (): this {
    this.lastTerm = 'mimeType'
    return this
  }

  modifiedTime (): this {
    this.lastTerm = 'modifiedTime'
    return this
  }

  createdTime (): this {
    this.lastTerm = 'createdTime'
    return this
  }

  build (): string {
    return this.queries.join(' and ')
  }
}

export default QueryBuilder
