import { render, screen, userEvent, act, container } from 'test';
import { useRenderables } from 'contexts';
import ZPlaneButton from '../zplanebutton';

jest.mock('contexts');

beforeEach(() => {
   const { setAllRenderables } = useRenderables();
   setAllRenderables([]);
});

describe('XPlaneButton', () => {
   test('hover tooltip', async () => {
      act(() => render(<ZPlaneButton />, container));
      const button = document.querySelector('.buttonContainer');

      await userEvent.hover(button);
      expect(screen.getByText('Z-Slice')).toBeInTheDocument();
   });

   test('create slice', async () => {
      act(() => render(<ZPlaneButton />, container));
      const { renderables } = useRenderables();
      const button = document.querySelector('.buttonContainer');

      expect(button).toBeInTheDocument();
      expect(renderables.length).toEqual(0);

      await userEvent.click(button);
      expect(renderables.length).toEqual(1);
      expect(renderables[0].type).toEqual('zslice');
   });
});
