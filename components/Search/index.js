import React, {useState,useEffect} from 'react'

export default function index({users, setUsers, showUsers, setShowUsers}) {

    const [nameQuery, setSearchQuery] = useState("");
   

    const searchUsersByName = async() =>{
        setShowUsers(false);
        const string_user_by_name = "https://gorest.co.in/public-api/users?name=" + nameQuery;
        const res = await fetch(string_user_by_name);
        await res.json().then((data)=>{
            setUsers(data);
            setShowUsers(true);
        });

    }
    useEffect(()=>{
        console.log("name query useeffect");
        console.log(nameQuery);
    },[nameQuery]);

    return (
        <div className="search_box">
            <input type="text" value={nameQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}/>
            <button onClick={()=>{alert("search"); searchUsersByName()}}>Search User</button>
        </div>
    )
}
