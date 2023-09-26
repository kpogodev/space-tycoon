import type { RootState } from '@/app/store'
import { useAppDispatch } from '@/app/hooks'
import { deleteAgent } from '@/features/accountAgentsSlice'
import { DotsVerticalIcon, GearIcon, TrashIcon, ListBulletIcon } from '@radix-ui/react-icons'
import AgentAvatarPicker from '@/components/AgentAvatarPicker'
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

type AgentIdType = RootState['account']['agents']['list'][0]['id']

const AgentListCardMenu = ({ agentId }: { agentId: AgentIdType }) => {
    const dispatch = useAppDispatch()

    const handleDeleteAgent = () => {
        if (!agentId) return
        dispatch(deleteAgent(agentId))
    }

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='absolute top-2 right-2 h-7 w-7 rounded-full p-1 !m-0'>
                        <DotsVerticalIcon className='w-4 h-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                    <DropdownMenuLabel>Manage</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className='cursor-pointer'>
                                <span>Avatar</span>
                                <DropdownMenuShortcut>
                                    <GearIcon />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem className='cursor-pointer'>
                            <span>Details</span>
                            <DropdownMenuShortcut>
                                <ListBulletIcon />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer' onClick={handleDeleteAgent}>
                        <span>Delete</span>
                        <DropdownMenuShortcut>
                            <TrashIcon />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Avatar</DialogTitle>
                    <DialogDescription>Choose your avatar</DialogDescription>
                </DialogHeader>
                <AgentAvatarPicker agentId={agentId} />
            </DialogContent>
        </Dialog>
    )
}

export default AgentListCardMenu
