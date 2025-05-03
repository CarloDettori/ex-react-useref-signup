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
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~£`;

  const [formInput, setFormInput] = useState(newInput)


  const [error, setError] = useState({
    //Nickname error
    shortNick: false,
    symbolNick: false,
    spaceNick: false,
    //Password error
    shortPass: false,
    SymbolPass: false,
    NumberPass: false,
    //Dex error
    shortDex: false,
    longDex: false,
  })

  const anyError = []
  Object.values(error).forEach((value) => {
    anyError.push(value);
  });
  const noError = anyError.every(error => error === false)

  const nameRef = useRef()
  const specRef = useRef()
  const expRef = useRef()

  useEffect(() => {
    nameRef.current.focus()
  })

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    switch (name) {

      case "nick":
        setError((prevError) => ({
          ...prevError,
          shortNick: value.length < 6,
          symbolNick: symbols.split("").some((symbol) => value.includes(symbol)),
          spaceNick: value.includes(" "),
        }));
        break;

      case "pass":
        setError((prevError) => ({
          ...prevError,
          shortPass: value.length < 8,
          SymbolPass: !symbols.split("").some((symbol) => value.includes(symbol)),
          NumberPass: !numbers.split("").some((number) => value.includes(number)),
        }));
        break;

      case "dex":
        setError((prevError) => ({
          ...prevError,
          shortDex: value.length < 100,
          longDex: value.length > 1000,
        }));
        break

      default:
        console.log("uncontrolled");
    }

    setFormInput((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    console.log(value)

  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const anyError = []
    Object.values(error).forEach((value) => {
      anyError.push(value);
    });
    const noError = anyError.every(error => error === false)

    if (noError) {
      const name = nameRef.current.value
      formInput.name = name
      const specialization = specRef.current.value
      formInput.spec = specialization
      const experience = expRef.current.value
      formInput.exp = experience
      console.log(formInput)
      setFormInput(newInput)
    } else {
      console.error("vlidazione non conentita")
      console.error(error)
    }
  };


  return (
    <main>
      <h1 id="title">INSERISCI I TUOI DATI</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="name" className="form-label">Nome Completo</label>
          <input
            name="name"
            ref={nameRef}
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
            : (error.shortNick === true
              ? <p style={{ color: "red" }}>Nickname troppo corto</p>
              : <p style={{ color: "green" }}>lunghezza Username adeguata</p>
            )
          }
          {formInput.nick === ""
            ? null
            : (error.symbolNick === true
              ? <p style={{ color: "red" }}>il Nickname non deve contenere simboli</p>
              : <p style={{ color: "green" }}>nessun simbolo</p>
            )
          }
          {formInput.nick === ""
            ? null
            : (error.spaceNick === true
              ? <p style={{ color: "red" }}>il Nickname non deve contenere spazzi</p>
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
            placeholder="Password1!"
            minLength="8"
            required
          />
          {formInput.pass === ""
            ? null
            : (error.shortPass === true
              ? <p style={{ color: "red" }}>Password troppo corta</p>
              : <p style={{ color: "green" }}>lunghezza Password adeguata</p>
            )
          }
          {formInput.pass === ""
            ? null
            : (error.SymbolPass === true
              ? <p style={{ color: "red" }}>la Password deve contenere almeno un simbolo</p>
              : <p style={{ color: "green" }}>contiene un simbolo</p>
            )
          }
          {formInput.pass === ""
            ? null
            : (error.NumberPass === true
              ? <p style={{ color: "red" }}>la Password deve contenere almeno un numero</p>
              : <p style={{ color: "green" }}>contiene un numero</p>
            )
          }
        </div>

        <p className="form-label">Specializzazioni</p>
        <select name="spec" id="spec" ref={specRef} className="form-control selector" required>
          <option value="" selected="selected" disabled>Seleziona una Specializzazione</option>
          <option value="Frontend">Front End</option>
          <option value="Backend">Backend</option>
          <option value="FullStack">Full Stack</option>
        </select>

        <div className="my-4">
          <label htmlFor="exp" className="form-label">Anni di Esperienza</label>
          <input
            name="exp"
            ref={expRef}
            type="number"
            min="0"
            step="1"
            className="form-control"
            id="exp"
            placeholder="0"
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
            : (error.shortDex === true
              ? <p style={{ color: "red" }}>Descrizione troppo corta</p>
              : <p style={{ color: "green" }}>lunghezza Descrizione sopra il minimo</p>
            )
          }
          {formInput.dex === ""
            ? null
            : (error.longDex === true
              ? <p style={{ color: "red" }}>Descrizione troppo lunga</p>
              : <p style={{ color: "green" }}>lunghezza Descrizione sotto il massimo</p>
            )
          }
        </div>
        <div className="d-flex">
          {

            (noError
              ? <button type="submit" className="btn btn-primary mt-5">Invia</button>
              : <button type="submit" className="btn btn-primary mt-5" disabled>Compila tutti i campi come richiesto</button>
            )
          }
          <button type="reset" onClick={() => { setFormInput(newInput) }} className="btn btn-danger mt-5 ms-auto">Resetta</button>
        </div>
      </form>
    </main>
  )
}

export default App
