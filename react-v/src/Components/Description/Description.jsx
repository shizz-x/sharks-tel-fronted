import React from "react";
import blackArrorw from "../../media/arrow_black.svg";
import whiteArrorw from "../../media/arrow_white.svg";
import shark from "../../media/shark.svg";
import "./Description.css";
export default function Description() {
  return (
    <section className="description">
      <div className="header">
        <p>
          <b>Top up</b> your
        </p>
        <p>cellphone</p>
      </div>
      <div className="usage">
        <div className="svg_container">
          <img src={shark} alt="shark" />
        </div>
        <div className="how_it_works">
          <p>How it works?</p>
          <span>
            Check out our tutorial on top up
            <div className="svg_container">
              <img data="second" src={whiteArrorw} alt="" />
              <img data="first" src={blackArrorw} alt="" />
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}
