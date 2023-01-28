import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [personInput, setPersonInput] = useState("");
  const [hobbieInput, setHobbieInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [budgetInput, setBudgetInput] = useState("");
  const [needInput, setNeedInput] = useState("");
  const [occasionInput, setOccasionInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person: personInput, hobbie: hobbieInput, age: ageInput, gender: genderInput, budget: budgetInput, need: needInput, occasion: occasionInput, color: colorInput, brand: brandInput}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.result);
      setPersonInput("");
      setHobbieInput("");
      setAgeInput("");
      setGenderInput("");
      setBudgetInput("");
      setNeedInput("");
      setOccasionInput("");
      setColorInput("");
      setBrandInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  
  function ResultComponent(a){
    const results = a.result.split('\n').slice(2)
    return (
      <div>
        {results.map((eachResult, index) => {
          return <div key={index}>{eachResult}</div>
        })}
      </div>
    )

  }

  return (
    <div>
      <Head>
        <title>Present Pal</title>
        <link rel="icon" href="/gift.png" />
      </Head>

      <main className={styles.main}>
        <h3>Present Pal</h3>
        <img src="/gift.png" className={styles.icon} />
        <h3>Find a Gift for Anyone</h3>
        <h3></h3>
        <form class="flex-form" onSubmit={onSubmit}>
          <input
            class="form-group"
            type="text"
            name="person"
            placeholder="Enter a Person (e.g. mother, brother)"
            value={personInput}
            onChange={(e) => setPersonInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="hobbie"
            placeholder="Enter 3 Hobbies (e.g. cooking, reading, nitting)"
            value={hobbieInput}
            onChange={(e) => setHobbieInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="age"
            placeholder="Enter the age (e.g. 32)"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="gender"
            placeholder="Enter the gender (e.g. Male)"
            value={genderInput}
            onChange={(e) => setGenderInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="budget"
            placeholder="Enter your budget (e.g. 50$)"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="need"
            placeholder="Enter any needs (e.g. clothes)"
            value={needInput}
            onChange={(e) => setNeedInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="occasion"
            placeholder="Enter any occasions (e.g. wedding)"
            value={occasionInput}
            onChange={(e) => setOccasionInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="color"
            placeholder="Enter an associated color (e.g. blue)"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
          <input
            class="form-group"
            type="text"
            name="brand"
            placeholder="Enter a brand they like (e.g. Nike)"
            value={brandInput}
            onChange={(e) => setBrandInput(e.target.value)}
          />
          <input type="submit" value="Generate Gift Ideas" />
        </form>
        <div className={styles.result}><ResultComponent result={result}/></div>
      </main>
    </div>
  );
}
