# Class: HotMig

## Constructors

### constructor

• **new HotMig**(`root?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `string` |

#### Defined in

packages/lib/src/HotMig.ts:31

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

packages/lib/src/HotMig.ts:25

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

packages/lib/src/HotMig.ts:26

___

### config

• **config**: `undefined` \| [`HotMigConfig`](../interfaces/HotMigConfig.md)

#### Defined in

packages/lib/src/HotMig.ts:28

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

packages/lib/src/HotMig.ts:27

___

### db

• **db**: `undefined` \| [`Database`](Database.md) = `undefined`

#### Defined in

packages/lib/src/HotMig.ts:29

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

packages/lib/src/HotMig.ts:97

___

### down

▸ **down**(): `Promise`<{ `applied`: `number`  }\>

#### Returns

`Promise`<{ `applied`: `number`  }\>

#### Defined in

packages/lib/src/HotMig.ts:144

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

packages/lib/src/HotMig.ts:167

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: `MigrationFileContent`[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: `MigrationFileContent`[] ; `skipped`: `number` = 0 }\>

#### Defined in

packages/lib/src/HotMig.ts:65

___

### init

▸ **init**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`HotMigConfig`](../interfaces/HotMigConfig.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/lib/src/HotMig.ts:45

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

packages/lib/src/HotMig.ts:37

___

### latest

▸ **latest**(): `Promise`<{ `applied`: `number`  }\>

#### Returns

`Promise`<{ `applied`: `number`  }\>

#### Defined in

packages/lib/src/HotMig.ts:163

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

packages/lib/src/HotMig.ts:58

___

### setDatabase

▸ **setDatabase**(`db`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | [`Database`](Database.md) |

#### Returns

`void`

#### Defined in

packages/lib/src/HotMig.ts:41

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

packages/lib/src/HotMig.ts:124
