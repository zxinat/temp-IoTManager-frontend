export function checkAuth(auth) {
  const userAuth = localStorage.getItem('auth');
  let flag = false;
  auth.forEach(e => {
    if (userAuth.indexOf(e) !== -1) {
      flag = true;
    }
  });
  console.log(flag);
  return flag;
}
