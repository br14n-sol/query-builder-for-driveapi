# Changelog

## [3.0.0](https://github.com/br14n-sol/query-builder-for-driveapi/compare/v2.0.2...v3.0.0) (2024-06-26)


### ⚠ BREAKING CHANGES

* drop support for cjs
* This change sets the minimum required Node.js version to 18.20.2. Users with Node.js versions below this minimum will need to upgrade their Node.js installation to use this package.

### Features

* add `negate()` as a replacement for the `not()` method ([4df8732](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4df873217b87d6d2d566c3fd71ccc0e7d17b743f))
* add `QueryType.NUMBER` ([6b739cf](https://github.com/br14n-sol/query-builder-for-driveapi/commit/6b739cfdca6b413b50095eb5f744177898b8964b))
* add `SharedDriveProperty` enum ([3a79b7a](https://github.com/br14n-sol/query-builder-for-driveapi/commit/3a79b7ade963d94dee0b86ffb3e77eee0cc92208))
* add `trashed = false` to query if trashed is not specified ([4bf845c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4bf845cf24eb9fc8316c97fac4e057c3ff140f65))
* add some utils ([45ccd1e](https://github.com/br14n-sol/query-builder-for-driveapi/commit/45ccd1e0c9414efd57d2cfb33d62352a1c9971df))
* add support to `memberCount` ([072b85c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/072b85c5b7ada902614583fde5028cdb0d7e28bd))
* add support to `organizerCount` ([3acf4b9](https://github.com/br14n-sol/query-builder-for-driveapi/commit/3acf4b9c764052a599ed42424fd9acbab2557bdd))
* add support to `orgUnitId` ([69bdaa0](https://github.com/br14n-sol/query-builder-for-driveapi/commit/69bdaa0a81476bf4f0049e47e96139f27a062f30))
* add support to `sharedWithMe` ([2785264](https://github.com/br14n-sol/query-builder-for-driveapi/commit/2785264c0183f1cf87faa90dbfd892083f586771))
* add support to `shortcutDetails.targetId` ([536f39a](https://github.com/br14n-sol/query-builder-for-driveapi/commit/536f39a55f25005828c463bcb9cf9a524a5befbd))
* add support to `viewedByMeTime` ([e82c19e](https://github.com/br14n-sol/query-builder-for-driveapi/commit/e82c19e7d701e17c2ea0f6e1ca10eef6b67dc7fe))
* change returned type of `getOperatorValueByKey()` ([01a7f9c](https://github.com/br14n-sol/query-builder-for-driveapi/commit/01a7f9c37ff088e4f0a9e4db9ead1bd31c6e2569))
* replace old methods with new ones ([985b872](https://github.com/br14n-sol/query-builder-for-driveapi/commit/985b8729673fffd1ba85c9d846cee1570d3d83c2))


### Bug Fixes

* `getOperatorValueByKey()` returns the name instead of the value ([c4a205e](https://github.com/br14n-sol/query-builder-for-driveapi/commit/c4a205edd49ea5f387623c97a3871c0beb1b8758))
* types of `isObject()` ([5a2379e](https://github.com/br14n-sol/query-builder-for-driveapi/commit/5a2379e982d35b9162a157616911f64efd979f8d))
* types to `organizerCount()` and `memberCount()` ([8b4338d](https://github.com/br14n-sol/query-builder-for-driveapi/commit/8b4338d0babc3166777bc13ed6cd4458e9e74a5c))


### Miscellaneous Chores

* bump minimum Node.js version to 18.20.2 ([8911a97](https://github.com/br14n-sol/query-builder-for-driveapi/commit/8911a9766c741f6e85a7c03e1b17926eb67f2cca))


### Build System

* drop support for cjs ([4b85395](https://github.com/br14n-sol/query-builder-for-driveapi/commit/4b85395da7442a3a32ce2c6e7f5bf5800e84d6dd))

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
