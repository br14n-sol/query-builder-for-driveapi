export enum Operator {
  CONTAINS = 'contains',
  EQUAL = '=',
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
  VISIBILITY = 'visibility',
  PROPERTIES = 'properties',
  APP_PROPERTIES = 'appProperties',
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
