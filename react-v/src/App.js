import "./css/normilize.css";
import "./css/index.css";
import Description from "./Components/Description/Description";
import Header from "./Components/Header/Header";
import Topup from "./Components/Topup/Topup";

import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <>
        <Header></Header>

        <main>
          <div className="content">
            <div className="blured_bg"></div>
            <div className="spliter">
              <Description></Description>
              <Topup></Topup>
            </div>
          </div>
        </main>
      </>
    );
  }
}
