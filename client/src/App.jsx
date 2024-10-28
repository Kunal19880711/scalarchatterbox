import { Provider } from "react-redux";
import store from "./redux/store";
import AppBody from "./components/AppBody";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppBody />
      </Provider>
    </>
  );
}

export default App;
