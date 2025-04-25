# Finder 查询器

通过 `Finder()` 方法获取一个新的泛型的查询器对象，即 `Finder[T]`。通过 `Finder[T]` 的方法，我们能够执行相关的查询操作。

| 方法名              | 功能描述                   | 参数说明                                                                                                 | 示例                                                                                                      |
| ------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| FindOne             | 查找单个文档               | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.FindOne(ctx, query.NewBuilder().KeyValue("name", "John").Build())`                                |
| Find                | 查找多个文档               | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.Find(ctx, query.NewBuilder().KeyValue("age", 30).Build())`                                        |
| Count               | 获取文档数量               | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.Count(ctx, query.NewBuilder().KeyValue("status", "active").Build())`                              |
| Distinct            | 获取字段的不同值           | 接受 `ctx`（上下文）、`fieldName`（字符串）和可选的查询选项 `opts`                                       | `finder.Distinct(ctx, "name", query.NewBuilder().KeyValue("status", "active").Build())`                   |
| DistinctWithParse   | 获取字段的不同值并解析结果 | 接受 `ctx`（上下文）、`fieldName`（字符串）、`result`（任意类型）和可选的查询选项 `opts`                 | `finder.DistinctWithParse(ctx, "name", &result, query.NewBuilder().KeyValue("status", "active").Build())` |
| Filter              | 设置过滤条件               | 接受一个 `any` 类型的参数，表示过滤条件                                                                  | `finder.Filter(query.NewBuilder().Id("60e96214a21b1b0001c3d69e").Build())`                                |
| FindOneAndUpdate    | 查找并更新文档             | 接受 `ctx`（上下文）和可选的查询选项 `opts`                                                              | `finder.FindOneAndUpdate(ctx, query.NewBuilder().KeyValue("name", "newName").Build())`                    |
| Limit               | 设置返回文档的最大数量     | 接受一个整数 `limit` 参数                                                                                | `finder.Limit(10)`                                                                                        |
| ModelHook           | 设置模型钩子               | 接受一个 `any` 类型的模型钩子参数                                                                        | `finder.ModelHook(&MyModel{})`                                                                            |
| RegisterAfterHooks  | 注册更新后的钩子函数       | 接受一个或多个 `AfterHookFn` 类型的钩子函数                                                              | `finder.RegisterAfterHooks(hook1, hook2)`                                                                 |
| RegisterBeforeHooks | 注册更新前的钩子函数       | 接受一个或多个 `BeforeHookFn` 类型的钩子函数                                                             | `finder.RegisterBeforeHooks(hook1, hook2)`                                                                |
| Skip                | 设置跳过的文档数量         | 接受一个整数 `skip` 参数                                                                                 | `finder.Skip(5)`                                                                                          |
| Sort                | 设置排序条件               | 接受一个 `any` 类型的排序条件参数                                                                        | `finder.Sort(query.NewBuilder().KeyValue("name", 1).Build())`                                             |
| Updates             | 设置更新操作               | 接受一个 `any` 类型的更新参数，通常使用 `update` 包中的方法                                              | `finder.Updates(update.Set("age", 30))`                                                                   |
| PostActionHandler   | 处理后置操作               | 接受 `ctx`（上下文）、`globalOpContext`（操作上下文）、`opContext`（操作上下文）和 `opTypes`（操作类型） | `finder.PostActionHandler(ctx, globalOpContext, opContext, operation.OpCreate)`                           |
| PreActionHandler    | 处理前置操作               | 接受 `ctx`（上下文）、`globalOpContext`（操作上下文）、`opContext`（操作上下文）和 `opTypes`（操作类型） | `finder.PreActionHandler(ctx, globalOpContext, opContext, operation.OpUpdate)`                            |
| GetCollection       | 获取集合对象               | 无参数                                                                                                   | `collection := finder.GetCollection()`                                                                    |

## 查询单个文档

```go
user, err := userColl.Finder().Filter(query.Id("60e96214a21b1b0001c3d69e")).FindOne(context.Background())
```

- `FindOne` 方法用于查询单个文档。`user` 为指定的泛型类型的指针对象，即 `*User`。

- 通过 `Filter` 方法，我们可以指定查询条件。该方法接受的参数类型 `any`，意味着允许传入任意类型的参数（但是必须是合法的查询条件）。在上面的例子中，`query.Id("60e96214a21b1b0001c3d69e")` 用于指定查询条件为 `_id` 等于 `60e96214a21b1b0001c3d69e`。更多的查询条件构建可以参考 [query 包](../build/query/introduction)。

## 查询多个文档

```go
users, err := userColl.Finder().Filter(query.In("_id", "60e96214a21b1b0001c3d69e", "80e96214a21b1b0001c3d70e")).Find(context.Background())
```

- `Find` 方法用于查询多个文档。`users` 为指定的泛型类型的指针对象的切片，即 `[]*User`。

## 统计文档数量

```go
count, err := userColl.Finder().
		Filter(query.NewBuilder().Gt("age", 18).Lt("age", 24).Build()).
		Count(context.Background())
```

- `Count` 方法用于统计文档数量。`count` 为 `int64` 类型。

## Distinct 查询

```go
// v1
//result, err := userColl.Finder().Distinct(context.Background(), "age")
//
//// 你可以使用 DistinctWithParse 方法来解析结果到一个切片
//ageSlice := make([]int, 0)
//err := userColl.Finder().DistinctWithParse(context.Background(), "age", &ageSlice)

// v2
distinctResult := userColl.Finder().Distinct(context.Background(), "age")
if distinctResult.Err() != nil {
    panic(distinctResult.Err())
}

// 你可以使用 DistinctWithParse 方法来解析结果到一个切片
ageSlice := make([]int, 0)
err := userColl.Finder().DistinctWithParse(context.Background(), "age", &ageSlice)
```

- `Distinct` 方法用于查询指定字段的唯一值。`mongo-driver v1` 返回的 `result` 为 `[]any` 类型，而 `mongo-driver v2` 返回的则是 `*mongo.DistinctResult` 类型。

- 如果你想要解析结果到一个切片，你可以使用 `DistinctWithParse` 方法。该方法接受一个指向切片的指针作为参数，用于解析结果。

## 分页查询

```go
users, err := userColl.Finder().Skip(10).Limit(10).Find(context.Background())
```

- `Skip(n)`: 设置查询结果跳过前 n 条记录，通常用于分页时跳过已加载的部分数据。
- `Limit(n)`: 限制查询结果返回的最大记录数，避免一次性加载过多数据。

本示例中：跳过前 10 条记录，返回第 11~20 条，共 10 条数据，通常用于第 2 页的数据加载（假设每页 10 条）。

## 对结果进行排序

```go
users, err := userColl.Finder().Sort(bson.M{"age": 1, "created_at": -1}).Find(context.Background())
```

- `Sort`: 该方法用于对查询结果进行排序。
- `bson.M{"age": 1, "created_at": -1}`: 按照 `age` 字段升序排序，如果 `age` 相同，则按照 `created_at` 字段降序排序。
