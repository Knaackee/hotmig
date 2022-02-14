# Class: Driver

## Hierarchy

- `Driver`

  ↳ **`Driver`**

## Constructors

### constructor

• **new Driver**()

#### Overrides

Driver.constructor

#### Defined in

[hotmig-driver-pg/src/PostgresDriver.ts:7](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/drivers/hotmig-driver-pg/src/PostgresDriver.ts#L7)

## Properties

### client

• **client**: `undefined` \| `Knex`<`any`, `unknown`[]\>

#### Overrides

Driver.client

#### Defined in

[hotmig-driver-pg/src/PostgresDriver.ts:5](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/drivers/hotmig-driver-pg/src/PostgresDriver.ts#L5)

## Methods

### addMigration

▸ **addMigration**(`migration`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration` | `Migration` |

#### Returns

`Promise`<`void`\>

#### Inherited from

Driver.addMigration

#### Defined in

sql-driver/dist/Driver.d.ts:15

___

### createClient

▸ **createClient**(`config`): `Knex`<`any`, `unknown`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config`<`any`\> |

#### Returns

`Knex`<`any`, `unknown`[]\>

#### Overrides

Driver.createClient

#### Defined in

[hotmig-driver-pg/src/PostgresDriver.ts:20](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/drivers/hotmig-driver-pg/src/PostgresDriver.ts#L20)

___

### createMigrationStore

▸ **createMigrationStore**(): `Promise`<`undefined` \| `void`\>

#### Returns

`Promise`<`undefined` \| `void`\>

#### Inherited from

Driver.createMigrationStore

#### Defined in

sql-driver/dist/Driver.d.ts:9

___

### exec

▸ **exec**(`cb`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`params`: `any`) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Inherited from

Driver.exec

#### Defined in

sql-driver/dist/Driver.d.ts:17

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `Promise`<{ `createdAt`: `any` ; `id`: `any` ; `name`: `any`  }[]\>

#### Returns

`Promise`<{ `createdAt`: `any` ; `id`: `any` ; `name`: `any`  }[]\>

#### Inherited from

Driver.getAppliedMigrations

#### Defined in

sql-driver/dist/Driver.d.ts:10

___

### getDefaultConfig

▸ **getDefaultConfig**(`isInteractive?`): `Promise`<`Config`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<`Config`<`any`\>\>

#### Overrides

Driver.getDefaultConfig

#### Defined in

[hotmig-driver-pg/src/PostgresDriver.ts:11](https://github.com/Knaackee/hotmig/blob/0e874e9/packages/drivers/hotmig-driver-pg/src/PostgresDriver.ts#L11)

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

Driver.getEmptyMigrationContent

#### Defined in

sql-driver/dist/Driver.d.ts:19

___

### init

▸ **init**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config`<`any`\> |

#### Returns

`Promise`<`void`\>

#### Inherited from

Driver.init

#### Defined in

sql-driver/dist/Driver.d.ts:7

___

### migrationStoreExists

▸ **migrationStoreExists**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

Driver.migrationStoreExists

#### Defined in

sql-driver/dist/Driver.d.ts:8

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

#### Inherited from

Driver.removeMigration

#### Defined in

sql-driver/dist/Driver.d.ts:16

___

### setClient

▸ **setClient**(`client`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Knex`<`any`, `unknown`[]\> |

#### Returns

`void`

#### Inherited from

Driver.setClient

#### Defined in

sql-driver/dist/Driver.d.ts:18
