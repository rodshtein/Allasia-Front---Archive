export const WIKI = `
query {
  allWikiSections {
    id
    sort
    name
    questions {
      question
      answer {
        document
      }
    }
  }
}
`;
