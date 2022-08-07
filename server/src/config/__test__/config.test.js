import { PORT } from '..';

describe('ensure configs', () => {
   test('PORT', () => {
      expect(typeof PORT).toEqual('number');
      expect(PORT).toBeGreaterThan(3000);
      expect(PORT).toBeLessThan(4000);
   });
});
