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

[packages/lib/src/Target.ts:93](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L93)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:83](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L83)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:85](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L85)

___

### config

• **config**: `undefined` \| [`TargetConfig`](../interfaces/TargetConfig.md)

#### Defined in

[packages/lib/src/Target.ts:88](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L88)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/Target.ts:86](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L86)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:87](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L87)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/Target.ts:89](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L89)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/Target.ts:90](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L90)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/Target.ts:91](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L91)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:84](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L84)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/Target.ts:379](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L379)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:122](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L122)

___

### devMigationAlreadyExists

▸ **devMigationAlreadyExists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:375](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L375)

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

[packages/lib/src/Target.ts:286](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L286)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/Target.ts:472](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L472)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:182](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L182)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/Target.ts:188](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L188)

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

[packages/lib/src/Target.ts:132](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L132)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:116](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L116)

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

[packages/lib/src/Target.ts:350](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L350)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:169](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L169)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/Target.ts:127](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L127)

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

[packages/lib/src/Target.ts:360](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L360)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:232](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L232)

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

[packages/lib/src/Target.ts:355](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L355)

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

[packages/lib/src/Target.ts:165](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L165)

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

[packages/lib/src/Target.ts:414](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L414)

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

[packages/lib/src/Target.ts:246](https://github.com/Knaackee/hotmig/blob/5ff8214/packages/lib/src/Target.ts#L246)
