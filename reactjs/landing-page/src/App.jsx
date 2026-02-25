import React from "react";

function App() {
  return (
    <div className="landing-container">
      <header className="navbar">
        <h1 className="logo">EcoChain</h1>
      </header>

      <main className="content">
        <h2 className="tagline">
          “Recycle Today, <span>Secure Tomorrow</span> — Empowering E-Waste
          Management through Blockchain.”
        </h2>

        <p className="description">
          Join the movement to create a sustainable digital future.  
          Track, recycle, and earn rewards for responsible e-waste disposal.
        </p>

        <button className="cta-btn">Get Started</button>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()}  — Built for a Greener Planet 🌱</p>
      </footer>
    </div>
  );
}

export default App;
