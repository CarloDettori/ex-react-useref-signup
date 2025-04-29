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
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~"`;

  const [formImput, setFormInput] = useState(newInput)

  const specializations = ["Full Stack", "Frontend", "Backend"]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormInput(() => ({
      ...formImput,
      [name]: type === 'checkbox' ? checked : value
    }));
    console.log(formImput)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formImput);
    setFormInput(newInput)
  };


  return (
    <main>
      <h1 id="title">INSERISCI I TUOI DATI</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">Nome Completo</label>
          <input value={formImput.name} name="name" onChange={handleChange} type="text" className="form-control" id="name" placeholder="GianPierGiorgio Teofratinellucci" required />
        </div>
        <div className="my-4">
          <label htmlFor="nick" className="form-label">Nickname</label>
          <input value={formImput.nick} name="nick" onChange={handleChange} type="text" className="form-control" id="nick" placeholder="Gianpy" required />
        </div>
        <div className="my-4">
          <label htmlFor="pass" className="form-label">Password</label>
          <input value={formImput.pass} name="pass" onChange={handleChange} type="password" min="8" className="form-control" id="pass" placeholder="Passwordefficace1!" required />
        </div>
        <p>Specializzazioni</p>
        <select name="spec" onChange={handleChange} id="spec">
          <option value="">Seleziona una Specializzazione</option>
          <option value="Frontend">Front End</option>
          <option value="Backend">Backend</option>
          <option value="FullStack">Full Stack</option>
        </select>
        <div className="my-4">
          <label htmlFor="exp" className="form-label">Anni di Esperienza</label>
          <input value={formImput.exp} name="exp" onChange={handleChange} type="number" min="0" step="1" className="form-control" id="exp" placeholder="3" required />
        </div>
        <div className="my-4">
          <label htmlFor="dex" className="form-label">Breve descrizione</label>
          <textarea value={formImput.dex} onChange={handleChange} name="dex" type="text" className="form-control" id="dex" placeholder="Appassionato di sviluppo web con esperienza nella creazione di..." required />
        </div>
        <button type="submit" className="btn btn-primary mt-5">Submit</button>
      </form>
    </main>
  )
}

export default App
