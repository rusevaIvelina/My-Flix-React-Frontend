import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import moviesApp from "./reducers/reducers";

const store = createStore(moviesApp, devToolsEnhancer());

function App() {
  return (
    <Container>
      <Provider store={store}>
        <MainView />
      </Provider>
    </Container>
  );
}

export default App;
