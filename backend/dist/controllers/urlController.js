"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToOriginalUrl = exports.createShortUrl = void 0;
const urlModel_1 = __importDefault(require("../models/urlModel"));
const shortid_1 = __importDefault(require("shortid"));
const createShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { originalUrl } = req.body;
        const shortId = shortid_1.default.generate();
        const newUrl = new urlModel_1.default({ originalUrl, shortId });
        yield newUrl.save();
        res.status(201).json({ shortUrl: `https://snaplink-iskj.onrender.com/api/${shortId}` });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createShortUrl = createShortUrl;
const redirectToOriginalUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortId } = req.params;
        const url = yield urlModel_1.default.findOne({ shortId });
        if (url) {
            res.redirect(url.originalUrl);
        }
        else {
            res.status(404).json({ error: 'URL not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.redirectToOriginalUrl = redirectToOriginalUrl;
