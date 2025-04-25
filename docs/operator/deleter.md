# Deleter 删除器

通过 `Deleter()` 方法获取一个新的泛型的删除器对象，即 `Deleter[T]`。通过 `Deleter[T]` 的方法，我们能够执行相关的删除操作。

| **方法名**            | **功能描述**                                       | **参数说明**                                                                                                                                     | **示例**                                                                                  |
| --------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `DeleteOne`           | 删除单个符合过滤条件的文档。                       | `ctx` (context.Context)：操作上下文<br> `opts...`：删除选项，例如 `options.DeleteOneOptions`。                                                   | `deleter.DeleteOne(ctx, options.DeleteOne())`                                             |
| `DeleteMany`          | 删除多个符合过滤条件的文档。                       | `ctx` (context.Context)：操作上下文<br> `opts...`：删除选项，例如 `options.DeleteManyOptions`。                                                  | `deleter.DeleteMany(ctx, options.DeleteMany())`                                           |
| `Filter`              | 设置删除操作的过滤条件。                           | `filter` (any)：过滤条件，指定哪些文档需要被删除。                                                                                               | `deleter.Filter(bson.M{"age": 30})`                                                       |
| `ModelHook`           | 设置模型钩子，用于处理文档的特定操作。             | `modelHook` (any)：模型钩子函数，用于操作前后的文档处理。                                                                                        | `deleter.ModelHook(myModelHook)`                                                          |
| `RegisterBeforeHooks` | 注册操作前的钩子函数，执行删除操作之前的处理逻辑。 | `hooks...` (BeforeHookFn)：前置钩子函数列表。                                                                                                    | `deleter.RegisterBeforeHooks(beforeHook1, beforeHook2)`                                   |
| `RegisterAfterHooks`  | 注册操作后的钩子函数，执行删除操作之后的处理逻辑。 | `hooks...` (AfterHookFn)：后置钩子函数列表。                                                                                                     | `deleter.RegisterAfterHooks(afterHook1, afterHook2)`                                      |
| `PreActionHandler`    | 执行删除操作前的钩子函数。                         | `ctx` (context.Context)：操作上下文<br> `globalOpContext`：全局操作上下文<br> `opContext`：当前操作上下文<br> `opType`：操作类型（删除前操作）。 | `deleter.PreActionHandler(ctx, globalOpContext, opContext, operation.OpTypeBeforeDelete)` |
| `PostActionHandler`   | 执行删除操作后的钩子函数。                         | `ctx` (context.Context)：操作上下文<br> `globalOpContext`：全局操作上下文<br> `opContext`：当前操作上下文<br> `opType`：操作类型（删除后操作）。 | `deleter.PostActionHandler(ctx, globalOpContext, opContext, operation.OpTypeAfterDelete)` |
| `GetCollection`       | 获取当前操作的 MongoDB 集合。                      | 无                                                                                                                                               | `deleter.GetCollection()`                                                                 |

## 删除单个文档

```go
deleteResult, err := userColl.Deleter().Filter(query.Id("60e96214a21b1b0001c3d69e")).DeleteOne(context.Background())
```

`DeleteOne` 方法用于删除单个文档。`deleteResult` 为 `*mongo.DeleteResult` 类型。

## 删除多个文档

```go
deleteResult, err := userColl.Deleter().Filter(query.In("_id", "60e96214a21b1b0001c3d69e", "80e96214a21b1b0001c3d70e")).DeleteMany(context.Background())
```

`DeleteMany` 方法用于删除多个文档。`deleteResult` 为 `*mongo.DeleteResult` 类型。
