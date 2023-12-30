# Changelog

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
