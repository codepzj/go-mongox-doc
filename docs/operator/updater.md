# Updater 更新器

通过 `Updater()` 方法获取一个新的泛型的更新器对象，即 `Updater[T]`。通过 `Updater[T]` 的方法，我们能够执行相关的更新操作。

## 更新单个文档

### Set 使用多个字段更新

```go
updateResult, err := userColl.Updater().
		Filter(query.Id("60e96214a21b1b0001c3d69e")).
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateOne(context.Background())
```

`UpdateOne` 方法用于更新单个文档。`updateResult` 为 `*mongo.UpdateResult` 类型。

- 通过 `Updates` 方法，我们可以指定更新的操作。该方法接受的参数类型为 `any`，意味着可以传入任意类型的参数（但是必须是合法的更新语句结构）。在上面的例子中，`update.Set("name", "Mingyong Chen")` 用于指定更新字段为 `name` 等于 `Mingyong Chen`。更多的更新语句构建可以参考 `update` 包。

### SetFields 使用结构体更新字段

```go
updateResult, err := userColl.Updater().
		Filter(query.Id("60e96214a21b1b0001c3d69e")).
		Updates(update.SetFields(&model.User{
			Name: "Mingyong Chen",
			Age:  18,
		})).
		UpdateOne(context.Background())
```

- `SetFields` 方法用于更新结构体字段。该方法接受的参数类型为 `any`，意味着可以传入任意类型的参数（但是必须是合法的更新语句结构）。在上面的例子中，`update.SetFields(&model.User{
	Name: "Mingyong Chen",
	Age:  18,
})` 用于指定更新字段为 `name` 等于 `Mingyong Chen`，`age` 等于 `18`，使用 `omitempty` 标签可以避免更新零值的字段。

## 更新多个文档

### Set 使用多个字段更新

```go
updateResult, err := userColl.Updater().
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateMany(context.Background())
```

- `UpdateMany` 方法用于更新多个文档。`updateResult` 为 `*mongo.UpdateResult` 类型。

### SetFields 使用结构体更新字段

```go
updateResult, err := userColl.Updater().
		Updates(update.SetFields(&model.User{
			Name: "Mingyong Chen",
			Age:  18,
		})).
		UpdateMany(context.Background())
```

同上，`SetFields` 方法用于更新结构体字段。

## Upsert 操作

```go
updateResult, err := userColl.Updater().
		Filter(query.Eq("name", "Mingyong Chen")).
		Updates(update.NewBuilder().Set("name", "Mingyong Chen").Set("age", 18).Build()).
		Upsert(context.Background())
```

- `Upsert` 方法用于更新或插入一个文档。`updateResult` 为 `*mongo.UpdateResult` 类型。

## 参数列表

| 方法         | 描述               | 参数                              | 返回值 |
| ------------ | ------------------ | --------------------------------- | ------ |
| `UpdateOne`  | 更新单个文档       | `context.Context`,`options(可选)` | `(*mongo.UpdateResult, error)`   |
| `UpdateMany` | 更新多个文档       | `context.Context`,`options(可选)` | `(*mongo.UpdateResult, error)`   |
| `Upsert`     | 更新或插入一个文档 | `context.Context`,`options(可选)` | `(*mongo.UpdateResult, error)`   |

- [UpdateResult](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo#UpdateResult)
