import {
  FileProperty,
  Operator,
  QueryType,
  SharedDriveProperty,
  type VisibilityLevel
} from './enums.js'
import type {
  AddQueryOptions,
  CollectionMap,
  ComparisonOpMap,
  FileNameOpMap,
  FileTypeOpMap,
  OpKeyMap,
  OrgDriveIdOpMap,
  ShortcutTargetIdOpMap,
  VisibilityOpMap
} from './types.js'
import * as utils from './utils.js'

class QueryBuilder {
  private readonly queries: string[] = []
  private negateNextQuery = false

  private addQuery(type: QueryType, options: AddQueryOptions): void {
    let entries: OpKeyMap | Record<string, unknown | unknown[]> = {}

    // Handle string and array entries.
    if (!utils.isObject(options.entry)) {
      const operatorKey = utils.getOperatorKeyByValue(options.defOperator)
      entries[operatorKey] = options.entry
    }
    // Handle object entries.
    else {
      entries = options.entry
    }

    // Iterate over entries and generate query.
    for (const [key, value] of utils.objectEntries(entries)) {
      const field = options.field
      // Get operator from key or default operator.
      // Note: default operator is used when key is not found (HASH query).
      const operator = utils.getOperatorValueByKey(key) ?? options.defOperator
      const values = utils.ensureArray(value)
      // Generate query for each value.
      const queries = values.map(value => {
        const opts = { field, operator, entry: { key, value } }
        return utils.generateQuery(type, opts)
      })
      // Join queries with OR operator.
      // If there is only one query, return it directly.
      // Otherwise, return parenthesised query.
      let query =
        queries.length > 1
          ? `(${queries.join(` ${Operator.OR} `)})`
          : queries.at(0) || ''

      // Negate next query if negateNextQuery is true.
      if (this.negateNextQuery) {
        query = `not ${query}`
      }

      this.queries.push(query)
    }
  }

  negate(cb: () => void): QueryBuilder {
    // Change negate state to true before calling callback.
    this.negateNextQuery = true

    // Call callback.
    cb()

    // Reset negate state to false.
    this.negateNextQuery = false
    return this
  }

  collection(collections: CollectionMap): QueryBuilder {
    for (const [collection, entries] of utils.objectEntries(collections)) {
      this.addQuery(QueryType.COLLECTION, {
        field: collection,
        defOperator: Operator.IN,
        entry: entries
      })
    }
    return this
  }

  fileName(names: string | string[] | FileNameOpMap): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.NAME,
      defOperator: Operator.EQUAL,
      entry: names
    })
    return this
  }

  content(inputs: string | string[]): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.FULL_TEXT,
      defOperator: Operator.CONTAINS,
      entry: inputs
    })
    return this
  }

  fileType(types: string | string[] | FileTypeOpMap): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.MIME_TYPE,
      defOperator: Operator.EQUAL,
      entry: types
    })
    return this
  }

  visibility(
    levels: VisibilityLevel | VisibilityLevel[] | VisibilityOpMap
  ): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.VISIBILITY,
      defOperator: Operator.EQUAL,
      entry: levels
    })
    return this
  }

  property(props: Record<string, unknown | unknown[]>): QueryBuilder {
    this.addQuery(QueryType.HASH, {
      field: FileProperty.PROPERTIES,
      defOperator: Operator.HAS,
      entry: props
    })
    return this
  }

  appProperty(props: Record<string, unknown | unknown[]>): QueryBuilder {
    this.addQuery(QueryType.HASH, {
      field: FileProperty.APP_PROPERTIES,
      defOperator: Operator.HAS,
      entry: props
    })
    return this
  }

  createdAt(dates: string | string[] | ComparisonOpMap<string>): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.CREATED_TIME,
      defOperator: Operator.EQUAL,
      entry: dates
    })
    return this
  }

  updatedAt(dates: string | string[] | ComparisonOpMap<string>): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.MODIFIED_TIME,
      defOperator: Operator.EQUAL,
      entry: dates
    })
    return this
  }

  viewedAt(dates: string | string[] | ComparisonOpMap<string>): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.VIEWED_BY_ME_TIME,
      defOperator: Operator.EQUAL,
      entry: dates
    })
    return this
  }

  shortcutTargetId(
    ids: string | string[] | ShortcutTargetIdOpMap
  ): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.SHORTCUT_TARGET_ID,
      defOperator: Operator.EQUAL,
      entry: ids
    })
    return this
  }

  shared(bool?: boolean): QueryBuilder {
    this.addQuery(QueryType.BOOLEAN, {
      field: FileProperty.SHARED_WITH_ME,
      defOperator: Operator.EQUAL,
      entry: `${bool ?? true}`
    })
    return this
  }

  trashed(bool?: boolean): QueryBuilder {
    this.addQuery(QueryType.BOOLEAN, {
      field: FileProperty.TRASHED,
      defOperator: Operator.EQUAL,
      entry: `${bool ?? true}`
    })
    return this
  }

  starred(bool?: boolean): QueryBuilder {
    this.addQuery(QueryType.BOOLEAN, {
      field: FileProperty.STARRED,
      defOperator: Operator.EQUAL,
      entry: `${bool ?? true}`
    })
    return this
  }

  orgDriveId(ids: string | string[] | OrgDriveIdOpMap): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: SharedDriveProperty.ORG_UNIT_ID,
      defOperator: Operator.EQUAL,
      entry: ids
    })
    return this
  }

  organizerCount(
    counts: number | number[] | ComparisonOpMap<number>
  ): QueryBuilder {
    this.addQuery(QueryType.NUMBER, {
      field: SharedDriveProperty.ORGANIZER_COUNT,
      defOperator: Operator.EQUAL,
      entry: counts
    })
    return this
  }

  memberCount(
    counts: number | number[] | ComparisonOpMap<number>
  ): QueryBuilder {
    this.addQuery(QueryType.NUMBER, {
      field: SharedDriveProperty.MEMBER_COUNT,
      defOperator: Operator.EQUAL,
      entry: counts
    })
    return this
  }

  hidden(bool?: boolean): QueryBuilder {
    this.addQuery(QueryType.BOOLEAN, {
      field: SharedDriveProperty.HIDDEN,
      defOperator: Operator.EQUAL,
      entry: `${bool ?? true}`
    })
    return this
  }

  build(): string {
    const hasTrashed = this.queries.some(query => query.includes('trashed'))
    !hasTrashed && this.trashed(false)
    return this.queries.join(` ${Operator.AND} `)
  }
}

export default QueryBuilder
