jest.mock('contexts');
import { render, screen, userEvent, act, container } from 'test';
import { useRenderables } from 'contexts';
import ItemCreator from '../itemcreator';

beforeEach(() => {
   const { setAllRenderables } = useRenderables();
   setAllRenderables([]);
});

describe('ItemCreator', () => {
   test('ensure renderable created', () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      expect(renderables.length).toEqual(1);
      expect(renderables[0].type).toEqual('sphere');
   });

   test('create surface', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelectorAll('.buttonContainer');
      const baseBtn = buttons[0];
      const rayBtn = buttons[1];
      const triBtn = buttons[2];

      // click base button (nothing created)
      await userEvent.click(baseBtn);
      expect(renderables.length).toEqual(1);

      await userEvent.click(rayBtn);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('surface');

      await userEvent.click(triBtn);
      expect(renderables.length).toEqual(3);
      expect(renderables[2].type).toEqual('mcube');
   });

   test('create sphere', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelectorAll('.buttonContainer');
      const sphere = buttons[3];

      await userEvent.click(sphere);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('sphere');
   });

   test('create zslice', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelectorAll('.buttonContainer');
      const zslice = buttons[4];

      await userEvent.click(zslice);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('zslice');
   });

   test('create yslice', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelectorAll('.buttonContainer');
      const yslice = buttons[5];

      await userEvent.click(yslice);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('yslice');
   });

   test('create xslice', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelectorAll('.buttonContainer');
      const xslice = buttons[6];

      await userEvent.click(xslice);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('xslice');
   });
});