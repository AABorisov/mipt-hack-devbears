const get = async (url: string): Promise<any> => {
  return fetch(url).then(response => {
    return response.json();
  });
};

export default get;
