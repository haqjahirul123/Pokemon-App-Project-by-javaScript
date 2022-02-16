const makeRequest= async(url,config)=>{
    const response= await fetch(url,config)
    if(!response.ok){
        const  message=`Error: ${response.status}`
         throw new Error(message)
    }
    const data = await response.json()
    return data
    
    }

const getData=()=>{
        makeRequest("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>
        {   res.map(()=>{
            console.log(res)
        })

        }).catch((err)=>console.log(err))
    
     
}
    