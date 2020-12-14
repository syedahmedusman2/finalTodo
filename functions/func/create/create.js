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




// const process = require('process')

// const { query, Client } = require('faunadb')

// /* configure faunaDB Client with our secret */
// const client = new Client({
//   secret: process.env.FAUNADB_SERVER_SECRET,
// })

// /* export our lambda function as named "handler" export */
// const handler = async (event) => {
//   /* parse the string body into a useable JS object */
//   const data = JSON.parse(event.body)
//   console.log('Function `create` invoked', data)
//   const item = {
//     data,
//   }
//   /* construct the fauna query */
//   return client
//     .query(query.Create(query.Ref('classes/items'), item))
//     .then((response) => {
//       console.log('success', response)
//       /* Success! return the response with statusCode 200 */
//       return {
//         statusCode: 200,
//         body: JSON.stringify(response),
//       }
//     })
//     .catch((error) => {
//       console.log('error', error)
//       /* Error! return the error with statusCode 400 */
//       return {
//         statusCode: 400,
//         body: JSON.stringify(error),
//       }
//     })
// }

// module.exports = { handler }
