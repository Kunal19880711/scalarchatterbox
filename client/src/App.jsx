import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppBody from "./components/AppBody";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <AppBody />
      </Provider>
    </div>
  );
}

export default App;
