import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
query GetProducts {
  products {
    nodes {
      ... on SimpleProduct {
        name
        price
        onSale
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
	      taxStatus
      }
    }
  }
  shippingMethods {
    nodes {
      title
      cost
    }
  }
  taxRates {
    nodes {
      name
      rate
    }
  }
}
`