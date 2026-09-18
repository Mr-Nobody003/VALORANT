const api = {
  get: async (endpoint, options = {}) => {
    let url = `https://valorant-api.com/v1${endpoint}`;
    
    // Convert params object to query string
    if (options.params) {
      const queryParams = new URLSearchParams(options.params).toString();
      if (queryParams) {
        url += `?${queryParams}`;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API fetch error: ${response.status}`);
    }
    const data = await response.json();
    
    // Wrap the response in { data } to match the Axios API signature
    // so we don't break existing hooks!
    return { data }; 
  }
};

export default api;
