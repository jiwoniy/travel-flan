import React from 'react';

// eslint-disable-next-line
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line
import { linkTo } from '@storybook/addon-links';

// eslint-disable-next-line
import { Button, Welcome } from '@storybook/react/demo';
import { Albums } from '../components';

import albumList from '../redux/reducers/__fixtures__/albumList.json';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Albums', module)
  .add('with default', () => <Albums albums={albumList} />);
// .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
