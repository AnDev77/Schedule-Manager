const apiFetcher = async (path) => {
    const response = await fetch(`http://localhost:3000/${path}`);
    const json = await response.json();
    return json;
};

export default apiFetcher;