module.exports = {
    // format_date is a method that takes in a date and returns a string in the format of "MM/DD/YYYY"
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;},

        // format_url is a method that takes in a url and returns a string in a shortened url format
        format_url: url => {
            return url
            .replace('http://', '') // remove http://
            .replace('https://', '') // remove https://
            .replace('www.', '') // remove www.
            .split('/')[0] // get the first part of the url
            .split('?')[0]; // get the first part of the url after the ?
        },

        //  format_plural is a method that takes in a number and returns a string in the format of "1 post" or "2 posts" 
        format_plural: (word, amount) => {
            // if the amount is not equal to 1 we return the word with the s
            if (amount !== 1) {
                return `${word}s`;
            }
            // if the amount is not 1 we return the word without the s
            return word;
        }
    }
