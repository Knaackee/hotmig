# Class: HotMig

## Constructors

### constructor

• **new HotMig**(`target`, `root?`, `log?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `root` | `string` |
| `log?` | `boolean` |

#### Defined in

[packages/lib/src/HotMig.ts:42](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L42)

## Properties

### baseDirectory

• **baseDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:32](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L32)

___

### commitDirectory

• **commitDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:34](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L34)

___

### config

• **config**: `undefined` \| [`HotMigConfig`](../interfaces/HotMigConfig.md)

#### Defined in

[packages/lib/src/HotMig.ts:37](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L37)

___

### configFilePath

• **configFilePath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:35](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L35)

___

### devJsPath

• **devJsPath**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:36](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L36)

___

### driver

• **driver**: `undefined` \| [`Driver`](Driver.md)<`any`\> = `undefined`

#### Defined in

[packages/lib/src/HotMig.ts:38](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L38)

___

### driverName

• `Optional` **driverName**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:39](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L39)

___

### logger

• `Private` **logger**: `Logger`<`LoggerOptions` \| `DestinationStream`\>

#### Defined in

[packages/lib/src/HotMig.ts:40](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L40)

___

### targetDirectory

• **targetDirectory**: `string`

#### Defined in

[packages/lib/src/HotMig.ts:33](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L33)

## Methods

### commit

▸ **commit**(): `Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)\>

#### Defined in

[packages/lib/src/HotMig.ts:269](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L269)

___

### createMigrationStore

▸ **createMigrationStore**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:64](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L64)

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

[packages/lib/src/HotMig.ts:201](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L201)

___

### ensureInitialized

▸ **ensureInitialized**(): `void`

#### Returns

`void`

#### Defined in

[packages/lib/src/HotMig.ts:339](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L339)

___

### getAppliedMigrations

▸ **getAppliedMigrations**(): `undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Returns

`undefined` \| `Promise`<[`AppliedMigration`](../interfaces/AppliedMigration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:117](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L117)

___

### getLocalMigrations

▸ **getLocalMigrations**(): `Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Returns

`Promise`<{ `loaded`: `number` = 0; `migrations`: [`Migration`](../interfaces/Migration.md)[] ; `skipped`: `number` = 0 }\>

#### Defined in

[packages/lib/src/HotMig.ts:123](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L123)

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

[packages/lib/src/HotMig.ts:74](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L74)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/HotMig.ts:58](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L58)

___

### latest

▸ **latest**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:244](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L244)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:103](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L103)

___

### migrationStoreExists

▸ **migrationStoreExists**(): `undefined` \| `Promise`<`boolean`\>

#### Returns

`undefined` \| `Promise`<`boolean`\>

#### Defined in

[packages/lib/src/HotMig.ts:69](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L69)

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

[packages/lib/src/HotMig.ts:254](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L254)

___

### pending

▸ **pending**(): `Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Returns

`Promise`<[`Migration`](../interfaces/Migration.md)[]\>

#### Defined in

[packages/lib/src/HotMig.ts:159](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L159)

___

### reset

▸ **reset**(): `Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Returns

`Promise`<{ `applied`: `number` ; `migrations`: [`Migration`](../interfaces/Migration.md)[]  }\>

#### Defined in

[packages/lib/src/HotMig.ts:249](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L249)

___

### test

▸ **test**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:298](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L298)

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

[packages/lib/src/HotMig.ts:173](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L173)

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

[packages/lib/src/HotMig.ts:346](https://github.com/Knaackee/hotmig/blob/3e2c301/packages/lib/src/HotMig.ts#L346)
