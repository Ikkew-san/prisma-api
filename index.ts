import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

var express = require("express");
var cors = require("cors");
var app = express();
const prisma = new PrismaClient();

app.use(cors());

app.get("/", async function (req: Request, res: Response) {
  const allNumber = await prisma.phoneNumber.findMany();
  res.json({ allNumber });
});

app.post("/add-phonenumber", async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.query;

    const isExisted = await prisma.phoneNumber.findUnique({ where: { number: phoneNumber?.toString() } as any });

    if (isExisted !== null) {
      return res.status(200).json(isExisted);
    }

    const newPhoneNumber = await prisma.phoneNumber.create({
      data: {
        number: phoneNumber,
      } as any,
    });
    return res.status(201).json(newPhoneNumber);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
