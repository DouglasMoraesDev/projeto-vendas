window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-logout').onclick = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  };
});
