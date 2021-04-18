import services from './services';

export default (app) => {
  app.get('/:shortId', async ({ params: { shortId } }, { redirect }, next) => {
    const url = await services.getShortURL(shortId).catch(next);
    return redirect(url);
  });
};
