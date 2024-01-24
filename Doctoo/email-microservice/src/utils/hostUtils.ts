export function currentHost(service: 'frontend' | 'backend'): string {
  if (process.env.NODE_ENV === 'production') {
    return process.env.BACKEND_HOST as string;
  }

  const hostPortMap: Record<string, string> = {
    frontend: 'http://localhost:3000',
    backend: 'http://localhost:8000',
  };

  return hostPortMap[service];
}

export function currentFrontendHost(): string {
  return currentHost('frontend');
}

export function currentBackendHost(): string {
  return currentHost('backend');
}
