import AWS from "aws-sdk";

import type { NextApiRequest, NextApiResponse } from "next";
import { Status } from "../../src/API";

import aws from "../../src/aws-exports";
import { sendApprovalMail, sendRefusalEmail } from "../../src/aws-ses";

export interface ISendEmail {
  status: Status.APPROVED | Status.REJECTED | undefined;
  email: string | undefined;
  studentName: string | undefined;
  id: string;
}

// AWS.config.update({
//   accessKeyId: process.env.CONFIG_ACCESS_KEY_ID,
//   secretAccessKey: process.env.CONFIG_SECRET_ACCESS_KEY,
//   region: aws.aws_project_region,
// });

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
      return res.status(500).json("Could not get application status");
    }

    if (data.status === Status.REJECTED) {
      const result = await sendRefusalEmail(
        "nccxfthm1227@gmail.com",
        data.studentName
      );
      return res.json(result);
    } else {
      const result = await sendApprovalMail(
        "nccxfthm1227@gmail.com",
        data.studentName
      );
      return res.json(result);
    }
  } catch (err) {
    throw err;
  }
}
