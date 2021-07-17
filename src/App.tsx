import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Provider } from "react-redux";
import store from "./Redux/reduxStore";
import { Auth } from "./components/auth/Auth";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />

        <div className="content">
          <Switch>
          <Route path="/home" render={() => <Main />} />
            <Route path="/login" render={() => <Auth />} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>

        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
