
import fetchData from "../utils/fetchData.js";

export const CreateNewBin = async (data) =>
  await fetchData(`${location.origin}/api`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

export const UpdateBin = async (key, data) =>
  await fetchData(`${location.origin}/api/${key}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

export const DeleteBin = async (key) =>
  await fetchData(`${location.origin}/api/${key}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

