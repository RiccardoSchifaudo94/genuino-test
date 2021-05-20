import React,{useState,useEffect} from 'react'

export default function index({usersPerPage, totalPages, totalResults , paginate, currentPage}) {

    const [paginationArray, setPaginationArray] = useState([]);

    const pageNumbers =  [];
    
    for(let i = 1; i <= totalPages; i++ ){

        pageNumbers.push(i);
        
    }
    useEffect(() => {
        setPaginationArray(pageNumbers);
    }, [])
    
    useEffect(() => {
        setPaginationArray(pageNumbers);
    }, [pageNumbers])
    
    const shifPage = () =>{
        alert("shift");
        pageNumbers.push(pageNumbers[pageNumbers.length - 1] + 1);
        pageNumbers.shift();
        console.log(pageNumbers);
    }

    return (
        <div style={{margin:"0 auto"}}>
            {
                (totalPages>1)&&(
                    <nav>
                        <ul className="paginator">
                            {currentPage > 1 && (<li className="page_nav"><a  className="page_link">Prev</a></li>)}
                            {pageNumbers.map((number)=>(
                                <li key={number}  onClick={()=>{paginate(number);}} className={`page_item ${currentPage===number ? "page_active":""}`}>
                                    <a  className="page_link">
                                        {number}
                                    </a>
                                </li>
                            ))}
                            <li className="page_nav" onClick={()=>{shifPage()}}><a  className="page_link">Next</a></li>
                        </ul>
                    </nav>
                )
            }
            <p className="paginator_totals" style={{textAlign:"center"}}><strong>Total results:</strong> {(currentPage===totalPages)?(<span>{totalResults }</span>):(<span>{currentPage*usersPerPage}</span>)}/{totalResults}</p>
        </div>
    )
}
