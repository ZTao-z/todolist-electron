import { load } from 'protobufjs';
import AxiosInstance  from '@/plugins/axios';

export default function pbRequest (url, module, apiName, payload) {
  const requestAPI = module + '.' + apiName + 'Request';
  const responseAPI = module + '.' + apiName + 'Response';
  const pbFile = module + '.proto';
  return new Promise((resolve, reject) => {
    load(pbFile, (err, root) => {
      if(err) {
        reject(err);
        return;
      }
  
      const request = root.lookupType(requestAPI);
      const response = root.lookupType(responseAPI);
  
      const errMsg = request.verify(payload);
      if (errMsg) {
        reject(errMsg);
        return;
      }
  
      // Create a new message
      const reqMessage = request.create(payload); // or use .fromObject if conversion is necessary
  
      // Encode a message to an Uint8Array (browser) or Buffer (node)
      const reqBuffer = request.encode(reqMessage).finish();

      const headers = {
        'Content-Type': "application/x-protobuf",
      };

      const token = sessionStorage.getItem('token') || '';
      if (token) {
        headers['Authorization'] = token;
      }

      AxiosInstance({
        url,
        method: 'post',
        responseType: 'arraybuffer',
        headers,
        data: reqBuffer.buffer.slice(reqBuffer.byteOffset, reqBuffer.byteOffset + reqBuffer.byteLength)
      }).then(res => {
        const message = response.decode(new Uint8Array(res));
        const resp = response.toObject(message, { json: true });
        const { response: status, ...data } = resp;
        console.log(resp)
        if (!status || status.code) {
          reject(status);
        } else {
          resolve(data);
        }
      })
    })
  })
}