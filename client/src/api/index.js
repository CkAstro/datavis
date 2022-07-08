import axios from 'axios';

const baseUrl = window.location.host.includes('localhost')
   ? 'http://localhost:3002/api'
   : (window.location.host.includes('192')
      ? 'http://192.168.3.105:3002/api'
      : '/api')
;

const getImageData = imageId => {
   const request = axios.get(`${baseUrl}/img/${imageId}`, {headers: {'Content-Type': 'image/png'}, responseType: 'blob'});
   return request.then(response => response.data);
}

const postImageData = (data, name) => {
   const request = axios.post(`${baseUrl}/img/${name}`, data, {responseType: 'blob'});
   return request.then(response => response.data);
}

export default { baseUrl, getImageData, postImageData };
export { baseUrl, getImageData, postImageData };