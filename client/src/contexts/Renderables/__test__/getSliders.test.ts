import getSliders from '../getsliders';

const expectedKeys = ['variable', 'trueValue', 'text', 'value', 'min', 'max'];

describe('getSliders', () => {
   test('valid sliders', () => {
      expect(() => getSliders('xslice')).not.toThrow();
      expect(() => getSliders('yslice')).not.toThrow();
      expect(() => getSliders('zslice')).not.toThrow();
      expect(() => getSliders('sphere')).not.toThrow();
      expect(() => getSliders('surface')).not.toThrow();

      const err = new Error('getSliders received invalid slider type');
      expect(() => getSliders('')).toThrow(err);
      expect(() => getSliders(3)).toThrow(err);
      expect(() => getSliders(null)).toThrow(err);
      expect(() => getSliders(['xslice'])).toThrow(err);
   });

   test('slice slider', () => {
      const [slider] = getSliders('xslice');
      expect(Object.keys(slider)).toEqual(expectedKeys);
      expect(slider.variable).toEqual('offset');
      expect(slider.trueValue).toEqual(0);
      expect(slider.text).toEqual('offset');
      expect(slider.value).toEqual(0);
      expect(slider.min).toEqual(-100);
      expect(slider.max).toEqual(100);
   });

   test('sphere slider', () => {
      const sliders = getSliders('sphere');
      sliders.forEach((slider) => {
         expect(Object.keys(slider)).toEqual(expectedKeys);
      });
      expect(sliders[0].variable).toEqual('x offset');
      expect(sliders[1].variable).toEqual('y offset');
      expect(sliders[2].variable).toEqual('z offset');
      expect(sliders[3].variable).toEqual('radius');
   });

   test('surface slider', () => {
      const [slider] = getSliders('surface');
      expect(Object.keys(slider)).toEqual(expectedKeys);
      expect(slider.variable).toEqual('value');
      expect(slider.trueValue).toEqual(0.5);
      expect(slider.text).toEqual('value');
      expect(slider.value).toEqual(50);
      expect(slider.min).toEqual(0);
      expect(slider.max).toEqual(100);
   });

   test('multiple sliders', () => {
      const [slider1] = getSliders('xslice');
      const [slider2] = getSliders('xslice');

      // ensure they are not linked
      expect(slider1.value).toEqual(0);
      expect(slider2.value).toEqual(0);

      slider1.value = 2;
      expect(slider1.value).toEqual(2);
      expect(slider2.value).toEqual(0);
   });
});
