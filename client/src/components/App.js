import React from "react";
import { Router, Route } from "react-router-dom";

import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";

//Importing our custom history object
//To use history object, we need to import Router instead of BrowserRouter becuase BrowserDiuter does not allow to use a custom made history object
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      {/* <BrowserRouter> */}
      {/* {/* BrowserRouter defines its own history object  */}
      {/* To use customized history object, we use Router only */}
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StreamList}></Route>
          <Route path="/streams/new" exact component={StreamCreate}></Route>
          <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
          <Route path="/streams/delete" exact component={StreamDelete}></Route>
          <Route path="/streams/show" exact component={StreamShow}></Route>
        </div>
      </Router>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
