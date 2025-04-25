# Updater

The `Updater()` method is used to obtain a new generic updater object, namely `Updater[T]`. With the methods of `Updater[T]`, we can execute relevant update operations.

| Method Name           | Description                              | Parameters                                                                                                                      | Example                                                                                 |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `FindOne`             | Find a single document                   | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.FindOne(ctx, options.Find())`                                                   |
| `Find`                | Find multiple documents                  | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.Find(ctx, options.Find())`                                                      |
| `Count`               | Get the number of documents              | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.Count(ctx, options.Find().SetLimit(10))`                                        |
| `Distinct`            | Get distinct values of a field           | Accepts `ctx` (context), `fieldName` (string), and optional query options `opts`                                                | `finder.Distinct(ctx, "fieldName", options.Find())`                                     |
| `DistinctWithParse`   | Get distinct values and parse the result | Accepts `ctx` (context), `fieldName` (string), `result` (any type), and optional query options `opts`                           | `finder.DistinctWithParse(ctx, "fieldName", &result, options.Find())`                   |
| `Filter`              | Set filter conditions                    | Accepts an `any` type parameter, representing the filter condition                                                              | `finder.Filter(query.Id("60e96214a21b1b0001c3d69e"))`                                   |
| `FindOneAndUpdate`    | Find and update a document               | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.FindOneAndUpdate(ctx, options.Find().SetUpdate(update.Set("name", "newName")))` |
| `Limit`               | Set the maximum number of documents      | Accepts an integer `limit` parameter                                                                                            | `finder.Limit(10)`                                                                      |
| `ModelHook`           | Set model hook                           | Accepts an `any` type model hook parameter                                                                                      | `finder.ModelHook(&MyModel{})`                                                          |
| `RegisterAfterHooks`  | Register after update hooks              | Accepts one or more `AfterHookFn` type hook functions                                                                           | `finder.RegisterAfterHooks(hook1, hook2)`                                               |
| `RegisterBeforeHooks` | Register before update hooks             | Accepts one or more `BeforeHookFn` type hook functions                                                                          | `finder.RegisterBeforeHooks(hook1, hook2)`                                              |
| `Skip`                | Set the number of documents to skip      | Accepts an integer `skip` parameter                                                                                             | `finder.Skip(5)`                                                                        |
| `Sort`                | Set sorting condition                    | Accepts an `any` type sorting condition parameter                                                                               | `finder.Sort(update.Sort("name", 1))`                                                   |
| `Updates`             | Set update operation                     | Accepts an `any` type update parameter, typically using methods from the `update` package                                       | `finder.Updates(update.Set("age", 30))`                                                 |
| `PostActionHandler`   | Handle post-action                       | Accepts `ctx` (context), `globalOpContext` (operation context), `opContext` (operation context), and `opTypes` (operation type) | `finder.PostActionHandler(ctx, globalOpContext, opContext, operation.OpCreate)`         |
| `PreActionHandler`    | Handle pre-action                        | Accepts `ctx` (context), `globalOpContext` (operation context), `opContext` (operation context), and `opTypes` (operation type) | `finder.PreActionHandler(ctx, globalOpContext, opContext, operation.OpUpdate)`          |
| `GetCollection`       | Get the collection object                | No parameters                                                                                                                   | `collection := finder.GetCollection()`                                                  |

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
