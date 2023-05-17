import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import TableRow from "./tableRow";
import { useNavigate } from "react-router-dom";



const Booking = () => {
    const { user } = useContext(AuthContext)
    const [booking, setBooking] = useState([])
    const navigate = useNavigate()

    const url = `http://localhost:5000/bookings?email=${user.email}`

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                authorization : `bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){

                    setBooking(data)
                }
                else{
                    navigate('/')
                }
            })
    }, [url,navigate])


    const handleDelete = id =>{
        const proceed = confirm('are sure you want to delete')

        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    alert('deleted succesfully')
                    const remainig = booking.filter(booked => booked._id !== id)
                    setBooking(remainig)
                }
            })
        }
    }

    const handleBookingConirm = id =>{
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                const filter = booking.filter(booked => booked._Id !== id);
                const updated = booking.find(booked => booked._id === id);
                updated.status = 'confirm'
                const newBooking = [updated, ...filter];
                setBooking(newBooking)

            }
        })
    }

    return (
        <div>
            <p>your booking {booking.length}</p>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map(book => <TableRow key={book._id} handleDelete={handleDelete} handleBookingConirm={handleBookingConirm} booking={book}></TableRow>)
                        }
                        
                    </tbody>
                    

                </table>
            </div>

        </div>
    );
};

export default Booking;