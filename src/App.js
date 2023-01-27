import "./App.css";
import SearchBar from "./SearchBar";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="weatherApp">
          <SearchBar />
        </div>
        <small>
          <a
            href="https://github.com/brim-bold/React-Weather.git"
            target="_blank"
            rel="noreferrer"
          >
            open-source code
          </a>{" "}
          by Jaylene Jeanpierre
        </small>
      </div>
    </div>
  );
}

export default App;
