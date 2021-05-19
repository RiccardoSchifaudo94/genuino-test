import React ,{useState,useEffect}  from 'react';
import Paginator from '../Paginator';
import Search from '../Search';
import Loading from '../Loading';

export default function index() {

    const [users, setUsers ] = useState();
    const [showUsers, setShowUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [enabledSearchBar, setEnabledSearchBar] = useState(false);

    const paginate = (pageNumber) => {
      setShowUsers(true);
      setCurrentPage(pageNumber);
      
      if(enabledSearchBar===false) 
        get_users(pageNumber);
    }

    const get_users = async(id) => {
        let search_query = "https://gorest.co.in/public-api/users?page=" + id;
        console.log("search query ");
        console.log(search_query);
        const res = await fetch(search_query);
        await res.json().then((data)=>{
            console.table(data);
            setUsers(data);
            setShowUsers(true);
        })
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
                            />
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
                                                        users.data.map((user)=>(
                                                            <tr>
                                                                <td>{user.id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
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
                                                       currentPage={currentPage} 
                                                       paginate={paginate}
                                            />
                                    </div>
                                )
                            }
                        </div>
                    )

            }         
       </div>
    )
}
