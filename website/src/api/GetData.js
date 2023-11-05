export const GetAllData = async () => fetchGet(`${location.origin}/api`);
export const GetDataKey = async (key) => fetchGet(`${location.origin}/api/uid/${key}`);
export const SearchData = async (name) => fetchGet(`${location.origin}/api/s/${name}`);

async function fetchGet(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return JSON.stringify({ success: false, msg: error });
    }
}