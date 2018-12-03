import axios from 'axios';
export async function signupApi({
                                 name,
                                 pwd,
                                 type,
                               }) {
  return await axios.post('/api/signup', {
    data: {
      name,
      pwd,
      type,
    }
  });
}
