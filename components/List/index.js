import React ,{useState,useEffect}  from 'react';
import Paginator from '../Paginator';
import Search from '../Search';
import Loading from '../Loading';

export default function index() {

    const [users, setUsers ] = useState();
    const [showUsers, setShowUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [enabledSearchBar, setEnabledSearchBar] = useState(false);
    const [nameQuery, setSearchQuery] = useState("");

    const paginate = (pageNumber) => {
      setShowUsers(false);
      setCurrentPage(pageNumber);
      
      if(enabledSearchBar===false || nameQuery.length === 0) 
        get_users(pageNumber);
      else
        get_users_by_name_paginate(nameQuery,pageNumber);

    
        console.log("enebled search status =>");
        console.log(enabledSearchBar);
    }

    const get_users = async(id) => {
        let search_query = "https://gorest.co.in/public-api/users?page=" + id;
        console.log("search query =>");
        console.log(search_query);
        const res = await fetch(search_query);
        await res.json().then((data)=>{
            console.table(data);
            setUsers(data);
            setShowUsers(true);
        })
    }

    const get_users_by_name_paginate = async(nameQuery,id) =>{
        setShowUsers(false);
        const string_user_by_name = "https://gorest.co.in/public-api/users?name=" + nameQuery+"&page="+id;
        const res = await fetch(string_user_by_name);
        console.log("search query =>");
        console.log(string_user_by_name);
        await res.json().then((data)=>{
            setUsers(data);
            setShowUsers(true);
            console.log("user state after search =>");
            console.log(users);
            console.log("enebled search status =>");
            console.log(enabledSearchBar);
        });

    }


    useEffect(()=>{
        get_users(currentPage);
    },[]);

    return (
        <div>
            {
                (showUsers===false) 
                    ?(<Loading/>)
                    :(
                        <div>
                            <Search enabledSearchBar={enabledSearchBar} 
                                    setEnabledSearchBar={setEnabledSearchBar} 
                                    users={users} 
                                    setUsers={setUsers} 
                                    showUsers={showUsers} 
                                    setShowUsers={setShowUsers} 
                                    nameQuery={nameQuery}
                                    setSearchQuery={setSearchQuery}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                            />
                            { 
                                (users.data.length>0)
                                    ? (
                                        <div>
                                            { 
                                                showUsers && (
                                                    <div>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Name</th>
                                                                        <th>Email</th>
                                                                        <th>Gender</th>
                                                                        <th>Status</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        users.data.map((user, key)=>(
                                                                            <tr key={key}>
                                                                                <td>{user.id}</td>
                                                                                <td>{user.name.substring(0,50)}</td>
                                                                                <td>{user.email.substring(0,50)}</td>
                                                                                <td>{user.gender}</td>
                                                                                <td>{user.status}</td>
                                                                                <td><button>View more</button></td>
                                                                            </tr>
                                                                            )
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <Paginator usersPerPage={users.meta.pagination.limit} 
                                                                    totalPages={users.meta.pagination.pages}
                                                                    totalResults={users.meta.pagination.total} 
                                                                    currentPage={currentPage} 
                                                                    paginate={paginate}
                                                                    enabledSearchBar={enabledSearchBar}
                                                                    setEnabledSearchBar={setEnabledSearchBar}
                                                            />
                                                    </div>
                                                )
                                            } 
                                        </div>)
                                    :(
                                        <div style={{ textAlign:"center",
                                                        fontWeight:"900",
                                                        fontSize:"30px",
                                                        marginTop:"100px"
                                                    }}>
                                                        Sorry, results not found!
                                        </div>
                                    )
                            }
                 
                        </div>
                    )

            }         
       </div>
    )
}
