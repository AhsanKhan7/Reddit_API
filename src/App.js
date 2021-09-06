import Home from "./screens/Home/Home";
import Media from "./screens/Media/Media";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/media" component={Media} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
