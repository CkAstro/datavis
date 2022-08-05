jest.mock('contexts');
import { render, screen, userEvent, act, container } from 'test';
import { useRenderables } from 'contexts';
import IsosurfaceButtons from '../isosurfacebuttons';

beforeEach(() => {
   const { setAllRenderables } = useRenderables();
   setAllRenderables([]);
});

describe('IsosurfaceButtons (integration)', () => {
   test('hover tooltip', async () => {
      act(() => render(<IsosurfaceButtons/>, container));
      const button = document.querySelector('.buttonContainer');

      await userEvent.hover(button);
      expect(screen.getByText('Isosurface')).toBeInTheDocument();
   });

   test('hover buttons', async () => {
      act(() => render(<IsosurfaceButtons/>, container));
      const button = document.querySelector('.buttonContainer');

      await userEvent.hover(button);
      expect(screen.getByText('Isosurface')).toBeInTheDocument();

      const [ base, rayBtn, triBtn ] = document.querySelectorAll('.buttonContainer');

      expect(base).toBeInTheDocument();
      expect(rayBtn).toBeInTheDocument();
      expect(triBtn).toBeInTheDocument();
   });

   test('create slice (ray marching)', async () => {
      act(() => render(<IsosurfaceButtons/>, container));
      const button = document.querySelector('.buttonContainer');

      await userEvent.hover(button);
      expect(screen.getByText('Isosurface')).toBeInTheDocument();

      const { renderables } = useRenderables();
      const rayBtn = screen.getByText('Ray');

      await userEvent.click(rayBtn);
      expect(renderables.length).toEqual(1);
      expect(renderables[0].type).toEqual('surface');
   });

   test('create slice (marching cubes)', async () => {
      act(() => render(<IsosurfaceButtons/>, container));
      const button = document.querySelector('.buttonContainer');

      await userEvent.hover(button);
      expect(screen.getByText('Isosurface')).toBeInTheDocument();

      const { renderables } = useRenderables();
      const triBtn = screen.getByText('Tri');

      await userEvent.click(triBtn);
      expect(renderables.length).toEqual(1);
      expect(renderables[0].type).toEqual('mcube');
   });
});