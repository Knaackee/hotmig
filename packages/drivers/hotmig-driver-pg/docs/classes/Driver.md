# Class: Driver

## Hierarchy

- `Driver`

  ↳ **`Driver`**

## Constructors

### constructor

• **new Driver**()

#### Overrides

Base.constructor

#### Defined in

[PostgresDatabase.ts:9](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L9)

## Properties

### client

• **client**: `undefined` \| `Knex`<`any`, `unknown`[]\>

#### Defined in

[PostgresDatabase.ts:7](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L7)

___

### schema

• `Readonly` **schema**: ``null`` \| `string`

#### Defined in

[PostgresDatabase.ts:6](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L6)

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

[PostgresDatabase.ts:64](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L64)

___

### createClient

▸ **createClient**(`connectionString`): `Knex`<`any`, `unknown`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionString` | `string` |

#### Returns

`Knex`<`any`, `unknown`[]\>

#### Defined in

[PostgresDatabase.ts:100](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L100)

___

### createMigrationStore

▸ **createMigrationStore**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

Base.createMigrationStore

#### Defined in

[PostgresDatabase.ts:44](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L44)

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

[PostgresDatabase.ts:87](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L87)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `Promise`<`AppliedMigration`[]\>

#### Returns

`Promise`<`AppliedMigration`[]\>

#### Overrides

Base.getAppliedMigrations

#### Defined in

[PostgresDatabase.ts:55](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L55)

___

### getDefaultConfig

▸ **getDefaultConfig**(`isInteractive?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<`any`\>

#### Overrides

Base.getDefaultConfig

#### Defined in

[PostgresDatabase.ts:23](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L23)

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

[PostgresDatabase.ts:108](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L108)

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

Base.init

#### Defined in

[PostgresDatabase.ts:19](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L19)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Overrides

Base.migrationStoreExists

#### Defined in

[PostgresDatabase.ts:30](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L30)

___

### removeMigration

▸ **removeMigration**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Overrides

Base.removeMigration

#### Defined in

[PostgresDatabase.ts:77](https://github.com/Knaackee/hotmig/blob/13f18e6/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L77)
