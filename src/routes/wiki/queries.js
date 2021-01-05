import { gql } from "apollo-boost";


export const WIKI = gql`
query {
  allWikiSections {
    id
    name
    questions {
      question
      answer {
        document
      }
    }
  }
}
`;
