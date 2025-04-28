import { gql } from "apollo-angular";

// Query
export const GET_PARAM_LIST = gql`
    query getParamList {
        GetParamList {
            code
            message
            data
        }
    }
`;

export const GET_LONG_URL = gql`
    query GetLongUrl($shortUrl: String!) {
        getLongUrl(shortUrl: $shortUrl) 
    }
`;

export const GET_QR_CODE = gql`
    query GetQRCode($shortUrl: String!) {
        getQRCode(shortUrl: $shortUrl)
    }
`;

export const GET_ALL_SHORT_URLS = gql`
    query GetAllShortUrl {
        getAllShortUrl {
            EC
            MS
            data
        }
    }
`;

export const GET_ALL_LONG_URLS = gql`
    query GetAllLongUrl {
        getAllLongUrl
    }
`;


// Mutation
export const SHORTEN_URL = gql`
    mutation ShortenUrl($longUrl: String!) {
        shortenUrl(longUrl: $longUrl) {
            EC
            MS
            data
        }
    }
`;

export const SHORTEN_URL_1 = gql`
    mutation ShortenUrl1($longUrl: String!) {
        shortenUrl1(longUrl: $longUrl) {
            code
            message
            data
        }
    }
`;