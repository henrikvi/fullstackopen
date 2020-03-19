import React from 'react'

const Basics = () => {
    const now = new Date();
    const a = 10;
    const b = 5;
    const c = (a !== b).toString();
    return(
  <div className = "content">
    <p>Hello world</p>
    <p>Now is {now.toDateString()}</p>
    <p>{(a === b).toString()}, are {a} and {b} the same?</p>
    <div>
      {
        // kaksi komponenttia joiden props objektin sisällöt määritellään kuten html attribuutit
        // sekä tapa kommentoida jsx:n sisällä
      }
        <Footer name = 'PETTERI' age = {a + a + b} c={c} />
        <Footer name = 'Alfons' age = {5} c = 'tyhmä' />
    </div>
  </div>
)}

// Alla näemmä pystytään destrukturoimaan parametrit missä järjestyksessä tahansa
const Footer = ({age, c, name}) => {
    return (
          <div>
            <h1>HAALLOO {name}</h1>
            <p>olet {age}v wanha, {c} story bro.</p>
          </div>
        )
    }

export default Basics;