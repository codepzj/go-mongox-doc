# Finder

The `Finder()` method is used to obtain a new generic query object, namely `Finder[T]`. With the methods of `Finder[T]`, we can execute relevant query operations.

| Method Name         | Description                              | Parameters                                                                                                                      | Example                                                                                                   |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| FindOne             | Find a single document                   | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.FindOne(ctx, query.NewBuilder().KeyValue("name", "John").Build())`                                |
| Find                | Find multiple documents                  | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.Find(ctx, query.NewBuilder().KeyValue("age", 30).Build())`                                        |
| Count               | Get the number of documents              | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.Count(ctx, query.NewBuilder().KeyValue("status", "active").Build())`                              |
| Distinct            | Get distinct values of a field           | Accepts `ctx` (context), `fieldName` (string), and optional query options `opts`                                                | `finder.Distinct(ctx, "name", query.NewBuilder().KeyValue("status", "active").Build())`                   |
| DistinctWithParse   | Get distinct values and parse the result | Accepts `ctx` (context), `fieldName` (string), `result` (any type), and optional query options `opts`                           | `finder.DistinctWithParse(ctx, "name", &result, query.NewBuilder().KeyValue("status", "active").Build())` |
| Filter              | Set filter conditions                    | Accepts an `any` type parameter, representing the filter condition                                                              | `finder.Filter(query.NewBuilder().Id("60e96214a21b1b0001c3d69e").Build())`                                |
| FindOneAndUpdate    | Find and update a document               | Accepts `ctx` (context) and optional query options `opts`                                                                       | `finder.FindOneAndUpdate(ctx, query.NewBuilder().KeyValue("name", "newName").Build())`                    |
| Limit               | Set the maximum number of documents      | Accepts an integer `limit` parameter                                                                                            | `finder.Limit(10)`                                                                                        |
| ModelHook           | Set model hook                           | Accepts an `any` type model hook parameter                                                                                      | `finder.ModelHook(&MyModel{})`                                                                            |
| RegisterAfterHooks  | Register after update hooks              | Accepts one or more `AfterHookFn` type hook functions                                                                           | `finder.RegisterAfterHooks(hook1, hook2)`                                                                 |
| RegisterBeforeHooks | Register before update hooks             | Accepts one or more `BeforeHookFn` type hook functions                                                                          | `finder.RegisterBeforeHooks(hook1, hook2)`                                                                |
| Skip                | Set the number of documents to skip      | Accepts an integer `skip` parameter                                                                                             | `finder.Skip(5)`                                                                                          |
| Sort                | Set sorting condition                    | Accepts an `any` type sorting condition parameter                                                                               | `finder.Sort(query.NewBuilder().KeyValue("name", 1).Build())`                                             |
| Updates             | Set update operation                     | Accepts an `any` type update parameter, typically using methods from the `update` package                                       | `finder.Updates(update.Set("age", 30))`                                                                   |
| PostActionHandler   | Handle post-action                       | Accepts `ctx` (context), `globalOpContext` (operation context), `opContext` (operation context), and `opTypes` (operation type) | `finder.PostActionHandler(ctx, globalOpContext, opContext, operation.OpCreate)`                           |
| PreActionHandler    | Handle pre-action                        | Accepts `ctx` (context), `globalOpContext` (operation context), `opContext` (operation context), and `opTypes` (operation type) | `finder.PreActionHandler(ctx, globalOpContext, opContext, operation.OpUpdate)`                            |
| GetCollection       | Get the collection object                | No parameters                                                                                                                   | `collection := finder.GetCollection()`                                                                    |

## Find a single document

```go
user, err := userColl.Finder().Filter(query.Id("60e96214a21b1b0001c3d69e")).FindOne(context.Background())
```

- The `FindOne` method is used to query a single document. `user` is a pointer object of the specified generic type, i.e., `*User`.

- The `Filter` method allows us to specify search criteria. It accepts parameters of type `any`, meaning any type of argument can be passed in, provided they are valid query conditions. In the example above, `query.Id("60e96214a21b1b0001c3d69e")` is used to specify the search condition where `_id` equals `60e96214a21b1b0001c3d69e`. For more on building query conditions, refer to the [`query` package](../build/query/introduction).

## Find multiple documents

```go
users, err := userColl.Finder().Filter(query.In("_id", "60e96214a21b1b0001c3d69e", "80e96214a21b1b0001c3d70e")).Find(context.Background())
```

- The `Find` method is used to query multiple documents. `users` is a slice of pointer objects of the specified generic type, i.e., `[]*User`.

## Count document

```go
count, err := userColl.Finder().
		Filter(query.NewBuilder().Gt("age", 18).Lt("age", 24).Build()).
		Count(context.Background())
```

- The `Count` method is used to count the number of documents. `count` is of type `int64`.

## Distinct query

```go
// v1
//result, err := userColl.Finder().Distinct(context.Background(), "age")
//
//// you can parse the result to slices using the DistinctWithParse method
//ageSlice := make([]int, 0)
//err := userColl.Finder().DistinctWithParse(context.Background(), "age", &ageSlice)

// v2
distinctResult := userColl.Finder().Distinct(context.Background(), "age")
if distinctResult.Err() != nil {
    panic(distinctResult.Err())
}

// you can parse the result to slices using the DistinctWithParse method
ageSlice := make([]int, 0)
err := userColl.Finder().DistinctWithParse(context.Background(), "age", &ageSlice)
```

- The `Distinct` method is used to query the unique value of a specified field. `mongo-driver v1` returns a result of type `[]any`, whereas `mongo-driver v2` returns a `*mongo.DistinctResult`.

- If you wish to parse the result into a slice, you can use the `DistinctWithParse` method. This method takes a pointer to a slice as a parameter for parsing the results.

## Pagination Query

```go
users, err := userColl.Finder().Skip(10).Limit(10).Find(context.Background())
```

- `Skip(n)`: Skips the first n records in the query result. Commonly used in pagination to bypass records that have already been retrieved.
- `Limit(n)`: Restricts the maximum number of records returned by the query, helping to control data load and improve performance.

This example skips 10 data and limits the number of returned data to 10, which is the data of the second page.

## Sorting Results

```go
users, err := userColl.Finder().Sort(bson.M{"age": 1, "created_at": -1}).Find(context.Background())
```

- `Sort`：Sort the query results.
- `bson.M{"age": 1, "created_at": -1}`：Sort the result by `age` in ascending order, and if `age` is the same, sort the result by `created_at` in descending order.
