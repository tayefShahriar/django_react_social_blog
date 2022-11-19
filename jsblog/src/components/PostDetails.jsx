import React , {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {useStateValue} from '../state/StateProvider'

const PostDetails = () => {
    const [{profile}, dispatch] = useStateValue()
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const history = useNavigate()
    useEffect(()=>{
        const getpost = async()=>{
            await Axios({
                method: 'get',
                url: `http://127.0.0.1:8000/app/${id}/`,
                headers: {
                    Authorization: `token ${window.localStorage.getItem("token")}`
                }
            }).then(response=>{
                   console.log(response.data);
                   setPost(response.data)
            })
        }
        getpost()
    }, [])
const deletepost = async () => {
    await Axios({
        method: 'DELETE',
        url: `http://127.0.0.1:8000/app/${id}/`,
        headers: {
            Authorization: `token ${window.localStorage.getItem("token")}`
        }
    }).then(response=>{
//             console.log(response.data)
               alert("Are you sure")
               history("/")
        }).catch(_=>{
            alert("something is wrong")
        })
        }
    return (
        <div className="container">
            <article class="media content-section">
              <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${post?.user?.image}/`} />
                <div class="media-body">
                    <div class="article-metadata">
                      <a class="mr-2" href="">{post?.user?.user?.username}</a>
                        <small class="text-muted">{post?.date}</small>
                        {
                            profile?.user['id'] === post?.user?.user?.id && (
                            <div>
                                <Link to={`/update/${post.id}/`} class="btn btn-secondary btn-sm mt-1 mb-1">Update</Link>
                                <Link onClick={deletepost} class="btn btn-danger btn-sm mt-1 mb-1">Delete</Link>
                            </div>
                            )
                        }
                    </div>
                    <h2 class="article-title">{post?.title}</h2>
                    <p class="article-content">{post?.text}</p>
                    <img src={post?.image} alt="no_image" />
                </div>
            </article>
        </div>
    )
}
export default PostDetails