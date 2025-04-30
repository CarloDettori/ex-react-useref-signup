import { useRef } from "react"
import { useState, useEffect } from "react"

function App() {

  const newInput = {
    name: "",
    nick: "",
    pass: "",
    spec: "",
    exp: "",
    dex: "",
  }

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;

  const [formInput, setFormInput] = useState(newInput)

  const specializations = ["Full Stack", "Frontend", "Backend"]

  const [nickShortError, setNickShortError] = useState(false)
  const [nickSymbolError, setNickSymbolError] = useState(false)
  const [nickSpaceError, setNickSpaceError] = useState(false)

  const [passShortError, setPassShortError] = useState(false)
  const [passLongError, setPassLongError] = useState(false)
  const [passSymbolError, setPassSymbolError] = useState(false)
  const [passNumberError, setPassNumberError] = useState(false)

  const [dexShortError, setDexShortError] = useState(false)
  const [dexLongError, setDexLongError] = useState(false)

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    //nick lunghezza 
    if (name === "nick" && value.length < 6) {
      setNickShortError(true)
    } else {
      setNickShortError(false)
    }

    //nick simboli
    if (name === "nick" && symbols.split("").some((symbol) => value.includes(symbol))) {
      setNickSymbolError(true)
    } else {
      setNickSymbolError(false)
    }

    //nick spazzi 
    if (name === "nick" && value.includes(" ")) {
      setNickSpaceError(true)
    } else {
      setNickSpaceError(false)
    }

    //password lunghezza
    if (name === "pass" && value.length < 8) {
      setPassShortError(true)
    } else {
      setPassShortError(false)
    }

    //password simboli
    if (name === "pass" && symbols.split("").some((symbol) => value.includes(symbol))) {
      setPassSymbolError(false)
    } else {
      setPassSymbolError(true)
    }

    //password numeri
    if (name === "pass" && numbers.split("").some((number) => value.includes(number))) {
      setPassNumberError(false)
    } else {
      setPassNumberError(true)
    }

    //descrizione corta
    if (name === "dex" && value.length < 100) {
      setDexShortError(true)
    } else {
      setDexShortError(false)
    }

    //descrizione lunga
    if (name === "dex" && value.length > 1000) {
      setDexLongError(true)
    } else {
      setDexLongError(false)
    }

    setFormInput((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    console.log(formInput)

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formInput);
    setFormInput(newInput)
  };

  return (
    <main>
      <h1 id="title">INSERISCI I TUOI DATI</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="name" className="form-label">Nome Completo</label>
          <input
            value={formInput.name}
            name="name"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="name"
            placeholder="GianPierGiorgio Frastinellucci"
            required
          />
        </div>

        <div id="nick-wrapper" className="my-4">
          <label htmlFor="nick" className="form-label">Nickname</label>
          <input
            value={formInput.nick}
            name="nick"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="nick"
            placeholder="Gianpy"
            minLength="6"
            required
          />
          {formInput.nick === ""
            ? null
            : (nickShortError
              ? <p style={{ color: "red" }}>Username troppo corto</p>
              : <p style={{ color: "green" }}>lunghezza Username adeguata</p>
            )
          }
          {formInput.nick === ""
            ? null
            : (nickSymbolError
              ? <p style={{ color: "red" }}>l'Username non deve contenere simboli</p>
              : <p style={{ color: "green" }}>nessun simbolo</p>
            )
          }
          {formInput.nick === ""
            ? null
            : (nickSpaceError
              ? <p style={{ color: "red" }}>l'Username non deve contenere spazzi</p>
              : <p style={{ color: "green" }}>nessuno spazio</p>
            )
          }
        </div>

        <div className="my-4">
          <label htmlFor="pass" className="form-label">Password</label>
          <input
            value={formInput.pass}
            name="pass"
            onChange={handleChange}
            type="password"
            min="8"
            className="form-control"
            id="pass"
            placeholder="Passwordefficace1!"
            minLength="8"
            required
          />
          {formInput.pass === ""
            ? null
            : (passShortError
              ? <p style={{ color: "red" }}>Password troppo corta</p>
              : <p style={{ color: "green" }}>lunghezza Password adeguata</p>
            )
          }
          {formInput.pass === ""
            ? null
            : (passSymbolError
              ? <p style={{ color: "red" }}>la Password deve contenere almeno un simbolo</p>
              : <p style={{ color: "green" }}>contiene un simbolo</p>
            )
          }
          {formInput.pass === ""
            ? null
            : (passNumberError
              ? <p style={{ color: "red" }}>la Password deve contenere almeno un numero</p>
              : <p style={{ color: "green" }}>contiene un numero</p>
            )
          }
        </div>

        <p>Specializzazioni</p>
        <select name="spec" onChange={handleChange} id="spec" value={formInput.spec} required>
          <option value="" disabled>Seleziona una Specializzazione</option>
          <option value="Frontend">Front End</option>
          <option value="Backend">Backend</option>
          <option value="FullStack">Full Stack</option>
        </select>

        <div className="my-4">
          <label htmlFor="exp" className="form-label">Anni di Esperienza</label>
          <input
            value={formInput.exp}
            name="exp"
            onChange={handleChange}

            type="number"
            min="0"
            step="1"
            className="form-control"
            id="exp"
            placeholder="3"
            required />
        </div>

        <div className="my-4">
          <label htmlFor="dex" className="form-label">Breve descrizione</label>
          <textarea
            value={formInput.dex}
            onChange={handleChange}
            name="dex"
            type="text"
            className="form-control"
            id="dex"
            placeholder="Appassionato di sviluppo web con esperienza nella creazione di..."
            minLength="100"
            maxLength="1000"
            required
          />
          {formInput.dex === ""
            ? null
            : (dexShortError
              ? <p style={{ color: "red" }}>Descrizione troppo corta</p>
              : <p style={{ color: "green" }}>lunghezza Descrizione sopra il minimo</p>
            )
          }
          {formInput.dex === ""
            ? null
            : (dexLongError
              ? <p style={{ color: "red" }}>Descrizione troppo lunga</p>
              : <p style={{ color: "green" }}>lunghezza Descrizione sotto il massimo</p>
            )
          }
        </div>

        <button type="submit" className="btn btn-primary mt-5">Submit</button>

      </form>
    </main>
  )
}

export default App
