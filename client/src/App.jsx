import { Provider } from "react-redux";
import store from './redux/store';
import AppView from "./components/AppView";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppView />
      </Provider>
    </>
  );
}

export default App;
