// Import Vitest's global functions for clarity and strong typing
import { describe, it, expect, vi, type Mock } from 'vitest';

import axios from 'axios';
import { getEstadoCuencaDuero } from './integration';

// We use vi.mock() to mock the axios module
vi.mock('axios');

// Our fake HTML data for a controlled testing environment
const fakeHtml = `
  <html>
    <body>
      <table>
        <tbody>
          <tr>
            <td>Embalse A</td>
            <td>100</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>300</td>
            <td>150</td>
          </tr>
          <tr>
            <td>Embalse B</td>
            <td>200</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
`;

describe('getEstadoCuencaDuero', () => {
  it('should return a clean array of reservoirs from valid HTML', async () => {
    // ARRANGE: Set up the test scenario and mock dependencies.
    // We configure the axios.get mock to return our fake HTML.
    (axios.get as Mock).mockResolvedValueOnce({ data: fakeHtml });
    
    // ACT: Execute the function being tested.
    const result = await getEstadoCuencaDuero();

    // ASSERT: Verify that the outcome is as expected.
    // We expect the 'Total' row to have been filtered out.
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { name: 'Embalse A', capacity: '100', currentVolume: '50' },
      { name: 'Embalse B', capacity: '200', currentVolume: '100' },
    ]);
  });
});