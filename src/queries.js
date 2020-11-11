import { gql } from "apollo-boost";

export const BRANCHES = gql`
  {
    allMedicalBranches {
      id
      name
      pages {
        id
        name
        diseases {
          id
          name
          ad_name
        }
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

export const MEDICAL_PAGE = gql`
  query($id: ID!){
      MedicalPage (where: {id: $id}) {
        id
        name
        branch {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
                parent {
                  id
                  name
                  parent {
                    id
                    name
                  }
                }
              }
            }
          }
        }
        diseases {
          id
          name
          ad_name
        }
        description {
          id
          document
        }
        procedures {
          id
          name
          feature
          description
          duration
          price {
            id
            price
            conditions
            country {
              name
            }
          }
        }
        portfolio {
          id
          img {
            id
            publicUrl
          }
          alt
          description
        }
        papers {
          id
          name
          description {
            id
            document
          }
        }
        technology {
          id
          name
          description {
            id
            document
          }
          head_img {
            id
            publicUrl
          }
        }
        clinics {
          id
          name_ru
          full_name_ru
          country {
            id
            name
          }
          head_img {
            id
            publicUrl
          }
        }
        doctors {
          id
          name
          specialty {
            id
            name
          }
          avatar {
            id
            publicUrl
          }
        }
        feedback {
          id
          header
          name
          age
          date
          city {
            id
            name
          }
          country {
            id
            name
          }
          review {
            id
            document
          }
          gallery {
            id
            alt
            img {
              id
              publicUrl
            }
          }
        }
      }
    }
  `;

export const INDEX_CLINICS = gql`
  query($first: Int!){
    allClinics (first: $first) {
      id
      name_ru
      full_name_ru
      country {
        id
        name
      }
      head_img {
        id
        publicUrl
      }
    }
  }
`;

export const CLINICS_COUNTRY_CLINICS = gql`
  query {
    allClinicCountries (sortBy: name_ASC){
      id
      name
      clinics {
        name_ru
        id
        head_img {
          publicUrl
        }
      }
    }
  }
`;
