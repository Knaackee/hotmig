# Class: Driver

## Hierarchy

- `Driver`<`Knex.Config`<`any`\>\>

  ↳ **`Driver`**

## Constructors

### constructor

• **new Driver**()

#### Overrides

Base&lt;Knex.Config&lt;any\&gt;\&gt;.constructor

#### Defined in

drivers/sql-driver/src/Driver.ts:7

## Properties

### client

• **client**: `undefined` \| `Knex`<`any`, `unknown`[]\>

#### Defined in

drivers/sql-driver/src/Driver.ts:5

## Methods

### addMigration

▸ **addMigration**(`migration`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration` | `Migration` |

#### Returns

`Promise`<`void`\>

#### Overrides

Base.addMigration

#### Defined in

drivers/sql-driver/src/Driver.ts:45

___

### createClient

▸ `Abstract` **createClient**(`config`): `Knex`<`any`, `unknown`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config`<`any`\> |

#### Returns

`Knex`<`any`, `unknown`[]\>

#### Defined in

drivers/sql-driver/src/Driver.ts:11

___

### createMigrationStore

▸ **createMigrationStore**(): `Promise`<`undefined` \| `void`\>

#### Returns

`Promise`<`undefined` \| `void`\>

#### Overrides

Base.createMigrationStore

#### Defined in

drivers/sql-driver/src/Driver.ts:21

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

Base.exec

#### Defined in

drivers/sql-driver/src/Driver.ts:59

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `Promise`<{ `createdAt`: `any` = row.createdAt; `id`: `any` = row.id; `name`: `any` = row.name }[]\>

#### Returns

`Promise`<{ `createdAt`: `any` = row.createdAt; `id`: `any` = row.id; `name`: `any` = row.name }[]\>

#### Overrides

Base.getAppliedMigrations

#### Defined in

drivers/sql-driver/src/Driver.ts:29

___

### getDefaultConfig

▸ `Abstract` **getDefaultConfig**(`isInteractive?`): `Promise`<`Config`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<`Config`<`any`\>\>

#### Inherited from

Base.getDefaultConfig

#### Defined in

lib/dist/Driver.d.ts:9

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

#### Overrides

Base.getEmptyMigrationContent

#### Defined in

drivers/sql-driver/src/Driver.ts:81

___

### init

▸ **init**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config`<`any`\> |

#### Returns

`Promise`<`void`\>

#### Overrides

Base.init

#### Defined in

drivers/sql-driver/src/Driver.ts:13

___

### migrationStoreExists

▸ **migrationStoreExists**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

Base.migrationStoreExists

#### Defined in

drivers/sql-driver/src/Driver.ts:17

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

Base.removeMigration

#### Defined in

drivers/sql-driver/src/Driver.ts:51

___

### setClient

▸ **setClient**(`client`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Knex`<`any`, `unknown`[]\> |

#### Returns

`void`

#### Defined in

drivers/sql-driver/src/Driver.ts:77