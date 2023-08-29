export const CreateNewBin = async (data) => {
    const url = `${location.origin}/api`
    const opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type":"application/json"
        }
    }
    const response = await fetch(url,opts)
    return await response.json()
}

export const UpdateBin = async (key,data) => {
    const url = `${location.origin}/api/${key}`
    const opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "content-type":"application/json"
        }
    }
    const response = await fetch(url,opts)
    return await response.json()
}

export const DeleteBin = async (key) => {
    const url = `${location.origin}/api/${key}`
    const opts = {
        method: "DELETE",
        headers: {
            "content-type":"application/json"
        }
    }
    const response = await fetch(url,opts)
    return await response.json()
}