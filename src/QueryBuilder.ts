import {
  FileProperty,
  Operator,
  QueryType,
  type VisibilityLevel
} from './enums.js'
import type {
  AddQueryOptions,
  CollectionMapping,
  ComparisonMapping,
  FileNameMapping,
  FileTypeMapping,
  OperatorKeyMapping,
  ShortcutTargetIdMapping,
  VisibilityMapping
} from './types.js'
import * as utils from './utils.js'

class QueryBuilder {
  private readonly queries: string[] = []

  private addQuery(type: QueryType, options: AddQueryOptions): void {
    let entries: OperatorKeyMapping | Record<string, unknown | unknown[]> = {}

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
      const query =
        queries.length > 1
          ? `(${queries.join(` ${Operator.OR} `)})`
          : queries.at(0) || ''

      this.queries.push(query)
    }
  }

  // TODO: Add alternative to negate query.
  // TODO: Add support to memberCount.
  // TODO: Add support to organizerCount.
  // TODO: Add support to orgUnitId.

  collection(collections: CollectionMapping): QueryBuilder {
    for (const [collection, entries] of utils.objectEntries(collections)) {
      this.addQuery(QueryType.COLLECTION, {
        field: collection,
        defOperator: Operator.IN,
        entry: entries
      })
    }
    return this
  }

  fileName(names: string | string[] | FileNameMapping): QueryBuilder {
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

  fileType(types: string | string[] | FileTypeMapping): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.MIME_TYPE,
      defOperator: Operator.EQUAL,
      entry: types
    })
    return this
  }

  visibility(
    levels: VisibilityLevel | VisibilityLevel[] | VisibilityMapping
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

  createdAt(dates: string | string[] | ComparisonMapping): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.CREATED_TIME,
      defOperator: Operator.EQUAL,
      entry: dates
    })
    return this
  }

  updatedAt(dates: string | string[] | ComparisonMapping): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.MODIFIED_TIME,
      defOperator: Operator.EQUAL,
      entry: dates
    })
    return this
  }

  viewedAt(dates: string | string[] | ComparisonMapping): QueryBuilder {
    this.addQuery(QueryType.STRING, {
      field: FileProperty.VIEWED_BY_ME_TIME,
      defOperator: Operator.EQUAL,
      entry: dates
    })
    return this
  }

  shortcutTargetId(
    ids: string | string[] | ShortcutTargetIdMapping
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

  hidden(bool?: boolean): QueryBuilder {
    this.addQuery(QueryType.BOOLEAN, {
      field: FileProperty.HIDDEN,
      defOperator: Operator.EQUAL,
      entry: `${bool ?? true}`
    })
    return this
  }

  build(): string {
    // TODO: Add trashed = false to query if trashed is not specified.
    return this.queries.join(` ${Operator.AND} `)
  }
}

export default QueryBuilder
