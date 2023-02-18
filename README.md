# Query Builder for DriveAPI

![npm](https://img.shields.io/npm/v/query-builder-for-driveapi)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/query-builder-for-driveapi)
![npm](https://img.shields.io/npm/dm/query-builder-for-driveapi)
![Libraries.io SourceRank](https://img.shields.io/librariesio/sourcerank/npm/query-builder-for-driveapi)

Easily generate queries for the Google Drive API.

## 📦 Installation

```shell
npm install query-builder-for-driveapi
```

## 🚀 Quick start

### How to import

```js
// ECMAScript
import QueryBuilder from 'query-builder-for-driveapi'

// CommonJS
const QueryBuilder = require('query-builder-for-driveapi').default
```

### How to build a query

1. Create a new instance

   ```js
   const query = new QueryBuilder()
   ```

2. Add inputs

   ```js
   query.inParents('folderId')
   query.name().contains('something')
   ```

   or

   ```js
   query.inParents('folderId').name().contains('something')
   ```

3. Build query

   ```js
   query.build() // return string
   ```

## Methods

Commonly used terms and operators are supported. You can find a list of all those supported by the Drive API at [Google Developers](https://developers.google.com/drive/api/guides/ref-search-terms).

### Terms

| Term           | Method                        | Return   | Description                                                                                                                                                                             |
|----------------|-------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `parents`      | `inParents(folderId: string)` | Instance | Indicates whether the `parent` collection contains the specified ID.                                                                                                                    |
| `name`         | `name()`                      | Instance | Select the term `name` to be used with methods like: `contains()`, `isEqualTo()` and `isNotEqualTo()`                                                                                   |
| `fullText`     | `fullText()`                  | Instance | Select the term `fullText` to be used with methods like: `contains()`                                                                                                                   |
| `mimeType`     | `mimeType()`                  | Instance | Select the term `mimeType` to be used with methods like: `contains()`, `isEqualTo()` and `isNotEqualTo()`                                                                               |
| `modifiedTime` | `modifiedTime()`              | Instance | Select the term `modifiedTime` to be used with methods like: `isLessThan()`, `isLessThanOrEqualTo()`, `isEqualTo()`, `isNotEqualTo()`, `isGreaterThanOrEqualTo()` and `isGreaterThan()` |
| `createdTime`  | `createdTime()`               | Instance | Select the term `createdTime` to be used with methods like: `isLessThan()`, `isLessThanOrEqualTo()`, `isEqualTo()`, `isNotEqualTo()`, `isGreaterThanOrEqualTo()` and `isGreaterThan()`  |

### Operators

| Operator   | Method                                  | Return   | Description                |
|------------|-----------------------------------------|----------|----------------------------|
| `contains` | `contains(value: string)`               | Instance | N/A                        |
| `=`        | `isEqualTo(value: string)`              | Instance | N/A                        |
| `!=`       | `isNotEqualTo(value: string)`           | Instance | N/A                        |
| `<`        | `isLessThan(value: string)`             | Instance | N/A                        |
| `<=`       | `isLessThanOrEqualTo(value: string)`    | Instance | N/A                        |
| `>`        | `isGreaterThan(value: string)`          | Instance | N/A                        |
| `>=`       | `isGreaterThanOrEqualTo(value: string)` | Instance | N/A                        |
| `not`      | `not()`                                 | Instance | Negate the following term. |

### Build

| Method    | Return | Description                                                      |
|-----------|--------|------------------------------------------------------------------|
| `build()` | String | Returns a string with the inputs joined with the `and` operator. |

## License

MIT License © 2023 - [Brian Fernandez](https://twitter.com/br14n_sol)
