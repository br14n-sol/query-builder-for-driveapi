# Query Builder for DriveAPI

![node-current](https://img.shields.io/node/v/query-builder-for-driveapi?color=darkgreen)
![version](https://img.shields.io/npm/v/query-builder-for-driveapi?color=orange)
![downloads](https://img.shields.io/npm/dm/query-builder-for-driveapi)
![Libraries.io SourceRank](https://img.shields.io/librariesio/sourcerank/npm/query-builder-for-driveapi)

Easily generate queries for the Google Drive API.

## Installation

```shell
npm install query-builder-for-driveapi
```

## Importing

```js
// Using ES6 Imports
import QueryBuilder, { Collection } from 'query-builder-for-driveapi'

// Using CommonJS
const QueryBuilder = require('query-builder-for-driveapi')
const Collection = QueryBuilder.Collection
```

## Usage

```js
// Create an instance
const qb = new QueryBuilder()

// Add inputs (queries)
qb.inCollection(Collection.PARENTS, 'parent-id')
qb.name().contains('something')

// Build inputs (queries) in a query
const query = qb.build()
//=> 'parent-id' in parents and name contains 'something'
```

## API Reference

### new QueryBuilder()

Returns a QueryBuilder instance.

```js
const qb = new QueryBuilder()
```

### \<Instance\>.inCollection(collection, values)

Indicates whether the collection contains the specified values.

#### collection

Type: `Collection`

- **Collection.PARENTS**:
```js
qb.inCollection(Collection.PARENTS, ...).build()
//=> '...' in parents
```

- **Collection.OWNERS**:
```js
qb.inCollection(Collection.OWNERS, ...).build()
//=> '...' in owners
```

- **Collection.WRITERS**:
```js
qb.inCollection(Collection.WRITERS, ...).build()
//=> '...' in writers
```

- **Collection.READERS**:
```js
qb.inCollection(Collection.READERS, ...).build()
//=> '...' in readers
```

#### values

Type: `string | string[]`

```js
qb.inCollection(..., 'value').build()
//=> 'value' in ...

qb.inCollection(..., ['value-1', 'value-2']).build()
//=> ('value-1' in ... or 'value-2' in ...)
```

### \<Instance\>.isTrashed(boolean)

Whether the file is in the trash or not.

```js
qb.isTrashed(true).build()
//=> trashed = true
```

### \<Instance\>.name()

Select the term `name` to be used with methods like: `contains()`, `isEqualTo()` and `isNotEqualTo()`

```js
qb.name().isEqualTo('something').build()
//=> name = 'something'
```

### \<Instance\>.fullText()

Select the term `fullText` to be used with methods like: `contains()`

```js
qb.fullText().contains('something').build()
//=> fullText contains 'something'
```

### \<Instance\>.mimeType()

Select the term `mimeType` to be used with methods like: `contains()`, `isEqualTo()` and `isNotEqualTo()`

```js
qb.mimeType().isNotEqualTo('application/vnd.google-apps.folder').build()
//=> mimeType != 'application/vnd.google-apps.folder'
```

### \<Instance\>.modifiedTime()

Select the term `modifiedTime` to be used with methods like: `isLessThan()`, `isLessThanOrEqualTo()`, `isEqualTo()`, `isNotEqualTo()`, `isGreaterThanOrEqualTo()` and `isGreaterThan()`

```js
qb.modifiedTime().isLessThan('2012-06-04T12:00:00').build()
//=> modifiedTime < '2012-06-04T12:00:00'
```

### \<Instance\>.createdTime()

Select the term `createdTime` to be used with methods like: `isLessThan()`, `isLessThanOrEqualTo()`, `isEqualTo()`, `isNotEqualTo()`, `isGreaterThanOrEqualTo()` and `isGreaterThan()`

```js
qb.createdTime().isGreaterThan('2012-06-04T12:00:00').build()
//=> createdTime > '2012-06-04T12:00:00'
```

### \<Instance\>.contains(string)

The string is present in the previously selected term.\
**Valid for:** `name`, `fullText`, `mimeType`

```js
qb.name().contains('something').build()
//=> name contains 'something'
```

### \<Instance\>.isEqualTo(string)

The string is equal to the value of the previously selected term.\
**Valid for:** `name`, `mimeType`, `modifiedTime`, `createdTime`

```js
qb.createdTime().isEqualTo('2012-06-04T12:00:00').build()
//=> createdTime = '2012-06-04T12:00:00'
```

### \<Instance\>.isNotEqualTo(string)

The string is not equal to the value of the previously selected term.\
**Valid for:** `name`, `mimeType`, `modifiedTime`, `createdTime`

```js
qb.createdTime().isNotEqualTo('2012-06-04T12:00:00').build()
//=> createdTime != '2012-06-04T12:00:00'
```

### \<Instance\>.isLessThan(string)

The string that must be a date in [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format is less than the value of the previously selected term.\
**Valid for:** `modifiedTime`, `createdTime`

```js
qb.createdTime().isLessThan('2012-06-04T12:00:00').build()
//=> createdTime < '2012-06-04T12:00:00'
```

### \<Instance\>.isLessThanOrEqualTo(string)

The string that must be a date in [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format is less than or equal to the value of the previously selected term.\
**Valid for:** `modifiedTime`, `createdTime`

```js
qb.createdTime().isLessThanOrEqualTo('2012-06-04T12:00:00').build()
//=> createdTime <= '2012-06-04T12:00:00'
```

### \<Instance\>.isGreaterThan(string)

The string that must be a date in [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format is greater than the value of the previously selected term.\
**Valid for:** `modifiedTime`, `createdTime`

```js
qb.createdTime().isGreaterThan('2012-06-04T12:00:00').build()
//=> createdTime > '2012-06-04T12:00:00'
```

### \<Instance\>.isGreaterThanOrEqualTo(string)

The string that must be a date in [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format is greater than or equal to the value of the previously selected term.\
**Valid for:** `modifiedTime`, `createdTime`

```js
qb.createdTime().isGreaterThanOrEqualTo('2012-06-04T12:00:00').build()
//=> createdTime >= '2012-06-04T12:00:00'
```

### \<Instance\>.not()

Negate the immediately following input (query).

```js
qb.not().inCollection(Collection.PARENTS, 'parent-id').build()
//=> not 'parent-id' in parents

qb.not().inCollection(Collection.PARENTS, ['parent-1', 'parent-2']).build()
//=> not ('parent-1' in parents or 'parent-2' in parents)
```

### \<Instance\>.build()

Returns a string with the inputs joined with the `and` operator.

```js
qb.inCollection(Collection.PARENTS, 'parent-id')
qb.name().contains('something')

qb.build()
//=> 'parent-id' in parents and name contains 'something'
```

## Copyright & License

© 2023 - [Brian Fernandez](https://github.com/br14n-sol)

This project is licensed under the MIT license. See the file [LICENSE](LICENSE) for details.

## Disclaimer

No affiliation with Google Inc.

This package is a third-party offering and is not a product of Google Inc.

Google Drive™ is a trademark of Google Inc.