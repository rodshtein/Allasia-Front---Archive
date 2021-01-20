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
