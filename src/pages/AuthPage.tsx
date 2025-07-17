import { useState } from 'react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

type AuthMode = 'login' | 'register' | 'forgot-password'

export function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  const getTitle = () => {
    switch (authMode) {
      case 'login':
        return 'Welcome back'
      case 'register':
        return 'Create your account'
      case 'forgot-password':
        return 'Forgot password?'
      default:
        return 'Welcome'
    }
  }

  const getSubtitle = () => {
    switch (authMode) {
      case 'login':
        return 'Sign in to your account to continue your travel planning'
      case 'register':
        return 'Join thousands of travelers planning their perfect trips'
      case 'forgot-password':
        return 'No worries, we\'ll help you reset your password'
      default:
        return ''
    }
  }

  const renderForm = () => {
    switch (authMode) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setAuthMode('register')}
            onSwitchToForgotPassword={() => setAuthMode('forgot-password')}
          />
        )
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )
      default:
        return null
    }
  }

  return (
    <AuthLayout
      title={getTitle()}
      subtitle={getSubtitle()}
    >
      {renderForm()}
    </AuthLayout>
  )
}