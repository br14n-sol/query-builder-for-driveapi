export enum Operator {
  CONTAINS = 'contains',
  EQUAL = '=',
  UNEQUAL = '!=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  IN = 'in',
  AND = 'and',
  OR = 'or',
  NOT = 'not',
  HAS = 'has'
}

export enum Collection {
  PARENTS = 'parents',
  OWNERS = 'owners',
  WRITERS = 'writers',
  READERS = 'readers'
}

export enum File {
  NAME = 'name',
  FULL_TEXT = 'fullText',
  MIME_TYPE = 'mimeType',
  CREATED_TIME = 'createdTime',
  MODIFIED_TIME = 'modifiedTime',
  PROPERTIES = 'properties',
  APP_PROPERTIES = 'appProperties',
  TRASHED = 'trashed'
}

export enum QueryType {
  COLLECTION = 0,
  STRING = 1,
  BOOLEAN = 2,
  HASH = 3
}
