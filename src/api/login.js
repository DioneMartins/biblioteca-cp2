export function saveUser(uUID, uName, keep) {
  const ttl = keep ? 336 : 2;
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + ttl);

  const item = {
    userUID: uUID,
    userName: uName,
    keepLogin: keep,
  };

  localStorage.setItem('curLogin', JSON.stringify(item));
  localStorage.setItem('loginExpiry', expiryDate.getTime());
}

export function deleteUser() {
  if (localStorage.getItem('curLogin')) localStorage.removeItem('curLogin');
  if (localStorage.getItem('loginExpiry')) localStorage.removeItem('loginExpiry');
}

export function checkIfUserExists() {
  if (localStorage.getItem('curLogin')) return true;
  else return false;
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
    localStorage.setItem('loginExpiry', newExpiryDate.getTime());
  } else deleteUser();
}

export function getUserAttribute(desiredAttribute) {
  const user = localStorage.getItem('curLogin');

  if (!localStorage.getItem('curLogin')) {
    return null;
  }

  const now = new Date();
  if (now.getTime() > localStorage.getItem('loginExpiry')) {
    deleteUser();
    return null;
  }

  let returnItem = '';
  const userItem = JSON.parse(user);

  switch (desiredAttribute) {
    default:
      returnItem = null;
      break;
    case 'userUID':
      returnItem = userItem.userUID;
      break;
    case 'userName':
      returnItem = userItem.userName;
      break;
    case 'keepLogin':
      returnItem = userItem.keepLogin;
      break;
  }

  return returnItem;
}

// Code adapted from:
// https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
