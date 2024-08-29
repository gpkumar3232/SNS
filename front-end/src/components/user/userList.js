import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import UserContext from "../../shared/userContext.js";
import Loader from "../../shared/loader.js";

import './userList.css'
import AuthService from "../../services/authServices.js";
//functional component to render List of Books
function UserList() {
    // variable to store navigation from useNavigate hook
    const navigate = useNavigate()
    //variable to Access user details from context
    const { userDetails } = useContext(UserContext);
    // Variable to store role List
    const list = ['All','User','Admin','Guest']
    const columnList = [{title:'First Name',suffix:'firstName'},{title:'Last Name',suffix:'lastName'},{title:'Email',suffix:'email'},{title:'Phone Number',suffix:'mobile'}]
    //variable to store the book list
    const [data, setData] = useState([])
    //variable is used to maintain the Loader
    const [load, setLoad] = useState(true)
    //variable to store the values of search text
    const [search, setSearch] = useState(null)
    //variable to store the values of filter
    const [filterVal, setFilterVal] = useState('')
    // useEffect hook to Fetch genres and books when component mounts or filter value changes
    useEffect(() => {
        setLoad(true)
        getAllUser();
    }, [filterVal])
    // UseEffect used to Debounce search input to limit API calls frequency 
    useEffect(() => {
        const searchDebounceFunction = setTimeout(() => {
            if (search !== null && (search === '' || !(search?.trim() === ''))) {
                setLoad(true)
                getAllUser()
            }
        }, 1000)
        return () => clearTimeout(searchDebounceFunction)
    }, [search])
    // Function which is used to fetch all books based on search and filter criteria
    const getAllUser = () => {
        const data = {
            searchText: search || '',
            filterData: (filterVal !== "All") ? filterVal : ''
        }
        AuthService.getAllUser(data).then(res => {
            if (res) {
                console.log(res?.data,'---')
                    setData(res?.data);
                setTimeout(() => {
                    setLoad(false)
                }, 500)
            }
        }).catch(err => {
            console.log('Error', err)
        })
    }

    return (
        <main>
            <h2>Users List</h2>
            {load ?
                <Loader />
                :
                <div className="bookContainer">
                    <div className="subheader">
                        <div className="search-container">
                            <div className="searchContainer">
                                <div className='iconContainer'>
                                    <SearchIcon className="icon" />
                                </div>
                                <input
                                    placeholder={'Search by Name, Email, Phone'}
                                    type="search"
                                    required
                                    id='search'
                                    name='search'
                                    autoComplete='off'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="addContainer">
                                <div className="filterContainer">
                                    <h5>Filter By</h5>
                                    <select className="filter" value={filterVal} onChange={(e) => { setFilterVal(e.target.value); }}>
                                        {list?.map((item, key) => (
                                            <option value={item} key={key}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                        </div>
                    </div>
                    <div className='mainView'>
                        <table>
                            <tbody>
                                <tr>
                                    {columnList?.map((item, i) => (
                                        <th key={i}>{item?.title}</th>
                                    ))}
                                </tr>
                                {data?.length > 0 && data?.map((item, key) => (
                                    <tr key={key}>
                                        {columnList?.map((val, k) => (
                                            <td key={key + k}>{item[val?.suffix]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!data?.length && <p className='noRecord'>No Record Founds</p>}
                    </div>
                </div>
            }
        </main>
    )
}
export default UserList;