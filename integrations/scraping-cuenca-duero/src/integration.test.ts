// integration.test.ts (Versión Final Correcta)
import { describe, it, expect, vi, type Mock } from 'vitest';

import axios from 'axios';
import { getEstadoCuencaDuero } from './integration';

vi.mock('axios');

// HTML de prueba que incluye el caso del guión
const fakeHtml = `
  <html>
    <body>
      <table>
        <tbody>
          <tr>
            <td>Embalse A</td>
            <td>1.000,5</td>
            <td>50,5</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>300</td>
            <td>150</td>
          </tr>
          <tr>
            <td>Embalse B</td>
            <td>200</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
`;

describe('getEstadoCuencaDuero', () => {
  it('should return a clean array of reservoirs with numbers and nulls', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: fakeHtml });

    const result = await getEstadoCuencaDuero();

    // El test ahora espera NÚMEROS y NULL
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { name: 'Embalse A', capacity: 1000.5, currentVolume: 50.5 },
      { name: 'Embalse B', capacity: 200, currentVolume: null },
    ]);
  });
});