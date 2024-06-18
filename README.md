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
<tr><th align='left'>Collection</th><th align='left'>Sample</th></tr>
</thead>
<tbody>
<tr><td>parents</td><td rowspan="4">

```ts
collection({ parents: '12345' })
//=> '12345' in parents
collection({
  parents: ['12345', '67890'],
  owners: 'test@example.org',
  writers: ['test@example.org', 'test2@example.org'],
  readers: 'test2@example.org'
})
//=> (12345 in parents or 67890 in parents) and 'test@example.org' in owners and ('test@example.org' in writers or 'test2@example.org' in writers) and 'test2@example.org' in readers
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
<tr><th align='left'>Field</th><th align='left'>Sample</th></tr>
</thead>
<tbody>
<tr><td>name</td><td>

```ts
fileName('test.txt')
//=> name = 'test.txt'
fileName(['test.txt', 'test2.txt'])
//=> (name = 'test.txt' or name = 'test2.txt')
fileName({
  $eq: 'test.txt',
  $ne: ['example.txt', 'test2.txt'],
  $contains: 'test'
})
//=> name = 'test.txt' and (name != 'example.txt' or name != 'test2.txt') and name contains 'test'
```

</td></tr>
<tr><td>fullText</td><td>

```ts
content('some-content')
//=> fullText = 'some-content'
content(['some-content', 'some-other-content'])
//=> (fullText = 'some-content' or fullText = 'some-other-content')
```

</td></tr>
<tr><td>mimeType</td><td>

```ts
fileType('image/png')
//=> mimeType = 'image/png'
fileType(['image/png', 'image/jpeg'])
//=> (mimeType = 'image/png' or mimeType = 'image/jpeg')
fileType({
  $eq: 'image/png',
  $ne: ['image/jpeg', 'image/gif'],
  $contains: 'image'
})
//=> mimeType = 'image/png' and (mimeType != 'image/jpeg' or mimeType != 'image/gif') and mimeType contains 'image'
```

</td></tr>
<tr><td>visibility</td><td>

```ts
visibility('limited')
//=> visibility = 'limited'
visibility(['limited', 'public'])
//=> (visibility = 'limited' or visibility = 'public')
visibility({
  $eq: 'limited',
  $ne: ['public', 'private']
})
//=> visibility = 'limited' and (visibility != 'public' or visibility != 'private')
```

</td></tr>
<tr><td>properties</td><td>

```ts
property({
  prop: 'value',
  prop2: [123, 'value-2', true]
})
//=> properties has { key='prop' and value='value' } and (properties has { key='prop2' and value='123' } or properties has { key='prop2' and value='value-2' } or properties has { key='prop2' and value='true' })
```

</td></tr>
<tr><td>appProperties</td><td>

```ts
appProperty({
  prop: 'value',
  prop2: [123, 'value-2', true]
})
//=> appProperties has { key='prop' and value='value' } and (appProperties has { key='prop2' and value='123' } or appProperties has { key='prop2' and value='value-2' } or appProperties has { key='prop2' and value='true' })
```

</td></tr>
<tr><td>createdTime</td><td>

```ts
createdAt('2023-01-01T00:00:00.000Z')
//=> createdTime = '2023-01-01T00:00:00.000Z'
createdAt(['2023-01-01T00:00:00.000Z', '2023-01-02T00:00:00.000Z'])
//=> (createdTime = '2023-01-01T00:00:00.000Z' or createdTime = '2023-01-02T00:00:00.000Z')
createdAt({
  $eq: '2023-01-01T00:00:00.000Z',
  $ne: ['2023-01-02T00:00:00.000Z', '2023-01-03T00:00:00.000Z'],
  $lt: '2023-01-01T00:00:00.000Z',
  $lte: '2023-01-01T00:00:00.000Z',
  $gt: '2023-01-01T00:00:00.000Z',
  $gte: '2023-01-01T00:00:00.000Z'
})
//=> createdTime = '2023-01-01T00:00:00.000Z' and (createdTime != '2023-01-02T00:00:00.000Z' or createdTime != '2023-01-03T00:00:00.000Z') and createdTime < '2023-01-01T00:00:00.000Z' and createdTime <= '2023-01-01T00:00:00.000Z' and createdTime > '2023-01-01T00:00:00.000Z' and createdTime >= '2023-01-01T00:00:00.000Z'
```

</td></tr>
<tr><td>modifiedTime</td><td>

```ts
updatedAt('2023-01-01T00:00:00.000Z')
//=> modifiedTime = '2023-01-01T00:00:00.000Z'
updatedAt(['2023-01-01T00:00:00.000Z', '2023-01-02T00:00:00.000Z'])
//=> (modifiedTime = '2023-01-01T00:00:00.000Z' or modifiedTime = '2023-01-02T00:00:00.000Z')
updatedAt({
  $eq: '2023-01-01T00:00:00.000Z',
  $ne: ['2023-01-02T00:00:00.000Z', '2023-01-03T00:00:00.000Z'],
  $lt: '2023-01-01T00:00:00.000Z',
  $lte: '2023-01-01T00:00:00.000Z',
  $gt: '2023-01-01T00:00:00.000Z',
  $gte: '2023-01-01T00:00:00.000Z'
})
//=> modifiedTime = '2023-01-01T00:00:00.000Z' and (modifiedTime != '2023-01-02T00:00:00.000Z' or modifiedTime != '2023-01-03T00:00:00.000Z') and modifiedTime < '2023-01-01T00:00:00.000Z' and modifiedTime <= '2023-01-01T00:00:00.000Z' and modifiedTime > '2023-01-01T00:00:00.000Z' and modifiedTime >= '2023-01-01T00:00:00.000Z'
```
  
</td></tr>
<tr><td>viewedByMeTime</td><td>

```ts
viewedAt('2023-01-01T00:00:00.000Z')
//=> viewedByMeTime = '2023-01-01T00:00:00.000Z'
viewedAt(['2023-01-01T00:00:00.000Z', '2023-01-02T00:00:00.000Z'])
//=> (viewedByMeTime = '2023-01-01T00:00:00.000Z' or viewedByMeTime = '2023-01-02T00:00:00.000Z')
viewedAt({
  $eq: '2023-01-01T00:00:00.000Z',
  $ne: ['2023-01-02T00:00:00.000Z', '2023-01-03T00:00:00.000Z'],
  $lt: '2023-01-01T00:00:00.000Z',
  $lte: '2023-01-01T00:00:00.000Z',
  $gt: '2023-01-01T00:00:00.000Z',
  $gte: '2023-01-01T00:00:00.000Z'
})
//=> viewedByMeTime = '2023-01-01T00:00:00.000Z' and (viewedByMeTime != '2023-01-02T00:00:00.000Z' or viewedByMeTime != '2023-01-03T00:00:00.000Z') and viewedByMeTime < '2023-01-01T00:00:00.000Z' and viewedByMeTime <= '2023-01-01T00:00:00.000Z' and viewedByMeTime > '2023-01-01T00:00:00.000Z' and viewedByMeTime >= '2023-01-01T00:00:00.000Z'
```

</td></tr>
<tr><td>shortcutDetails.targetId</td><td>

```ts
shortcutTargetId('12345')
//=> shortcutDetails.targetId = '12345'
shortcutTargetId(['12345', '67890'])
//=> (shortcutDetails.targetId = '12345' or shortcutDetails.targetId = '67890')
shortcutTargetId({
  $eq: '12345',
  $ne: ['67890', '12345-2']
})
//=> shortcutDetails.targetId = '12345' and (shortcutDetails.targetId != '67890' or shortcutDetails.targetId != '12345-2')
```

</td></tr>
<tr><td>sharedWithMe</td><td>

```ts
shared()
//=> sharedWithMe = true
shared(false)
//=> sharedWithMe = false
```

</td></tr>
<tr><td>trashed</td><td>

```ts
trashed()
//=> trashed = true
trashed(false)
//=> trashed = false
```

</td></tr>
<tr><td>starred</td><td>

```ts
starred()
//=> starred = true
starred(false)
//=> starred = false
```

</td></tr>
<tr><td>orgUnitId</td><td>

```ts
orgDriveId('12345')
//=> orgUnitId = '12345'
orgDriveId(['12345', '67890'])
//=> (orgUnitId = '12345' or orgUnitId = '67890')
orgDriveId({
  $eq: '12345',
  $ne: ['67890', '12345-2']
})
//=> orgUnitId = '12345' and (orgUnitId != '67890' or orgUnitId != '12345-2')
```

</td></tr>
<tr><td>organizerCount</td><td>

```ts
organizerCount('123')
//=> organizerCount = '123'
organizerCount(['123', '678'])
//=> (organizerCount = '123' or organizerCount = '678')
organizerCount({
  $eq: '123',
  $ne: ['67890', '12345-2'],
  $lt: '586',
  $lte: '986',
  $gt: '145',
  $gte: '265'
})
//=> organizerCount = '123' and (organizerCount != '67890' or organizerCount != '12345-2') and organizerCount < '586' and organizerCount <= '986' and organizerCount > '145' and organizerCount >= '265'
```

</td></tr>
<tr><td>memberCount</td><td>

```ts
memberCount('123')
//=> memberCount = '123'
memberCount(['123', '678'])
//=> (memberCount = '123' or memberCount = '678')
memberCount({
  $eq: '123',
  $ne: ['67890', '12345-2'],
  $lt: '586',
  $lte: '986',
  $gt: '145',
  $gte: '265'
})
//=> memberCount = '123' and (memberCount != '67890' or memberCount != '12345-2') and memberCount < '586' and memberCount <= '986' and memberCount > '145' and memberCount >= '265'
```

</td></tr>
<tr><td>hidden</td><td>

```ts
hidden()
//=> hidden = true
hidden(false)
//=> hidden = false
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
