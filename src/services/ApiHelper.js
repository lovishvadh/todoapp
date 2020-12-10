import axios from 'axios';

function handleAxiosError(error) {
  return {status: false, error};
}


class ApiHelper {
  constructor() {
    this.baseAPI = axios.create({
      baseURL: 'https://tiny-list.herokuapp.com/api/v1/',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });
  }

  get(path, params = {}, headers = {}) {
    return this.baseAPI.get(path, {
      params,
      headers,
    }).catch(handleAxiosError);
  }

  post(path, data = {}, params = {}, headers = {}) {
    return this.baseAPI.post(path, data, {
      params,
      headers
    }).catch(handleAxiosError);
  }

  put(path, data = {}, params = {}, headers = {}) {
    return this.baseAPI.put(path, data, {
      params,
      headers
    }).catch(handleAxiosError);
  }

  delete(path, params = {}, headers = {}) {
    return this.baseAPI.delete(path, {
      params,
      headers,
    }).catch(handleAxiosError);
  }
}

export default new ApiHelper();
