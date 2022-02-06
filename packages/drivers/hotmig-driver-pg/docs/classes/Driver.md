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

[PostgresDatabase.ts:12](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L12)

## Properties

### client

• **client**: `undefined` \| `Knex`<`any`, `unknown`[]\>

#### Defined in

[PostgresDatabase.ts:10](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L10)

___

### schema

• `Private` **schema**: ``null`` \| `string` = `"public"`

#### Defined in

[PostgresDatabase.ts:9](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L9)

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

[PostgresDatabase.ts:68](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L68)

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

[PostgresDatabase.ts:103](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L103)

___

### createMigrationStore

▸ **createMigrationStore**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

Base.createMigrationStore

#### Defined in

[PostgresDatabase.ts:48](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L48)

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

[PostgresDatabase.ts:91](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L91)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `Promise`<`AppliedMigration`[]\>

#### Returns

`Promise`<`AppliedMigration`[]\>

#### Overrides

Base.getAppliedMigrations

#### Defined in

[PostgresDatabase.ts:59](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L59)

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

[PostgresDatabase.ts:27](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L27)

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

[PostgresDatabase.ts:115](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L115)

___

### init

▸ **init**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `any` |

#### Returns

`Promise`<`void`\>

#### Overrides

Base.init

#### Defined in

[PostgresDatabase.ts:16](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L16)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Overrides

Base.migrationStoreExists

#### Defined in

[PostgresDatabase.ts:34](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L34)

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

[PostgresDatabase.ts:81](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L81)

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

[PostgresDatabase.ts:111](https://github.com/Knaackee/hotmig/blob/b33712a/packages/drivers/hotmig-driver-pg/src/PostgresDatabase.ts#L111)
