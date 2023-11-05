export const CreateNewBin = async (data) =>
  await processData(`${location.origin}/api`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

export const UpdateBin = async (key, data) =>
  await processData(`${location.origin}/api/${key}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

export const DeleteBin = async (key) =>
  await processData(`${location.origin}/api/${key}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });


async function processData(url, opts) {
  try {
    const response = await fetch(url, opts);
    return await response.json();
  } catch (error) {
    return JSON.stringify({ success: false, msg: error });
  }
}
