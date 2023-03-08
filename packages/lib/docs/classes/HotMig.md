# Class: HotMig

## Constructors

### constructor

• **new HotMig**(`path`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Defined in

[packages/lib/src/HotMig.ts:19](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/HotMig.ts#L19)

## Properties

### config

• `Optional` **config**: [`HotMigConfig`](../interfaces/HotMigConfig.md)

#### Defined in

[packages/lib/src/HotMig.ts:17](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/HotMig.ts#L17)

___

### configFilePath

• **configFilePath**: `string` = `""`

#### Defined in

[packages/lib/src/HotMig.ts:16](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/HotMig.ts#L16)

___

### path

• **path**: `string`

## Methods

### init

▸ **init**(`migrationsDir`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `migrationsDir` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:23](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/HotMig.ts#L23)

___

### isInitialized

▸ **isInitialized**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/lib/src/HotMig.ts:58](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/HotMig.ts#L58)

___

### loadConfig

▸ **loadConfig**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/lib/src/HotMig.ts:41](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/HotMig.ts#L41)

___

### target

▸ **target**(`name`): `Promise`<[`Target`](Target.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`Target`](Target.md)\>

#### Defined in

[packages/lib/src/HotMig.ts:63](https://github.com/Knaackee/hotmig/blob/26e873a/packages/lib/src/HotMig.ts#L63)
