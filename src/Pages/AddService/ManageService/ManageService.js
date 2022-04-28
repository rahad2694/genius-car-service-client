import React from 'react';
import useService from '../../../hooks/useService'

const ManageService = () => {
    const [services, setServices] = useService();
    const handleDelete = (id) =>{
        const proceed = window.confirm('Are you Sure?');
        if(proceed){
            console.log('Deleting',id);
            fetch(`https://sleepy-beyond-23974.herokuapp.com/service/${id}`,{
                method: "DELETE",
            })
            .then(res => res.json())
            .then( data => {
                console.log(data);
                const remainig = services.filter(service => service._id !== id);
                setServices(remainig);
            })
        }
    }
    return (
        <div className='mx-auto w-50 my-3'>
            <h2 className='mb-3'>Manage Services</h2>
            {
                services.map(service => <ul key={service._id}>
                    <li>{service.name} <button onClick={()=> handleDelete(service._id)} className='btn btn-danger mx-2'>X</button> </li>
                </ul>)
            }
        </div>
    );
};

export default ManageService;