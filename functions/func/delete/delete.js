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
        q.Delete(q.Ref(q.Collection("todos"), obj.id))
        )
        
    
        
        return {
          statusCode: 200,
          body: JSON.stringify({id: `${result.ref.id}`}),
        }
      } catch (error) {
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
//   console.log(`Function 'delete' invoked. delete id: ${id}`)
//   return client
//     .query(query.Delete(query.Ref(`classes/items/${id}`)))
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
