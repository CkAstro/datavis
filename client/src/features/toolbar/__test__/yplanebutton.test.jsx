jest.mock('contexts');
import { render, screen, userEvent, act, container } from 'test';
import { useRenderables } from 'contexts';
import YPlaneButton from '../yplanebutton';

beforeEach(() => {
   const { setAllRenderables } = useRenderables();
   setAllRenderables([]);
});

describe('XPlaneButton', () => {
   test('hover tooltip', async () => {
      act(() => render(<YPlaneButton/>, container));
      const button = document.querySelector('.buttonContainer');

      await userEvent.hover(button);
      expect(screen.getByText('Y-Slice')).toBeInTheDocument();
   });

   test('create slice', async () => {
      act(() => render(<YPlaneButton/>, container));
      const { renderables } = useRenderables();
      const button = document.querySelector('.buttonContainer');

      expect(button).toBeInTheDocument();
      expect(renderables.length).toEqual(0);

      await userEvent.click(button);
      expect(renderables.length).toEqual(1);
      expect(renderables[0].type).toEqual('yslice');
   });
});