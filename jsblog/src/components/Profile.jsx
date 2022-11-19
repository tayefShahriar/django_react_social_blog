import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {useStateValue} from '../state/StateProvider'
const Profile = () =>{
const [{profile}, dispatch] = useStateValue()
const [email, setEmail] = useState(profile?.user?.email)
const [fname, setFname] = useState(profile?.user?.first_name)
const [lname, setLname] = useState(profile?.user?.last_name)
const [image, setImage] = useState(null)
const [reload, setReload] = useState('')

useEffect(()=>{
    const getprofile = async() =>{
            await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/profile',
                headers:{
                    Authorization: `token ${window.localStorage.getItem("token")}`
//                     4d014e0294f3bca2ef943aebe3242b2a5ea4bde4
                }
            }).then(response=>{
                 console.log(response.data);
                 dispatch({
                    type: 'ADD_PROFILE',
                    value: response.data['userdata']
                 })
            })
        }
        getprofile()
}, [reload])
const userdataupdate = async() => {
    await Axios({
        method: "POST",
        url: 'http://127.0.0.1:8000/userdataupdate/',
        data:{
            'first_name': fname,
            'last_name': lname,
            'email': email,
        },
        headers: {
            Authorization: `token ${window.localStorage.getItem("token")}`
        }
    }).then(response => {
//         console.log(response.data)
           setReload(response.data)
    })
}
const updateimage = async() => {
    let formfile = new FormData()
    formfile.append('image', image)
    await Axios({
        method: "post",
        url: "http://127.0.0.1:8000/profileupdate/",
        data: formfile,
        headers: {
            Authorization: `token ${window.localStorage.getItem("token")}`
        }
    }).then(response => {
//         console.log(response.data);
            setReload(response.data)
    })
}
    return (
        <div className="container">
            <div>
                <div class="content-section">
                    <div class="media">
                        <img class="rounded-circle account-img" src={`http://127.0.0.1:8000${profile?.image}/`} />
                        <div class="media-body">
                            <h2 class="account-heading">{profile?.user.username}</h2>
                            <small class="form-text text-muted">Username name is Fiexd</small>
                            <p class="text-secondary">{profile?.user.email}</p>
                            <p>{profile?.user.first_name} {profile?.user.last_name}</p>
                        </div>
                    </div>
                    <form method="POST" enctype="multipart/form-data">

                        <fieldset class="form-group">
                            <legend class="border-bottom mb-4">Profile Info</legend>
                            <div class="form-group">
                                <label>Uplode Profile Picture</label>
                                <div class="row">
                                    <div class="col">
                                        <input onChange={e=>setImage(e.target.files[0])} type="file" class="form-control" />
                                    </div>
                                    <div class="col">
                                        <p onClick={updateimage} className="btn btn-info">Upload</p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>First Name</label>
                                <input onChange={e=>setFname(e.target.value)} value={fname} type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input onChange={e=>setLname(e.target.value)} value={lname} type="text" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" class="form-control" />
                            </div>
                        </fieldset>
                        <div class="form-group">
                            <p onClick = {userdataupdate} class="btn btn-outline-info">Update</p>
                        </div>
                    </form>
                </div>
            </div>
            </div>

    )
}
export default Profile