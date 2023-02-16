class QueryBuilder {
  private readonly queries: string[] = []
  private negateNext: boolean = false
  private lastField: string = ''

  not () {
    this.negateNext = true
    return this
  }

  contains (value: string) {
    let query = this.negateNext ? 'not ' : ''
    query += `${this.lastField} contains '${value}'`

    this.queries.push(query)
    return this
  }

  isEqualTo (value: string) {
    let query = this.negateNext ? 'not ' : ''
    query += `${this.lastField} = '${value}'`

    this.queries.push(query)
    return this
  }

  isNotEqualTo (value: string) {
    let query = this.negateNext ? 'not ' : ''
    query += `${this.lastField} != '${value}'`

    this.queries.push(query)
    return this
  }

  isLessThan (value: string) {
    let query = this.negateNext ? 'not ' : ''
    query += `${this.lastField} < '${value}'`

    this.queries.push(query)
    return this
  }

  isLessThanOrEqualTo (value: string) {
    let query = this.negateNext ? 'not ' : ''
    query += `${this.lastField} <= '${value}'`

    this.queries.push(query)
    return this
  }

  isGreaterThan (value: string) {
    let query = this.negateNext ? 'not ' : ''
    query += `${this.lastField} > '${value}'`

    this.queries.push(query)
    return this
  }

  isGreaterThanOrEqualTo (value: string) {
    let query = this.negateNext ? 'not ' : ''
    query += `${this.lastField} >= '${value}'`

    this.queries.push(query)
    return this
  }

  inParents (folderId: string) {
    this.queries.push(`'${folderId}' in parents`)
    return this
  }

  name () {
    this.lastField = 'name'
    return this
  }

  fullText () {
    this.lastField = 'fullText'
    return this
  }

  mimeType () {
    this.lastField = 'mimeType'
    return this
  }

  modifiedTime () {
    this.lastField = 'modifiedTime'
    return this
  }

  createdTime () {
    this.lastField = 'createdTime'
    return this
  }

  build (): string {
    return this.queries.join(' and ')
  }
}

export default QueryBuilder
