import { gql } from "apollo-boost";

export const BRANCHES = gql`
  {
    allMedicalBranches (sortBy:name_ASC) {
      id
      name
      pages {
        id
        name
      }
      children {
        id
        name
      }
      parent {
        id
        name
      }
    }
  }`;

export const QUOTE_COUNT = gql`{
  _allFeedbackQuotesMeta { count }
}`;

export const QUOTE = gql`
  query ($int: Int){
    allFeedbackQuotes ( skip: $int  first: 1 ) {
      quote
      feedback {
        header
        name
        age
        date
        city {
          name
        }
        country {
          name
        }
        review {
          document
        }
        gallery {
          alt
          img {
            publicUrl
          }
        }
      }
    },
  }`;