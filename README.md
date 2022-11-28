
standard/common operations/actions: download, store, read and delete of HTTP requests and responses on cache storages. servvice workers are event-based, so those operations happen when the events occur, i.e. fetch, install, activate. 

The main intuition of swebRequest is that before and after the standard/common service workers operations occur, one can perform custom/security/privacy operations/actions. For instance, HTTP responses can be encrypted before they are stored in the cache. Likewise, the encrypted HTTP responses can be decrypted after cache-reads. 

A uniform API for defining and performing operations, i.e. listener
A stage is a logical spot where performing zero, one or more operations




custom operations: listeners

a stage models an operation, standard or custom.
a listener, takes an action...
     - a feature, a named listener, or a named action


- provide a uniform API for performing common service worker operations.
    - Via the concept of listener
- support the standard operations by default 
- provide support for custom operations

`onCacheMatch`: 
