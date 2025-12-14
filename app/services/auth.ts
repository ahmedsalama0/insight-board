export type LoginResponse = {
  token: string;
};

export async function login(email: string, password: string) {
  return new Promise<LoginResponse>((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error('Email and password are required'));
      }
      if (email === 'test@test.com' && password === '123456') {
        resolve({ token: 'fake-jwt-token-123' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}
