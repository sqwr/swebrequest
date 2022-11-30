
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


# Licence and Copyright
Copyright 2022 **ANONYMOUS INSTITUTION**

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
