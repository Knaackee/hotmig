# Class: HotMig

## Constructors

### constructor

• **new HotMig**(`target`, `root?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `root` | `string` |

#### Defined in

[packages/lib/src/HotMig.ts:34](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L34)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:25](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L25)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:27](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L27)

___

### config

• **config**: `undefined` \| [`HotMigConfig`](../interfaces/HotMigConfig.md)

#### Defined in

[packages/lib/src/HotMig.ts:30](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L30)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:28](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L28)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:29](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L29)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/HotMig.ts:31](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L31)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:32](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L32)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:26](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L26)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/HotMig.ts:218](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L218)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:46](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L46)

___

### down

▸ **down**(`options?`): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.count` | `number` |

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:166](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L166)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/HotMig.ts:273](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L273)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:90](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L90)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/HotMig.ts:95](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L95)

___

### init

▸ **init**(`driver`, `isInteractive?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `string` |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:54](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L54)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/HotMig.ts:42](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L42)

___

### latest

▸ **latest**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:195](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L195)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:82](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L82)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/HotMig.ts:50](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L50)

___

### new

▸ **new**(`name`, `isInteractive?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `isInteractive?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:203](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L203)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:130](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L130)

___

### reset

▸ **reset**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:199](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L199)

___

### test

▸ **test**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:242](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L242)

___

### up

▸ **up**(`options?`): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.count` | `number` |

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:143](https://github.com/Knaackee/hotmig/blob/b33712a/packages/lib/src/HotMig.ts#L143)
