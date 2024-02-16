import React from 'react';
import './App.css';
import {Provider, useSelector} from "react-redux";
import {store} from "./store/store";
import Main from "./pages/Mian/Main";

function App() {

    return (
        <div className="App">
            <Provider store={store}>
                <Main></Main>
            </Provider>

        </div>
  );
}

export default App;
