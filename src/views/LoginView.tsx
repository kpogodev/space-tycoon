import LoginForm from '@/components/LoginForm'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const LoginView = () => {
    return (
        <div className='w-full min-h-screen grid place-items-center px-3'>
            <Card className='w-full max-w-lg'>
                <CardHeader>
                    <CardTitle>Sing In</CardTitle>
                    <CardDescription>Sign in to your SpaceTycoon account</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm />
                </CardContent>
                <CardFooter>
                    <p className='text-muted-foreground'>Don't have an account? <Link className='font-bold text-primary hover:text-primary/90 transition-colors' to='/register'>Sign Up</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginView
