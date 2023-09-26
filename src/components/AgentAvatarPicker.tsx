import { useState } from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { patchAgent, selectAgentFromListById } from '@/features/accountAgentsSlice';
import { agentAvatarList } from '@/utils/agentAvatarImporter';
import { cn } from '@/utils/utils';

import { Button } from './ui/button';


type AgentIdType = RootState['account']['agents']['list'][0]['id']
type AgentAvatarType = RootState['account']['agents']['list'][0]['avatar']

// Array from avatar list
const avatarArray = Object.entries(agentAvatarList).map(([key, value]) => ({
    key: key as AgentAvatarType,
    value: value,
}))

const AgentAvatarPicker = ({ agentId }: { agentId: AgentIdType }) => {
    const [newAvatar, setNewAvatar] = useState<AgentAvatarType | null>()
    const dispatch = useAppDispatch()
    const agentInfo = useAppSelector(selectAgentFromListById(agentId))

    const handleAvatarButtonClick = (avatarKey: AgentAvatarType) => {
        if (agentInfo?.avatar === avatarKey) return
        setNewAvatar(avatarKey)
    }

    const handleSaveNewAvatar = () => {
        if (!newAvatar) return
        dispatch(patchAgent(agentId, { avatar: newAvatar }))
        toast.success('Avatar has been changed')
        setNewAvatar(null)
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-5 gap-4'>
                {avatarArray.map((avatar) => (
                    <Button
                        key={avatar.key}
                        variant='outline'
                        className={cn(
                            'w-full h-auto p-4 aspect-square',
                            agentInfo?.avatar === avatar.key && 'ring-2 ring-primary',
                            newAvatar === avatar.key && 'ring-2 ring-green-500'
                        )}
                        onClick={() => handleAvatarButtonClick(avatar.key)}
                    >
                        <Avatar className='w-full'>
                            <AvatarImage src={avatar.value} alt='' />
                        </Avatar>
                    </Button>
                ))}
            </div>
             <Button onClick={handleSaveNewAvatar} disabled={!newAvatar}>Save</Button>
        </div>
    )
}

export default AgentAvatarPicker
