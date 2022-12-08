export const INDEX_CLINICS = `
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

export const BRANCHES = `
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
