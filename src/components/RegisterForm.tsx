import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { registerAuth, selectIsAuthenticated, selectIsLoading } from '@/features/auth/authSlice'
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
    nick: z.string().min(3, {
        message: 'Nick must be at least 3 characters long'
    }).max(20, {
        message: 'Nick must be at most 20 characters long'
    }).regex(/^[a-zA-Z0-9]+$/, {
        message: 'Nick must only contain alphanumeric characters'
    }),
    email: z.string().email({
        message: 'Must be a valid email address'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }).max(100, {
        message: 'Password must be at most 100 characters long'
    }),
})


const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const isLoading = useAppSelector(selectIsLoading)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'all'
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        dispatch(registerAuth(data))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
                <FormField name='nick' control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Nick</FormLabel>
                        <FormControl>
                            <Input {...field} required/>
                        </FormControl>
                    </FormItem>
                )}/>
                <FormMessage>{form.formState.errors.nick?.message}</FormMessage>
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
                <Button type='submit' className='mt-5 transition-all' disabled={isLoading}>
                    {isLoading && <ReloadIcon className="animate-spin mr-2 h-4 w-4"/>}
                    Sign Up
                </Button>
            </form>
        </Form>
    )
}

export default RegisterForm
