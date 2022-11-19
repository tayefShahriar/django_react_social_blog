import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import SinglePost from './SinglePost'
const Posts = () => {
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
        const getposts = async() =>{
            await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/app',
                headers: {
                    Authorization: `token ${window.localStorage.getItem("token")}`
                }
            }).then(response=>{
//                 console.log(response.data);
                setPosts(response.data)
            })
        }
        getposts()
    }, [])
    return(
        <div>
         {
            posts!== null ? (
            <div>
                {
                    posts.map((data, i)=>(
                        <SinglePost post={data} key={i}/>
                    ))
                }
            </div>
            ) : (<h1>No post found</h1>)
        }
        </div>
    )
}

export default Posts