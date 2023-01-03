import AWS from "aws-sdk";

import type { NextApiRequest, NextApiResponse } from "next";
import { Status } from "../../src/API";

import aws from "../../src/aws-exports";
import { sendApprovalMail, sendRefusalEmail } from "../../src/aws-ses";

export interface ISendEmail {
  status: Status.APPROVED | Status.REJECTED | undefined;
  email: string | undefined;
  id: string;
}

AWS.config.update({
  accessKeyId: process.env.CONFIG_ACCESS_KEY_ID,
  secretAccessKey: process.env.CONFIG_SECRET_ACCESS_KEY,
  region: aws.aws_project_region,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = JSON.parse(req.body);

  try {
    if (data.status === undefined) {
      throw new Error("Could not retrieve application status.");
    } else if (data.status === Status.REJECTED) {
      console.log("sending refusal email");
      const result = await sendRefusalEmail("nccxfthm1227@gmail.com");
      return res.json(result);
    } else {
      const result = await sendApprovalMail("nccxfthm1227@gmail.com");
      return res.json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}
