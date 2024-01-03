import React from "react";
import bnbSvg from "../../media/bnb.svg";
import "./Topup.css";
export default function Topup() {
  return (
    <section className="topup-form">
      <form>
        <div className="loader H">
          <img src={bnbSvg} alt="" srcset="" />
        </div>
        <div className="form-controls-wrapper">
          <input
            type="tel"
            name="tel"
            id="TEL"
            required
            maxlength="10"
            pattern="\b[0-9]+"
            placeholder="999 999-99-99"
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            alt="telephone"
          />
        </div>
        <div className="form-controls-wrapper inputs">
          <div className="inputs">
            <p>You pay</p>
            <input
              name="pay"
              placeholder="12"
              required
              type="number"
              id="PAY"
            />
            <p className="YOU-PAY">12$</p>
          </div>
          <div className="dropdowns">
            <p className="hidden">USDT = 1$</p>

            <div className="pay-select">
              <img
                id="PAY-SELECT-LOGO"
                src="./static/media/tether-usdt-logo.svg"
                alt=""
                srcset=""
              />
              <select name="pay-select" id="PAY-SELECT-OPTIONS">
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="ZEC">ZEC</option>
                <option value="XMR">XMR</option>
                <option value="BNB">BNB</option>
              </select>
              <img
                src="./static/media/down-arrow-svgrepo-com.svg"
                className="down-arrow"
              />
            </div>

            <p id="PAY-SELECT-CURRENCY">USDT = 1$</p>
          </div>
        </div>
        <div className="form-controls-wrapper inputs">
          <div className="inputs">
            <p>Top up</p>
            <input name="pay" min="0" type="number" id="PAYOUT" />
            <p className="YOU-PAY">12$</p>
          </div>
          <div className="dropdowns">
            <p className="hidden">USDT = 1$</p>

            <div className="pay-select">
              <img
                src="./static/media/ruble-sign-svgrepo-com.svg"
                alt=""
                srcset=""
              />
              <select name="pay-select" id="PAY-SELECT">
                <option value="rubble">RUB</option>
              </select>
              <img
                src="./static/media/down-arrow-svgrepo-com.svg"
                className="down-arrow"
              />
            </div>

            <p id="PAY-OUT-RUBBLE">1 Rub = $0.01</p>
          </div>
        </div>
        <button type="button" className="topup-button">
          Top Up
        </button>
      </form>
    </section>
  );
}
