import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {    
        console.log(data);
        fetch('https://sleepy-beyond-23974.herokuapp.com/service',{
            method: 'POST',
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
    }
    return (
        <div>
            <h1 className='text-center my-2'>Enter your Service Details</h1>
            <form className='d-flex flex-column w-50 mx-auto my-5' onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className='mb-3' placeholder='Service Name' {...register("name", { required: true, maxLength: 20 })} />
                <input type="number" className='mb-3' placeholder='Price' {...register("price")} />
                <input type="text" className='mb-3' placeholder='Description' {...register("description")} />
                <input type="text" className='mb-3' placeholder='Photo URL' {...register("img")} />
                <input value="Add Service" type="submit" />
            </form>
        </div>
    );
};

export default AddService;