# Class: Database

## Hierarchy

- **`Database`**

  ↳ [`PostgresDatabase`](PostgresDatabase.md)

## Constructors

### constructor

• **new Database**(`connectionString`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionString` | `undefined` \| `string` |

#### Defined in

[Database.ts:8](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L8)

## Properties

### connectionString

• `Readonly` **connectionString**: `undefined` \| `string`

___

### isInitalized

• `Protected` **isInitalized**: `boolean` = `false`

#### Defined in

[Database.ts:6](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L6)

## Methods

### addMigration

▸ `Abstract` **addMigration**(`migration`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `migration` | `MigrationFileContent` |

#### Returns

`Promise`<`void`\>

#### Defined in

[Database.ts:30](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L30)

___

### createMigrationsTable

▸ `Abstract` **createMigrationsTable**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[Database.ts:24](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L24)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[Database.ts:12](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L12)

___

### getAppliedMigrations

▸ `Abstract` **getAppliedMigrations**(): `Promise`<`AppliedMigration`[]\>

#### Returns

`Promise`<`AppliedMigration`[]\>

#### Defined in

[Database.ts:26](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L26)

___

### init

▸ `Abstract` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[Database.ts:22](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L22)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[Database.ts:18](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L18)

___

### removeMigration

▸ `Abstract` **removeMigration**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[Database.ts:32](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L32)

___

### runSql

▸ `Abstract` **runSql**(`q`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[Database.ts:28](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/Database.ts#L28)
