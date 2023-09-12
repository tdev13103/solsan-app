'use client'

import React from 'react'
import styled from '@emotion/styled'
import Container from '../Container'
import PageHeader from './PageHeader'
import UspCard from "@/components/UspCard";
import theme from "@/styles/theme";
import {useThemeContext} from "@/context/theme.context";

interface DataProps {
    data: TopBlockProps
}

interface TopBlockProps {
    is_home_page: string;
    background_image?: string;
    background_video_file?: string;
    background_video_file_mob?: string;
    is_video_on_background: string;
    page_header_button_text: string;
    page_header_button_type: string;
    page_header_button_url: {
        title: string;
        url: string;
    }
    page_header_description: string;
    page_header_link_text: string;
    page_header_link_type: string;
    page_header_link_url: {
        title: string;
        url: string;
    }
    page_header_subtitle: string;
    page_header_title: string;
    usp_cards: UspCards[];
}

interface UspCards {
    cart_icon: string
    cart_icons_type: string
    cart_subtitle: string
    cart_title: string
}

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;
  height: 900px;
  position: relative;
  padding-bottom: ${theme.spaces.large21};
  padding-top: ${theme.spaces.large16};
  margin-bottom: ${theme.spaces.medium2};
  overflow: hidden;

  @media screen and (max-width: ${theme.responsiveMediaSizes.m920}) {
    margin-bottom: ${theme.spaces.normal};
    padding-top: ${theme.spaces.large18};
    padding-bottom: ${theme.spaces.large4};
    height: 750px;
  }

  @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
    height: unset;
    padding-bottom: 0;
    padding-top: ${theme.spaces.large19};
    background-color: ${theme.colors.colorNavyDark};
    margin-bottom: ${theme.spaces.medium3};
  }

  &:before {
    position: absolute;
    content: '';
    display: block;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    background: rgba(34, 21, 81, 0.5);

    @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
      background: unset;
    }
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -100px;
    left: 50%;
    height: 1000px;
    width: 5810px;
    pointer-events: none;
    border-radius: 100%;
    border: 100px solid #fff;
    transform: translateX(-50%);
    z-index: 2;

    @media screen and (max-width: ${theme.responsiveMediaSizes.m1570}) {
      width: 4000px;
    }
    @media screen and (max-width: ${theme.responsiveMediaSizes.m1024}) {
      width: 3810px;
    }

    @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
      display: none;
    }
  }

  &.top-banner-home-page {
    padding-bottom: 0;
    margin-bottom: 200px;
    height: auto;
    position: relative;
    z-index: 5;
    overflow: initial;

    @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
      margin-bottom: 0;
    }

    &:after {
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTcyOCIgaGVpZ2h0PSIxNzAiIHZpZXdCb3g9IjAgMCAxNzI4IDE3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMyIDg5LjVILTIyVjE4LjVMMTgxMC41IDEwLjVMMTc2MiAxMS40NjZMMTYzNC41IDExOS41TDE1MTUuNSAxMDIuNUwxNDE1IDEyNkwxMzc1LjUgMTAyLjVMMTMxNS41IDEzNEgxMTg2LjVMMTEyOSAxNTcuNUwxMDk2IDEwOUw5NTYuNSAxNTcuNUw4OTAuNSAxNDUuNUw4MDMuNSA5NC41TDY1Ny41IDE0Mkw2MzQgMTE5LjVMNDk3LjUgMTQyTDM5OC41IDEwMi41TDMxMiAxMzRMMTMyIDg5LjVaIiBmaWxsPSIjMjIxNTUxIi8+PHBhdGggZD0iTS0yMiA4OS41SDEzMkwzMTIgMTM0TDM5OC41IDEwMi41TDQ5Ny41IDE0Mkw2MzQgMTE5LjVMNjU3LjUgMTQyTDgwMy41IDk0LjVMODkwLjUgMTQ1LjVMOTU2LjUgMTU3LjVMMTA5NiAxMDlMMTEyOSAxNTcuNUwxMTg2LjUgMTM0SDEzMTUuNUwxMzc1LjUgMTAyLjVMMTQxNSAxMjZMMTUxNS41IDEwMi41TDE2MzQuNSAxMTkuNUwxNzY3IDgiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzE4MDlfNzE1OCkiIHN0cm9rZS13aWR0aD0iMjAiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTgwOV83MTU4IiB4MT0iMTM1OS4xNSIgeTE9IjExMC42ODYiIHgyPSIxMzUwLjM2IiB5Mj0iLTI1LjkyMDgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjQUZCNkZGIi8+PHN0b3Agb2Zmc2V0PSIwLjU5ODk1OCIgc3RvcC1jb2xvcj0iI0Y1OUUzRiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==) center center no-repeat;
      background-size: cover;
      width: 100%;
      height: 190px;
      bottom: 0;
      transform: translateY(calc(100% - 23px));
      left: 0;
      z-index: -1;
      border: unset;
      border-radius: unset;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        display: none;
      }
    }

    .top-banner {
      &__container {
        height: max-content;
        position: relative;
        z-index: 1;

        &:after {
          position: absolute;
          content: '';
          display: block;
          left: 50%;
          bottom: 0;
          width: 100vw;
          height: 200px;
          transform: translateX(-50%);
          z-index: -1;
          background: linear-gradient(360deg, #221551 0%, rgba(34, 21, 81, 0.00) 100%);
        }
      }

      &__video {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      &__cards-wrapper {
        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          padding-top: 300px;
          position: relative;
          padding-bottom: ${theme.spaces.medium3};
          z-index: 1;
        }

        @media screen and (max-width: ${theme.responsiveMediaSizes.m415}) {
          padding-top: 250px;
        }

        @media screen and (max-width: ${theme.responsiveMediaSizes.m375}) {
          padding-top: 230px;
        }

        @media screen and (max-width: ${theme.responsiveMediaSizes.m330}) {
          padding-top: 200px;
        }

        &:after {
          content: '';
          position: absolute;
          background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzc1IiBoZWlnaHQ9IjE3NCIgdmlld0JveD0iMCAwIDM3NSAxNzQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwNC41IDk3TDE1MyAxNTcuNUwyMjUuNSA4NUgzMjRMMzkyLjUgMjJMMzg1LjUgMEgtNi4xMDM1MmUtMDVWMTUwLjYxM0wyOC40MDU3IDExOC43NjFMNzYuOTk5OSAxMjQuMTE2TDEwNC41IDk3WiIgZmlsbD0iIzIzMTY1MiIvPjxwYXRoIGQ9Ik0tNi4xMDM1MmUtMDUgMTUxLjYxM0wyOC40MDU3IDExOS43NjFMNzYuOTk5OSAxMjUuMTE2TDEwNC41IDk4TDE1MyAxNTguNUwyMjUuNSA4NkgzMjRMMzg2LjUgMjMuNSIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfMTcyNF8xMTMwNCkiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xNzI0XzExMzA0IiB4MT0iODguMTEyOCIgeTE9IjExNi4yMjciIHgyPSIxMTkuMTc0IiB5Mj0iMC43MTA2NTciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjQUZCNkZGIi8+PHN0b3Agb2Zmc2V0PSIwLjU5ODk1OCIgc3RvcC1jb2xvcj0iI0Y1OUUzRiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==) center center no-repeat;
          background-size: cover;
          background-position: 0 0;
          width: 100vw;
          height: 240px;
          top: -2px;
          left: 0;
          z-index: 2;
          transform: unset;
          border: unset;
          border-radius: unset;
          display: none;

          @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
            display: block;
          }

          @media screen and (max-width: ${theme.responsiveMediaSizes.m415}) {
            height: 195px;
          }

          @media screen and (max-width: ${theme.responsiveMediaSizes.m375}) {
            height: 175px;
          }

          @media screen and (max-width: ${theme.responsiveMediaSizes.m330}) {
            height: 150px;
          }
        }
      }

      &__page-header {
        margin-bottom: ${theme.spaces.large17};

        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          margin-bottom: 0;
          padding-bottom: 0;
          position: relative;
          z-index: 10;
        }
      }
    }
  }

  &.top-banner-without-video {
    @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
      background-image: unset !important;
      padding-top: 0;
    }

    &:after {
      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        border: unset;
      }
    }
  }

  &.top-banner {
    .usp-card__title,
    .usp-card__subtitle {
      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        color: ${theme.colors.colorNavyDark};
      }
    }

    .page-header__title,
    .page-header__description,
    .page-header__btn {

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        width: 100%;
        margin-right: 0;
      }
    }

    .page-header__btn-offer {

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        width: max-content;
        margin-right: auto;
      }
    }
  }

  .top-banner {

    &__without-video-wrap {

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        height: 350px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        margin-bottom: ${theme.spaces.gridGap};
        position: relative;
        z-index: 1;
      }

      &:after {
        position: absolute;
        content: '';
        display: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: linear-gradient(179.24deg, rgba(34, 21, 81, 0) 55.79%, #221551 99.36%);

        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          display: block;
        }
      }
    }

    &__page-header {
      @media screen and (max-width: ${theme.responsiveMediaSizes.m768}) {
        padding-bottom: ${theme.spaces.medium1};
      }

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        padding-bottom: ${theme.spaces.medium2};
      }
    }

    &__container {
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m768}) {
        min-height: 100%;
        height: auto;
      }

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        padding-left: ${theme.spaces.gridGap};
        padding-right: ${theme.spaces.gridGap};
      }

      .container {
        @media screen and (max-width: ${theme.responsiveMediaSizes.m768}) {
          padding-left: 0;
        }

        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          padding-right: 0;
        }
      }
    }

    &__video-wrap {
      display: none;
      border-radius: 12px;
      overflow: hidden;
      height: 235px;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        display: block;
        width: 100%;
        margin: -100px auto 0;
        height: auto;
        position: relative;
        z-index: 1;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }

      &:after {
        position: absolute;
        content: '';
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        background: linear-gradient(179.24deg, rgba(34, 21, 81, 0) 66.93%, #221551 99.36%);
      }
    }

    &__video {
      position: absolute;
      left: 50%;
      top: 0;
      width: 101%;
      height: auto;
      transform: translateX(-50%);

      @media screen and (max-width: ${theme.responsiveMediaSizes.m1570}) {
        width: auto;
        height: 100%;
      }

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        position: relative;
        left: 0;
        top: 0;
        transform: unset;
        width: 100%;
        height: 100%;
        z-index: 3;
      }
    }

    &__cards-wrapper {
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        display: block;
        width: 100vw;
        margin-left: -20px;
        padding-top: ${theme.spaces.medium2};
        padding-left: ${theme.spaces.gridGap};
        padding-right: ${theme.spaces.gridGap};
        background-color: ${theme.colors.colorWhite};
      }

      .usp-card {
        width: calc(33.3% - 32px);

        @media screen and (max-width: ${theme.responsiveMediaSizes.m920}) {
          width: calc(33.3% - 16px);
        }
        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          width: 100%;
          margin-bottom: ${theme.spaces.medium2};
        }

        &:last-of-type {
          @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .page-header__btn {

    @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
      text-align: center;
    }
  }
`

const TopBlock = ({
                      data: {
                          is_home_page,
                          background_image,
                          background_video_file,
                          background_video_file_mob,
                          is_video_on_background,
                          page_header_button_text,
                          page_header_button_type,
                          page_header_button_url,
                          page_header_description,
                          page_header_link_text,
                          page_header_link_type,
                          page_header_link_url,
                          page_header_subtitle,
                          page_header_title,
                          usp_cards,
                      }
                  }: DataProps) => {
    const topBannerClass = (is_video_on_background) ? 'top-banner-with-video' : 'top-banner-without-video'
    const {isMobile} = useThemeContext();
    const homePageClass = +is_home_page ? 'top-banner-home-page' : '';

    return (
        <Wrapper className={`top-banner ${topBannerClass} ${homePageClass}`}
                 style={{backgroundImage: `url(${background_image})`}}>
            {is_video_on_background && !isMobile ? (
                <video src={background_video_file} width="100%" height="100%" className="top-banner__video" loop
                       autoPlay
                       playsInline muted/>
            ) : (
                isMobile && (
                    is_video_on_background
                        ?
                        <video src={background_video_file_mob} width="100%" height="100%" className="top-banner__video"
                               loop
                               autoPlay
                               playsInline muted/>
                        : <div className="top-banner__without-video-wrap"
                               style={{backgroundImage: `url(${background_image})`}}/>
                )
            )}
            <Container className={'top-banner__container'}>
                <PageHeader button_text={page_header_button_text}
                            button_type={page_header_button_type}
                            button_url={page_header_button_url}
                            description={page_header_description}
                            link_text={page_header_link_text}
                            link_type={page_header_link_type}
                            link_url={page_header_link_url}
                            subtitle={page_header_subtitle}
                            title={page_header_title}
                            className={'top-banner__page-header'}/>
                <div className={'top-banner__cards-wrapper'}>
                    {(usp_cards || [])?.map((item, idx) => <UspCard data={item} key={idx}/>)}
                </div>
            </Container>
        </Wrapper>
    )
}

export default TopBlock
