import React from "react";
import ProfileSection from "./components/ProfileSection";
import DepositForm from "./components/DepositForm";
import SubmissionsList from "./components/SubmissionsList";
import NFTGallery from "./components/NFTGallery";
import RewardsWallet from "./components/RewardsWallet";

function App() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>♻️ Ecochain Collector Dashboard</h1>
        <p className="subtitle">Manage your e-waste journey sustainably</p>
      </header>

      <div className="dashboard-content">
        <ProfileSection />
        <DepositForm />
        <SubmissionsList />
        <NFTGallery />
        <RewardsWallet />
      </div>
    </div>
  );
}

export default App;
