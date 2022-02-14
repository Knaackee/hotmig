# Class: TestDriver

## Hierarchy

- [`Driver`](Driver.md)

  ↳ **`TestDriver`**

## Constructors

### constructor

• **new TestDriver**()

#### Inherited from

[Driver](Driver.md).[constructor](Driver.md#constructor)

## Properties

### \_migrationsStoreExists

• **\_migrationsStoreExists**: `boolean` = `false`

#### Defined in

[packages/lib/src/Driver.ts:42](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L42)

___

### appliedMigrations

• **appliedMigrations**: [`AppliedMigration`](../interfaces/AppliedMigration.md)[] = `[]`

#### Defined in

[packages/lib/src/Driver.ts:43](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L43)

___

### config

• **config**: `any`

#### Defined in

[packages/lib/src/Driver.ts:41](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L41)

## Methods

### addMigration

▸ **addMigration**(`migration`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration` | [`Migration`](../interfaces/Migration.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[Driver](Driver.md).[addMigration](Driver.md#addmigration)

#### Defined in

[packages/lib/src/Driver.ts:58](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L58)

___

### createMigrationStore

▸ **createMigrationStore**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Driver](Driver.md).[createMigrationStore](Driver.md#createmigrationstore)

#### Defined in

[packages/lib/src/Driver.ts:48](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L48)

___

### exec

▸ **exec**(`cb`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`params`: `any`) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Overrides

[Driver](Driver.md).[exec](Driver.md#exec)

#### Defined in

[packages/lib/src/Driver.ts:71](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L71)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(`target`): `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Overrides

[Driver](Driver.md).[getAppliedMigrations](Driver.md#getappliedmigrations)

#### Defined in

[packages/lib/src/Driver.ts:55](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L55)

___

### getDefaultConfig

▸ **getDefaultConfig**(`isInteractive?`): `Promise`<{}\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<{}\>

#### Overrides

[Driver](Driver.md).[getDefaultConfig](Driver.md#getdefaultconfig)

#### Defined in

[packages/lib/src/Driver.ts:68](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L68)

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

#### Inherited from

[Driver](Driver.md).[getEmptyMigrationContent](Driver.md#getemptymigrationcontent)

#### Defined in

[packages/lib/src/Driver.ts:22](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L22)

___

### init

▸ **init**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `any` |

#### Returns

`Promise`<`void`\>

#### Overrides

[Driver](Driver.md).[init](Driver.md#init)

#### Defined in

[packages/lib/src/Driver.ts:45](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L45)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[Driver](Driver.md).[migrationStoreExists](Driver.md#migrationstoreexists)

#### Defined in

[packages/lib/src/Driver.ts:52](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L52)

___

### removeMigration

▸ **removeMigration**(`id`, `params?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `params?` | `any` |

#### Returns

`Promise`<`void`\>

#### Overrides

[Driver](Driver.md).[removeMigration](Driver.md#removemigration)

#### Defined in

[packages/lib/src/Driver.ts:65](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/lib/src/Driver.ts#L65)
