import { Menu } from '@arco-design/web-react';
import { IconBug, IconBulb, IconHome } from '@arco-design/web-react/icon';

const MenuItem = Menu.Item;

export default () => (
  <>
    <Menu
      style={{ width: '100%' }}
    >
      <MenuItem key='0_0'>
        <a href={'/'}>
          <IconHome />Homepage
        </a>
      </MenuItem>
      <MenuItem key='0_1'>
        <a href={'/detail'}>
          <IconBug />Stats
        </a>
      </MenuItem>
      <MenuItem key='0_3'>
        <IconBulb />Info
      </MenuItem>
    </Menu>
  </>
);