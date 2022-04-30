import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        const getOrders = async () => {
            const url = `http://localhost:5000/order?email=${user.email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setOrders(data);
            }
            catch (error) {
                console.log(error);
                toast(error.message);
                if(error.response.status === 403 || error.response.status === 401){
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, [user]);
    return (
        <div className='mx-auto'>
            <h2>Your Total Orders:{orders.length}</h2>
            <div>
                {
                    orders.map(order => <div key={order._id} >
                        {order.email} : {order.service}
                    </div>)
                }
            </div>
        </div>
    );
};

export default Order;