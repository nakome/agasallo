export const GetAllData = async () => {
    try {
        let url = `${location.origin}/api`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        return JSON.stringify({success:false,msg:error})
    }
}

export const GetDataKey = async (key) => {
    try {
        let url = `${location.origin}/api/${key}`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        return JSON.stringify({success:false,msg:error})
    }
}

export const SearchData = async (name) => {
    try {
        let url = `${location.origin}/api/s/${name}`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        return JSON.stringify({success:false,msg:error})
    }
}