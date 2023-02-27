1. Вставка нескольких книг

```
db.books.insertMany([
   { title: "Book 1", description: "Description 1", authors: "Author 1, Author 2" },
   { title: "Book 2", description: "Description 2", authors: "Author 3" },
])
```

2. Поиск по title

```
db.books.find( { "title": "Book 1" } )
```

3. Редактирование

```
db.books.updateOne( { _id_: 1 },
{
  $set: {
    description: "New Desc",
    authors: "New author"
  }
})
```
