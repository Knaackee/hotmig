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

[packages/lib/src/Target.ts:112](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L112)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:101](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L101)

___

### commitDirectory

• **commitDirectory**: `string` \| `string`[]

#### Defined in

[packages/lib/src/Target.ts:103](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L103)

___

### config

• **config**: `undefined` \| [`TargetConfig`](../interfaces/TargetConfig.md)

#### Defined in

[packages/lib/src/Target.ts:107](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L107)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/Target.ts:104](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L104)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:105](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L105)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/Target.ts:108](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L108)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/Target.ts:109](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L109)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/Target.ts:110](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L110)

___

### prevJsPath

• **prevJsPath**: `string`

#### Defined in

[packages/lib/src/Target.ts:106](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L106)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/Target.ts:102](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L102)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/Target.ts:416](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L416)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:142](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L142)

___

### devMigationAlreadyExists

▸ **devMigationAlreadyExists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:412](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L412)

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

[packages/lib/src/Target.ts:324](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L324)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/Target.ts:514](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L514)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:210](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L210)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/Target.ts:216](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L216)

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

[packages/lib/src/Target.ts:152](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L152)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/Target.ts:136](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L136)

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

[packages/lib/src/Target.ts:387](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L387)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/Target.ts:194](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L194)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/Target.ts:147](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L147)

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

[packages/lib/src/Target.ts:397](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L397)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/Target.ts:274](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L274)

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

[packages/lib/src/Target.ts:392](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L392)

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

[packages/lib/src/Target.ts:190](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L190)

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

[packages/lib/src/Target.ts:456](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L456)

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

[packages/lib/src/Target.ts:287](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/Target.ts#L287)
