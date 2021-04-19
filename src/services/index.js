import models from '../models';
import CustomError from './error';

export default {
  async getURL(arg) {
    const url = await models.Url.findOne({ short: arg });
    if (!url) throw new CustomError(404, 'Url is invalid');
    url.clicks += 1;
    await url.save();
    return url.full;
  },
  async createShortURL(arg) {
    const urlExists = await models.Url.findOne({ full: arg }).lean();
    if (urlExists) return urlExists.short;
    await models.url.create({ full: arg });
    const newURL = await models.Url.findOne({ full: arg }).lean();
    return newURL.short;
  },
};
