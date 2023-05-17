import { useEffect, useState } from "react";
import ServicesCart from "./ServicesCart";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])
    return (
        <div>
            <div className="text-center mt-10 mb-10">
                <h1 className=" text-3xl font-bold text-orange-500">Services</h1>
                <h1 className=" text-5xl font-bold mt-8 mb-5">Our Service Area</h1>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which dont look even slightly believable. </p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {
                    services.map(service => <ServicesCart key={service._id} service={service}></ServicesCart>)
                  }
            </div>
        </div>
    );
};

export default Services;