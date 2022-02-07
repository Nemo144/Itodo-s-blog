import { graphql } from 'graphql'
import { request, gql } from 'graphql-request'

const graphqlAPI =
  'https://api-eu-central-1.graphcms.com/v2/ckyvsyhud0gd501xngl5faxkf/master'

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}
