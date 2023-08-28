import { gql } from '@apollo/client';

export const QUERY_MENUS = gql`
query Menus {
  menus {
    nodes {
      name
      slug
      menuItems(first: 30) {
        nodes {
          label
          parentId
          path
          cssClasses
          childItems {
            nodes {
              path
              label
              cssClasses
            }
          }
        }
      }
    }
  }
}
`;