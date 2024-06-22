// const fs = require("fs");
// const { promisify } = require("util");

// const readFileAsync = promisify(fs.readFile);

// const readAndConvertToBase64 = async (filePath) => {
//   if (!filePath) return null;
//   try {
//     const data = await readFileAsync(filePath);
//     return Buffer.from(data).toString("base64");
//   } catch (error) {
//     throw new Error("Failed to read file");
//   }
// };

// module.exports = {
//   readAndConvertToBase64,
// };
const fs = require('fs');

const readAndConvertToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64String = Buffer.from(data).toString('base64');
        resolve(base64String);
      }
    });
  });
};

module.exports = {
  readAndConvertToBase64,
};
