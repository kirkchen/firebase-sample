const express = require("express");
const app = express();
const opay_payment = require("./lib/opay_payment_nodejs");
const uuid = require("uuid/v4");

app.get("/api/ping", (req, res) => res.send("pong"));

app.get("/pay", (req, res) => {
  let base_param = {
    MerchantTradeNo: uuid().replace(/\-/g, '').substr(0, 19), //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: "2017/02/13 15:45:30", //ex: 2017/02/13 15:45:30
    TotalAmount: "100",
    TradeDesc: "測試交易描述",
    ItemName: "測試商品等",
    ReturnURL: "http://192.168.0.1"
  };

  let create = new opay_payment();
  let htm = create.payment_client.aio_check_out_all((parameters = base_param));
  res.send(htm);
});

module.exports = app;
