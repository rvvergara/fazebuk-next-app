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

  describe('put request', () => {
    mockAxios.put.mockImplementationOnce((somePath, data) => Promise.resolve({
      message: 'Put request sent',
      data,
    }));

    it('sends updated data to backend API', async () => {
      const data = { last_name: 'Wilson' };
      const result = await sendRequest('put', path, data);

      expect(result.data.last_name).toEqual('Wilson');
      expect(mockAxios.put).toHaveBeenLastCalledWith(`${baseUrl}/${path}`, data);
    });
  });

  describe('delete request', () => {
    mockAxios.delete.mockImplementationOnce(() => Promise.resolve({ message: 'Delete request sent' }));

    it('sends delete request to server', async () => {
      const request = await sendRequest('delete', path);

      expect(request.message).toEqual('Delete request sent');
      expect(mockAxios.delete).toHaveBeenLastCalledWith(`${baseUrl}/${path}`, undefined);
    });
  });
});
