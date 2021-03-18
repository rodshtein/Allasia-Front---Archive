export const PROMO_PAGES = `
  query {
    allPromotions {
      name
      review {
        document
      }
      date_start
      date_finish
      url
    }
  }
`;


export const PROMOMOTION = `
  query ($url: String!){
    allPromotions(where: {url: $url}){
      name
      review {
        document
      }
      gallery {
        img {
          publicUrl
        }
        alt
      }
      pages {
        name
        id
      }
      technologies {
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
      date_start
      date_finish
      url
    }
  }
`;

