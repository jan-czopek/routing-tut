import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main>
      <main className="Missing">
        <h2>Page Not Found</h2>
        <p>Well, thats's disappointing.</p>
        <p>
          <Link to="/">Visit Our Homepage</Link>
        </p>
      </main>
    </main>
  )
}

export default Missing