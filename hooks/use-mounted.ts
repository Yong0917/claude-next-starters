'use client'

import { useState, useEffect } from 'react'

/**
 * 컴포넌트가 마운트되었는지 추적하는 훅
 * 다크모드 토글 등 hydration 불일치 방지에 사용
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
