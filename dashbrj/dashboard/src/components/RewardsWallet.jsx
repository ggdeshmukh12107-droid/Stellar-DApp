import React from "react";

function RewardsWallet() {
  return (
    <section className="section-card">
      <h2>Rewards Wallet</h2>
      <p><strong>Balance:</strong> 25 RECY Tokens</p>

      <table className="rewards-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>2025-10-01</td><td>Reward from Recycling</td><td>+10</td></tr>
          <tr><td>2025-09-25</td><td>Reward from Deposit</td><td>+15</td></tr>
        </tbody>
      </table>
    </section>
  );
}

export default RewardsWallet;
