import React, {useState,useEffect} from 'react'

export default function index({users, setUsers, showUsers, setShowUsers, enabledSearchBar, setEnabledSearchBar,nameQuery, setSearchQuery,setCurrentPage,currentPage}) {

    
   

    const searchUsersByName = async() =>{
        setShowUsers(false);
      
        const string_user_by_name = "https://gorest.co.in/public-api/users?name=" + nameQuery;
        const res = await fetch(string_user_by_name);
        console.log(string_user_by_name);
        await res.json().then((data)=>{
            setUsers(data);
            setShowUsers(true);
            setEnabledSearchBar(true);
            setCurrentPage(1);
            console.log("user state after search =>");
            console.log(users);
            console.log("enebled search status =>");
            console.log(enabledSearchBar);
        });

    }

    const getAllUsers = async() =>{
        setShowUsers(false);
      
        const get_all_users = "https://gorest.co.in/public-api/users";
        const res = await fetch(get_all_users);
        console.log(get_all_users);
        await res.json().then((data)=>{
            setUsers(data);
            setShowUsers(true);
            setEnabledSearchBar(false);
            setCurrentPage(1);
            setSearchQuery("");
        });

    }

    const saveSearchKeyword = (keyword) =>{
        setSearchQuery(keyword);
    }

    const resetSearch = () =>{
        var x = confirm("Do you want to reset?");
        
        if(x) getAllUsers();
    }


    return (
        <div className="search_box">
            <input type="text" value={nameQuery} onChange={(e)=>{saveSearchKeyword(e.target.value)}}/>
            <button onClick={()=>{ searchUsersByName()}}>Search User</button>
            <button onClick={()=>{ resetSearch()}}>Reset</button>
        </div>
    )
}
