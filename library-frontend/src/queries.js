import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
