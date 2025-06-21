export const useAuth = () => {
  const nickname = localStorage.getItem("nickname");
  const userId = localStorage.getItem("userId");

  const isLoggedIn = !!nickname && !!userId;

  return { isLoggedIn, nickname, userId };
};
