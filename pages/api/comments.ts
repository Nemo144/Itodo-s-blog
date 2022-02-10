// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Any file inside the folder pages/api is mapped to /api/
// and will be treated as an API endpoint instead of a page
import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI =
  'https://api-eu-central-1.graphcms.com/v2/ckyvsyhud0gd501xngl5faxkf/master'

const graphcmsToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDQ0NDQyMjMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NreXZzeWh1ZDBnZDUwMXhuZ2w1ZmF4a2YvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTliZTIwNjktYzJmOS00YjRkLWI2YjQtMzI0ZTllZmIxMzM5IiwianRpIjoiY2t6ZzNtcmc1MTZrNTAxeGs3bnkzY2xhYyJ9.e0RrzOP8bbVVqpvzEBaelylhI_RmU77rptwGzfT8ZeY6SKp4fUn-988B-49jgjWHCpPU0YuughktGCMCZJR5Wp3MvBDyOsZDT0wAagT5E8pCSiOIq5FxOJ5lmDpns2LYaC-bpcvj6yQPUmpISnrcAVuurQDgQRnHFl05OjVY9gL68n_2NHxRkRwUBSCLkHynEJ_OjA0a64AP1wrTAsWHVSfkIx4uS3T9OkVl9TVz6hnMZ5HLO7Q2S48wnEpESH5LmJIlcrJYbHbIIRlveXYQ8tl-li2OPJDjePSbhBMGi34d7yIVhcDsSYbcw7kTHjhSVDjGjce1-oUWI_59ui9p30G34inQ7DL2oeJXzcsW5euVAGTJGP1WBXh-PusJT9Nj9AMezhnxL7GFr0e808avQ9pfzUqJnIIJHPR4tsdFYTum3sK7vAZdl-O004PDBi-lGtCWF8MuewXy4-mFVMY5upkhcD9hEErDBg8ahLv3axUj_YsisFDDeEwCrRiSrF9iEArGeSY1vG4YecWc2tWIqos2flm-GeZNt22UfXtoKlpmk9ZplIe_-gtzYJUwSbvdTpoTPqtUXLPh5uvBjg_hIKFdGHQg8-RTAr-KZG12MymRURHav4QuSuMNXWWRY4Yempot6t-h_hlfiPQ9SAz1-KOWEhvpQnGptTp12625qa0'

// type Data = {
//   name: string
// }

export default async function comments(req: any, res: any) {
  console.log({ graphcmsToken })
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!,
      $email: String!,
      $comment: String!,
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name,
          email: $email,
          comment: $comment,
          post: { connect: { slug: $slug } }
        }
      ) {
        
      }
    }
  `

  try {
    const result = await graphQLClient.request(query, req.body)
    console.log(result)

    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
