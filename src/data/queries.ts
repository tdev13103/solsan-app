import { gql } from '@apollo/client';

export const QUERY_THEME_SETTINGS = gql`
query ThemeSettings {
  themeGeneralSettings {
    theme_settings {
      thanksOfferTitle
      thanksOfferDesc
      oformTitle
      oformInputsTitle
      oformDownloadFileTitle
      oformDownloadBtn {
        url
        title
      }
      oformDesc
      oformCancelBtn {
        url
        title
      }
      headerMobButtonType
      headerLogo {
        sourceUrl
        title
      }
      headerButtonType
      headerButtonTitle
      headerButtonLink {
        url
        title
      }
      frontendLink
      blogPagesShowAtMost
      formsSetttings {
        formName
        formId
        fields {
          name
          fieldId
        }
      }
      footerMenus
      footerMenuLabelsTitle
      footerLogo {
        title
        sourceUrl
      }
      footerIcon {
        title
        sourceUrl
      }
      footerCopyright
      footerContent
      footerButtonType
      footerButtonTitle
      footerButtonLink {
        url
        title
      }
      footerBtmIconRepeater {
        itemIcon {
          title
          sourceUrl
        }
      }
      fieldGroupName
      cookiesText
      cformThanksTitle
      cformThanksDesc
      cformThanksBtn {
        title
        url
      }
      priceInclVatLabel
      productModal {
        referenceText
        referenceCheckboxLabel
        closeButtonText
        addToCartButtonText
        contentRepeater {
          title
          content
        }
      }
    }
  }
}`;
