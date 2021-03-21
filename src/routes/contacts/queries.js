export const CONTACTS = `
  query {
    allContactCountries {
      name
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



