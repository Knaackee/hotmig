# Class: HotMig

## Constructors

### constructor

• **new HotMig**(`target`, `root?`, `logLevel?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `root` | `string` | `undefined` |
| `logLevel` | ``"info"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"debug"`` \| ``"trace"`` \| ``"silent"`` | `"silent"` |

#### Defined in

[packages/lib/src/HotMig.ts:85](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L85)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:75](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L75)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:77](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L77)

___

### config

• **config**: `undefined` \| [`HotMigConfig`](../interfaces/HotMigConfig.md)

#### Defined in

[packages/lib/src/HotMig.ts:80](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L80)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:78](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L78)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:79](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L79)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/HotMig.ts:81](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L81)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:82](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L82)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/HotMig.ts:83](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L83)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:76](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L76)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/HotMig.ts:386](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L386)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:111](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L111)

___

### down

▸ **down**(`options?`): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.count` | `number` |
| `options.onProgress?` | (`args`: [`OnProgressArgs`](../interfaces/OnProgressArgs.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:279](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L279)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/HotMig.ts:459](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L459)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:170](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L170)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/HotMig.ts:176](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L176)

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

[packages/lib/src/HotMig.ts:121](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L121)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/HotMig.ts:105](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L105)

___

### latest

▸ **latest**(`options?`): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.onProgress?` | (`args`: [`OnProgressArgs`](../interfaces/OnProgressArgs.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:361](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L361)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:157](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L157)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/HotMig.ts:116](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L116)

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

[packages/lib/src/HotMig.ts:371](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L371)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:212](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L212)

___

### reset

▸ **reset**(`options?`): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.onProgress?` | (`args`: [`OnProgressArgs`](../interfaces/OnProgressArgs.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:366](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L366)

___

### setDriver

▸ **setDriver**(`driver`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`Driver`](Driver.md)<`any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:153](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L153)

___

### test

▸ **test**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:414](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L414)

___

### up

▸ **up**(`options?`): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.count` | `number` |
| `options.onProgress?` | (`args`: [`OnProgressArgs`](../interfaces/OnProgressArgs.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:226](https://github.com/Knaackee/hotmig/blob/7c5e64a/packages/lib/src/HotMig.ts#L226)
