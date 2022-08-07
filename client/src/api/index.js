import axios from 'axios';

const getBaseUrl = (host) => {
   if (host.includes('localhost')) return 'http://localhost:3002/api';
   if (host.includes('192')) return 'http://192.168.3.105:3002/api';
   return '/api';
};

const baseUrl = getBaseUrl(window.location.host);

// request image data from server
// returns: response with image data in Blob format
//    note: requires src=URL.createObjectURL(data)
const getImageData = (imageId) => {
   const request = axios.get(`${baseUrl}/img/${imageId}`, {
      headers: { 'Content-Type': 'image/png' },
      responseType: 'blob',
   });
   return request.then((response) => response.data);
};

// post image data to server
// returns: same image once it has stored, in Blob format
//    note: requires src=URL.createObjectURL(data)
const postImageData = (data, name) => {
   const request = axios.post(`${baseUrl}/img/${name}`, data, {
      responseType: 'blob',
   });
   return request.then((response) => response.data);
};

export default { baseUrl, getImageData, postImageData };
export { baseUrl, getImageData, postImageData };
