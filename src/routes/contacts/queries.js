export const CONTACTS = `
  query {
    allContactCountries {
      name
      ISO
      contacts {
        id
        city
        tel
        tel_link
        main_number
        main_number_desc
        mail
        fields {
          name
          description
          link
          link_name
        }
        description {
          document
        }
      }
    }
  }
`;