
export default async function processData(url, opts) {
    try {
        const response = await fetch(url, opts || {});
        return await response.json();
    } catch (error) {
        return JSON.stringify({ success: false, msg: error });
    }
}
