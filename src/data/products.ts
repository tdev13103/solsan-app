import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
query GetProducts {
  products {
    nodes {
      title
      slug
      image {
        sourceUrl
        title
      }
      woocommerceProductSettings {
        displayVatTitle
        productCardLabel
        productCardColor
        productEquipment
      }
      content
      uri
      productId
      ... on SimpleProduct {
        id
        name
        price
        onSale
      }
    }
  }
}
`