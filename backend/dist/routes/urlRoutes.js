"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urlController_1 = require("../controllers/urlController");
const router = (0, express_1.Router)();
router.post('/shorten', urlController_1.createShortUrl);
router.get('/:shortId', urlController_1.redirectToOriginalUrl);
exports.default = router;
