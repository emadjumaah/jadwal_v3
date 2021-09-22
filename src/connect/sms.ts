import axios from "axios";
import {
  SMS_CUSTOMER_ID,
  SMS_HEADER,
  SMS_PASSWORD,
  SMS_USERNAME,
} from "../constant";
import { getReadyPhone } from "./helper";

export const sendSMS = async (payload: any) => {
  const { mobile, msg } = payload;
  const phone = getReadyPhone(mobile);

  let xmls = `<?xml version="1.0" encoding="utf-16"?>
  <soap:Envelope  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Header/>
          <soap:Body>
            <HTTP_SendSms xmlns="http://pmmsoapmessenger.com/">
              <customerID>${SMS_CUSTOMER_ID}</customerID>
              <userName>${SMS_USERNAME}</userName>
              <userPassword>${SMS_PASSWORD}</userPassword>
              <originator>${SMS_HEADER}</originator>
              <smsText>${msg}</smsText>
              <recipientPhone>${phone}</recipientPhone>
              <messageType>ArabicWithLatinNumbers</messageType>
              <defDate></defDate>
              <blink>false</blink>
              <flash>false</flash>
              <Private>false</Private>
            </HTTP_SendSms>
          </soap:Body>
        </soap:Envelope>`;

  axios
    .post("https://messaging.ooredoo.qa/bms/soap/Messenger.asmx", xmls, {
      headers: {
        SOAPAction: "http://pmmsoapmessenger.com/HTTP_SendSms",
        "Content-Type": "text/xml; charset=utf-8",
      },
    })
    .then((res: any) => {
      console.log("message sent to", mobile, msg);
    })
    .catch((err: any) => {
      console.log(err);
    });

  return {
    ok: true,
    message: "out of function",
  };
};
