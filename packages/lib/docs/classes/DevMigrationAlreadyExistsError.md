# Class: DevMigrationAlreadyExistsError

## Hierarchy

- `Error`

  ↳ **`DevMigrationAlreadyExistsError`**

## Constructors

### constructor

• **new DevMigrationAlreadyExistsError**()

#### Overrides

Error.constructor

#### Defined in

[packages/lib/src/errors/DevMigrationAlreadyExistsError.ts:3](https://github.com/Knaackee/hotmig/blob/f83b948/packages/lib/src/errors/DevMigrationAlreadyExistsError.ts#L3)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### MESSAGE

▪ `Static` **MESSAGE**: `string` = `"dev.ts already exists"`

#### Defined in

[packages/lib/src/errors/DevMigrationAlreadyExistsError.ts:2](https://github.com/Knaackee/hotmig/blob/f83b948/packages/lib/src/errors/DevMigrationAlreadyExistsError.ts#L2)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

packages/lib/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

packages/lib/node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

packages/lib/node_modules/@types/node/globals.d.ts:4
