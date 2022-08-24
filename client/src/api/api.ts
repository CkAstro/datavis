import axios from 'axios';

const getBaseUrl = (host: string): string => {
   if (host.includes('localhost') || host.includes('192')) return `http://${host}:3002/api`;
   return '/api';
};

const baseUrl: string = getBaseUrl(window.location.host);

// request image data from server
// returns: response with image data in Blob format
//    note: requires src=URL.createObjectURL(data)
const getImageData = (imageId: string) => {
   const request = axios.get(`${baseUrl}/img/${imageId}`, {
      headers: { 'Content-Type': 'image/png' },
      responseType: 'blob',
   });
   return request.then((response) => response.data);
};

// post image data to server
// returns: same image once it has stored, in Blob format
//    note: requires src=URL.createObjectURL(data)
const postImageData = (data: FormData, name: any) => {
   const request = axios.post(`${baseUrl}/img/${name}`, data, {
      responseType: 'blob',
   });
   return request.then((response) => response.data);
};

export { baseUrl, getImageData, postImageData };
