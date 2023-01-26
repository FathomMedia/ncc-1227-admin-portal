import type { NextApiRequest, NextApiResponse } from "next";
import { Status } from "../../src/API";

import { sendApprovalMail, sendRefusalEmail } from "../../src/aws-ses";

export interface ISendEmail {
  status: Status.APPROVED | Status.REJECTED | undefined;
  email: string | undefined;
  studentName: string | undefined;
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = JSON.parse(req.body);

  try {
    if (data === null || data === undefined) {
      return res
        .status(500)
        .json(
          "Failed to send an email to the given user. Please try again later."
        );
    }

    if (data.status === undefined) {
      return res.status(500).json("Application status is undefined");
    }

    if (data.status === Status.REJECTED) {
      const result = await sendRefusalEmail(
        "nccxfthm1227@gmail.com",
        data.studentName
      );
      return res.json(result);
    }

    if (data.status === Status.APPROVED) {
      const result = await sendApprovalMail(
        "nccxfthm1227@gmail.com",
        data.studentName
      );
      return res.json(result);
    }

    return res
      .status(500)
      .json("Something went wrong. Please try again later.");
  } catch (err) {
    console.log(err);
    throw err;
  }
}
