// Importamos las funciones globales de Vitest para mayor claridad y tipado
import { describe, it, expect, vi, type Mock } from 'vitest';

import axios from 'axios';
import { getEstadoCuencaDuero } from './integration';

// Usamos vi.mock() para simular axios
vi.mock('axios');

// Nuestro HTML falso para el test
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
    // Configuramos el mock de axios para que devuelva nuestro HTML falso
    (axios.get as Mock).mockResolvedValueOnce({ data: fakeHtml });
    
    // Actuamos: llamamos a la función que queremos probar
    const result = await getEstadoCuencaDuero();

    // Afirmamos: comprobamos que el resultado es el esperado
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { name: 'Embalse A', capacity: '100', currentVolume: '50' },
      { name: 'Embalse B', capacity: '200', currentVolume: '100' },
    ]);
  });
});