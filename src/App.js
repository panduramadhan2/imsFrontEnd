import React from "react";
import ContractForm from "./components/ContractForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>IMS Finance Dashboard</h1>
      </header>
      <main>
        {/* Form untuk menghitung angsuran */}
        <section>
          <h2>Hitung Angsuran</h2>
          <ContractForm />
        </section>

        
      </main>
    </div>
  );
}

export default App;
