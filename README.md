# Query Builder for DriveAPI

![node-current](https://img.shields.io/node/v/query-builder-for-driveapi?color=darkgreen)
![version](https://img.shields.io/npm/v/query-builder-for-driveapi?color=orange)
![downloads](https://img.shields.io/npm/dm/query-builder-for-driveapi)

Easily generate queries for the Google Drive API.

## Installation

```shell
npm install query-builder-for-driveapi
```

## Importing

```js
// Using ES6 Imports
import QueryBuilder, { Collection, FileType, VisibilityLevel } from 'query-builder-for-driveapi'

// Using CommonJS
const QueryBuilder = require('query-builder-for-driveapi')
const { Collection, FileType, VisibilityLevel } = QueryBuilder
```

## Usage

```js
// Create an instance
const qb = new QueryBuilder()

// Add inputs (queries)
qb.getByCollection(Collection.PARENTS, 'parent-id')
qb.getByFileName('something')

// Build inputs (queries) in a query
const query = qb.build()
//=> ('parent-id' in parents) and (name = 'something')
```

## API Reference

### Constructor

Create an instance of QueryBuilder.

```js
new QueryBuilder()
```

### Methods

From now on all the examples of each method will use an instance of `QueryBuilder` associated to the constant `qb`.

#### getByCollection(collection, value)

Indicates whether the collection contains the specified values.

##### collection

Type: `Collection`

- `Collection.PARENTS`:
```js
qb.getByCollection(Collection.PARENTS, ...).build()
//=> ('...' in parents)
```

- `Collection.OWNERS`:
```js
qb.getByCollection(Collection.OWNERS, ...).build()
//=> ('...' in owners)
```

- `Collection.WRITERS`:
```js
qb.getByCollection(Collection.WRITERS, ...).build()
//=> ('...' in writers)
```

- `Collection.READERS`:
```js
qb.getByCollection(Collection.READERS, ...).build()
//=> ('...' in readers)
```

##### value

Type: `string | string[]`

```js
qb.getByCollection(..., 'value').build()
//=> ('value' in ...)

qb.getByCollection(..., ['value-1', 'value-2']).build()
//=> ('value-1' in ... or 'value-2' in ...)
```

#### getByFileName(filename)

Indicates whether the file name is equal to the specified file name.

##### filename

Type: `string | string[]`

```js
qb.getByFileName('value').build()
//=> (name = 'value')

qb.getByFileName(['value-1', 'value-2']).build()
//=> (name = 'value-1' or name = 'value-2')
```

#### getByContent(value)

Indicates whether the file name, description, indexableText or content text properties or metadata of the file contains the specified value.

##### value

Type: `string | string[]`

```js
qb.getByContent('value').build()
//=> (fullText = 'value')

qb.getByContent(['value-1', 'value-2']).build()
//=> (fullText = 'value-1' or fullText = 'value-2')
```

#### getByFileType(filetype)

Indicates whether the MIME type of the file is equal to the specified file type.

##### filetype

Type: `string | FileType | (string | FileType)[]`

- `FileType.FOLDER`:
```js
qb.getByFileType(FileType.FOLDER).build()
//=> (mimeType = 'application/vnd.google-apps.folder')
```

- `FileType.DOCUMENT`:
```js
qb.getByFileType(FileType.DOCUMENT).build()
//=> (mimeType = 'application/vnd.google-apps.document')
```

- `FileType.SPREADSHEET`:
```js
qb.getByFileType(FileType.SPREADSHEET).build()
//=> (mimeType = 'application/vnd.google-apps.spreadsheet')
```

- `FileType.PRESENTATION`:
```js
qb.getByFileType(FileType.PRESENTATION).build()
//=> (mimeType = 'application/vnd.google-apps.presentation')
```

- `FileType.FORM`:
```js
qb.getByFileType(FileType.FORM).build()
//=> (mimeType = 'application/vnd.google-apps.form')
```

- `Others`:
```js
qb.getByFileType('image/jpeg').build()
//=> (mimeType = 'image/jpeg')

qb.getByFileType(['image/png', FileType.DOCUMENT]).build()
//=> (mimeType = 'image/png' or mimeType = 'application/vnd.google-apps.document')
```

#### getByCreatedAt(timestamp)

Indicates whether the creation date of the file is equal to the specified timestamp.

##### timestamp

Type: `string | string[]`

Uses [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format, the default timezone is UTC, such as 2011-10-05T14:48:00Z.

```js
qb.getByCreatedAt('2011-10-05T14:48:00Z').build()
//=> (createdTime = '2011-10-05T14:48:00Z')

qb.getByCreatedAt(['2019-09-07T15:50Z', '2012-06-04T12:00:00Z']).build()
//=> (createdTime = '2019-09-07T15:50Z' or createdTime = '2012-06-04T12:00:00Z')
```

#### getByUpdatedAt(timestamp)

Indicates whether the modified date of the file is equal to the specified timestamp.

##### timestamp

Type: `string | string[]`

Uses [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format, the default timezone is UTC, such as 2011-10-05T14:48:00Z.

```js
qb.getByUpdatedAt('2011-10-05T14:48:00Z').build()
//=> (modifiedTime = '2011-10-05T14:48:00Z')

qb.getByUpdatedAt(['2019-09-07T15:50Z', '2012-06-04T12:00:00Z']).build()
//=> (modifiedTime = '2019-09-07T15:50Z' or modifiedTime = '2012-06-04T12:00:00Z')
```

#### getByVisibility(visibilityLevel)

Indicates whether the visibility level of the file is equal to the specified visibility level.

##### visibilityLevel

Type: `VisibilityLevel | VisibilityLevel[]`

- `VisibilityLevel.ANYONE_CAN_FIND`:
```js
qb.getByVisibility(VisibilityLevel.ANYONE_CAN_FIND).build()
//=> (visibilityLevel = 'anyoneCanFind')
```

- `VisibilityLevel.ANYONE_WITH_LINK`:
```js
qb.getByVisibility(VisibilityLevel.ANYONE_WITH_LINK).build()
//=> (visibilityLevel = 'anyoneWithLink')
```

- `VisibilityLevel.DOMAIN_CAN_FIND`:
```js
qb.getByVisibility(VisibilityLevel.DOMAIN_CAN_FIND).build()
//=> (visibilityLevel = 'domainCanFind')
```

- `VisibilityLevel.DOMAIN_WITH_LINK`:
```js
qb.getByVisibility(VisibilityLevel.DOMAIN_WITH_LINK).build()
//=> (visibilityLevel = 'domainWithLink')
```

- `VisibilityLevel.LIMITED`:
```js
qb.getByVisibility(VisibilityLevel.LIMITED).build()
//=> (visibilityLevel = 'limited')
```

#### getByPublicProp(properties)

Indicates whether the file has the specified public properties.

#### properties

Type: `Record<string, unknown>`

```js
qb.getByPublicProp({
  name: 'wrench',
  mass: 1.3 // kg
}).build()
//=> (properties has { key='name' and value='wrench' } and properties has { key='mass' and value='1.3' })
```

#### getByPrivateProp(properties)

Indicates whether the file has the specified private properties.

##### properties

Type: `Record<string, unknown>`

```js
qb.getByPrivateProp({
  deviceId: 'd65dd82e-46fe-448f-a6fd-96009a8f97e4'
}).build()
//=> (appProperties has { key='deviceId' and value='d65dd82e-46fe-448f-a6fd-96009a8f97e4' })
```

#### isTrashed(boolean)

Indicates whether the file is in the trash or not.

```js
qb.isTrashed(true).build()
//=> (trashed = true)
```

#### isStarred(boolean)

Indicates whether the file is starred or not.

```js
qb.isStarred(true).build()
//=> (starred = true)
```

#### isHidden(boolean)

Indicates whether the shared drive is hidden or not.

```js
qb.isHidden(true).build()
//=> (hidden = true)
```

#### not()

Negate the immediately following input (query).

```js
qb.not().getByCollection(Collection.PARENTS, 'parent-id').build()
//=> not ('parent-id' in parents)

qb.not().getByCollection(Collection.PARENTS, ['parent-1', 'parent-2']).build()
//=> not ('parent-1' in parents or 'parent-2' in parents)
```

#### build()

Joins the inputs into a single string with the `and` operator.

```js
qb.getByCollection(Collection.PARENTS, 'parent-id')
qb.getByFileName('something')

qb.build()
//=> ('parent-id' in parents) and (name = 'something')
```

## Copyright & License

© 2023-2024 [Brian Fernandez](https://github.com/br14n-sol)

This project is licensed under the MIT license. See the file [LICENSE](LICENSE) for details.

## Disclaimer

No affiliation with Google Inc.

This package is a third-party offering and is not a product of Google Inc.

Google Drive™ is a trademark of Google Inc.