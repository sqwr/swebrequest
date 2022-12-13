# Features
Features augment the baseline `swebRequest`. They execute at different stages, taking specific actions. The [encryption](#encryption) feature for instance encrypts HTTP responses before cache writes. Dually, the [decryption](#decryption) decrypts the previously encrypted HTTP respones after they are read from the cache. 

Here we show how to usage the many security and privacy features built-in `swebRequest`. If you are a developer or researcher interested in how features are defined, please read the [docs](api.md). The concepts for features is the `filter` options which are runtime arguments that the feature expects. The way the feature is enabled also depends on the mode, but this is standard.

## Activation
Features can be enabled in many ways:

| Activation mode | Method | Description | Examples |
|--|--|--|--|
Direct invocation | `swebRequest.features.FEATURE()` | Add the feature listener to (default) stages where it is executed, passing runtime options | `swebRequest.features.encryption({ randomBytes: "r@ndom321" })` | 
As extra options | `swebRequest.STAGE.addListener

## Direct invocation
Defined features are added to `swebRequest.features.FEATURE` object as methods]

## As extra options
Features can be specified as [extra options](options/extra.md).

## Standalone mode
Features can be passed to the `swebRequest.init` method that enables the [standalone mode](modes/standalone.md)

## standalong mode
Features can be passed to the `swebRequest.usefeatures` method that enables the [standalong mode](modes/standalong.md)

## workbox mode
`swebRequest` can be used as plugins for service workers implemented with [Workbox](modes/workbox.md)


Table of content
- [encryption](features/encryption.md): encrypts HTTP responess before cache writes
- [decryption](#decryption): decrypts HTTP responses after cache reads
- [signature](#signature): signs HTTP responess before cache writes
- [verification](#verification): verifies the signature of HTTP responses after cache reads





## definition
A feature is defined as follows:
```javascript
swebRequest.features.define(name: string, listener: CallBack, stages?: string | string[], filter?: FilterOptions, extra_options?: ExtraOptions, xfilter?:FilterOptions)
```

## Direct Activation
```javascript
swebRequest.features.FEATURE(filter: FilterOptions, extra_options: ExtraOptions, xfilter: FilterOptions, stages?: string | string[])
```

| Parameter | Description |
|--|--|
`name` | feature name, as a string 
`listener` | the [listener](listeners.md) callback function that implements the feature logic
`stages` | optional array of default [stage](stages.md) names where the feature executes...This can be changed when the feature is [enabled](#enabling)
`filter` | initial [filter options](options/filter.md) that apply to the feature. More [(runtime) options](options/runtime.md) can be provided when the [feature is enabled](#enabling)
`extra_options` | initial [extra options](options/extra.md) more can be provided when the [feature is enabled](#enabling)
`xfilter` | initial `xfilter` options. More can be provided when the [feature is enabled](#enabling)
`FEATURE` | feature name to enable



