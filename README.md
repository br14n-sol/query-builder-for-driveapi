<h1 align="center">
  query-builder-for-driveapi
</h1>

<p align="center">
  <b>Easily generate queries for the Google Drive™ API.</b>
</p>

<div align="center">

  ![license](https://img.shields.io/npm/l/query-builder-for-driveapi?color=blue)
  ![node-current](https://img.shields.io/node/v/query-builder-for-driveapi?color=darkgreen)
  ![version](https://img.shields.io/npm/v/query-builder-for-driveapi?color=orange)
  ![downloads](https://img.shields.io/npm/dt/query-builder-for-driveapi.svg)

</div>

## Installation

```shell
npm install query-builder-for-driveapi
```

## Get Started

Before we start with the basic usage, let's look at all the classes and enums exported from this package.

```ts
import QueryBuilder, { // Class builder for generating queries
  FileType, // Enum with basic file types (mime types)
  VisibilityLevel // Enum with visibility levels
} from 'query-builder-for-driveapi'
```

## Basic Usage

```ts
// Create an instance of QueryBuilder
const qb = new QueryBuilder()

// Add inputs (queries) to the query builder
qb.collection({ parents: 'parent-id' })
qb.fileName('test.txt')

// Build the query into a string
const query = qb.build()
//=> 'parent-id' in parents and name = 'test.txt' and trashed = false
```

> [!IMPORTANT]
> To avoid "accidents", the `build()` method adds a `trashed = false` to the query by default. <br>
> <b>Note: If you want to change this behavior in your query, simply call the `trashed()` method before calling the `build()` method.</b>

## Supported Collections

<table>
<thead>
<tr><th align='left'>Collection</th><th align='left'>Supported Operators</th><th align='left'>Method</th></tr>
</thead>
<tbody>
<tr><td>parents</td><td rowspan="4">

- In (∈)

</td><td rowspan="4">

```ts
collection({
  [K in Collection]?: string | string[]
})
```

</td></tr>
<tr><td>owners</td></tr>
<tr><td>writers</td></tr>
<tr><td>readers</td></tr>
</tbody>
</table>

## Supported fields

<table>
<thead>
<tr><th align='left'>Field</th><th align='left'>Supported Operators</th><th align='left'>Method</th></tr>
</thead>
<tbody>
<tr><td>name</td><td rowspan="2">

- Equal to (=): `$eq`
- Not equal to (≠): `$ne`
- Contains (⊇): `$contains`

</td><td>

```ts
fileName(string | string[])
fileName({
  [K in Operator]?: string | string[]
})
```

</td></tr>
<tr><td>mimeType</td><td>

```ts
fileType(string | string[])
fileType({
  [K in Operator]?: string | string[]
})
```

</td></tr>
<tr><td>fullText</td><td>

- Contains (⊇)

</td><td>

```ts
content(string | string[])
```

</td></tr>
<tr><td>properties</td><td rowspan="2">

- Has (∋)

</td><td>

```ts
property({
  [K in string]: unknown | unknown[]
})
```

</td></tr>
<tr><td>appProperties</td><td>

```ts
appProperty({
  [K in string]: unknown | unknown[]
})
```

</td></tr>
<tr><td>visibility</td><td rowspan="3">

- Equal to (=): `$eq`
- Not equal to (≠): `$ne`

</td><td>

```ts
visibility(string | string[])
visibility({
  [K in Operator]?: string | string[]
})
```

</td></tr>
<tr><td>shortcutDetails.targetId</td><td>

```ts
shortcutTargetId(string | string[])
shortcutTargetId({
  [K in Operator]?: string | string[]
})
```

</td></tr>
<tr><td>orgUnitId</td><td>

```ts
orgDriveId(string | string[])
orgDriveId({
  [K in Operator]?: string | string[]
})
```

</td></tr>
<tr><td>sharedWithMe</td><td rowspan="4">

- Equal to (=)

</td><td>

```ts
shared(boolean?) // default: true
```

</td></tr>
<tr><td>trashed</td><td>

```ts
trashed(boolean?) // default: true
```

</td></tr>
<tr><td>starred</td><td>

```ts
starred(boolean?) // default: true
```

</td></tr>
<tr><td>hidden</td><td>

```ts
hidden(boolean?) // default: true
```

</td></tr>
<tr><td>createdTime</td><td rowspan="5">

- Equal to (=): `$eq`
- Not equal to (≠): `$ne`
- Less than (<): `$lt`
- Less than or equal to (≤): `$lte`
- Greater than (>): `$gt`
- Greater than or equal to (≥): `$gte`

</td><td>

```ts
createdAt(string | string[])
createdAt({
  [K in Operator]?: string | string[]
})
```

</td></tr>
<tr><td>modifiedTime</td><td>

```ts
updatedAt(string | string[])
updatedAt({
  [K in Operator]?: string | string[]
})
```
  
</td></tr>
<tr><td>viewedByMeTime</td><td>

```ts
viewedAt(string | string[])
viewedAt({
  [K in Operator]?: string | string[]
})
```

</td></tr>
<tr><td>organizerCount</td><td>

```ts
organizerCount(number | number[])
organizerCount({
  [K in Operator]?: number | number[]
})
```

</td></tr>
<tr><td>memberCount</td><td>

```ts
memberCount(number | number[])
memberCount({
  [K in Operator]?: number | number[]
})
```

</td></tr>
</tbody>
</table>

## Copyright & License

© 2023 [Brian Fernandez](https://github.com/br14n-sol)

This project is licensed under the MIT license. See the file [LICENSE](LICENSE) for details.

## Disclaimer

No affiliation with Google Inc.

This package is a third-party offering and is not a product of Google Inc.

Google Drive™ is a trademark of Google Inc.
