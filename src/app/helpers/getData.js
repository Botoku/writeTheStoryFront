import axios from "axios"

async function getData(url) {
    const res = await fetch(url)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }


  async function retrieveStory (params){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/stories/${params}`)
    console.log("response", response)
    return response.data
  }
  export  {getData, retrieveStory}