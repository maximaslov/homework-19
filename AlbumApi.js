class AlbumApi {
    
    static request(url, id) {
        return fetch(url + id)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error();
            })
        }
}

export default AlbumApi;