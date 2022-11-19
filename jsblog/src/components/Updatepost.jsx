import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Axios from 'axios'

const Updatepost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image1, setImage1] = useState(null)
    const [image, setImage] = useState('')
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
                   setDescription(response.data?.text)
                   setTitle(response.data?.title)
                   setImage(response.data?.image)
            })
        }
        getpost()
    }, [])
    const updatepost = async () => {
        let formfield = new FormData()
        formfield.append('title', title)
        formfield.append('text', description)
        if(image1 !== null){
            formfield.append('image', image1)
        }
        await Axios({
            method: 'put',
            url: `http://127.0.0.1:8000/app/${id}/`,
            data: formfield,
            headers: {
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
//             console.log(response.data)
               history("/")
        }).catch(_=>{
            alert("Something is wrong!!!")
        })
    }
    return (
        <div className="container">
    <h1>Update</h1>
    <div className="p-3">
        <div class="form-group">
            <label>Title</label>
            <input onChange={e=>setTitle(e.target.value)} type="text" class="form-control" value={title} />
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea onChange={e=>setDescription(e.target.value)}  value={description} class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
            <img className="update__image" src={image} alt="" srcset="" />
            <label>Ulpode Image</label>
            <input
                onChange={e=>setImage1(e.target.files[0])}
                className="form-control"
                type="file" />
        </div>
    </div>
    <div>
        <p className="btn btn-info" onClick={updatepost}>Update</p>
    </div>
</div>
    )
}
export default Updatepost