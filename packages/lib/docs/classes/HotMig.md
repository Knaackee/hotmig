# Class: HotMig

## Constructors

### constructor

• **new HotMig**(`target`, `root?`, `logLevel?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `root` | `string` | `undefined` |
| `logLevel` | ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"`` \| ``"trace"`` \| ``"silent"`` | `"silent"` |

#### Defined in

[packages/lib/src/HotMig.ts:36](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L36)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:26](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L26)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:28](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L28)

___

### config

• **config**: `undefined` \| [`HotMigConfig`](../interfaces/HotMigConfig.md)

#### Defined in

[packages/lib/src/HotMig.ts:31](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L31)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:29](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L29)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:30](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L30)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/HotMig.ts:32](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L32)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:33](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L33)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/HotMig.ts:34](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L34)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:27](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L27)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/HotMig.ts:270](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L270)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:62](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L62)

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

[packages/lib/src/HotMig.ts:202](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L202)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/HotMig.ts:345](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L345)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:118](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L118)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/HotMig.ts:124](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L124)

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

[packages/lib/src/HotMig.ts:72](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L72)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/HotMig.ts:56](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L56)

___

### latest

▸ **latest**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:245](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L245)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:104](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L104)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/HotMig.ts:67](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L67)

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

[packages/lib/src/HotMig.ts:255](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L255)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:160](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L160)

___

### reset

▸ **reset**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:250](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L250)

___

### test

▸ **test**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:299](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L299)

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

[packages/lib/src/HotMig.ts:174](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L174)

___

### validateMigrationModule

▸ **validateMigrationModule**(`module`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `module` | `any` |

#### Returns

`void`

#### Defined in

[packages/lib/src/HotMig.ts:352](https://github.com/Knaackee/hotmig/blob/9be9dc2/packages/lib/src/HotMig.ts#L352)
