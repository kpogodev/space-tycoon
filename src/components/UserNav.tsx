import { useMemo, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { selectAuth, logoutAuth } from '@/features/authSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

const UserNav = () => {
    const dispatch = useAppDispatch()
    const { email, nick } = useAppSelector(selectAuth)
    
    const generateAvatarFallback = useMemo(() => {
        const nickArr = nick.split(' ')
        let fallback = ''
        if (nickArr.length > 1) {
            fallback = nickArr[0].charAt(0) + nickArr[1].charAt(0)
        } else {
            fallback = nickArr[0].charAt(0)
        }
        return fallback
    }, [nick])
    
    const handleLogut = useCallback(() => {
        dispatch(logoutAuth())
    }, [dispatch])

    // Keyboard shortcuts hooks
    useKeyboardShortcut('q', handleLogut, true, true, false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src='/avatars/01.png' alt='avatar' />
                        <AvatarFallback className='uppercase'>{generateAvatarFallback}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>{nick}</p>
                        <p className='text-xs leading-none text-muted-foreground'>{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogut}>
                    Log out
                    <DropdownMenuShortcut>Ctrl + Alt + Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav
