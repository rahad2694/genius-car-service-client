import { Link, useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [info] = useServiceDetail(serviceId);
    const { _id, name, img, description, price } = info;
    return (
        <div>
            <h2>Welcome to detail of: {name}</h2>
            <div style={{'display':'flex','justifyContent':'center','padding':'30px'}}>
                <img src={img} alt="" />
            </div>
            <h2>ID: {_id}</h2>
            <div className='text-center'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;