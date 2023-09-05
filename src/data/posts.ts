import { gql } from '@apollo/client';

export const QUERY_PAGE_BY_SLUG = gql`
  query PageBySlug($slug: String!) {
	   pageBy(uri: $slug) {
	    slug
	    title
	    pageId
	    pageAdditionalSettings {
        isItGeneralPage
      }
	    blocks {
	      attributesJSON
	      blockImage {
	        json
	      }
	    }
	    seo {
	      opengraphDescription
	      opengraphTitle
	      opengraphUrl
	      schema {
	        raw
	      }
	    }
	  }
  }
`;

export const QUERY_POSTS = gql`
query Posts($first: Int!, $after: String) {
	posts(first: $first, after: $after) {
    pageInfo {
        hasNextPage
        endCursor
      }
    nodes {
      slug
      title
      postId
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          categoryId
          name
          slug
        }
      }
      excerpt
      featuredImage {
        node {
          title
          sourceUrl
        }
      }
      date
      blocks {
	      attributesJSON
	      blockImage {
	        json
	      }
	    }
	    seo {
	      opengraphDescription
	      opengraphTitle
	      opengraphUrl
	      schema {
	        raw
	      }
	    }
    }
  }
}
`;

export const QUERY_POSTS_AND_PAGES_SEO = gql`
query SeoPages {
  pages {
    nodes {
      slug
      modified
    }
  }
  posts {
    nodes {
      slug
      modified
    }
  }
}
`;