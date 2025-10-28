"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevHandler = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.DevHandler = (0, express_1.Router)();
exports.DevHandler.get("/Health", (req, res) => {
    return res.status(200).json({
        Message: "Dev Route Up and Running"
    });
});
