import React from "react";

const submissions = [
  { id: 1, type: "Mobile Phone", weight: "0.3kg", status: "Pending" },
  { id: 2, type: "Laptop", weight: "2kg", status: "NFT Minted" },
  { id: 3, type: "Keyboard", weight: "0.8kg", status: "Recycled" },
];

function SubmissionsList() {
  return (
    <section className="section-card">
      <h2>Track Submissions</h2>
      <table className="submissions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.weight}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SubmissionsList;
