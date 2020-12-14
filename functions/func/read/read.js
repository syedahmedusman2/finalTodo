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


// /* Import faunaDB sdk */
// const process = require('process')

// const { query, Client } = require('faunadb')

// const client = new Client({
//   secret: process.env.FAUNADB_SERVER_SECRET,
// })

// const handler = async (event) => {
//   const { id } = event
//   console.log(`Function 'read' invoked. Read id: ${id}`)
//   return client
//     .query(query.Get(query.Ref(`classes/items/${id}`)))
//     .then((response) => {
//       console.log('success', response)
//       return {
//         statusCode: 200,
//         body: JSON.stringify(response),
//       }
//     })
//     .catch((error) => {
//       console.log('error', error)
//       return {
//         statusCode: 400,
//         body: JSON.stringify(error),
//       }
//     })
// }

// module.exports = { handler }
