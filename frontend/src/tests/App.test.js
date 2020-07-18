import { describe, expect, it } from '@jest/globals'
import api from '../api'

test('Fake test', () => {
    expect(true).toBeTruthy()
})

describe('My Test Suite', () => {
    it('My Test Case', () => {
      expect(true).toEqual(true);
    });
});

const fetchRoadmaps = async () => {
    const res = await api.get('api/roadmaps');

    return res.data.results;
}

it('Test api', () => {
    expect.assertions(1)
    // either return promise or call the implicit done() method after an async call
    return fetchRoadmaps().then(res => {
        expect(res).toEqual([]);
    })
})

// it('Test mock', () => {
//     const mockFetch = jest.fn()
//         .mockReturnValue(Promise.resolve({
//             json: () => Promise.resolve({
//                 results: []
//             })
//         }));
    
//     return 
// })