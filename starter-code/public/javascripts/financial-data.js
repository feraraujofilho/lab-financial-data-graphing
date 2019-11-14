const getBitPrices = (startDate, endDate, currency) => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    )
    .then(response => {
      //console.log(response);
      const dates = Object.keys(response.data.bpi);
      const stockPrices = Object.values(response.data.bpi);

      drawCanvas(dates, stockPrices);
    })
    .catch(err => {
      console.log(err);
    });

  const drawCanvas = (labels, data) => {
    var ctx = document.getElementById("prices").getContext("2d");
    var prices = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            label: "Bitcoin prices",
            data: data
          }
        ]
      }
    });
  };
};

document.querySelector("button").onclick = () => {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const currency = document.querySelector("#currencies").value;
  getBitPrices(startDate, endDate, currency);
};
