import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import { Header } from "./Components/header/Header";
// import { Footer } from "./Components/footer/Footer";
// import { Main } from "./Components/main/Main";
import { Provider } from "react-redux";
import store from "./Redux/reduxStore";
import { Auth } from "./components/auth/Auth";

// //React.lazy


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <Header /> */}

        <div className="content">
          <Switch>
            <Route path="/login" render={() => <Auth />} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>

        {/* <Footer /> */}
      </Provider>
    </BrowserRouter>
  );
}

export default App;
