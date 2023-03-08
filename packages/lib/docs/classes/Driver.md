# Class: Driver<TConfig\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TConfig` | `any` |

## Hierarchy

- **`Driver`**

  ↳ [`TestDriver`](TestDriver.md)

## Constructors

### constructor

• **new Driver**<`TConfig`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TConfig` | `any` |

## Methods

### addMigration

▸ `Abstract` **addMigration**(`migration`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration` | [`Migration`](../interfaces/Migration.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Driver.ts:14](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L14)

___

### createMigrationStore

▸ `Abstract` **createMigrationStore**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Driver.ts:6](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L6)

___

### exec

▸ `Abstract` **exec**(`cb`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`params`: `any`) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Driver.ts:20](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L20)

___

### getAppliedMigrations

▸ `Abstract` **getAppliedMigrations**(`target`): `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/Driver.ts:10](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L10)

___

### getDefaultConfig

▸ `Abstract` **getDefaultConfig**(`isInteractive?`): `Promise`<`TConfig`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<`TConfig`\>

#### Defined in

[packages/lib/src/Driver.ts:18](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L18)

___

### getEmptyMigrationContent

▸ **getEmptyMigrationContent**(`name`, `isInteractive?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/lib/src/Driver.ts:22](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L22)

___

### init

▸ `Abstract` **init**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `TConfig` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Driver.ts:4](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L4)

___

### migrationStoreExists

▸ `Abstract` **migrationStoreExists**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/lib/src/Driver.ts:8](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L8)

___

### removeMigration

▸ `Abstract` **removeMigration**(`id`, `params?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `params?` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Driver.ts:16](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Driver.ts#L16)
