function doGet(e) {
  let body = {
    price: GetPrice(e.parameter.id, e.parameter.cc),
    country: e.parameter.cc,
  };
  let response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(body));
  return response;
}

function Test() {
  console.log(GetPrice(1234040, "us"));
}

function GetPrice(id, cc) {
  let url =
    "https://store.steampowered.com/api/appdetails?appids=" +
    encodeURIComponent(id) +
    "&cc=" +
    encodeURIComponent(cc) +
    "&filters=price_overview";
  try {
    let data = JSON.parse(UrlFetchApp.fetch(url).getContentText());
    let app = data[id];
    if (app && app.success && app.data.price_overview) {
      return app.data.price_overview.final / 100;
    }
  } catch (error) {
    console.error(error);
  }
  return 0;
}
