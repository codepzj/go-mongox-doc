# Updater 更新器

通过 `Updater()` 方法获取一个新的泛型的更新器对象，即 `Updater[T]`。通过 `Updater[T]` 的方法，我们能够执行相关的更新操作。

| 方法名                | 功能描述                   | 参数说明                                                                                                 | 示例                                                                                    |
| --------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `FindOne`             | 查找单个文档               | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.FindOne(ctx, options.Find())`                                                   |
| `Find`                | 查找多个文档               | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.Find(ctx, options.Find())`                                                      |
| `Count`               | 获取文档数量               | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.Count(ctx, options.Find().SetLimit(10))`                                        |
| `Distinct`            | 获取字段的不同值           | 接受 `ctx`（上下文）、`fieldName`（字符串）和可选的查询选项 `opts`                                       | `finder.Distinct(ctx, "fieldName", options.Find())`                                     |
| `DistinctWithParse`   | 获取字段的不同值并解析结果 | 接受 `ctx`（上下文）、`fieldName`（字符串）、`result`（任意类型）和可选的查询选项 `opts`                 | `finder.DistinctWithParse(ctx, "fieldName", &result, options.Find())`                   |
| `Filter`              | 设置过滤条件               | 接受一个 `any` 类型参数，表示过滤条件                                                                    | `finder.Filter(query.Id("60e96214a21b1b0001c3d69e"))`                                   |
| `FindOneAndUpdate`    | 查找并更新文档             | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.FindOneAndUpdate(ctx, options.Find().SetUpdate(update.Set("name", "newName")))` |
| `Limit`               | 设置返回文档的最大数量     | 接受一个整数 `limit` 参数                                                                                | `finder.Limit(10)`                                                                      |
| `ModelHook`           | 设置模型钩子               | 接受一个 `any` 类型的模型钩子参数                                                                        | `finder.ModelHook(&MyModel{})`                                                          |
| `RegisterAfterHooks`  | 注册更新后的钩子函数       | 接受一个或多个 `AfterHookFn` 类型的钩子函数                                                              | `finder.RegisterAfterHooks(hook1, hook2)`                                               |
| `RegisterBeforeHooks` | 注册更新前的钩子函数       | 接受一个或多个 `BeforeHookFn` 类型的钩子函数                                                             | `finder.RegisterBeforeHooks(hook1, hook2)`                                              |
| `Skip`                | 设置跳过的文档数量         | 接受一个整数 `skip` 参数                                                                                 | `finder.Skip(5)`                                                                        |
| `Sort`                | 设置排序条件               | 接受一个 `any` 类型的排序条件参数                                                                        | `finder.Sort(update.Sort("name", 1))`                                                   |
| `Updates`             | 设置更新操作               | 接受一个 `any` 类型的更新参数，通常使用 `update` 包中的方法                                              | `finder.Updates(update.Set("age", 30))`                                                 |
| `PostActionHandler`   | 处理后置操作               | 接受 `ctx`（上下文）、`globalOpContext`（操作上下文）、`opContext`（操作上下文）和 `opTypes`（操作类型） | `finder.PostActionHandler(ctx, globalOpContext, opContext, operation.OpCreate)`         |
| `PreActionHandler`    | 处理前置操作               | 接受 `ctx`（上下文）、`globalOpContext`（操作上下文）、`opContext`（操作上下文）和 `opTypes`（操作类型） | `finder.PreActionHandler(ctx, globalOpContext, opContext, operation.OpUpdate)`          |
| `GetCollection`       | 获取集合对象               | 无参数                                                                                                   | `collection := finder.GetCollection()`                                                  |

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
