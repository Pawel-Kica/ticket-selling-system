// minimum eight characters, maximum 128, at least one uppercase letter, one lowercase letter, one number and one special character
export const regexPassword = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/,
);

// regex for alphabet in all languages and
// accepting for instance 你好我是帕維爾, Man könnte sagen
export const regexAlphabetAllLanguages = new RegExp(/[^\p{L}]+/gu);

// the most basic just for development purposes
export const regexEnglishAlphabet = new RegExp(/^[a-zA-Z]{2,128}$/);
