import React, {useState ,useEffect} from 'react';

import Loading from '../Loading';

import Timestamp from '../../utils/timestamp';

import { useRouter } from "next/router";
import Link from 'next/link';   

export default function index() {

    const [singleUser,setSingleUser] = useState([]);
    const [id,setId] = useState("");
    const [showProfile, setShowProfile] = useState(false);


    const getUserById = async (id) =>{   
        let string_get_user_by_id = "https://gorest.co.in/public-api/users/"+id;
        const res = await fetch(string_get_user_by_id);
        console.log(string_get_user_by_id);
        await res.json().then((data)=>{
           setSingleUser(data.data);
           setShowProfile(true);
        })
    }
    const router = useRouter();

    useEffect(()=>{
        if(!router.isReady) return;
        setId(router.query.id);
    }, [router.isReady]);

    useEffect(()=>{
        getUserById(id);
    },[id]);

    return (
        <>
        {(showProfile===true) ? (
            <div>
                
                <div className="user_panel">
                    <button><Link href="/">Go Back</Link></button>
                    <h3>{"  "}<i className="fa fa-user" style={{position:"relative",top:"0px",marginRight:"10px"}}></i>Profile user with ID: {id}</h3>
                    <h1>{singleUser.name}</h1>
                    <h2>Email</h2>
                    <p>{singleUser.email}</p>
                    <h2>Gender</h2>
                    <p>{singleUser.gender}</p>
                    <h2>Status</h2>
                    <p>{singleUser.status}</p>
                    <h2>Created Time</h2>
                    <p>{Timestamp(`${singleUser.created_at}`)}</p>
                    <h2>Updated Time</h2>
                    <p>{Timestamp(`${singleUser.updated_at}`)}</p>
                </div>
            </div>)
         :(<Loading/>)   
        }
        </>
    )
}
