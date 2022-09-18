export const isAuthenticated = (request) => {
  if (!request.user) throw new Error("먼저 로그인이 필요합니다.");
  return;
};
