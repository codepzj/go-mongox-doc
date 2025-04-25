# Updater

The `Updater()` method is used to obtain a new generic updater object, namely `Updater[T]`. With the methods of `Updater[T]`, we can execute relevant update operations.

## Update a single document

### Set Use multiple fields to update
```go
updateResult, err := userColl.Updater().
		Filter(query.Id("60e96214a21b1b0001c3d69e")).
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateOne(context.Background())
```

- The `UpdateOne` method is used to update a single document. The `updateResult` is of type `*mongo.UpdateResult`.

- Through the `Updates` method, we can specify the operations for the update. This method accepts parameters of type `any`, allowing for any type of argument to be passed in, provided they conform to a valid update statement structure. In the example provided, `update.Set("name", "Mingyong Chen")` is used to specify that the `name` field should be updated to "Mingyong Chen". For more buildss of update statements, refer to the `update` package.

### SetFields Use struct to update fields

```go
updateResult, err := userColl.Updater().
		Filter(query.Id("60e96214a21b1b0001c3d69e")).
		Updates(update.SetFields(&model.User{Name: "Mingyong Chen"})).
		UpdateOne(context.Background())
```

- The `SetFields` method is used to update struct fields. This method accepts parameters of type `any`, meaning any type of argument can be passed in, provided they conform to a valid update statement structure. In the example above, `update.SetFields(&model.User{
	Name: "Mingyong Chen",
	Age:  18,
})` is used to specify that the fields `name` should be updated to "Mingyong Chen" and `age` to `18`. The `omitempty` tag can be used to avoid updating fields with zero values.


## Update multiple documents

### Set Use multiple fields to update
```go
updateResult, err := userColl.Updater().
		Updates(update.Set("name", "Mingyong Chen")).
		UpdateMany(context.Background())
```

- The `UpdateMany` method is used for updating multiple documents. The `updateResult` is of type `*mongo.UpdateResult`.

### SetFields Use struct to update fields

```go
updateResult, err := userColl.Updater().
		Updates(update.SetFields(&model.User{Name: "Mingyong Chen"})).
		UpdateMany(context.Background())
```

Similarly, the `SetFields` method is used to update struct fields.

## Upsert operation

```go
updateResult, err := userColl.Updater().
		Filter(query.Eq("name", "Mingyong Chen")).
		Updates(update.NewBuilder().Set("name", "Mingyong Chen").Set("age", 18).Build()).
		Upsert(context.Background())
```

- The `Upsert` method is used to update or insert a single document. The `updateResult` is of type `*mongo.UpdateResult`

## Parameters

| Method       | Description                        | Parameters             | Return Value                   |
| ------------ | ---------------------------------- | ---------------------- | ------------------------------ |
| `UpdateOne`  | Update a single document           | `context.Context`, `options(optional)` | `*mongo.UpdateResult`, `error` |
| `UpdateMany` | Update multiple documents          | `context.Context`, `options(optional)` | `*mongo.UpdateResult`, `error` |
| `Upsert`     | Update or insert a single document | `context.Context`, `options(optional)` | `*mongo.UpdateResult`, `error` |

- [UpdateResult](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo#UpdateResult)
