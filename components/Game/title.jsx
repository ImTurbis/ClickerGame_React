import React from 'react'

export function Title() {
  return (
    <>
        <h1> Bienvenido al clicker game </h1>
        <h2>Clickea tantas veces como puedas</h2>

        <style jsx>{`
          h1 {
            font-size: 25rem;
            text-align: center;  
          }

          h2 {
            font-size: 20rem;
            text-align: center;
          }

        `}</style>
    </>
  )
}
