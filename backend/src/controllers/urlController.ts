import { Request, Response } from 'express';
import Url from '../models/urlModel';
import ShortId from 'shortid';

export const createShortUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { originalUrl } = req.body;
    const shortId = ShortId.generate();

    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/api/${shortId}` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
