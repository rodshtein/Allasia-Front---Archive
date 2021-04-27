export const CLINIC_PAGE = `
  query($id: ID!){
    Clinic (where: {id: $id}) {
      id
      name
      name_ru
      full_name_ru
      country {
        name
      }
      head_img {
        publicUrl
      }
      type {
        name
      }
      description {
        document
      }
      gallery {
        id
        alt
        img {
          publicUrl
        }
      }
      staff {
        positions {
          name
        }
        doctor {
          id
          name
          country {
            name
          }
          specialty {
            id
            name
          }
          avatar {
            id
            publicUrl
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
    }
  }
`;

export const CLINICS_COUNTRY_CLINICS = `
  query {
    allClinicCountries{
      id
      name
      clinics {
        name
        name_ru
        full_name_ru
        id
        head_img {
          id
          publicUrl
        }
      }
    }
  }
`;