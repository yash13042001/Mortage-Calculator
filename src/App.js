import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);
  const [output, setOutput] = useState(0);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);

    if (id === "principal") {
      setPrincipal(value);
    } else if (id === "interest") {
      setInterest(value);
    } else {
      setYears(value);
    }
  };

  // P(r(1+r)^n/((1+r)^n)-1))
  const calculateEMI = () => {
    let r = interest;
    if (principal && r && years) {
      r = r / 12 / 100;
      const calcPow = Math.pow(1 + r, 12 * years);
      const amount = principal * ((r * calcPow) / (calcPow - 1));
      setOutput(Math.round(amount));
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, interest, years]);

  return (
    <div className="loan-calc">
      <h1>Mortage Calculator</h1>
      <div className="inputes">
        <p>Principal:</p>
        <input onChange={handleChange} type="number" id="principal" />
        <p>Interest:</p>
        <input onChange={handleChange} type="number" id="interest" />
        <p>Years:</p>
        <input onChange={handleChange} type="number" id="years" />
      </div>
      <div className="output">Your EMI is {output}</div>
    </div>
  );
}

export default App;
