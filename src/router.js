import services from './services';

export default (Router) => {
  const router = Router();
  router.get('/:shortId', async ({ params: { shortId } }, res, next) => {
    const url = await services.getURL(shortId).catch(next);
    if (url) res.redirect(url);
  });
  return router;
};
