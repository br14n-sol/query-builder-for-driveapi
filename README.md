# Query Builder for DriveAPI

![node-current](https://img.shields.io/node/v/query-builder-for-driveapi?color=darkgreen)
![npm](https://img.shields.io/npm/v/query-builder-for-driveapi?color=orange)
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
import QueryBuilder, { Collection } from 'query-builder-for-driveapi'

// CommonJS
const QueryBuilder = require('query-builder-for-driveapi')
const Collection = QueryBuilder.Collection
```

### How to build a query

1. Create a new instance

   ```js
   const query = new QueryBuilder()
   ```

2. Add inputs

   ```js
   query.inCollection(Collection.PARENTS, 'folderId')
   // ...
   query.name().contains('something')
   ```

   or

   ```js
   query
      .inCollection(Collection.PARENTS, 'folderId')
      .name().contains('something')
   ```

3. Build query

   ```js
   query.build() // return string
   ```

## Methods

Commonly used terms and operators are supported. You can find a list of all those supported by the Drive API at [Google Developers](https://developers.google.com/drive/api/guides/ref-search-terms).

### Term methods (query terms)

<table>
   <thead>
      <tr>
         <th>Term</th>
         <th>Method</th>
         <th>Return</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <code>parents</code>
         </td>
         <td rowspan=4>
            <code>
               inCollection(collection: Collection, values: string | string[])
            </code>
         </td>
         <td rowspan=4>Instance</td>
         <td rowspan=4>
            Indicates whether the collection contains the specified values.
         </td>
      </tr>
      <tr>
         <td>
            <code>owners</code>
         </td>
      </tr>
      <tr>
         <td>
            <code>writers</code>
         </td>
      </tr>
      <tr>
         <td>
            <code>readers</code>
         </td>
      </tr>
      <tr>
         <td>
            <code>trashed</code>
         </td>
         <td>
            <code>isTrashed(value: boolean)</code>
         </td>
         <td>Instance</td>
         <td>
            Whether the file is in the trash or not.
         </td>
      </tr>
      <tr>
         <td>
            <code>name</code>
         </td>
         <td>
            <code>name()</code>
         </td>
         <td>Instance</td>
         <td>
            Select the term <code>name</code> to be used with methods like: <code>contains()</code>, <code>isEqualTo()</code> and <code>isNotEqualTo()</code>
         </td>
      </tr>
      <tr>
         <td>
            <code>fullText</code>
         </td>
         <td>
            <code>fullText()</code>
         </td>
         <td>Instance</td>
         <td>
            Select the term <code>fullText</code> to be used with methods like: <code>contains()</code>
         </td>
      </tr>
      <tr>
         <td>
            <code>mimeType</code>
         </td>
         <td>
            <code>mimeType()</code>
         </td>
         <td>Instance</td>
         <td>
            Select the term <code>mimeType</code> to be used with methods like: <code>contains()</code>, <code>isEqualTo()</code> and <code>isNotEqualTo()</code>
         </td>
      </tr>
      <tr>
         <td>
            <code>modifiedTime</code>
         </td>
         <td>
            <code>modifiedTime()</code>
         </td>
         <td>Instance</td>
         <td>
            Select the term <code>modifiedTime</code> to be used with methods like: <code>isLessThan()</code>, <code>isLessThanOrEqualTo()</code>, <code>isEqualTo()</code>, <code>isNotEqualTo()</code>, <code>isGreaterThanOrEqualTo()</code> and <code>isGreaterThan()</code>
         </td>
      </tr>
      <tr>
         <td>
            <code>createdTime</code>
         </td>
         <td>
            <code>createdTime()</code>
         </td>
         <td>Instance</td>
         <td>
            Select the term <code>createdTime</code> to be used with methods like: <code>isLessThan()</code>, <code>isLessThanOrEqualTo()</code>, <code>isEqualTo()</code>, <code>isNotEqualTo()</code>, <code>isGreaterThanOrEqualTo()</code> and <code>isGreaterThan()</code>
         </td>
      </tr>
   </tbody>
</table>

### Comparison methods (query operators)

| Operator | Method | Return | Description |
|-|-|-|-|
| `contains` | `contains(value: string)` | Instance | N/A |
| `=` | `isEqualTo(value: string)` | Instance | N/A |
| `!=` | `isNotEqualTo(value: string)` | Instance | N/A |
| `<` | `isLessThan(value: string)` | Instance | N/A |
| `<=` | `isLessThanOrEqualTo(value: string)` | Instance | N/A |
| `>` | `isGreaterThan(value: string)` | Instance | N/A |
| `>=` | `isGreaterThanOrEqualTo(value: string)` | Instance | N/A |
| `not` | `not()` | Instance | Negate the following term. |

### Build

| Method | Return | Description |
|-|-|-|
| `build()` | String | Returns a string with the inputs joined with the `and` operator. |

## Copyright & License

© 2023 - [Brian Fernandez](https://github.com/br14n-sol)

This project is licensed under the MIT license. See the file [LICENSE](LICENSE) for details.

## Disclaimer

No affiliation with Google Inc.

This package is a third-party offering and is not a product of Google Inc.

Google Drive™ is a trademark of Google Inc.