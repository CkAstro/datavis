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

      const buttons = document.querySelector('.options__itemCreator');
      const surface = buttons.children[0];

      await userEvent.click(surface);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('surface');
   });

   test('create sphere', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelector('.options__itemCreator');
      const sphere = buttons.children[1];

      await userEvent.click(sphere);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('sphere');
   });

   test('create zslice', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelector('.options__itemCreator');
      const zslice = buttons.children[2];

      await userEvent.click(zslice);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('zslice');
   });

   test('create yslice', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelector('.options__itemCreator');
      const yslice = buttons.children[3];

      await userEvent.click(yslice);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('yslice');
   });

   test('create xslice', async () => {
      act(() => render(<ItemCreator/>, container));
      const { renderables } = useRenderables();

      const buttons = document.querySelector('.options__itemCreator');
      const xslice = buttons.children[4];

      await userEvent.click(xslice);
      expect(renderables.length).toEqual(2);
      expect(renderables[1].type).toEqual('xslice');
   });
});