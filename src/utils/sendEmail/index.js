/* 
** sendGrid없이 코딩.
*/

import ejs from "ejs";
// import sgMail from "@sendgrid/mail";
import path from "path";
import { sendMail } from "..";

// const sendMail = ({ from, to, subject, html }) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     from: from,
//     to: to,
//     subject: subject,
//     html: html,
//   };
//   sgMail.send(msg).catch((e) => console.log(e));
// };

const sumOfCost = (data) => {
  return Object.values(data)
    .map((cat) => {
      let cost = 0;
      cat.map((v) => {
        cost = parseInt(v.amount) + cost;
      });
      return parseInt(cost);
    })
    .reduce((a, c) => a + c);
};
// console.log(sumOfCost);

// export const sendBillingMail = ({ workData, worker, from, to }) => {
export const sendBillingMail = async ({ workData, worker, to }) => {
  const _sumOfCost = sumOfCost(workData);

  ejs.renderFile(path.join(__dirname, "/email.ejs"), { ...workData, _sumOfCost }, {}, async function (err, str) {
    // str => Rendered HTML string
    const style = `
    <style type="text/css">
      .work-contents {
          width: 150px;
          text-align: center;
      }
      th {
        width: 150px;
        text-align: center;
      }
      td {
        width: 150px;
        text-align: center;
      }
      .work-date{
        width: 100px;
      }
      .work-date-value {
        width: 100px;
        text-align: left;
      }
    </style>
  `;
    await sendMail({
      to: to,
      subject: `${worker}의 정산 이메일 입니다.`,
      html: style + str,
    });
    // sendMail({
    //   from,
    //   to,
    //   subject: `${worker}의 정산 이메일 입니다.`,
    //   html: style + str
    // });
  });
};
