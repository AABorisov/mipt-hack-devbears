const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
};

const options = {
  credentials: 'include',
  mode: 'cors',
  headers,
};

const get = async (url: string): Promise<any> => {
  return fetch(url).then(response => {
    return response.json();
  });
};

export default get;
