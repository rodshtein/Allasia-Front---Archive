export const MEDICAL_PAGE = `
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
        promotions {
          id
          name
          review {
            document
          }
          url
          date_start
          date_finish
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
