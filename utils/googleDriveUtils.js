// const fs = require('fs');
// const { google } = require('googleapis');
// const path = require('path');

// const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// const TOKEN_PATH = path.join(__dirname, 'token.json');

// const auth = new google.auth.GoogleAuth({
//   keyFile: '../credentials.json', // Update the path to your credentials.json file
//   scopes: SCOPES,
// });

// const drive = google.drive({ version: 'v3', auth });

// async function uploadFile(filePath, fileName, mimeType) {
//   const fileMetadata = {
//     name: fileName,
//     parents: ['your-folder-id'], // Update to your Google Drive folder ID
//   };
//   const media = {
//     mimeType: mimeType,
//     body: fs.createReadStream(filePath),
//   };

//   const response = await drive.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id',
//   });

//   return response.data.id;
// }

// async function getFile(fileId) {
//   const response = await drive.files.get(
//     { fileId: fileId, alt: 'media' },
//     { responseType: 'stream' }
//   );

//   return new Promise((resolve, reject) => {
//     const buf = [];
//     response.data
//       .on('data', (chunk) => buf.push(chunk))
//       .on('end', () => {
//         const data = Buffer.concat(buf);
//         resolve(data.toString('base64'));
//       })
//       .on('error', (err) => reject(err));
//   });
// }

// module.exports = {
//   uploadFile,
//   getFile,
// };

const { google } = require('googleapis');
const { Readable } = require('stream');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CREDENTIALS = {
  type: "service_account",
  project_id: "server-429507",
  private_key_id: "effbb52d99c3fc08e3e827eaaf4e4e87db1847c2",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDPs1otEpDgJRcx\ngGmPfJ5xV9IVkYH+0bC7fmviRJPlMNjG+D/SpmpAs4CA1y9Sj3lCi7V3Ab2rKftN\nWVvFscL49yMi5hkn61IL0pnzVhlyDvGPYkwVRmViMjeEatJKU+Vmr4pInxiSvDDt\n2m9FQBqTxAbACB9JcryyJErhpHM5gUHS+NO96Tt5EdZCxeQMQO8bb8skL8DoPiKZ\nGxBmLGNjsJvRq/KbeTvakMnZpP6PwegZeZRK6UQE/B3r+JkbAIV5l6VA5HyrU/Dt\npdDdYc6JzddNwXZ0xp2bKjyFLvyLhTuokU5IL68zSj9W0eYmzu4ys6vIZ8Zl9fg3\n848e9baRAgMBAAECggEALGvW9vnYC2BTaA5nRT1pY6NdNqiyrU2qp0cACtoQ6X07\nd76DY+mcou7hJm0fXWB7FjzsGCJCrvdhHGdmpc8BfJ7aoG2m5q9BEm895tm8wnSo\nvDpRPGGccFZ+Ii94f1YXI5GamTKRnlxqeIx1rNFrfbv4l5yFGH/WFKGHdF/oFt2H\n+S5omx31bVMBW+4Cu7fG8leu8Dnw45uSiIfRXMHvmOmMaHrXd9JlLndyiTLJPs/4\nJ888wAFb3LyGw6+S6Ewh1swmfEMTK+owtHZkP1MuHCV/JLPrE0TYa3WFLaY/ZpRl\nypU8FDbnG+KwiTiQ4Fe0fo9Mzm06xFZnCkhDmcDPGwKBgQDxlEnbAW51p6d4UYhK\nKOjoh+BwADorvpUhiaeMMf4pZX0NwSyR+0l6TYYvTSds7nE8GxeKf4Q0CMtkXRvA\naOPjWY3AKHyZHc6NskiRHdjJpCf2HP6RixVZ3VM3x31Eb7GCRH2+rW5PQILJmume\nTiLRwcIDHXc8qIoKmx5wzSGGswKBgQDcGVgxdt+iypFSNXNb2X15MO5Vc+wQnl55\ne8Bfw/ESURmRerVZXNutQw9aM45o0333tkAhNGvG5jPIuPucXMM37edVefssKYuf\nZoVRGrYdVnRsj5Qmq25ntRL+4AXqig4bpxGolOuYf4bTCcsJtELbiNivXdYwPCwG\nJa41bsLPqwKBgQCJKHE6R7jIUhTSSjBAMrPx+dtim65rUbxoGzimb2fnZvi2S3wb\nsflI2CUcTAjbXxGpV5RpDPcpd+jKpdZwytzAIwNJG3OKl5LDfnqW8cQ4z9vkbxfV\n2IqZyABMhhXIOkYlOO/Px7X+hxj6j9qeB6zbPNADZsJhDSu609FXqA+l4wKBgQDZ\nfHXIUvWDD/VvLX/zN8MjmPU5HVYbydIC6wTZ3G1/MwI33fALAJXV7FjkQeOrs6ha\nuQ0/gmQpY1myMw/1nzgMMRoRPXqzVc4w0YZU8TcZYE+k4m97kpSDB8tgbQ+LhaWR\nL5JkadsvknwwVxH5YdVaxyuOhgPbH+pEnME67Vq1BwKBgDqRQ6iexY/WTneGjdNx\n8nsgwg8MaRRLkeCTsCXtms1OIf8DAA+l8/o5Cn2i0IBbVIgFDhZb0dFAlQy+reGy\nZyI7z6NZI89EhOLF7A9PvKTDzIOzf2BfQg0jR67h1WxKrKPtECd3CArP+2vk/HzR\nRTQUkHPE1bB/LnI5mprx/AyD\n-----END PRIVATE KEY-----\n",
  client_email: "server@server-429507.iam.gserviceaccount.com",
  client_id: "114140821336897006321",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/server%40server-429507.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

const auth = new google.auth.GoogleAuth({
  credentials: CREDENTIALS,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

const uploadFileToDrive = async (file) => {
  const fileMetadata = {
    name: file.originalname,
  };
  const media = {
    mimeType: file.mimetype,
    body: Readable.from(file.buffer),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data;
};

module.exports = { uploadFileToDrive };
