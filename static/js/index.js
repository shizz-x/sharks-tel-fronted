class App {
  exchangeRate = {};
  paySelectLogos = {
    USDT: "./static/media/tether-usdt-logo.svg",
    USDC: "./static/media/usd-coin-usdc-logo.svg",
  };
  PAY = document.getElementById("PAY");
  PAYOUT = document.getElementById("PAYOUT");
  telephone = document.getElementById("TEL");
  youPay = document.getElementsByClassName("YOU-PAY");
  payOutRubble = document.getElementById("PAY-OUT-RUBBLE");
  paySelectCurrency = document.getElementById("PAY-SELECT-CURRENCY");
  paySelectOptions = document.getElementById("PAY-SELECT-OPTIONS");
  constructor() {
    this.addEventListeners();
    this.fetchExchangeRate();
    this.addFetchLoop();
    window.submitForm = this.submitForm;
  }
  addFetchLoop() {
    setInterval(() => {
      this.fetchExchangeRate();
    }, 15000);
  }
  addEventListeners() {
    this.paySelectOptions.addEventListener("change", (e) => {
      document.getElementById("PAY-SELECT-LOGO").src =
        this.paySelectLogos[e.target.value];
      this.paySelectCurrency.innerText = `${e.target.value} = ${this.exchangeRate.tether.usd}$`;
    });
    this.PAY.addEventListener("input", (e) => {
      let youpay = (
        parseFloat(e.target.value) * this.exchangeRate.tether.usd
      ).toFixed(3);
      let payout =
        parseFloat(e.target.value) *
        this.exchangeRate.tether.usd *
        this.exchangeRate.USD.rub;

      this.youPay[0].innerText = `${youpay > 0 ? youpay : "0"}$`;

      this.youPay[1].innerText = `${youpay > 0 ? youpay : "0"}$`;

      this.PAYOUT.value = youpay > 0 ? payout : "0";
    });
  }
  async fetchExchangeRate() {
    const rubble = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const currency = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether%2Cbinancecoin%2Cbitcoin%2Cethereum%2Cmonero&vs_currencies=usd"
    );
    let data = await currency.json();

    data.USD = { rub: (await rubble.json()).rates.RUB };

    this.exchangeRate = data;

    this.payOutRubble.innerText = `1 RUB = ${(
      1 / this.exchangeRate.USD.rub
    ).toFixed(3)}$`;

    this.youPay[0].innerText = `${12 * this.exchangeRate.tether.usd}$`;
    this.youPay[1].innerText = `${12 * this.exchangeRate.tether.usd}$`;

    this.paySelectCurrency.innerText =
      this.paySelectCurrency.innerText.split(" = ")[0] +
      " = " +
      this.exchangeRate.tether.usd +
      "$";
  }
  submitForm() {
    let PAY = document.getElementById("PAY").value;
    let phoneNumber = document.getElementById("TEL").value;
    if (parseFloat(PAY) < 0) {
      return;
    }
    if (phoneNumber.length < 11) {
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
}
new App();
