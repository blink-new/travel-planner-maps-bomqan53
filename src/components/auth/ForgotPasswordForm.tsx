import { useState } from 'react'
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate password reset process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsEmailSent(true)
      toast.success('Reset email sent!', {
        description: 'Check your inbox for password reset instructions'
      })
      
      console.log('Password reset requested for:', email)
      
    } catch (error) {
      toast.error('Failed to send reset email', {
        description: 'Please try again later'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Email resent!', {
        description: 'Check your inbox again'
      })
    } catch (error) {
      toast.error('Failed to resend email')
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Check your email</h3>
            <p className="text-muted-foreground">
              We've sent a password reset link to
            </p>
            <p className="font-medium text-primary">{email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or
          </p>
          
          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={isLoading}
            className="w-full glass-effect border-primary/20 hover:border-primary/40"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Resending...</span>
              </div>
            ) : (
              'Resend email'
            )}
          </Button>
        </div>

        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to sign in
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Reset your password</h3>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 glass-effect border-primary/20 focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full gradient-primary hover:opacity-90 transition-opacity group"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sending reset link...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Send reset link</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>
      </form>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onSwitchToLogin}
          className="text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to sign in
        </Button>
      </div>
    </div>
  )
}