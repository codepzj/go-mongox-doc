# Finder

The `Finder()` method is used to obtain a new generic query object, namely `Finder[T]`. With the methods of `Finder[T]`, we can execute relevant query operations.

## Find a single document

```go
user, err := userColl.Finder().Filter(query.Id("60e96214a21b1b0001c3d69e")).FindOne(context.Background(), options.FindOne().SetSkip(1))
```

- The `FindOne` method is used to query a single document. `user` is a pointer object of the specified generic type, i.e., `*User`.

- The `Filter` method allows us to specify search criteria. It accepts parameters of type `any`, meaning any type of argument can be passed in, provided they are valid query conditions. In the example above, `query.Id("60e96214a21b1b0001c3d69e")` is used to specify the search condition where `_id` equals `60e96214a21b1b0001c3d69e`. For more on building query conditions, refer to the [`query` package](../build/query/introduction).

- The `options` parameter is optional. By using `options.FindOne()`, we can specify query options. In the example above, `options.FindOne().SetSkip(1)` is used to specify that the query result should skip 1 document.

## Find multiple documents

```go
users, err := userColl.Finder().Filter(query.In("_id", "60e96214a21b1b0001c3d69e", "80e96214a21b1b0001c3d70e")).Find(context.Background(), options.Find().SetSkip(1).SetLimit(3).SetSort(bson.M{"age": 1}))
```

- The `Find` method is used to query multiple documents. `users` is a slice of pointer objects of the specified generic type, i.e., `[]*User`.

- The `options` parameter is optional. By using `options.Find()`, we can specify query options. In the example above, `options.Find().SetSkip(1).SetLimit(3).SetSort(bson.M{"age": 1})` is used to specify that the query result should skip 1 document, limit the result to 3 documents, and sort the result by `age` in ascending order.

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

- `Skip` function explanation: Skip the specified number of data.
- `Limit` function explanation: Limit the number of data returned.

This function skips 10 data and limits the number of returned data to 10, which is the data of the second page.

## Field Sorting

```go
users, err := userColl.Finder().Sort(bson.M{"age": 1, "created_at": -1}).Find(context.Background())
```

- `Sort` function explanation: Sort the query results.
- `bson.M{"age": 1, "created_at": -1}` explanation: Sort the result by `age` in ascending order, and if `age` is the same, sort the result by `created_at` in descending order.

## Parameters

| Method     | Description                    | Parameters                            | Return Value            |
| ---------- | ------------------------------ | ------------------------------------- | ----------------------- |
| `FindOne`  | Query a single document        | `context.Context`,`options(optional)` | `(*T, error)`           |
| `Find`     | Query multiple documents       | `context.Context`,`options(optional)` | `([]*T, error)`         |
| `Count`    | Count documents                | `context.Context`                     | `(int64, error)`        |
| `Distinct` | Query unique values of a field | `context.Context`,`string`            | `*mongo.DistinctResult` |
| `Skip`     | Skip data                      | `int64`                               | `Finder[T]`             |
| `Limit`    | Limit data                     | `int64`                               | `Finder[T]`             |
| `Sort`     | Sort                           | `any`                                 | `Finder[T]`             |

- [Finder](https://pkg.go.dev/github.com/chenmingyong0423/go-mongox/v2/finder#Finder)
- [DistinctResult](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo#DistinctResult)
- [FindOneOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#FindOneOptions)
- [FindOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#FindOptions)
- [CountOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#CountOptions)
- [DistinctOptions](https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#DistinctOptions)
