import { Router } from 'express';
import { createShortUrl, redirectToOriginalUrl } from '../controllers/urlController';

const router: Router = Router();

router.post('/shorten', createShortUrl);
router.get('/:shortId', redirectToOriginalUrl);

export default router;
