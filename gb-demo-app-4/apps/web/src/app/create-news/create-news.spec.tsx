import { render } from '@testing-library/react';

import CreateNews from './create-news';

describe('CreateNews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateNews />);
    expect(baseElement).toBeTruthy();
  });
});
