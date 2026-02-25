import React, { useState } from "react";

function DepositForm() {
  const [form, setForm] = useState({ type: "", weight: "", category: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("E-waste submitted successfully!");
  };

  return (
    <section className="section-card">
      <h2>E-Waste Deposit Form</h2>
      <form className="deposit-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          required
          className="input-field"
        />
        <input
          type="text"
          name="type"
          placeholder="Type (e.g., Laptop, Phone)"
          value={form.type}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Plastic, Metal, etc.)"
          value={form.category}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </section>
  );
}

export default DepositForm;
