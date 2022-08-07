import { render, screen, userEvent, fireEvent, act, container } from 'test';
import { useRenderables, useCamera } from 'contexts';
import { ObjectManager } from '..';

jest.mock('contexts');

beforeEach(() => {
   const { setAllRenderables } = useRenderables();
   setAllRenderables([]);
});

describe('ObjectManager', () => {
   test('init', () => {
      act(() => render(<ObjectManager />, container));

      const list = document.querySelector('.itemDisplay');
      expect(list.children.length).toEqual(0);
   });

   test('one create', () => {
      const { createRenderable } = useRenderables();
      createRenderable('xslice');
      act(() => render(<ObjectManager />, container));

      const list = document.querySelector('.itemDisplay');
      expect(list.children.length).toEqual(1);

      expect(screen.getByText('0 - xslice')).toBeInTheDocument();
   });

   test('multiple create', () => {
      const { createRenderable } = useRenderables();
      createRenderable('xslice');
      createRenderable('sphere');
      act(() => render(<ObjectManager />, container));

      const list = document.querySelector('.itemDisplay');
      expect(list.children.length).toEqual(2);

      expect(screen.getByText('0 - xslice')).toBeInTheDocument();
      expect(screen.getByText('1 - sphere')).toBeInTheDocument();
   });
});

describe('individual parts', () => {
   test('delete', async () => {
      const { renderables, createRenderable } = useRenderables();
      createRenderable('xslice');
      createRenderable('sphere');
      act(() => render(<ObjectManager />, container));

      const list = document.querySelector('.itemDisplay');
      expect(list.children.length).toEqual(2);
      expect(renderables.length).toEqual(2);
      expect(renderables[0].type).toEqual('xslice');
      expect(renderables[1].type).toEqual('sphere');

      // grab first close button in document
      const closeButton = document.querySelector('.closeButton');
      await userEvent.click(closeButton);

      expect(renderables.length).toEqual(1);
      expect(renderables[0].type).toEqual('sphere');
   });

   test('toggle visibility', async () => {
      const { renderables, createRenderable } = useRenderables();
      createRenderable('xslice');
      act(() => render(<ObjectManager />, container));

      // default
      expect(renderables[0].isVisible).toEqual([true, true]);

      // turn off first
      const buttons = document.querySelectorAll('.toggleButton');
      await userEvent.click(buttons[0]);
      expect(renderables[0].isVisible).toEqual([false, true]);

      // attempt turn off second
      await userEvent.click(buttons[1]);
      expect(renderables[0].isVisible).toEqual([false, true]);

      // enable compare mode and turn off second
      const { toggleCompare } = useCamera();
      toggleCompare();
      await userEvent.click(buttons[1]);
      expect(renderables[0].isVisible).toEqual([false, false]);

      // turn one back on
      await userEvent.click(buttons[0]);
      expect(renderables[0].isVisible).toEqual([true, false]);
   });

   test('change slidebar', () => {
      const { renderables, createRenderable } = useRenderables();
      createRenderable('xslice');
      act(() => render(<ObjectManager />, container));

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: 75 } });

      const [rendSlider] = renderables[0].sliderList;
      expect(rendSlider.value).toEqual(75);
      expect(rendSlider.trueValue).toEqual(0.75);
   });

   test('change slide display', async () => {
      const { renderables, createRenderable } = useRenderables();
      createRenderable('xslice');
      act(() => render(<ObjectManager />, container));

      const valDisplay = document.querySelector('.varSliderValue');
      await userEvent.dblClick(valDisplay);
      await userEvent.keyboard('0.25{enter}');

      const [rendSlider] = renderables[0].sliderList;
      expect(rendSlider.value).toEqual(25);
      expect(rendSlider.trueValue).toEqual(0.25);
   });

   test('change display variable', async () => {
      const { renderables, createRenderable } = useRenderables();
      createRenderable('xslice');
      act(() => render(<ObjectManager />, container));

      // density on init
      expect(renderables[0].activeVar).toEqual('density');
      expect(renderables[0].activeVarIndex).toEqual(0);

      const variable = screen.getByRole('combobox');
      await userEvent.selectOptions(variable, ['pressure']);

      expect(renderables[0].activeVar).toEqual('pressure');
      expect(renderables[0].activeVarIndex).toEqual(1);
   });
});
