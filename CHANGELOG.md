# Changelog

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
