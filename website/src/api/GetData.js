export const GetAllData = async () => {
    let url = `${location.origin}/api`
    const response = await fetch(url)
    return await response.json()
}

export const GetDataKey = async (key) => {
    let url = `${location.origin}/api/${key}`
    const response = await fetch(url)
    return await response.json()
}

export const SearchData = async (name) => {
    let url = `${location.origin}/api/s/${name}`
    const response = await fetch(url)
    return await response.json()
}