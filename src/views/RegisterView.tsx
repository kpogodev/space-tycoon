import RegisterForm from '@/components/RegisterForm'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const RegisterView = () => {
    return (
        <div className='w-full min-h-screen grid place-items-center px-3'>
            <Card className='w-full max-w-lg'>
                <CardHeader>
                    <CardTitle>Sing Up</CardTitle>
                    <CardDescription>Create your SpaceTycoon account</CardDescription>
                </CardHeader>
                <CardContent>
                  <RegisterForm />
                </CardContent>
                <CardFooter>
                    <p className='text-muted-foreground'>Already have an account? <Link className='font-bold text-primary hover:text-primary/90 transition-colors' to='/login'>Sign In</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RegisterView
