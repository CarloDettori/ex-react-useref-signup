

function App() {
  const specializations = ["Full Stack", "Frontend", "Backend"]
  const SpecializationCheckComponent = ({ spec }) => {
    return (
      <div className="my-1 form-check">
        <input type="checkbox" className="form-check-input" id={spec} />
        <label className="form-check-label" htmlFor={spec}>{spec}</label>
      </div>
    )
  }


  return (
    <main>
      <h1 id="title">INSERISCI I TUOI DATI</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="nome-completo" className="form-label">Nome Completo</label>
          <input type="text" className="form-control" id="nome-cognome" placeholder="GianPierGiorgio Teofratinellucci" />
        </div>
        <div className="my-4">
          <label htmlFor="Nickname" className="form-label">Nickname</label>
          <input type="text" className="form-control" id="Nickname" placeholder="Gianpy" />
        </div>
        <div className="my-4">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password" placeholder="Passwordefficace1!" />
        </div>
        <p>Specializzazioni</p>
        {
          specializations.map((specialization, index) => {
            return <SpecializationCheckComponent key={index + 1} spec={specialization} />
          })
        }
        <div className="my-4">
          <label htmlFor="exp" className="form-label">Anni di Esperienza</label>
          <input type="number" className="form-control" id="exp" />
        </div>
        <div className="my-4">
          <label htmlFor="comment" className="form-label">Breve descrizione</label>
          <textarea type="text" className="form-control" id="comment" placeholder="Appassionato di sviluppo web con esperienza nella creazione di..." />
        </div>
        <button type="submit" className="btn btn-primary mt-5">Submit</button>
      </form>
    </main>
  )
}

export default App
