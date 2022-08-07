import { generateRenderable, getNewId } from '../generaterenderable';

const expectedKeys = [
   'id',
   'itemName',
   'type',
   'isVisible',
   'isActive',
   'sliderList',
   'activeVar',
   'activeVarIndex',
   'renderer',
];

describe('getNewId', () => {
   test('normal array', () => {
      const testRends = [{ id: 0 }, { id: 1 }, { id: 2 }];
      const [last] = testRends.slice(-1);
      const id = getNewId(testRends);
      expect(id).toEqual(last.id + 1);
   });

   test('some deletes', () => {
      const testRends = [{ id: 0 }, { id: 1 }, { id: 4 }];
      const [last] = testRends.slice(-1);
      const id = getNewId(testRends);
      expect(id).toEqual(last.id + 1);
   });

   test('empty array', () => {
      const testRends = [];
      const id = getNewId(testRends);
      expect(id).toEqual(0);
   });
});

describe('generateRenderable', () => {
   test('basics generation', () => {
      const renderable = generateRenderable('xslice', []);

      expect(Object.keys(renderable)).toEqual(expectedKeys);
      expect(renderable.id).toEqual(0);
      expect(renderable.itemName).toEqual('xslice');
      expect(renderable.isVisible).toEqual([true, true]);
      expect(renderable.isActive).toEqual(1);
      expect(renderable.sliderList.length).toEqual(1);
      expect(renderable.activeVar).toEqual('density');
      expect(renderable.activeVarIndex).toEqual(0);
      expect(renderable.renderer).toEqual('slice');
   });

   test('slice', () => {
      expect(() => generateRenderable('xslice', [])).not.toThrow();
      expect(() => generateRenderable('yslice', [])).not.toThrow();
      expect(() => generateRenderable('zslice', [])).not.toThrow();

      const renderable = generateRenderable('zslice', []);
      expect(renderable.itemName).toEqual('zslice');
      expect(renderable.sliderList.length).toEqual(1);
      expect(renderable.renderer).toEqual('slice');
   });

   test('sphere', () => {
      const renderable = generateRenderable('sphere', []);
      expect(renderable.itemName).toEqual('sphere');
      expect(renderable.sliderList.length).toEqual(4);
      expect(renderable.renderer).toEqual('sphere');
   });

   test('surface', () => {
      const renderable = generateRenderable('surface', []);
      expect(renderable.itemName).toEqual('surface');
      expect(renderable.sliderList.length).toEqual(1);
      expect(renderable.renderer).toEqual('surface');
   });

   test('mcube', () => {
      const renderable = generateRenderable('mcube', []);
      expect(renderable.itemName).toEqual('mcube');
      expect(renderable.sliderList.length).toEqual(1);
      expect(renderable.renderer).toEqual('mcube');
   });

   test('multiple', () => {
      const rend1 = generateRenderable('surface', []);
      const rend2 = generateRenderable('surface', [rend1]);

      expect(rend1.id).toEqual(0);
      expect(rend2.id).toEqual(1);

      rend1.isVisible[0] = false;
      expect(rend1.isVisible[0]).toEqual(false);
      expect(rend2.isVisible[0]).toEqual(true);
   });

   test('bad type', () => {
      expect(() => generateRenderable('wslice', [])).toThrow();
      expect(() => generateRenderable(null, [])).toThrow();
      expect(() => generateRenderable('xslice', null)).toThrow();
   });
});
