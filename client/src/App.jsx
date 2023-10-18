import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function products() {
      try {
        const response = await fetch(`http://127.0.0.1:8000`);
        if (!response.ok) {
          throw new Error("Network error");
        }
        const result = await response.json();
        console.log("these");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    products(); // Invoke the function
  }, []);

  console.log(data);

  return <>ASD</>;
}

export default App;
