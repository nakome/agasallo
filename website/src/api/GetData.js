
import fetchData from "../utils/fetchData.js";

export const GetAllData = async () => fetchData(`${location.origin}/api`);
export const GetDataKey = async (key) => fetchData(`${location.origin}/api/uid/${key}`);
export const SearchData = async (name) => fetchData(`${location.origin}/api/s/${name}`);

