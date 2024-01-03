// example of rest api response
const regions = {
  list: [
    {
      countrycode: "ru",
      phonecode: "+7",
      fullname: "Russia",
      phonelength: 10,
    },
    {
      countrycode: "kz",
      phonecode: "+7",
      fullname: "Kazakhstan",
      phonelength: 10,
    },
    {
      countrycode: "kg",
      phonecode: "+996",
      fullname: "Kyrgyzstan",
      phonelength: 9,
    },
  ],
};
function flagsFromCode(code) {
  return `<flag-${code}></flag-${code}>`;
}
class App {
  exchangeRate = {};
  paySelectLogos = {
    USDT: "./static/media/tether-usdt-logo.svg",
    USDC: "./static/media/usd-coin-usdc-logo.svg",
    ZEC: "./static/media/zec.svg",
    BTC: "./static/media/btc.svg",
    XMR: "./static/media/xmr.svg",
    BNB: "./static/media/bnb.svg",
    ETH: "./static/media/eth.svg",
  };
  PAY = document.getElementById("PAY");
  PAYOUT = document.getElementById("PAYOUT");
  telephone = document.getElementById("TEL");
  youPay = document.getElementsByClassName("YOU-PAY");
  payOutRubble = document.getElementById("PAY-OUT-RUBBLE");
  paySelectCurrency = document.getElementById("PAY-SELECT-CURRENCY");
  paySelectOptions = document.getElementById("PAY-SELECT-OPTIONS");
  submitButton = document.querySelector(".topup-button");
  loader = document.querySelector(".loader");

  constructor() {
    this.addEventListeners();
    this.initTooltips();
    this.fetchExchangeRate();
    this.addFetchLoop();
  }
  addFetchLoop() {
    setInterval(() => {
      this.fetchExchangeRate();
    }, 15000);
  }
  addEventListeners() {
    this.paySelectOptions.addEventListener("change", (e) => {
      this.currency = {
        USDT: this.exchangeRate.tether.usd,
        USDC: this.exchangeRate.tether.usd,
        BNB: this.exchangeRate.binancecoin.usd,
        BTC: this.exchangeRate.bitcoin.usd,
        XMR: this.exchangeRate.monero.usd,
        ETH: this.exchangeRate.ethereum.usd,
        ZEC: this.exchangeRate.zcash.usd,
      };

      document.getElementById("PAY-SELECT-LOGO").src =
        this.paySelectLogos[e.target.value];
      this.paySelectCurrency.innerText = `${e.target.value} = ${
        this.currency[e.target.value]
      }$`;
    });
    this.PAY.addEventListener("input", (e) => {
      let youpay = (
        parseFloat(e.target.value) * this.currency[this.paySelectOptions.value]
      ).toFixed(3);
      let payout = (
        parseFloat(e.target.value) *
        this.currency[this.paySelectOptions.value] *
        this.exchangeRate.USD.rub
      ).toFixed(3);

      this.youPay[0].innerText = `${youpay > 0 ? youpay : "0"}$`;

      this.youPay[1].innerText = `${youpay > 0 ? youpay : "0"}$`;

      this.PAYOUT.value = youpay > 0 ? payout : "0";
    });
    this.PAYOUT.addEventListener("input", (e) => {
      let youpay = (
        parseFloat(e.target.value) / this.currency[this.paySelectOptions.value]
      ).toFixed(3);
      let payout = (
        (parseFloat(e.target.value) / this.exchangeRate.USD.rub) *
        this.currency[this.paySelectOptions.value]
      ).toFixed(3);
      this.youPay[0].innerText = `${youpay > 0 ? youpay : "0"}$`;
      this.youPay[1].innerText = `${youpay > 0 ? youpay : "0"}$`;
      this.PAY.value = payout > 0 ? payout : "0";
    });
    this.submitButton.onclick = this.submitForm;
  }
  async fetchExchangeRate() {
    try {
      this.loader.classList.remove("H");

      // const currencyfetched = await fetch("https://sharks.tel/api/currency", {
      //   mode: "no-cors",
      // });

      // let data = await currencyfetched.json();

      let data = {
        binancecoin: {
          usd: 332.86,
        },
        bitcoin: {
          usd: 42814,
        },
        ethereum: {
          usd: 2382.51,
        },
        monero: {
          usd: 173.79,
        },
        tether: {
          usd: 1,
        },
        zcash: {
          usd: 32.34,
        },
        USD: {
          rub: 91.64,
        },
      };

      this.exchangeRate = data;

      this.currency = {
        USDT: this.exchangeRate.tether.usd,
        USDC: this.exchangeRate.tether.usd,
        BNB: this.exchangeRate.binancecoin.usd,
        BTC: this.exchangeRate.bitcoin.usd,
        XMR: this.exchangeRate.monero.usd,
        ETH: this.exchangeRate.ethereum.usd,
        ZEC: this.exchangeRate.zcash.usd,
      };

      this.payOutRubble.innerText = `1 RUB = ${(
        1 / this.exchangeRate.USD.rub
      ).toFixed(3)}$`;

      this.paySelectCurrency.innerText =
        this.paySelectCurrency.innerText.split(" = ")[0] +
        " = " +
        this.currency[this.paySelectCurrency.innerText.split(" = ")[0]] +
        "$";
    } catch (err) {
      alert("error occured");
      console.log(err);
    } finally {
      this.loader.classList.add("H");
    }
  }
  changeNodeAttr(node, attr, value) {
    let prevAttr = node.attributes.getNamedItem(attr);
    prevAttr.value = value;
    node.attributes.setNamedItem(prevAttr);
  }
  submitForm() {
    let PAY = document.getElementById("PAY").value;
    let phoneCode = document.getElementById("REGION_VALUE").innerText;
    console.log(phoneCode);
    let phoneNumber = phoneCode + document.getElementById("TEL").value;
    if (parseFloat(PAY) < 0) {
      return;
    }
    if (phoneNumber < 11) {
      return;
    }
    var data = {
      phoneNumber: phoneNumber,
      amount: PAY,
      currency: document.getElementById("PAY-SELECT-OPTIONS").value,
    };
    fetch("https://sharks.tel/api/payment", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // var selectedCurrency = form.find('select[name="currency"]').val();
        // var address = getAddressForCurrency(selectedCurrency);
        // var addressTextElement = document.getElementById("addressText");
        // addressTextElement.textContent = address;
        // var messageElement = document.getElementById("message");
        // messageElement.innerHTML = "Ваша заявка принята, адрес для оплаты:";
        // // После получения адреса для оплаты, отображаем кнопку "Копировать"
        // toggleCopyButtonVisibility();
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
      });
  }
  initTooltips() {
    const setValue = (selector, value) => {
      [...selector.children].forEach((element) => {
        if (element.id === "REGION_VALUE") {
          element.innerHTML = value;
        }
      });
    };

    const addListeners = (selector) => {
      selector.onclick = () => {
        [...selector.children].forEach((element) => {
          if (element.nodeName === "TOOLTIP") {
            element.classList.contains("dropped")
              ? element.classList.remove("dropped")
              : element.classList.add("dropped");
          }
        });
      };
    };

    const getTooltipFromSelector = (selector) => {
      [...selector.children].forEach((element) => {
        if (element.nodeName === "TOOLTIP") {
          return element;
        }
      });
    };

    [...document.getElementsByTagName("CustomSelect")].map((selector) => {
      addListeners(selector);

      [...selector.children].forEach((element) => {
        if (element.nodeName === "TOOLTIP") {
          regions.list.map((country) => {
            const node = document.createElement("choice");

            node.innerHTML =
              country.phonecode + flagsFromCode(country.countrycode);

            node.onclick = () => {
              setValue(selector, country.phonecode);
              this.changeNodeAttr(
                this.telephone,
                "maxlength",
                country.phonelength
              );
            };

            element.appendChild(node);
          });

          setValue(selector, regions.list[0].phonecode);
        }
      });
    });
  }
}
new App();
