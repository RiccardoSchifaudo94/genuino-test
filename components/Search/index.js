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
        });

    }

    const getAllUsers = async () =>{
        setShowUsers(false);
      
        const get_all_users = "https://gorest.co.in/public-api/users";
        const res = await fetch(get_all_users);
  
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
            <input  type="text" 
                    value={nameQuery} 
                    placeholder="Search by name..." 
                    onChange={
                                (e)=>{
                                        saveSearchKeyword(e.target.value)
                                }
                    } 
                    onKeyPress={       
                                    (e) =>  { 
                                                if(e.key==='Enter') 
                                                searchUsersByName(); 
                                    }
                    }/>
            <button onClick={()=>{ searchUsersByName()}}>Search User{"  "}<i className="fa fa-search" style={{position:"relative",top:"2px"}}></i></button>
            <button onClick={()=>{ resetSearch()}}>Reset{"  "}<i className="fa fa-eraser" style={{position:"relative",top:"0"}}></i></button>
        </div>
    )
}
