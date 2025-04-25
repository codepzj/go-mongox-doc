# Updater

The `Updater()` method is used to obtain a new generic updater object, namely `Updater[T]`. With the methods of `Updater[T]`, we can execute relevant update operations.

| Method Name         | Description                                        | Parameters                                                                                                   | Example                                                              |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| NewUpdater          | Creates a new Updater instance                     | `collection`: Mongo collection; `dbCallbacks`: database operation callbacks; `fields`: struct field metadata | `updater := NewUpdater[User](collection, callback, fields)`          |
| UpdateOne           | Updates a single document in the collection        | `ctx`: 上下文；`opts`: 更新选项（可选）                                                                      | `updater.UpdateOne(ctx, opts...)`                                    |
| UpdateMany          | Updates multiple documents in the collection       | `ctx`: 上下文；`opts`: 更新选项（可选）                                                                      | `updater.UpdateMany(ctx, opts...)`                                   |
| Upsert              | Performs an upsert operation (insert or update)    | `ctx`: 上下文；`opts`: 更新选项（可选）                                                                      | `updater.Upsert(ctx, opts...)`                                       |
| Filter              | Sets the query filter                              | `filter`: 查询过滤条件                                                                                       | `updater.Filter(filter)`                                             |
| Updates             | Sets the update data                               | `updates`: 更新数据                                                                                          | `updater.Updates(updates)`                                           |
| Replacement         | Sets the replacement data                          | `replacement`: 替换数据                                                                                      | `updater.Replacement(replacement)`                                   |
| ModelHook           | Registers a model hook (for reflection usage)      | `modelHook`: 任意类型的钩子实例                                                                              | `updater.ModelHook(MyHook{})`                                        |
| RegisterBeforeHooks | Registers hooks to run before the update operation | `hooks`: 函数列表（更新前执行）                                                                              | `updater.RegisterBeforeHooks(hook1, hook2)`                          |
| RegisterAfterHooks  | Registers hooks to run after the update operation  | `hooks`: 函数列表（更新后执行）                                                                              | `updater.RegisterAfterHooks(hook1, hook2)`                           |
| PreActionHandler    | Executes actions before the update operation       | `ctx`: 上下文；`globalOpContext`: 全局操作上下文；`opContext`: 操作上下文；`opType`: 操作类型                | `updater.PreActionHandler(ctx, globalOpContext, opContext, opType)`  |
| PostActionHandler   | Executes actions after the update operation        | `ctx`: 上下文；`globalOpContext`: 全局操作上下文；`opContext`: 操作上下文；`opType`: 操作类型                | `updater.PostActionHandler(ctx, globalOpContext, opContext, opType)` |
| GetCollection       | Gets the Mongo collection object                   | 无参数                                                                                                       | `coll := updater.GetCollection()`                                    |

## Update a single document

```go
updateResult, err := userColl.Updater().
		Filter(query.Id("60e96214a21b1b0001c3d69e")).
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateOne(context.Background())
```

- The `UpdateOne` method is used to update a single document. The `updateResult` is of type `*mongo.UpdateResult`.

- Through the `Updates` method, we can specify the operations for the update. This method accepts parameters of type `any`, allowing for any type of argument to be passed in, provided they conform to a valid update statement structure. In the example provided, `update.Set("name", "Mingyong Chen")` is used to specify that the `name` field should be updated to "Mingyong Chen". For more buildss of update statements, refer to the `update` package.

## Update multiple documents

```go
updateResult, err := userColl.Updater().
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateMany(context.Background())
```

- The `UpdateMany` method is used for updating multiple documents. The `updateResult` is of type `*mongo.UpdateResult`.

## Upsert operation

```go
updateResult, err := userColl.Updater().
		Filter(query.Eq("name", "Mingyong Chen")).
		Updates(update.NewBuilder().Set("name", "Mingyong Chen").Set("age", 18).Build()).
		Upsert(context.Background())
```

- The `Upsert` method is used to update or insert a single document. The `updateResult` is of type `*mongo.UpdateResult`.
