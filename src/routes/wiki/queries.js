export const WIKI = `
query {
  allWikiSections {
    id
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
