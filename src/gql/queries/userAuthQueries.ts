import { gql } from "@apollo/client"



export const CREATE_JOB_MUTATION = gql`
mutation createJob($info:JobInput!) {
    createJob(jobInfo:$info){
      message
    }
  }
`

export const DELETE_JOB = gql`
mutation deleteJobById($id:ID!) {
  deleteJob(id:$id){
    message
  }
}
`