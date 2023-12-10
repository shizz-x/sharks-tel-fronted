const paySelect = document.getElementById("PAY-SELECT-OPTIONS");

const paySelectLogos = {
  USDT: "./static/media/tether-usdt-logo.svg",
  USDC: "./static/media/usd-coin-usdc-logo.svg",
};

const paySelectCurrency = {
  USDT: 1,
  USDC: 1,
};

paySelect.addEventListener("change", (e) => {
  document.getElementById("PAY-SELECT-LOGO").src =
    paySelectLogos[e.target.value];

  document.getElementById("PAY-SELECT-CURRENCY").innerText = `${
    e.target.value
  } = ${1 * paySelectCurrency[e.target.value]}$`;
});
