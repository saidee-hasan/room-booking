import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

function MyBooking() {
  const [apply, setApply] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { user } = useAuth();

  // Fetching booking data
  useEffect(() => {
    if (user?.email) {
      // fetch(`http://localhost:5000/apply?email=${user?.email}`)
      //   .then(res => res.json())
      //   .then(data => setApply(data))
      //   .catch(error => console.log(error));
      axios.get(`http://localhost:5000/apply?email=${user?.email}`,{withCredentials:true})
      .then(res => setApply(res.data))



    }
  }, [user?.email]);

  // Handle Cancel Booking
  const handleCancel = (bookingId) => {
    const booking = apply.find((item) => item._id === bookingId);
    if (booking) {
      const bookingDate = new Date(booking.selectedDate);
      const cancelBeforeDate = new Date(bookingDate);
      cancelBeforeDate.setDate(cancelBeforeDate.getDate() - 2); // 2 days before booking date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time component for comparison
  
      if (today <= cancelBeforeDate) {
        // Show SweetAlert2 confirmation modal
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            // Confirm cancellation
            confirmCancel(bookingId); // Move the cancellation call inside the confirmation block
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been canceled.",
              icon: "success"
            });
          }
        });
      } else {
        // If cancellation period has passed
        setToastMessage('Cancellation period has passed. You can only cancel 2 days before the booked date.');
        setShowToast(true);
      }
    }
  };
  

  const confirmCancel = (id) => {

    axios.delete(`http://localhost:5000/apply/${id}`, { withCredentials: true })

    .then(() => {

      setApply(prevApply => prevApply.filter(item => item._id !== id));

      setToastMessage('Booking cancelled successfully');

      setShowToast(true);

    })

    .catch(error => console.log(error));
  };

  // Handle Update Date
  const handleUpdateDate = (bookingId) => {
    setSelectedBooking(bookingId); // Store the bookingId for which the date will be updated
    const updatedBooking = apply.find(item => item._id === bookingId);
    if (updatedBooking) {
      setNewDate(updatedBooking.selectedDate); // Set the existing booking date as the initial value
    }
    setShowModal(true); // Show the modal for updating the date
  };

  const confirmUpdateDate = () => {
    if (newDate && selectedBooking) {
      fetch(`http://localhost:5000/apply/${selectedBooking}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedDate: newDate }),
      })
        .then(res => res.json())
        .then(() => {
          setApply(prevApply => prevApply.map(item =>
            item._id === selectedBooking ? { ...item, selectedDate: newDate } : item
          ));
          setToastMessage('Booking date updated successfully');
          setShowToast(true);
          setNewDate(''); // Clear the date input after successful update
          setShowModal(false); // Close the modal
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {apply.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Room Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Booking Date</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apply.map(booking => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{booking.roomName}</td>
                  <td className="border px-4 py-2">{booking.roomDescription}</td>
                  <td className="border px-4 py-2">${booking.roomPrice}</td>
                  <td className="border px-4 py-2">{booking.selectedDate}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                    >
                      <FaTrashAlt className="inline-block mr-2" />
                      Cancel
                    </button>

                    <button
                      onClick={() => handleUpdateDate(booking._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      <FaRegEdit className="inline-block mr-2" />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">No bookings found.</p>
      )}

      {/* Modal for cancel confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <h3 className="text-xl font-bold mb-4">Update Booking Date</h3>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="form-control w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={confirmUpdateDate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-300">
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default MyBooking;
