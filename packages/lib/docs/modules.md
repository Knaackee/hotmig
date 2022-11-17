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

▸ **listGlobal**(): `Promise`<{ `name`: `string` ; `version`: `string`  }[]\>

#### Returns

`Promise`<{ `name`: `string` ; `version`: `string`  }[]\>

#### Defined in

[packages/lib/src/utils/index.ts:31](https://github.com/Knaackee/hotmig/blob/225169c/packages/lib/src/utils/index.ts#L31)

___

### loadDriver

▸ **loadDriver**(`driver`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/lib/src/Target.ts:50](https://github.com/Knaackee/hotmig/blob/225169c/packages/lib/src/Target.ts#L50)

___

### loadMigrationModule

▸ **loadMigrationModule**(`p`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/lib/src/Target.ts:69](https://github.com/Knaackee/hotmig/blob/225169c/packages/lib/src/Target.ts#L69)

___

### requireGlobal

▸ **requireGlobal**(`packageName`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `packageName` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/lib/src/utils/index.ts:7](https://github.com/Knaackee/hotmig/blob/225169c/packages/lib/src/utils/index.ts#L7)

___

### validateMigrationModule

▸ **validateMigrationModule**(`migration?`, `logger?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration?` | [`Migration`](interfaces/Migration.md) |
| `logger?` | `Logger`<`LoggerOptions`\> |

#### Returns

`void`

#### Defined in

[packages/lib/src/Target.ts:110](https://github.com/Knaackee/hotmig/blob/225169c/packages/lib/src/Target.ts#L110)
