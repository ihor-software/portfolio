import { TokenResponse } from '@react-oauth/google';

function useGoogleAuthentication() {
  const handleSignIn = async (
    response: TokenResponse,
    onSuccess?: () => void,
    onError?: () => void,
  ) => {
    if (response.access_token) {
      const accessToken = response.access_token;

      const authenticationResponse = await fetch(`/api/v1/google-authentication/sign-in`, {
        method: 'POST',
        body: JSON.stringify({
          token: accessToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return authenticationResponse.status === 201 ? onSuccess?.() : onError?.();
    }
  };

  const handleSignUp = async (
    response: TokenResponse,
    onSuccess?: (...args: any[]) => any,
    onError?: (...args: any[]) => any,
  ) => {
    if (response.access_token) {
      const accessToken = response.access_token;

      const authenticationResponse = await fetch(`/api/v1/google-authentication/sign-up`, {
        method: 'POST',
        body: JSON.stringify({
          token: accessToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return authenticationResponse.status === 201 ? onSuccess?.() : onError?.();
    }
  };

  return {
    handleSignIn,
    handleSignUp,
  };
}

export default useGoogleAuthentication;
