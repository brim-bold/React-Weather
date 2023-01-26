import "./App.css";
import Search from "./Search";
import Weather from "./Weather";
import Current from "./Current";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="weatherApp">
          <div className="row">
            <div className="col-9">
              <Search />
            </div>
            <div className="col-2">
              <Current />
            </div>
          </div>
          <Weather />
        </div>
        <small>
          <a
            href="https://github.com/brim-bold/React-Weather-App.git"
            target="_blank"
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
