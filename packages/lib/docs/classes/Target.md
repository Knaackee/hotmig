# Class: Target

## Constructors

### constructor

• **new Target**(`target`, `hotmig`, `logLevel?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `hotmig` | [`HotMig`](HotMig.md) | `undefined` |
| `logLevel` | ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"`` \| ``"trace"`` \| ``"silent"`` | `"silent"` |

#### Defined in

[packages/lib/src/Target.ts:125](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L125)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:114](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L114)

___

### commitDirectory

• **commitDirectory**: `string` \| `string`[]

#### Defined in

[packages/lib/src/Target.ts:116](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L116)

___

### config

• **config**: `undefined` \| [`TargetConfig`](../interfaces/TargetConfig.md)

#### Defined in

[packages/lib/src/Target.ts:120](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L120)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/Target.ts:117](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L117)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:118](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L118)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/Target.ts:121](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L121)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/Target.ts:122](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L122)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/Target.ts:123](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L123)

___

### prevJsPath

• **prevJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:119](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L119)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:115](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L115)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/Target.ts:429](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L429)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:155](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L155)

___

### devMigationAlreadyExists

▸ **devMigationAlreadyExists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:425](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L425)

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

[packages/lib/src/Target.ts:337](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L337)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/Target.ts:573](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L573)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:223](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L223)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/Target.ts:229](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L229)

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

[packages/lib/src/Target.ts:165](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L165)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:149](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L149)

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

[packages/lib/src/Target.ts:400](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L400)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:207](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L207)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/Target.ts:160](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L160)

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

[packages/lib/src/Target.ts:410](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L410)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:287](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L287)

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

[packages/lib/src/Target.ts:405](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L405)

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

[packages/lib/src/Target.ts:203](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L203)

___

### test

▸ **test**(`isDevMode?`, `onProgress?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isDevMode` | `boolean` | `false` |
| `onProgress?` | (`args`: [`TestOnProgressArgs`](../interfaces/TestOnProgressArgs.md)) => `Promise`<`void`\> | `undefined` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/lib/src/Target.ts:513](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L513)

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

[packages/lib/src/Target.ts:300](https://github.com/Knaackee/hotmig/blob/3ed32ad/packages/lib/src/Target.ts#L300)
