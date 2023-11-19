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
  let response = UrlFetchApp.fetch(
    "https://store.steampowered.com/app/" + id + "/?cc=" + cc
  );
  let text = response.getContentText("utf-8");
  let base = Parser.data(text)
    .from('class="game_purchase_price price"')
    .to(">")
    .build();
  console.log(base);
  let price = 0;
  if (base.includes("data-price-final")) {
    price = base.split('"')[1] / 100;
  }
  return price;
}
