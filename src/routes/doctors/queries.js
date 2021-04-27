export const DOCTOR = `
  query($id: ID!){
    Doctor (where: {id: $id}) {
      id
      name
      experience_years
      country {
        name
      }
      specialty {
        name
      }
      avatar {
        publicUrl
      }
      employer {
        id
        positions {
          name
        }
        description
        clinic {
          id
          name_ru
          full_name_ru
          head_img {
            id
            publicUrl
          }
        }
      }
      education
      experience
      extra {
        document
      }
      portfolio {
        description
        img {
          publicUrl
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
