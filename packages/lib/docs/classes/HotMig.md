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

[packages/lib/src/HotMig.ts:42](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L42)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:32](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L32)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:34](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L34)

___

### config

• **config**: `undefined` \| [`HotMigConfig`](../interfaces/HotMigConfig.md)

#### Defined in

[packages/lib/src/HotMig.ts:37](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L37)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:35](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L35)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:36](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L36)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/HotMig.ts:38](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L38)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:39](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L39)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/HotMig.ts:40](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L40)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:33](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L33)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/HotMig.ts:261](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L261)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:56](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L56)

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

[packages/lib/src/HotMig.ts:193](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L193)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/HotMig.ts:331](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L331)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:109](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L109)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/HotMig.ts:115](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L115)

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

[packages/lib/src/HotMig.ts:66](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L66)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/HotMig.ts:50](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L50)

___

### latest

▸ **latest**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:236](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L236)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:95](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L95)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/HotMig.ts:61](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L61)

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

[packages/lib/src/HotMig.ts:246](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L246)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:151](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L151)

___

### reset

▸ **reset**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:241](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L241)

___

### test

▸ **test**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:290](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L290)

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

[packages/lib/src/HotMig.ts:165](https://github.com/Knaackee/hotmig/blob/23a257c/packages/lib/src/HotMig.ts#L165)
