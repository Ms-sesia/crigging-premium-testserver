/*
 ** sendGrid 대신 nodemailer 이용
 */

import ejs from "ejs";
import path from "path";
import { sendMail } from "..";

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

export default async ({ yearMonth, workData, worker, to }) => {
  const _sumOfCost = sumOfCost(workData);
  const year = yearMonth.split("-")[0];
  const month = yearMonth.split("-")[1];

  ejs.renderFile(
    path.join(__dirname, "email.ejs"),
    { worker, year, month, ...workData, _sumOfCost },
    {},
    async function (err, str) {
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
        subject: `크리깅에서 보내는 ${worker}님의 ${year}년 ${month}월 정산 이메일 입니다.`,
        html: style + str,
      });
    }
  );
};
