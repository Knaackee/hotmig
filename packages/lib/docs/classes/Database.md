# Class: Database

## Constructors

### constructor

• **new Database**(`connectionString`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionString` | `undefined` \| `string` |

#### Defined in

packages/lib/src/Database.ts:8

## Properties

### connectionString

• `Readonly` **connectionString**: `undefined` \| `string`

___

### isInitalized

• `Protected` **isInitalized**: `boolean` = `false`

#### Defined in

packages/lib/src/Database.ts:6

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

packages/lib/src/Database.ts:30

___

### createMigrationsTable

▸ `Abstract` **createMigrationsTable**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

packages/lib/src/Database.ts:24

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

packages/lib/src/Database.ts:12

___

### getAppliedMigrations

▸ `Abstract` **getAppliedMigrations**(): `Promise`<`AppliedMigration`[]\>

#### Returns

`Promise`<`AppliedMigration`[]\>

#### Defined in

packages/lib/src/Database.ts:26

___

### init

▸ `Abstract` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

packages/lib/src/Database.ts:22

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

packages/lib/src/Database.ts:18

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

packages/lib/src/Database.ts:32

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

packages/lib/src/Database.ts:28
