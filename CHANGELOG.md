# Changelog

## [3.0.0](https://github.com/br14n-sol/query-builder-for-driveapi/compare/v2.0.2...v3.0.0) (2024-06-26)


### ⚠ BREAKING CHANGES

* The package now only supports ES modules. Use the previous version v2.0.2 if you need support for CommonJS environments. ([4b85395](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4b85395da7442a3a32ce2c6e7f5bf5800e84d6dd), [f267d28](https://github.com/br14n-sol/query-builder-for-driveapi/commit/f267d28be0121e2ffb2bebd9b6e5da15471e3fdd))
* The minimum required version of Node.js went from 14.0.0 to 18.20.3 ([8c8fd80](https://github.com/br14n-sol/query-builder-for-driveapi/commit/8c8fd80379e7934a3aab2f98d214611446e3f309))
* The names of all methods have changed, see the detailed changes in the table below. ([985b872](https://github.com/br14n-sol/query-builder-for-driveapi/commit/985b8729673fffd1ba85c9d846cee1570d3d83c2), [4df8732](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4df873217b87d6d2d566c3fd71ccc0e7d17b743f))

| Old Method           | New Method        |
| -------------------- | ----------------- |
| `not()`              | `negate()`        |
| `getByCollection()`  | `collection()`    |
| `getByFileName()`    | `fileName()`      |
| `getByContent()`     | `content()`       |
| `getByFileType()`    | `fileType()`      |
| `getByCreatedAt()`   | `createdAt()`     |
| `getByUpdatedAt()`   | `updatedAt()`     |
| `getByVisibility()`  | `visibility()`    |
| `getByPublicProp()`  | `properties()`    |
| `getByPrivateProp()` | `appProperties()` |
| `isTrashed()`        | `trashed()`       |
| `isStarred()`        | `starred()`       |
| `isHidden()`         | `hidden()`        |

### Features

* Now negating queries is simpler and easier to read. ([4df8732](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4df873217b87d6d2d566c3fd71ccc0e7d17b743f))

<table>
<thead>
<tr><th>Before</th><th>Now</th></tr>
</thead>
<tbody>
<tr>
<td>

```ts
qb.not().getByFileName('test.txt')
  .not().getByFileType('...')
```

</td>
<td>

```ts
qb.negate(() => {
  qb.fileName('test.txt')
  qb.fileType('...')
  // ...
})
```

</td>
</tr>
</tbody>
</table>

* Now the `build()` method adds `trashed = false` to the query if trashed is not specified. ([4bf845c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4bf845cf24eb9fc8316c97fac4e057c3ff140f65))
* Added support for another 6 fields, see table below. ([072b85c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/072b85c5b7ada902614583fde5028cdb0d7e28bd), [3acf4b9](https://github.com/br14n-sol/query-builder-for-driveapi/commit/3acf4b9c764052a599ed42424fd9acbab2557bdd), [69bdaa0](https://github.com/br14n-sol/query-builder-for-driveapi/commit/69bdaa0a81476bf4f0049e47e96139f27a062f30), [2785264](https://github.com/br14n-sol/query-builder-for-driveapi/commit/2785264c0183f1cf87faa90dbfd892083f586771), [536f39a](https://github.com/br14n-sol/query-builder-for-driveapi/commit/536f39a55f25005828c463bcb9cf9a524a5befbd), [e82c19e](https://github.com/br14n-sol/query-builder-for-driveapi/commit/e82c19e7d701e17c2ea0f6e1ca10eef6b67dc7fe))

| Field                      | Method               |
| -------------------------- | -------------------- |
| `memberCount`              | `memberCount()`      |
| `organizerCount`           | `organizerCount()`   |
| `orgUnitId`                | `orgDriveId()`       |
| `sharedWithMe`             | `shared()`           |
| `shortcutDetails.targetId` | `shortcutTargetId()` |
| `viewedByMeTime`           | `viewedAt()`         |

* Parenteses are now added only when strictly necessary. ([985b872](https://github.com/br14n-sol/query-builder-for-driveapi/commit/985b8729673fffd1ba85c9d846cee1570d3d83c2))

<table>
<thead>
<tr><th>Before</th><th>Now</th></tr>
</thead>
<tbody>
<tr>
<td>

```ts
qb.getByFileName('value').build()
//=> (name = 'value')

qb.getByFileName(['value-1', 'value-2']).build()
//=> (name = 'value-1' or name = 'value-2')
```

</td>
<td>

```ts
qb.fileName('value').build()
//=> name = 'value'

qb.fileName(['value-1', 'value-2']).build()
//=> (name = 'value-1' or name = 'value-2')
```

</td>
</tr>
</tbody>
</table>

### Other Changes

* ci: update checkout and setup-node to v4 ([a44352a](https://github.com/br14n-sol/query-builder-for-driveapi/commit/a44352a96adfb02ba4ae142669bf02da122e6aea))
* ci: update release-please action to v4 ([c6897c8](https://github.com/br14n-sol/query-builder-for-driveapi/commit/c6897c8f8b305d36756882a78da6e219ad1fded1))
* deps-dev: update @biomejs/biome to 1.8.2 ([731e588](https://github.com/br14n-sol/query-builder-for-driveapi/commit/731e5888b540b132bc143fbb5ba56f7b7e93b14e))
* deps-dev: update @commitlint/cli to 19.3.0 ([4d82916](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4d82916f27f7f8fd406e16ed39d1a434ad342c66))
* deps-dev: update @commitlint/config-conventional to 19.2.2 ([4d82916](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4d82916f27f7f8fd406e16ed39d1a434ad342c66))
* deps-dev: update husky to 9.0.11 ([4d82916](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4d82916f27f7f8fd406e16ed39d1a434ad342c66), [2b0d603](https://github.com/br14n-sol/query-builder-for-driveapi/commit/2b0d603b1ce8da4d0c51bd9b66287de89b916307))
* deps-dev: update lint-staged to 15.2.7 ([c18fefe](https://github.com/br14n-sol/query-builder-for-driveapi/commit/c18fefe563db467f63e72f070e8c12618cc421b9))
* deps-dev: update tsup to 8.1.0 ([e720a58](https://github.com/br14n-sol/query-builder-for-driveapi/commit/e720a580c23c43e2b83d3b9afb0e19ef36138638))
* deps-dev: downgrade typescript to 5.2.2 (supported by @biomejs/biome). ([b878a0c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/b878a0c80aca61059616f471da8c3dc069e4f4bc), [fd8d028](https://github.com/br14n-sol/query-builder-for-driveapi/commit/fd8d0285c6f1d51113f2276cf416ae9c77a77cd7))
* deps-dev: remove fix-tsup-cjs and terser. ([4b85395](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4b85395da7442a3a32ce2c6e7f5bf5800e84d6dd))

## [2.0.2](https://github.com/br14n-sol/query-builder-for-driveapi/compare/v2.0.1...v2.0.2) (2023-12-31)


### Bug Fixes

* cjs output exports ([d6877a2](https://github.com/br14n-sol/query-builder-for-driveapi/commit/d6877a2c6d6c59cb090d4b5511fb881a1d0d16d0))
* escape quotes in inputs ([68db58e](https://github.com/br14n-sol/query-builder-for-driveapi/commit/68db58e569f1878ee5ba9de69859ff35139004a0))

## [2.0.1](https://github.com/br14n-sol/query-builder-for-driveapi/compare/v2.0.0...v2.0.1) (2023-12-30)


### Bug Fixes

* broken CJS build ([5dd657c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/5dd657c0bc248352b4ba7544bc0c4beac325f358))

## [2.0.0](https://github.com/br14n-sol/query-builder-for-driveapi/compare/v1.1.0...v2.0.0) (2023-12-30)


### ⚠ BREAKING CHANGES

* replace existing methods with improved alternatives
* remove some methods

### Features

* add `FileType` and `VisibilityLevel` enums ([2b0faf6](https://github.com/br14n-sol/query-builder-for-driveapi/commit/2b0faf6452b2e9546dad1b7a63ed8fdb03c6612a))
* add support for `properties` and `appProperties` ([265f4a3](https://github.com/br14n-sol/query-builder-for-driveapi/commit/265f4a3594a4611627783afe5dd935d822f65831))
* add support for `starred` and `hidden` ([56fd889](https://github.com/br14n-sol/query-builder-for-driveapi/commit/56fd8892b8b74d90b37e67f58d7354e7333e6911))
* add support for `visibilityLevel` ([e44076f](https://github.com/br14n-sol/query-builder-for-driveapi/commit/e44076f9a71d7adb8c8e197b9afef1b3c98dc4c4))


### Bug Fixes

* **enum:** update value in `File` enum for `visibility` ([495f057](https://github.com/br14n-sol/query-builder-for-driveapi/commit/495f05709d4c98a1fa8e87842cc31aa5366651e8))
* operator of `getByContent` ([18222a5](https://github.com/br14n-sol/query-builder-for-driveapi/commit/18222a5d2887df4a383bc3b44db929650a81b99c))


### Code Refactoring

* remove some methods ([dfeca01](https://github.com/br14n-sol/query-builder-for-driveapi/commit/dfeca01e8d18973cee3ee08c63dc7ae7d1433484))
* replace existing methods with improved alternatives ([d8af3f7](https://github.com/br14n-sol/query-builder-for-driveapi/commit/d8af3f70c2e4bf05f2e6b8211167f7871638ba7c))

## [1.1.0](https://github.com/br14n-sol/query-builder-for-driveapi/compare/v1.0.1...v1.1.0) (2023-11-29)


### ⚠ BREAKING CHANGES

* rewrote `inParents()` as `inCollection()`
* This change sets the minimum required Node.js version to 14.0.0. Users with Node.js versions below this minimum will need to upgrade their Node.js installation to use this package.

### Features

* add `isTrashed()` method for 'trashed' term ([1a26c8b](https://github.com/br14n-sol/query-builder-for-driveapi/commit/1a26c8bd815487a05ebab36093aae1a7d355b289))
* rewrote `inParents()` as `inCollection()` ([535ccf4](https://github.com/br14n-sol/query-builder-for-driveapi/commit/535ccf440eaca6070b7bde6b94165fd6142aa18d))
* support multiple folder ids in `inParents()` ([045b4ca](https://github.com/br14n-sol/query-builder-for-driveapi/commit/045b4cab6d7800a3410c88af26d9145b2dbfcd68))


### Bug Fixes

* `not()` negates all queries, not just next ([365ddee](https://github.com/br14n-sol/query-builder-for-driveapi/commit/365ddee24c1c429666e86d6a24891e87626ac008))
* `not()` not working with `inParents()` ([27d5c5d](https://github.com/br14n-sol/query-builder-for-driveapi/commit/27d5c5d18af1e2da0d186352f84cc21abf5dd1e2))
* **build:** cjs exports for `tsup` output ([f702c3c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/f702c3ca3355e8f9d3290baaa07f9d060cc3cc16))


### Miscellaneous Chores

* bump minimum Node.js version to 14.0.0 ([871afce](https://github.com/br14n-sol/query-builder-for-driveapi/commit/871afce30f90e2516fdf37045ae95185b10ebd2c))
* release 1.1.0 ([629e91b](https://github.com/br14n-sol/query-builder-for-driveapi/commit/629e91bc981c653439e25f1a4bc65206bb952232))

## [1.0.1](https://github.com/br14n-sol/Query-Builder-for-DriveAPI/compare/v1.0.0...v1.0.1) (2023-02-18)


### Refactors

* remove repeated code and added return types explicitly ([476ddc0](https://github.com/br14n-sol/Query-Builder-for-DriveAPI/commit/476ddc0c9e55917c100c3b3c8094b37453bbd905))

## 1.0.0 (2023-02-16)


### Features

* initial code ([37ddf08](https://github.com/br14n-sol/Query-Builder-for-DriveAPI/commit/37ddf08a89fe6e75defade873ce58e237ff46905))
