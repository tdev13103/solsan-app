import {format} from 'date-fns';

export const convertToCamelCase = (str: string) => {
    const slicedStr = str.slice(4);
    const words = slicedStr.split('-');
    return words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

/**
 * Converting repeater fields to normal
 * @param data
 */
export const extractRepeaterFields = (data: any): { [key: string]: any } => {
    const result: { [key: string]: any } = {};

    const processField = (field: string, value: any, obj: { [key: string]: any }): void => {
        const matches = field.match(/\d+/);
        const number = matches?.[0] || null;
        const startIndex = field.split(`_${number}_`);
        const repeaterKey = startIndex[0];
        const fieldKey = startIndex[1];

        if (fieldKey?.includes("repeater") || fieldKey?.includes("items") || fieldKey?.includes("sections") || fieldKey?.includes("usp_cards")) {
            const subMatches = fieldKey.match(/\d+/);
            const subNumber = subMatches?.[0] || null;
            const subStartIndex = fieldKey.indexOf(`_${subNumber}_`);
            const subRepeaterKey = fieldKey.substring(0, subStartIndex);
            const subFieldKey = fieldKey.substring(subStartIndex + 3);

            if (repeaterKey !== undefined && subFieldKey !== undefined && subRepeaterKey !== undefined && subNumber !== null && number !== null) {
                obj[repeaterKey] = obj[repeaterKey] || [];
                obj[repeaterKey][number] = obj[repeaterKey][number] || {};
                obj[repeaterKey][number][subRepeaterKey] = obj[repeaterKey][number][subRepeaterKey] || [];
                obj[repeaterKey][number][subRepeaterKey][subNumber] = obj[repeaterKey][number][subRepeaterKey][subNumber] || {};
                obj[repeaterKey][number][subRepeaterKey][subNumber][subFieldKey] = value;

                // Recursive call to handle nested fields
                processField(subFieldKey, value, obj[repeaterKey][number][subRepeaterKey][subNumber]);
            }
        } else if (number !== null && repeaterKey !== undefined && fieldKey !== undefined) {
            obj[repeaterKey] = obj[repeaterKey] || [];
            obj[repeaterKey][number] = obj[repeaterKey][number] || {};
            obj[repeaterKey][number][fieldKey] = value;
        }
    };

    const processRepeaterFields = (fields: string[], obj: { [key: string]: any }): void => {
        fields.forEach((field) => {
            const fieldValue = data[field];

            if (fieldValue !== undefined) {
                processField(field, fieldValue, obj);
            }
        });
    };

    const repeaterFields = Object.keys(data)
        .filter((key) => key.includes("repeater") || key.includes("items") || key.includes("sections") || key.includes("usp_cards"));
    processRepeaterFields(repeaterFields, result);

    return result;
};


/**
 * Determines the contact type (phone number or email address) and adds corresponding prefixes.
 * @param input The string with contact information.
 * @returns A string with the added prefix "tel:" or "mailto:" if it's a phone number or email address respectively.
 *          If the input string doesn't match either a phone number or email address, it returns the original string unchanged.
 */
export const determineContactType = (input: string): string => {
    const phoneRegex = /^\d{2}-\d{3} \d{3} \d{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (phoneRegex.test(input)) {
        return "tel:" + input;
    }
    if (emailRegex.test(input)) {
        return "mailto:" + input;
    }

    return `https://www.google.com/maps/search/?api=1&query=${input}`;
}

/**
 * Converts a given date string to the format "yyyy-MM-dd".
 * @param dateString The date string to be converted.
 * @returns The converted date string in the format "yyyy-MM-dd".
 */
export const convertDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
}

/**
 * Modifies links in the given string based on the value of the NEXT_PUBLIC_SITE_URL environment variable.
 * If NEXT_PUBLIC_SITE_URL is a valid string, the function replaces all occurrences of that string in the input string with an empty string.
 * Then, it removes a trailing slash (/) from the string, if present.
 *
 * @param string - The input string in which links need to be modified.
 * @returns The modified string with links replaced and trailing slash removed (if applicable).
 *
 * Notes:
 * - If NEXT_PUBLIC_SITE_URL is not a valid string or is undefined, the function returns the input string unchanged.
 * - Link modification is performed by using the replace() method to replace all occurrences of the specified string.
 * - The trailing slash removal is achieved using a regular expression (/\/$/) to match and remove the slash at the end of the string.
 */
export const modifyLinks = (string: string): string => {
    const replace: string | undefined = process.env.NEXT_PUBLIC_SITE_URL;

    if (typeof replace === 'string') {
        return string.replace(replace, '').replace(/\/$/, "");
    }
    return string;
}

/**
 * Extracts the YouTube video ID from a given URL.
 * Supports both full YouTube URLs and shortened formats.
 * @param source The YouTube URL from which to extract the video ID.
 * @returns The extracted YouTube video ID, or an empty string if not found.
 */
export const extractYouTubeVideoId = (source: string): string => {
    const regexFull = /[?&]v=([^&#]+)/;
    const regexShort = /^https?:\/\/(?:www\.)?youtu\.?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/|youtu\.be\/|user\/\S+\/|playlist\?|watch\?.+&v=)([^#\&\?\/]+)/;
    const matchFull = source.match(regexFull);
    const matchShort = source.match(regexShort);

    if (matchFull && matchFull[1]) {
        return matchFull[1];
    } else if (matchShort && matchShort[1]) {
        return matchShort[1];
    } else {
        return '';
    }
}

/**
 * MAke ID.
 * @param {Number} length - loop element index.
 * @returns {string}
 */
export const makeId = (length = 10) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};


/**
 * Generate Unique key
 * @param pre
 * @returns {string}
 */
export const generateKey = (pre: number) => {
    return `${pre}_${new Date().getTime()}_${makeId(pre)}`;
};


/**
 * Function to parse a product price and convert it to a numeric value.
 * @param {string} price - The string representation of the product price.
 * @returns {number} - The numeric value of the product price.
 */
export const parseProductPrice = (price: string): number => {
    // Remove all spaces from the string and replace comma with a dot (for numeric representation).
    const cleanedPrice = price?.replace(/\s/g, "").replace(",", ".");

    // Parse the cleaned string into a floating-point number.
    const parsedPrice = parseFloat(cleanedPrice);

    // Check if the conversion from string to number was successful.
    if (isNaN(parsedPrice)) {
        throw new Error("Unable to convert the price to a number.");
    }

    return parsedPrice;
}
