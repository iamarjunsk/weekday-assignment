import API from './API'

export async function PostFetch(url,body){
    const apicall = await API.post(url,body)
    return apicall.data
}