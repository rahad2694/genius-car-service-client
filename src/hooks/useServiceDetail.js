import { useEffect, useState } from "react";

const useServiceDetail = id => {
    const [info, setinfo] = useState({});
    useEffect(() => {
        fetch(`https://sleepy-beyond-23974.herokuapp.com/service/${id}`)
            .then(res => res.json())
            .then(data => setinfo(data))
    }, [id]);

    return [info];
}

export default useServiceDetail;