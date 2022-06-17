// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { IncomingMessage, ServerResponse } from "http";

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
