import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { id } = useParams();
    const [info] = useServiceDetail(id);
    const [user] = useAuthState(auth);
    // const [user, setUser] = useState({
    //     name:'Kolim Uddin',
    //     email:'Akbar@momotaz.com',
    //     address:'Tazmahar road mdour',
    //     phone:'017865465789'
    // }); 
    // const handleAddressChange = e =>{
    //     console.log(e.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = e.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     console.log(newUser);
    //     setUser(newUser);
    // }
    const handleSubmit = e => {
        e.preventDefault();
        const order = {
            service: info.name,
            email: user.email,
            serviceId: id,
            address: e.target.address.value,
            phone: e.target.phone.value,
        }
        axios.post('https://sleepy-beyond-23974.herokuapp.com/order',order)
        .then(response =>{
            console.log(response.data);
            if(response.data.insertedId){
                toast('Order Success..!!');
            }
        })
        .catch(error=>{
            console.log(error);
            toast('Error..!!');
        })
        e.target.reset();
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Checkout your booking for {info.name}</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-100 mb-2' readOnly disabled type="text" value={user?.displayName} name='name' placeholder='Name' required /> <br />
                <input className='w-100 mb-2' type="email" readOnly disabled value={user.email} name='email' placeholder='email' required /> <br />
                <input className='w-100 mb-2' readOnly disabled type="text" value={info.name} name='service' placeholder='service' required /> <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='address' autoComplete='off' required /> <br />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='phone' autoComplete='off' required /> <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;