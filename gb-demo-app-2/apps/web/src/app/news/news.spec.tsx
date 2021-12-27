import { render } from '@testing-library/react';

import News from './news';

describe('News', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<News />);
    expect(baseElement).toBeTruthy();
  });
});
