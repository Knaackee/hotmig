# Class: Target

## Constructors

### constructor

• **new Target**(`target`, `hotmig`, `logLevel?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `hotmig` | [`HotMig`](HotMig.md) | `undefined` |
| `logLevel` | ``"info"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"debug"`` \| ``"trace"`` \| ``"silent"`` | `"silent"` |

#### Defined in

[packages/lib/src/Target.ts:107](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L107)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:96](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L96)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:98](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L98)

___

### config

• **config**: `undefined` \| [`TargetConfig`](../interfaces/TargetConfig.md)

#### Defined in

[packages/lib/src/Target.ts:102](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L102)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/Target.ts:99](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L99)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:100](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L100)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/Target.ts:103](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L103)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/Target.ts:104](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L104)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/Target.ts:105](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L105)

___

### prevJsPath

• **prevJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:101](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L101)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:97](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L97)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/Target.ts:395](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L395)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:137](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L137)

___

### devMigationAlreadyExists

▸ **devMigationAlreadyExists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:391](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L391)

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

[packages/lib/src/Target.ts:303](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L303)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/Target.ts:491](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L491)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:197](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L197)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/Target.ts:203](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L203)

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

[packages/lib/src/Target.ts:147](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L147)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:131](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L131)

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

[packages/lib/src/Target.ts:366](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L366)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:184](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L184)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/Target.ts:142](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L142)

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

[packages/lib/src/Target.ts:376](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L376)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:253](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L253)

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

[packages/lib/src/Target.ts:371](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L371)

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

[packages/lib/src/Target.ts:180](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L180)

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

[packages/lib/src/Target.ts:433](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L433)

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

[packages/lib/src/Target.ts:266](https://github.com/Knaackee/hotmig/blob/1ea8218/packages/lib/src/Target.ts#L266)
