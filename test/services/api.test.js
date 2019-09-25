import mockAxios from '../../__mocks__/axios';
import { sendRequest, setAuthorizationToken } from '../../services/api';

describe('sendRequest async function', () => {
  const baseUrl = 'http://localhost:3000';
  const path = 'v1/users';

  describe('get request', () => {
    it('fetches data from API', async () => {
      const data = {
        message: 'All is well',
      };
      mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));
      const request = await sendRequest('get', path);
      expect(request).toEqual(data);
      expect(mockAxios.get).toHaveBeenLastCalledWith(`${baseUrl}/${path}`, undefined);
    });
  });

  describe('post request', () => {
    mockAxios.post.mockImplementationOnce((somePath, data) => Promise.resolve({
      message: 'Post request sent',
      data,
    }));

    it('sends data to the API', async () => {
      const data = { first_name: 'Charles' };
      const request = await sendRequest('post', path, data);

      expect(request.data.first_name).toEqual('Charles');
      expect(mockAxios.post).toHaveBeenLastCalledWith(`${baseUrl}/${path}`, data);
    });
  });
});
