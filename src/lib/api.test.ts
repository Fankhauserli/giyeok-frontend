import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiFetch } from './api';

describe('apiFetch', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    it('should return json on success', async () => {
        const mockData = { message: 'success' };
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockData
        } as Response);

        const result = await apiFetch('/test');
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith('/api/test', expect.any(Object));
    });

    it('should throw error on non-ok response', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            json: async () => ({ error: 'Oops' })
        } as Response);

        await expect(apiFetch('/test')).rejects.toThrow('Oops');
    });
});
