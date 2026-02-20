import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // 시스템 TLS 인증서 사용 (Google Fonts 등 외부 리소스 연결 문제 해결)
    turbopackUseSystemTlsCerts: true,
  },
}

export default nextConfig
