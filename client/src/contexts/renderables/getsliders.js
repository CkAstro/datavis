
const offsetSlider = {
   variable: null,
   trueValue: 0.0,
   text: null,
   value: 0,
   min: -100,
   max: 100,
}

const valueSlider = {
   variable: null,
   trueValue: 0.5,
   text: null,
   value: 50,
   min: 0,
   max: 100,
}

const getSliders = type => {
   if (type === 'xslice' || type === 'yslice' || type === 'zslice') {
      return [{ ...offsetSlider, variable: 'offset', text: 'offset' }];
   } else if (type === 'sphere') {
      return [
         { ...offsetSlider, variable: 'x offset', text: 'x offset' }, 
         { ...offsetSlider, variable: 'y offset', text: 'y offset' },
         { ...offsetSlider, variable: 'z offset', text: 'z offset' },
         { ...valueSlider,  variable: 'radius',   text: 'radius'   },
      ];
   } else if (type === 'surface') {
      return [{ ...valueSlider, variable: 'value', text: 'value' }];
   } else {
      throw new Error('getSliders received invalid slider type');
   }
}

export default getSliders;