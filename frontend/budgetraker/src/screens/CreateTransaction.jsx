import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TransactionList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions"
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("This is deleted ID:", id);
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      const filteredArray = items.filter((item) => item._id !== id);
      setItems(filteredArray);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const calculation = (array) => {
    const totalIncome = array.reduce(
      (acc, curr) => (curr.type === "income" ? acc + curr.amount : acc),
      0
    );
    const totalExpense = array.reduce(
      (acc, curr) => (curr.type === "expense" ? acc + curr.amount : acc),
      0
    );

    setIncome(totalIncome);
    setExpense(totalExpense);
  };

  useEffect(() => {
    calculation(items);
  }, [items]);

  const handleUpdate = (item) => {
    console.log("Update item:", item);
    alert(`Update functionality for ${item.title} not implemented yet!`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="md:text-3xl  text-2xl font-bold text-center mb-4 font-serif">
        Transaction List
      </h1>
      <div className="flex justify-start  mb-6">
        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
        >
          Add New
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-center font-serif">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${item.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-blue-100 p-5 mt-10 rounded-lg shadow-lg text-center sm:text-left">
            <h2 className="font-bold text-xl mb-2 font-serif">Summary</h2>
            <p className="text-lg">
              <span className="font-medium">Total Income:</span> ${income}
            </p>
            <p className="text-lg">
              <span className="font-medium">Total Expense:</span> ${expense}
            </p>
            <p className="text-lg">
              <span className="font-medium">Remaining Balance:</span> $
              {income - expense}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
