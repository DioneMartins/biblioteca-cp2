export function saveUser(uAuth, uName, keep) {
  const ttl = keep ? 336 : 2;
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + ttl);

  const item = {
    userAuth: uAuth,
    userName: uName,
    keepLogin: keep,
  };

  localStorage.setItem('curLogin', JSON.stringify(item));
  localStorage.setItem('loginExpiry', expiryDate);
}

export function deleteUser() {
  if (localStorage.getItem('curLogin')) localStorage.removeItem('curLogin');
  if (localStorage.getItem('loginExpiry')) localStorage.removeItem('loginExpiry');
}

export function checkUserTime() {
  if (localStorage.getItem('curLogin') && localStorage.getItem('loginExpiry')) {
    const expiry = localStorage.getItem('loginExpiry');
    const now = new Date();
    if (now.getTime() > expiry) deleteUser();
    else expandUserTime();
  } else deleteUser();
}

function expandUserTime() {
  if (localStorage.getItem('curLogin') && localStorage.getItem('loginExpiry')) {
    const newExpiryDate = new Date();
    newExpiryDate.setHours(newExpiryDate.getHours() + 336);
    localStorage.setItem('loginExpiry', newExpiryDate);
  } else deleteUser();
}

export function getUserAttribute(desiredAttribute) {
  const user = localStorage.getItem('curLogin');

  if (!user) {
    return null;
  }

  const returnItem = JSON.parse(user);

  const now = new Date();
  if (now.getTime() > localStorage.getItem('loginExpiry')) {
    deleteUser();
    return null;
  }

  return returnItem.desiredAttribute;
}

// Code adapted from:
// https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
