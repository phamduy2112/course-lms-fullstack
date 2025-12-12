// AuthRoute.tsx
import React from 'react'
import { Outlet } from '@tanstack/react-router'

const AuthRoute = () => {
  return (
    <div className="auth-layout">
      {/* Có thể thêm background, wrapper, CSS */}
      <Outlet /> {/* TanStack Router sẽ render các child route ở đây */}
    </div>
  )
}

export default AuthRoute
