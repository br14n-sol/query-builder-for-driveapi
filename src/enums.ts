export enum Operator {
  CONTAINS = 'contains',
  IN = 'in',
  AND = 'and',
  OR = 'or',
  NOT = 'not',
  HAS = 'has',
  EQUAL = '=',
  NOT_EQUAL = '!=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>='
}

export enum OperatorKey {
  CONTAINS = '$contains',
  IN = '$in',
  AND = '$and',
  OR = '$or',
  NOT = '$not',
  HAS = '$has',
  EQUAL = '$eq',
  NOT_EQUAL = '$ne',
  LESS_THAN = '$lt',
  LESS_THAN_OR_EQUAL = '$lte',
  GREATER_THAN = '$gt',
  GREATER_THAN_OR_EQUAL = '$gte'
}

export enum Collection {
  PARENTS = 'parents',
  OWNERS = 'owners',
  WRITERS = 'writers',
  READERS = 'readers'
}

export enum FileProperty {
  NAME = 'name',
  FULL_TEXT = 'fullText',
  MIME_TYPE = 'mimeType',
  VISIBILITY = 'visibility',
  PROPERTIES = 'properties',
  APP_PROPERTIES = 'appProperties',
  CREATED_TIME = 'createdTime',
  MODIFIED_TIME = 'modifiedTime',
  SHARED_WITH_ME = 'sharedWithMe',
  TRASHED = 'trashed',
  STARRED = 'starred',
  HIDDEN = 'hidden'
}

export enum VisibilityLevel {
  ANYONE_CAN_FIND = 'anyoneCanFind',
  ANYONE_WITH_LINK = 'anyoneWithLink',
  DOMAIN_CAN_FIND = 'domainCanFind',
  DOMAIN_WITH_LINK = 'domainWithLink',
  LIMITED = 'limited'
}

export enum FileType {
  FOLDER = 'application/vnd.google-apps.folder',
  DOCUMENT = 'application/vnd.google-apps.document',
  SPREADSHEET = 'application/vnd.google-apps.spreadsheet',
  PRESENTATION = 'application/vnd.google-apps.presentation',
  FORM = 'application/vnd.google-apps.form'
}

export enum QueryType {
  COLLECTION = 0,
  STRING = 1,
  BOOLEAN = 2,
  HASH = 3
}
