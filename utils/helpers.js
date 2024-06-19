const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);

const readAndConvertToBase64 = async (filePath) => {
  if (!filePath) return null;
  try {
    const data = await readFileAsync(filePath);
    return Buffer.from(data).toString("base64");
  } catch (error) {
    throw new Error("Failed to read file");
  }
};

module.exports = {
  readAndConvertToBase64,
};
