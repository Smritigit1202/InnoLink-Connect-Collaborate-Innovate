import React, { useState } from "react";

const Pitch = () => {
  const [expenses, setPitch] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("IT");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const categories = [
    "Food",
    "IT",
    "Education",
    "Electronics",
    "Others",
  ];

  const addExpense = () => {
    if (amount && description && date) {
      setPitch([
        ...expenses,
        { amount, category, paymentMethod, description, date },
      ]);
      setAmount("");
      setDescription("");
      setDate("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-xl mt-16 flex">
      <div className="w-1/2 pr-4 border-r">
        <h2 className="text-purple-900 text-2xl font-bold text-center mb-4">Add Pitch</h2>
        <div className="mb-4">
          <label className="block font-medium">Describe your Pitch</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Enter details"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Amount Needed</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Industry</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        
      

        <div className="mb-4">
          <label className="block font-medium">Date by which you need money</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <button
          onClick={addExpense}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Add Pitch
        </button>
      </div>

      <div className="w-1/2 pl-4">
        <h3 className="text-lg font-bold mb-2 text-center">Pitch History</h3>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No pitch added yet.</p>
        ) : (
          <ul className="space-y-2 overflow-auto max-h-96">
            {expenses.map((exp, index) => (
              <li
                key={index}
                className="p-3 border rounded bg-gray-100 flex justify-between"
              >
                <div>
                  <span className="font-bold">₹{exp.amount}</span> - {exp.category} ({exp.paymentMethod})
                  <p className="text-sm text-gray-500">{exp.description}</p>
                </div>
                <span className="text-gray-600 text-sm">{exp.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pitch;
