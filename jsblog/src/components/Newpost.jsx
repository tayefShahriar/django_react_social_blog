import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
const Newpost = () => {
    const history = useNavigate()
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [image, setImage] = useState(null)
    const addNewPost = async () => {
        let formfield = new FormData()
        formfield.append('title', title)
        formfield.append('text', content)
        if(image !== null){
            formfield.append('image', image)
        }
        await Axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/app/',
            data: formfield,
            headers: {
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
            history("/")
        }).catch(_=>{
            alert("Something is wrong!!!")
        })
    }
    return (
        <div className="container">
            <div class="form-group">
                <label >Title</label>
                <input onChange={(e)=>setTitle(e.target.value)} type="text" class="form-control" placeholder="Post title" />
            </div>
            <div class="form-group">
                <label >Description</label>
                <textarea onChange={(e)=>setContent(e.target.value)} placeholder="Description" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>Image</label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" class="form-control" />
            </div>
            <p onClick={addNewPost} className="btn btn-info">New Post</p>
        </div>
    )
}
export default Newpost