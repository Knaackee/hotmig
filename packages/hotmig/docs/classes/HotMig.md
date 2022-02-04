# Class: HotMig

## Constructors

### constructor

• **new HotMig**(`db?`, `root?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db?` | [`Database`](Database.md) | `undefined` |
| `root` | `string` | `__dirname` |

#### Defined in

[HotMig.ts:24](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L24)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[HotMig.ts:21](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L21)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[HotMig.ts:22](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L22)

## Methods

### createLocalMigration

▸ **createLocalMigration**(`content?`, `options?`): `Promise`<`MigrationFileContent`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content?` | `string` |
| `options` | `CreateMigrationOptions` |

#### Returns

`Promise`<`MigrationFileContent`\>

#### Defined in

[HotMig.ts:77](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L77)

___

### down

▸ **down**(): `Promise`<{ `applied`: `number`  }\>

#### Returns

`Promise`<{ `applied`: `number`  }\>

#### Defined in

[HotMig.ts:123](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L123)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[HotMig.ts:145](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L145)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: `MigrationFileContent`[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: `MigrationFileContent`[] ; `skipped`: `number` = 0 }\>

#### Defined in

[HotMig.ts:45](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L45)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[HotMig.ts:37](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L37)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[HotMig.ts:33](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L33)

___

### latest

▸ **latest**(): `Promise`<{ `applied`: `number`  }\>

#### Returns

`Promise`<{ `applied`: `number`  }\>

#### Defined in

[HotMig.ts:141](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L141)

___

### up

▸ **up**(`options?`): `Promise`<{ `applied`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.all` | `boolean` |

#### Returns

`Promise`<{ `applied`: `number`  }\>

#### Defined in

[HotMig.ts:104](https://github.com/Knaackee/hotmig/blob/7b1de6c/packages/hotmig/src/HotMig.ts#L104)
