import request from 'supertest';

import app from '../app';

describe('A user can send a request to the api to shorten a link in the request', () => {
  it('It should shorten  a link sent in the request', async () => {
    const { status, body: { data } } = await request(app).post('/graphiql').send({
      query: ` {
          shortenURL(url: "https://www.notion.so/Backdrop-Coding-Challenge-WIP-b77847cfaa644a98812d6a6718324f66")
      }
      `,
    });
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['shortenURL']);
    expect(data.shortenURL).toString();
  });
});
