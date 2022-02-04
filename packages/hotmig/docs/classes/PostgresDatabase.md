# Class: PostgresDatabase

## Hierarchy

- [`Database`](Database.md)

  ↳ **`PostgresDatabase`**

## Constructors

### constructor

• **new PostgresDatabase**(`connectionString`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionString` | `undefined` \| `string` |

#### Overrides

[Database](Database.md).[constructor](Database.md#constructor)

#### Defined in

[PostgresDatabase.ts:11](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L11)

## Properties

### client

• **client**: `undefined` \| `PoolClient`

#### Defined in

[PostgresDatabase.ts:8](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L8)

___

### connectionString

• `Readonly` **connectionString**: `undefined` \| `string`

#### Inherited from

[Database](Database.md).[connectionString](Database.md#connectionstring)

___

### isInitalized

• `Protected` **isInitalized**: `boolean` = `false`

#### Inherited from

[Database](Database.md).[isInitalized](Database.md#isinitalized)

#### Defined in

[Database.ts:6](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L6)

___

### pool

• `Readonly` **pool**: `Pool`

#### Defined in

[PostgresDatabase.ts:7](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L7)

___

### schema

• `Readonly` **schema**: ``null`` \| `string`

#### Defined in

[PostgresDatabase.ts:9](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L9)

## Methods

### addMigration

▸ **addMigration**(`migration`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration` | `MigrationFileContent` |

#### Returns

`Promise`<`void`\>

#### Overrides

[Database](Database.md).[addMigration](Database.md#addmigration)

#### Defined in

[PostgresDatabase.ts:89](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L89)

___

### createMigrationsTable

▸ **createMigrationsTable**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Database](Database.md).[createMigrationsTable](Database.md#createmigrationstable)

#### Defined in

[PostgresDatabase.ts:65](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L65)

___

### dispose

▸ **dispose**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[PostgresDatabase.ts:41](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L41)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Inherited from

[Database](Database.md).[ensureInitialized](Database.md#ensureinitialized)

#### Defined in

[Database.ts:12](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L12)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `Promise`<`AppliedMigration`[]\>

#### Returns

`Promise`<`AppliedMigration`[]\>

#### Overrides

[Database](Database.md).[getAppliedMigrations](Database.md#getappliedmigrations)

#### Defined in

[PostgresDatabase.ts:78](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L78)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Database](Database.md).[init](Database.md#init)

#### Defined in

[PostgresDatabase.ts:24](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L24)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Database](Database.md).[isInitialized](Database.md#isinitialized)

#### Defined in

[Database.ts:18](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L18)

___

### migrationsTableExists

▸ **migrationsTableExists**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[PostgresDatabase.ts:49](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L49)

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

[Database](Database.md).[removeMigration](Database.md#removemigration)

#### Defined in

[PostgresDatabase.ts:103](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L103)

___

### runSql

▸ **runSql**(`q`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

[Database](Database.md).[runSql](Database.md#runsql)

#### Defined in

[PostgresDatabase.ts:115](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L115)

___

### setClient

▸ **setClient**(`client?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `client?` | `PoolClient` |

#### Returns

`void`

#### Defined in

[PostgresDatabase.ts:33](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/PostgresDatabase.ts#L33)
