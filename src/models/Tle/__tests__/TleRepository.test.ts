import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TleRepository from '../repository';

const createRestHandler = (statusCode = 200, resBody = {}) => {
  return rest.get(
    'https://celestrak.com/NORAD/elements/active.txt',
    (req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.json(resBody));
    }
  );
};

describe('TleRepository', () => {
  describe('find', () => {
    // Setup API mock server
    const server = setupServer();
    beforeAll(() => server.listen());

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => server.close());

    describe('When API response includes a target TLE', () => {
      beforeEach(() => {
        const resBody = `CALSPHERE 1
1 00900U 64063C   22098.83237435  .00000628  00000+0  66069-3 0  9999
2 00900  90.1758  39.6293 0024731 229.8707 215.7967 13.73735970861103
ISS (ZARYA)
1 25544U 98067A   22099.02355679  .00009809  00000+0  17994-3 0  9997
2 25544  51.6445 319.1538 0004466   2.7611 143.6290 15.49948910334458
RSP-01
1 47925U 98067SB  22098.80422230  .00130893  00000+0  94531-3 0  9997
2 47925  51.6367 300.0457 0003396 235.5032 124.5646 15.72584212 60817`;
        server.use(createRestHandler(200, resBody));
      });

      it('return target TLE', async () => {
        const res = await TleRepository().find('ISS (ZARYA)');

        expect(res.line1).toEqual(
          '1 25544U 98067A   22099.02355679  .00009809  00000+0  17994-3 0  9997'
        );
        expect(res.line2).toEqual(
          '2 25544  51.6445 319.1538 0004466   2.7611 143.6290 15.49948910334458'
        );
      });
    });

    describe("When API response doesn't include a target TLE", () => {
      beforeEach(() => {
        const resBody = `CALSPHERE 1
1 00900U 64063C   22098.83237435  .00000628  00000+0  66069-3 0  9999
2 00900  90.1758  39.6293 0024731 229.8707 215.7967 13.73735970861103
RSP-01
1 47925U 98067SB  22098.80422230  .00130893  00000+0  94531-3 0  9997
2 47925  51.6367 300.0457 0003396 235.5032 124.5646 15.72584212 60817`;
        server.use(createRestHandler(200, resBody));
      });

      it('raise Exception', async () => {
        const res = TleRepository().find('ISS (ZARYA)');
        await expect(res).rejects.toThrow('TLE is not found.');
      });
    });

    describe('When API response is error', () => {
      beforeEach(() => {
        server.use(createRestHandler(500));
      });

      it('raise Exception', async () => {
        const res = TleRepository().find('ISS (ZARYA)');
        await expect(res).rejects.toThrow(
          'Request failed with status code 500'
        );
      });
    });
  });
});
