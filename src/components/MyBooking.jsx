import React, { useEffect, useState } from 'react';

function MyBooking() {
  const [apply, setApply] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Fetching booking data
  useEffect(() => {
    fetch('http://localhost:5000/apply')
      .then(res => res.json())
      .then(data => setApply(data))
      .catch(error => console.log(error));
  }, []);

  // Handle Cancel Booking
  const handleCancel = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowModal(true);
  };

  const confirmCancel = () => {
    fetch(`http://localhost:5000/apply/${selectedBooking}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setApply(prevApply => prevApply.filter(item => item._id !== selectedBooking));
        setShowModal(false);
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {apply.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Room Name</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Booking Date</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apply.map(booking => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.roomName}</td>
                <td className="border px-4 py-2">{booking.roomDescription}</td>
                <td className="border px-4 py-2">${booking.roomPrice}</td>
                <td className="border px-4 py-2">{booking.selectedDate}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateDate(booking._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Update Date
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No bookings found.</p>
      )}

      {/* Modal for cancel confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
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
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default MyBooking;
