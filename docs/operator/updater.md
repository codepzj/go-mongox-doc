# Updater 更新器

通过 `Updater()` 方法获取一个新的泛型的更新器对象，即 `Updater[T]`。通过 `Updater[T]` 的方法，我们能够执行相关的更新操作。

| 方法名              | 功能描述                          | 参数说明                                                                                      | 示例                                                                 |
| ------------------- | --------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| NewUpdater          | 创建一个新的 Updater 实例         | `collection`: Mongo 集合；`dbCallbacks`: 数据库操作回调；`fields`: 结构体字段元信息           | `updater := NewUpdater[User](collection, callback, fields)`          |
| UpdateOne           | 更新集合中的一条数据              | `ctx`: 上下文；`opts`: 更新选项（可选）                                                       | `updater.UpdateOne(ctx, opts...)`                                    |
| UpdateMany          | 更新集合中的多条数据              | `ctx`: 上下文；`opts`: 更新选项（可选）                                                       | `updater.UpdateMany(ctx, opts...)`                                   |
| Upsert              | 插入或更新一条数据（upsert 操作） | `ctx`: 上下文；`opts`: 更新选项（可选）                                                       | `updater.Upsert(ctx, opts...)`                                       |
| Filter              | 设置查询过滤条件                  | `filter`: 查询过滤条件                                                                        | `updater.Filter(filter)`                                             |
| Updates             | 设置更新的数据                    | updates: 更新数据                                                                             | `updater.Updates(updates)`                                           |
| Replacement         | 设置替换操作的数据                | replacement: 替换的数据                                                                       | `updater.Replacement(replacement)`                                   |
| ModelHook           | 注册模型钩子（反射使用）          | modelHook: 任意类型的钩子实例                                                                 | `updater.ModelHook(MyHook{})`                                        |
| RegisterBeforeHooks | 注册更新前的钩子函数              | `hooks`: 函数列表（更新前执行）                                                               | `updater.RegisterBeforeHooks(hook1, hook2)`                          |
| RegisterAfterHooks  | 注册更新后的钩子函数              | `hooks`: 函数列表（更新后执行）                                                               | `updater.RegisterAfterHooks(hook1, hook2)`                           |
| PreActionHandler    | 执行更新前的操作                  | `ctx`: 上下文；`globalOpContext`: 全局操作上下文；`opContext`: 操作上下文；`opType`: 操作类型 | `updater.PreActionHandler(ctx, globalOpContext, opContext, opType)`  |
| PostActionHandler   | 执行更新后的操作                  | `ctx`: 上下文；`globalOpContext`: 全局操作上下文；`opContext`: 操作上下文；`opType`: 操作类型 | `updater.PostActionHandler(ctx, globalOpContext, opContext, opType)` |
| GetCollection       | 获取 Mongo 集合对象               | 无参数                                                                                        | `coll := updater.GetCollection()`                                    |

## 更新单个文档

```go
updateResult, err := userColl.Updater().
		Filter(query.Id("60e96214a21b1b0001c3d69e")).
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateOne(context.Background())
```

`UpdateOne` 方法用于更新单个文档。`updateResult` 为 `*mongo.UpdateResult` 类型。

- 通过 `Updates` 方法，我们可以指定更新的操作。该方法接受的参数类型为 `any`，意味着可以传入任意类型的参数（但是必须是合法的更新语句结构）。在上面的例子中，`update.Set("name", "Mingyong Chen")` 用于指定更新字段为 `name` 等于 `Mingyong Chen`。更多的更新语句构建可以参考 `update` 包。

## 更新多个文档

```go
updateResult, err := userColl.Updater().
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateMany(context.Background())
```

- `UpdateMany` 方法用于更新多个文档。`updateResult` 为 `*mongo.UpdateResult` 类型。

## Upsert 操作

```go
updateResult, err := userColl.Updater().
		Filter(query.Eq("name", "Mingyong Chen")).
		Updates(update.NewBuilder().Set("name", "Mingyong Chen").Set("age", 18).Build()).
		Upsert(context.Background())
```

- `Upsert` 方法用于更新或插入一个文档。`updateResult` 为 `*mongo.UpdateResult` 类型。
