import { DropDown } from '@/components/elements';
import ViewAxisX from './ViewAxisX';
import ViewAxisY from './ViewAxisY';
import ViewAxisZ from './ViewAxisZ';

// clicking buttons will snap to appropriate axis}
export const ViewController = (): JSX.Element => (
   <div>
      <DropDown baseItem={<ViewAxisX />} header="Snap to X-Axis" />
      <DropDown baseItem={<ViewAxisY />} header="Snap to Y-Axis" />
      <DropDown baseItem={<ViewAxisZ />} header="Snap to Z-Axis" />
   </div>
);
