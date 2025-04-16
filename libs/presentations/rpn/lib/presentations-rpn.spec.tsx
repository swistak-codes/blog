import { render } from '@testing-library/react';

import PresentationsRpn from './presentations-rpn';

describe('PresentationsRpn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PresentationsRpn />);
    expect(baseElement).toBeTruthy();
  });
});
