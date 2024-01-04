
import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import axios from 'axios';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';
import { useSelector } from 'react-redux';

function MainText () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [data, setData] = useState([]); // For pagination [1, 2, 3, 4, 5
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const bearerToken = useSelector(state=>state.auth.token); // Replace 'YOUR_BEARER_TOKEN_HERE' with your actual bearer token
    
    useEffect(() => {
        const fetchData = async () => {
          const apiUrl = 'https://leaseovername.com/api/admin/main-text/index'; // Replace with your API endpoint
       
          const config = {
            headers: {
              'Authorization': `Bearer ${bearerToken}`
            }
          };
    
          try {
            const response = await axios.get(apiUrl, config);
            console.log('GET request response:', response.data);
            setData(response.data.data)
            // Handle the response data here
          } catch (error) {
            console.error('Error in GET request:', error);
            // Handle errors
          }
        };
    
        fetchData();
      }, []);


   

    
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(data, new_page, 5));
    }
    
    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New Blog" />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Category </h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>ACTIONS</th>
                    </thead>

                    {data.length !== 0 ?
                        <tbody>
                            {data.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{index + 1}</span></td>
                                    <td><span>{order?.title}</span></td>
                                    <td><span><div><button>Edit</button><button>Delete</button></div></span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {/* {data?.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                } */}
            </div>
        </div>
    )
}

export default MainText