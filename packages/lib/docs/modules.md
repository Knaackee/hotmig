# @hotmig/lib

## Classes

- [AlreadyInitializedError](classes/AlreadyInitializedError.md)
- [DevMigrationAlreadyExistsError](classes/DevMigrationAlreadyExistsError.md)
- [DevMigrationInvalidError](classes/DevMigrationInvalidError.md)
- [DevMigrationNotExistsError](classes/DevMigrationNotExistsError.md)
- [Driver](classes/Driver.md)
- [HotMig](classes/HotMig.md)
- [InvalidConfigError](classes/InvalidConfigError.md)
- [InvalidDriverError](classes/InvalidDriverError.md)
- [LocalMigrationNotFound](classes/LocalMigrationNotFound.md)
- [NotInitializedError](classes/NotInitializedError.md)
- [PendingMigrationsError](classes/PendingMigrationsError.md)
- [Target](classes/Target.md)
- [TestDriver](classes/TestDriver.md)

## Interfaces

- [AppliedMigration](interfaces/AppliedMigration.md)
- [HotMigConfig](interfaces/HotMigConfig.md)
- [Migration](interfaces/Migration.md)
- [MigrationModule](interfaces/MigrationModule.md)
- [OnProgressArgs](interfaces/OnProgressArgs.md)
- [TargetConfig](interfaces/TargetConfig.md)
- [TestOnProgressArgs](interfaces/TestOnProgressArgs.md)

## Functions

### listGlobal

▸ `Const` **listGlobal**(): `Promise`<{ `name`: `string` ; `version`: `string`  }[]\>

#### Returns

`Promise`<{ `name`: `string` ; `version`: `string`  }[]\>

#### Defined in

[packages/lib/src/utils/index.ts:39](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/utils/index.ts#L39)

___

### loadDriver

▸ `Const` **loadDriver**(`driver`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/lib/src/Target.ts:47](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Target.ts#L47)

___

### loadMigrationModule

▸ `Const` **loadMigrationModule**(`path`, `logger`): `Promise`<`undefined` \| [`MigrationModule`](interfaces/MigrationModule.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `logger` | `Logger`<`LoggerOptions`\> |

#### Returns

`Promise`<`undefined` \| [`MigrationModule`](interfaces/MigrationModule.md)\>

#### Defined in

[packages/lib/src/Target.ts:67](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Target.ts#L67)

___

### requireGlobal

▸ `Const` **requireGlobal**(`packageName`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `packageName` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/lib/src/utils/index.ts:7](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/utils/index.ts#L7)

___

### validateMigrationModule

▸ `Const` **validateMigrationModule**(`migration?`, `logger?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration?` | [`Migration`](interfaces/Migration.md) |
| `logger?` | `Logger`<`LoggerOptions`\> |

#### Returns

`void`

#### Defined in

[packages/lib/src/Target.ts:77](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Target.ts#L77)
