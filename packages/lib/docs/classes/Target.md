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

[packages/lib/src/Target.ts:95](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L95)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:85](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L85)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:87](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L87)

___

### config

• **config**: `undefined` \| [`TargetConfig`](../interfaces/TargetConfig.md)

#### Defined in

[packages/lib/src/Target.ts:90](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L90)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/Target.ts:88](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L88)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:89](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L89)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/Target.ts:91](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L91)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/Target.ts:92](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L92)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/Target.ts:93](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L93)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:86](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L86)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/Target.ts:381](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L381)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:124](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L124)

___

### devMigationAlreadyExists

▸ **devMigationAlreadyExists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:377](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L377)

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

[packages/lib/src/Target.ts:288](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L288)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/Target.ts:474](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L474)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:184](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L184)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/Target.ts:190](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L190)

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

[packages/lib/src/Target.ts:134](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L134)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:118](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L118)

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

[packages/lib/src/Target.ts:352](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L352)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:171](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L171)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/Target.ts:129](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L129)

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

[packages/lib/src/Target.ts:362](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L362)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:234](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L234)

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

[packages/lib/src/Target.ts:357](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L357)

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

[packages/lib/src/Target.ts:167](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L167)

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

[packages/lib/src/Target.ts:416](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L416)

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

[packages/lib/src/Target.ts:248](https://github.com/Knaackee/hotmig/blob/63d79d0/packages/lib/src/Target.ts#L248)
