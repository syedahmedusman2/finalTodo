const faunadb = require("faunadb")
q = faunadb.query

exports.handler = async event => {
    try {
      if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" }
      }
        const client = new faunadb.Client({ secret: 'fnAD7_2-qjACA6e72u9xZ7Kcgom4O10fh9veFp7M' })
        const obj = JSON.parse(event.body)
        let result = await client.query(
          q.Create(q.Collection("todos"),
           { data: { detail: obj.detail, name: obj.name, email: obj.email} })
        )
        console.log("Entry Created and Inserted in Container: " + result.ref.id)
        
        
        return {
          statusCode: 200,
          body: JSON.stringify({ id: `${result.ref.id}` }),
        }
      } catch (error) {
        return { statusCode: 500, body: error.toString() }
      }
    }