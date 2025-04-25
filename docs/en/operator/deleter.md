# Deleter

The `Deleter()` method allows us to obtain a new generic deleter object, namely `Deleter[T]`. With the methods of `Deleter[T]`, we can execute relevant deletion operations.

| **Method Name**       | **Description**                                                  | **Parameters**                                                                                                                                                                              | **Example**                                                                               |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `DeleteOne`           | Deletes a single document matching the filter condition.         | `ctx` (context.Context): The operation context<br> `opts...`: Deletion options, such as `options.DeleteOneOptions`.                                                                         | `deleter.DeleteOne(ctx, options.DeleteOne())`                                             |
| `DeleteMany`          | Deletes multiple documents matching the filter condition.        | `ctx` (context.Context): The operation context<br> `opts...`: Deletion options, such as `options.DeleteManyOptions`.                                                                        | `deleter.DeleteMany(ctx, options.DeleteMany())`                                           |
| `Filter`              | Sets the filter for the deletion operation.                      | `filter` (any): The filter condition that specifies which documents to delete.                                                                                                              | `deleter.Filter(bson.M{"age": 30})`                                                       |
| `ModelHook`           | Sets a model hook to handle specific operations on the document. | `modelHook` (any): The model hook function to handle document operations before and after.                                                                                                  | `deleter.ModelHook(myModelHook)`                                                          |
| `RegisterBeforeHooks` | Registers hooks to be executed before the deletion operation.    | `hooks...` (BeforeHookFn): List of before hooks.                                                                                                                                            | `deleter.RegisterBeforeHooks(beforeHook1, beforeHook2)`                                   |
| `RegisterAfterHooks`  | Registers hooks to be executed after the deletion operation.     | `hooks...` (AfterHookFn): List of after hooks.                                                                                                                                              | `deleter.RegisterAfterHooks(afterHook1, afterHook2)`                                      |
| `PreActionHandler`    | Executes hooks before the deletion operation.                    | `ctx` (context.Context): The operation context<br> `globalOpContext`: Global operation context<br> `opContext`: Current operation context<br> `opType`: The operation type (before delete). | `deleter.PreActionHandler(ctx, globalOpContext, opContext, operation.OpTypeBeforeDelete)` |
| `PostActionHandler`   | Executes hooks after the deletion operation.                     | `ctx` (context.Context): The operation context<br> `globalOpContext`: Global operation context<br> `opContext`: Current operation context<br> `opType`: The operation type (after delete).  | `deleter.PostActionHandler(ctx, globalOpContext, opContext, operation.OpTypeAfterDelete)` |
| `GetCollection`       | Gets the MongoDB collection being used for the operation.        | None                                                                                                                                                                                        | `deleter.GetCollection()`                                                                 |

## Delete a single document

```go
deleteResult, err := userColl.Deleter().Filter(query.Id("60e96214a21b1b0001c3d69e")).DeleteOne(context.Background())
```

The `DeleteOne` method is used to delete a single document. The `deleteResult` is of type `*mongo.DeleteResult`.

## Delete multiple documents

```go
deleteResult, err := userColl.Deleter().Filter(query.In("_id", "60e96214a21b1b0001c3d69e", "80e96214a21b1b0001c3d70e")).DeleteMany(context.Background())
```

The `DeleteMany` method is used to delete multiple documents. The `deleteResult` is of type `*mongo.DeleteResult`.
