import axios from 'axios';
export async function loginApi({
                              name,
                              pwd,
                              type,
                             }) {
  return await axios.post('/api/login', {
    data: {
      name,
      pwd,
      type,
    }
  });
}
