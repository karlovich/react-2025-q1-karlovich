import { http, HttpResponse } from 'msw';
import { mockedCharacterId1, mockResponseForLuke } from './data';

export const handlers = [
  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(mockedCharacterId1);
  }),
  http.get('https://swapi.dev/api/people/', ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search');
    if (searchTerm === 'Luke') {
      return HttpResponse.json(mockResponseForLuke);
    } else {
      return HttpResponse.json({
        count: 0,
        results: [],
        next: null,
        previous: null,
      });
    }
  }),
];
