# Finder 查询器

通过 `Finder()` 方法获取一个新的泛型的查询器对象，即 `Finder[T]`。通过 `Finder[T]` 的方法，我们能够执行相关的查询操作。

## 查询单个文档

```go
user, err := userColl.Finder().Filter(query.Id("60e96214a21b1b0001c3d69e")).FindOne(context.Background(), options.FindOne().SetSkip(1))
```

- `FindOne` 方法用于查询单个文档。`user` 为指定的泛型类型的指针对象，即 `*User`。

- 通过 `Filter` 方法，我们可以指定查询条件。该方法接受的参数类型 `any`，意味着允许传入任意类型的参数（但是必须是合法的查询条件）。在上面的例子中，`query.Id("60e96214a21b1b0001c3d69e")` 用于指定查询条件为 `_id` 等于 `60e96214a21b1b0001c3d69e`。更多的查询条件构建可以参考 [query 包](../build/query/introduction)。

- finder 中的 options 参数是可选的，通过 `options.FindOne()` 方法，我们可以指定查询选项。在上面的例子中，`options.FindOne().SetSkip(1)` 用于指定查询结果跳过 1 条数据。

## 查询多个文档

```go
users, err := userColl.Finder().Filter(query.In("_id", "60e96214a21b1b0001c3d69e", "80e96214a21b1b0001c3d70e")).Find(context.Background(), options.Find().SetSkip(1).SetLimit(3).SetSort(bson.M{"age": 1}))
```

- `Find` 方法用于查询多个文档。`users` 为指定的泛型类型的指针对象的切片，即 `[]*User`。

- finder 中的 options 参数是可选的，通过 `options.Find()` 方法，我们可以指定查询选项。在上面的例子中，`options.Find().SetSkip(1).SetLimit(3).SetSort(bson.M{"age": 1})` 用于指定查询结果跳过 1 条数据，限制为 3 条数据，并按照 `age` 字段升序排序。

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

## 查询排序语法糖

### Skip

```go
// 跳过1条数据
userColl.Finder().Skip(1).Find(context.Background())
```

### Limit

```go
// 限制为3条数据
userColl.Finder().Limit(3).Find(context.Background())
```

### Sort

```go
// 按照 `age` 字段升序排序
userColl.Finder().Sort(bson.M{"age": 1}).Find(context.Background())
```

对于上方的[查询多个文档](./finder.md#查询多个文档)，我们可以更方便地进行查询。

```go
users, err := userColl.Finder().Skip(1).Limit(3).Sort(bson.M{"age": 1}).Filter(query.In("_id", "60e96214a21b1b0001c3d69e", "80e96214a21b1b0001c3d70e")).Find(context.Background())
```

## 参数列表

| 方法       | 描述                 | 参数                              | 返回值                  |
| ---------- | -------------------- | --------------------------------- | ----------------------- |
| `FindOne`  | 查询单个文档         | `context.Context`,`options(可选)` | `(*T, error)`           |
| `Find`     | 查询多个文档         | `context.Context`,`options(可选)` | `([]*T, error)`         |
| `Count`    | 统计文档数量         | `context.Context`                 | `(int64, error)`        |
| `Distinct` | 查询指定字段的唯一值 | `context.Context`,`string`        | `*mongo.DistinctResult` |
| `Skip`     | 跳过数据             | `int64`                           | `Finder[T]`             |
| `Limit`    | 限制数据             | `int64`                           | `Finder[T]`             |
| `Sort`     | 排序                 | `any`                             | `Finder[T]`             |

- [Finder](https://pkg.go.dev/github.com/chenmingyong0423/go-mongox/v2/finder#Finder)
- [DistinctResult](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo#DistinctResult)
- [FindOneOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#FindOneOptions)
- [FindOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#FindOptions)
- [CountOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#CountOptions)
- [DistinctOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#DistinctOptions)
