import React, {useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Axios from 'axios'
import Home from './components/Home'
import PostDetails from './components/PostDetails'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import Newpost from './components/Newpost'
import Updatepost from './components/Updatepost'
import {useStateValue} from './state/StateProvider'
const App = ()=>{
const [{profile}, dispatch] = useStateValue()
useEffect(()=>{
        try {
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
        }
        catch{
            dispatch({
                type: 'ADD_PROFILE',
                value: null
            })
        }
    }, [])
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path = "/details/:id/" element={<PostDetails/>}/>
            {
                profile !== null ? (
                <>
                <Route exact path = "/profile" element={<Profile/>}/>
                <Route exact path = "/newpost" element={<Newpost/>}/>
                <Route exact path = "/update/:id/" element={<Updatepost/>}/>
                </>
                ) : (
                <>
                <Route exact path = "/login" element={<Login/>}/>
                <Route exact path = "/register" element={<Register/>}/>
                </>
                )
            }


            </Routes>
        </BrowserRouter>
    )
}
export default App