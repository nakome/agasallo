export const CreateNewBin = async (data) => {
    try {
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
    } catch (error) {
        return JSON.stringify({success:false,msg:error})
    }
}

export const UpdateBin = async (key,data) => {
    try{
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
    } catch (error) {
        return JSON.stringify({success:false,msg:error})
    }
}

export const DeleteBin = async (key) => {
    try{
        const url = `${location.origin}/api/${key}`
        const opts = {
            method: "DELETE",
            headers: {
                "content-type":"application/json"
            }
        }
        const response = await fetch(url,opts)
        return await response.json()
    } catch (error) {
        return JSON.stringify({success:false,msg:error})
    }
}