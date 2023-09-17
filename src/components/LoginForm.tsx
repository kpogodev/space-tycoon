import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { loginAuth, selectIsAuthenticated, selectIsLoading } from '@/features/auth/authSlice'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

const formSchema = z.object({
    email: z.string().email({
        message: 'Must be a valid email address'
    }),
    password: z.string()
})


const LoginForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const isLoading = useAppSelector(selectIsLoading)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'all'
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        dispatch(loginAuth(data))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
                <FormField name='email' control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} required/>
                        </FormControl>
                    </FormItem>
                )}/>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                <FormField name='password' control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} type='password' required/>
                        </FormControl>
                    </FormItem>
                )}/>
                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                <Button type='submit' className='mt-5 transition-all' disabled={isLoading}>Sign In</Button>
            </form>
        </Form>
    )
}

export default LoginForm
