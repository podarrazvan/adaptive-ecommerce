const nodemailer = require("nodemailer");
const User = require("../user/model/user.schema");

const express = require("express");
const router = express.Router();

router.put("/password-recovery", (req, res) => {
  let user = req.body;
  passwordRecovery(user, (info) => {
    res.send(info);
  });
});

async function passwordRecovery(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ecommerceproject0@gmail.com", //! FIX IT!
      pass: "bb#DTuvdKNn2S$X6", //! FIX IT AND CHANGE IT!
    },
  });
  const min = 100000;
  const max = 999999;
  const recoveryPasswordCode = Math.floor(Math.random() * (max - min) + min);
  const email = user.email;
  let mailOptions = {
    from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
    to: email, // list of receivers
    subject: "Password recovery code", // Subject line
    html: `<!DOCTYPE html>
    <html>
      <head>
        <style type="text/css">
          a .yshortcuts:hover {
            background-color: transparent !important;
            border: none !important;
            color: inherit !important
          }
          a .yshortcuts:active {
            background-color: transparent !important;
            border: none !important;
            color: inherit !important
          }
          a .yshortcuts:focus {
            background-color: transparent !important;
            border: none !important;
            color: inherit !important
          }
        </style>
        <style media="only screen and (max-width: 520px)" type="text/css">
          /* /\/\/\/\/\/\/\/\/ RESPONSIVE MOJO /\/\/\/\/\/\/\/\/ */
          /*  must escape media query with double symbol */
          @media only screen and (max-width: 520px) {
            .main-table {
              width: 90% !important;
            }
            .top {
              padding-top: 33px !important;
              padding-bottom: 37px !important;
            }
            .content {
              padding: 24px 29px !important;
            }
            .verify-button {
              padding: 25px 0 !important;
            }
          }
        </style>
      </head>
      <body align="center" style="margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; background:#ffffff; width:100%; font-family:'Roboto',sans-serif; font-size:16px; text-align:center; line-height:22px; color:#AAB2BA" width="100%">
        <table class="main-table" height="100%" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; margin:20px auto 10px; padding:0; height:100%; width:80%; max-width:600px" width="80%">
          <tr>
           
          </tr>
          <tr>
            <td align="center" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0" valign="top">
    
              <!-- BODY -->
              <div style="border: 1px solid rgba(223,226,230,0.6); border-radius: 4px; background-image:url(https://d1pgqke3goo8l6.cloudfront.net/DNHYRhpZQ2G5MrcSDPDm_help%20wave%402x.png); background-repeat: no-repeat; background-position: bottom -3px right -3px; background-size: 36%;">
                <table class="container" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; width:100%; max-width:600px; margin:0 auto; padding:0; clear:both" width="100%">
                  <tr>
                    <td style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0">
                      <table class="row" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; width:100%" width="100%">
                        <tr>
                          <td class="content" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-top:48px; padding-right:48px; padding-bottom:48px; padding-left:48px">
                            <table class="row" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; width:100%" width="100%">
                              <tr>
                                <td style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; font-family:'Roboto', sans-serif; font-size:24px; line-height:38px; color:#1B2653">
                                  Hey,
                                </td>
                              </tr>
                              <tr>
                                <td style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; color:#2A3E52; padding-top:16px; padding-bottom:0px">Your account was recently logged into from an unrecognized device. In order to preserve the security and privacy of your account, please use the code below to complete the login verification process.</td>
                              </tr>
                              <tr>
                                <td style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; color:#2A3E52; padding-top:16px; padding-bottom:0px">
                                  If you didn't attempt to login just now, please contact us!
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-bottom:0; color:#000; font-weight:bold; font-size:24px; padding-top:24px; text-align:center">
                                  ${recoveryPasswordCode}
                                </td>
                              </tr>
                              <tr>
                                <td style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; color:#2A3E52; font-family:'Roboto', sans-serif; font-size:16px; line-height:22px; padding-top:0px; padding-right:0px; padding-bottom:26px; padding-left:0">
                                  Have a great day, <br />Your team @SimilarWeb
                                </td>
                              </tr>
                              <tr>
                                <td style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-left:0; padding-top:0; padding-bottom:0; font-family:'Roboto', sans-serif; font-size:14px; line-height:16px; padding-right:80px">
                                  Need help? Contact <a href="mailto:support@similarweb.com" style="color:#4F8DF9 !important; text-decoration:none" target="_blank">support@similarweb.com</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
    
              <!-- BODY END -->
            </td>
          </tr>
          <tr>
            <td align="center" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; text-align:center; padding-top:48px; padding-bottom:35px">
              <table align="center" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; width:100%; max-width:190px; margin:0 auto; text-align:center; padding:0" width="100%">
                <tr>
                  <td align="center" height="41" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; text-align:center" width="63">
                    <a href="http://links.similarweb.com/ls/click?upn=JbPuKfV-2Bu6Hl38CZidBHWwl7o95FdGDez4dLAKQmJOhzozdYZYIyiGNrLvgn4-2BPzlfwJ_jYfCVuKHG2lyBUzkteIayk7yiQpmByTqL-2BkMLjkIRPIV5vSm2FEcEyimIOqSF07dxa0eEU-2BDYs-2BSnlPMO-2B-2FJLrQwNQamOawiPENt1BlXoGghObzCjwWAcw56bfkAyIKesNHVTTRuufhFocJYCdfg9wpQMcUnhXCHEyxoYHlzp5GnsVcrObXe-2F-2FGGwu-2Bfp9cy8ntetJtx-2BuryTiNy0xov14PmfsxYBC7UZs66dLjjZwai18TgyNbOQpIgrXqkBKhEc-2BGnxv1ngMqcRN7q-2FE3txq8B8kcAaX-2FUBueYKr5s-2F6D0K87ac-2B6wVVJLvbCTXJMtEPQJBz09pUpHmDPaqHXdHA1EFDl8UPZy6PA8o455FyfMJk6s7INIPc3YH4kuotSODUwXuCm8MPKmbRhYvxDVu1M4fxJXL7i6Gmu7t3mYmDBgQPjlrZpB2zJy5A3RxG7B5C6y2X8rF0YjPIlQOUomDFShWR7Jpbv9EbT6cTTTx2c-3D" style="color:#3999c1 !important; text-decoration:none">
                      <img alt="Twitter" height="auto" src="https://d1pgqke3goo8l6.cloudfront.net/0Xhr5ILS9CynjaZiK4jz_tw%402x.png" style="height:auto; line-height:100%; border:0; outline:none; text-decoration:none" title="SimilarWeb | Twitter" width="41" />
                    </a>
                  </td>
                  <td align="center" height="41" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; text-align:center" width="63">
                    <a href="http://links.similarweb.com/ls/click?upn=JbPuKfV-2Bu6Hl38CZidBHW0MC0dZ4iQSf2oQ9BY4ELfUcPKjCLmKRl0ATQ8c51tq9wu1Z_jYfCVuKHG2lyBUzkteIayk7yiQpmByTqL-2BkMLjkIRPIV5vSm2FEcEyimIOqSF07dxa0eEU-2BDYs-2BSnlPMO-2B-2FJLrQwNQamOawiPENt1BlXoGghObzCjwWAcw56bfkAyIKesNHVTTRuufhFocJYCdfg9wpQMcUnhXCHEyxoYHlzp5GnsVcrObXe-2F-2FGGwu-2Bfp9cy8ntetJtx-2BuryTiNy0xov14PmfsxYBC7UZs66dLjjZwai18TgyNbOQpIgrXqkBKhEc-2BGnxv1ngMqcRN7q-2FE3txq8B8kcAaX-2FUBueYKr5s-2F6D0K87ac-2B6wVVJLvbCTXJMtEw8l6vBMh683m-2BtZWiyPIeVudRVUmjTXxW8bhPtGEEY-2BJN61hlRFlcVw1vqdd2b8vTutoJjRsTfjBgW1-2F-2Bb77Gq1QNCXqNoKLrkgHWIHZSo65CzNng71vnXqedyszdrfXWey9i5K-2FkDte-2B-2FsSKjUV1Ao-2FLGkde1Z8O4Vp0oyYR0-3D" style="color:#3999c1 !important; text-decoration:none">
                      <img alt="Facebook" height="auto" src="https://d1pgqke3goo8l6.cloudfront.net/OO1SXRkpQhuBrWCaeQQ6_fb%402x.png" style="height:auto; line-height:100%; border:0; outline:none; text-decoration:none" title="SimilarWeb | Facebook" width="41" />
                    </a>
                  </td>
                  <td align="center" height="41" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:'Roboto', sans-serif; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; text-align:center" width="63">
                    <a href="http://links.similarweb.com/ls/click?upn=JbPuKfV-2Bu6Hl38CZidBHWwvr18l3SMolx3CtBRl8Tgn2aqWfy4L4lr0xEsSGdp5ZqpmMsSeP1gA9qlp7CU34-2FQ-3D-3DpPI3_jYfCVuKHG2lyBUzkteIayk7yiQpmByTqL-2BkMLjkIRPIV5vSm2FEcEyimIOqSF07dxa0eEU-2BDYs-2BSnlPMO-2B-2FJLrQwNQamOawiPENt1BlXoGghObzCjwWAcw56bfkAyIKesNHVTTRuufhFocJYCdfg9wpQMcUnhXCHEyxoYHlzp5GnsVcrObXe-2F-2FGGwu-2Bfp9cy8ntetJtx-2BuryTiNy0xov14PmfsxYBC7UZs66dLjjZwai18TgyNbOQpIgrXqkBKhEc-2BGnxv1ngMqcRN7q-2FE3txq8B8kcAaX-2FUBueYKr5s-2F6D0K87ac-2B6wVVJLvbCTXJMtsmLlTAcb0mFqkL-2FyI9uMoNJMUqyEPG13UPo-2Bj-2Fif20cIK6YiaAf-2FJIT-2F-2BT-2F8YBlLMEIdSuAT8htMnaNMfv0C5DPNSgYx1IbBZ91bgFZxMxQBbbSWhUPOyN1Dg7x1wSxy4N2s02PiAw92ZaMIKR14HQBRub8CF3Fjh9CqPdNMQPM-3D" style="color:#3999c1 !important; text-decoration:none">
                      <img alt="Linkedin" height="auto" src="https://d1pgqke3goo8l6.cloudfront.net/ClLypqwTLehk8wHIC4Y6_linkedin%402x.png" style="height:auto; line-height:100%; border:0; outline:none; text-decoration:none" title="SimilarWeb | Linkedin" width="41" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-left:0; padding-right:0; padding-top:0; font-size:14px; text-align:center; font-family:'Roboto', sans-serif; text-align:center; padding-bottom:18px; line-height:16px">
              Feel free to <a href="http://links.similarweb.com/ls/click?upn=JbPuKfV-2Bu6Hl38CZidBHW9DNXcqZvn-2Fgow2fQgxcS7c8IeOiOdyebWheTgx7UVBKXpyE_jYfCVuKHG2lyBUzkteIayk7yiQpmByTqL-2BkMLjkIRPIV5vSm2FEcEyimIOqSF07dxa0eEU-2BDYs-2BSnlPMO-2B-2FJLrQwNQamOawiPENt1BlXoGghObzCjwWAcw56bfkAyIKesNHVTTRuufhFocJYCdfg9wpQMcUnhXCHEyxoYHlzp5GnsVcrObXe-2F-2FGGwu-2Bfp9cy8ntetJtx-2BuryTiNy0xov14PmfsxYBC7UZs66dLjjZwai18TgyNbOQpIgrXqkBKhEc-2BGnxv1ngMqcRN7q-2FE3txq8B8kcAaX-2FUBueYKr5s-2F6D0K87ac-2B6wVVJLvbCTXJMtOgb8O69IrZ6ZA8TezldS-2FF7-2BxbZMvCC4vOTFe2AhDnYEO0MkqEPYBiXE1ewX9mqrgPfowuK-2BA-2F4a2H-2FtDr7L9lavreouQLzmWwOADYoAwOopyx1oJw314fScmNJ21sgALbCh2hfkbJe2p5F8qiMjCz3Qdl9rccPelE0xgeD-2Bq6U-3D" style="color:#AAB2BA !important; text-decoration:none; font-weight:bold" target="_blank">Contact Us</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-left:0; padding-right:0; padding-top:0; font-size:14px; font-family:'Roboto', sans-serif; line-height:16px; text-align:center; padding-bottom:80px">
              © SimilarWeb LTD 2009-2017. All rights reserved. <br /> 33 Irving PI, New York, NY 10003
            </td>
          </tr>
        </table>
        <p>To stop receiving SimilarWeb emails entirely,&nbsp;<a href="#">unsubscribe&nbsp;here</a>.</p>
      </body>
    </html>`,
  };
  User.findOne({ email }).then((user) => {
    const _id = user._id;
    const newCode = new User({ _id, recoveryPasswordCode });
    User.findByIdAndUpdate({ _id: _id }, newCode).then();
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

module.exports = router;
