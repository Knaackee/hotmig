# @hotmig/lib

## Classes

- [AlreadyInitializedError](classes/AlreadyInitializedError.md)
- [Database](classes/Database.md)
- [DatabaseAlreadyInitializedError](classes/DatabaseAlreadyInitializedError.md)
- [DatabaseNotInitializedError](classes/DatabaseNotInitializedError.md)
- [HotMig](classes/HotMig.md)
- [NotInitializedError](classes/NotInitializedError.md)

## Interfaces

- [HotMigConfig](interfaces/HotMigConfig.md)

## Functions

### listGlobal

▸ `Const` **listGlobal**(): `Promise`<{ `name`: `string` ; `version`: `string`  }[]\>

#### Returns

`Promise`<{ `name`: `string` ; `version`: `string`  }[]\>

#### Defined in

packages/lib/src/utils/index.ts:24

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

packages/lib/src/utils/index.ts:7
