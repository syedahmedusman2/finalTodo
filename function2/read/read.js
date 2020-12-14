const faunadb = require("faunadb")
q = faunadb.query


exports.handler = async (event,context) => {
    try {
      
        var client = new faunadb.Client({ secret: 'fnAD7_2-qjACA6e72u9xZ7Kcgom4O10fh9veFp7M' })
        
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index('index'))),
            q.Lambda(["detail","ref"], q.Get(q.Var("ref")))
          )
      
        )
        console.log(result)
       
        return {
          statusCode: 200,
          body: JSON.stringify(result),
        }
      } catch (error) {
        console.log(error)
        return { statusCode: 500, body: error.toString() }
      }
    }