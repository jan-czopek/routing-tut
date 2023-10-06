import { Link } from "react-router-dom"

import React from 'react'

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to <span className="nowrap">Plan Eat</span></h1>
      </header>
      <main className="public__main">
        <p>Invite paragraph.</p>
      </main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>

  )
  return content
}

export default Public