import AGENT_AVATAR_1 from '@/assets/avatars/avatar-ship-1.svg'
import AGENT_AVATAR_2 from '@/assets/avatars/avatar-ship-2.svg'
import AGENT_AVATAR_3 from '@/assets/avatars/avatar-ship-3.svg'
import AGENT_AVATAR_4 from '@/assets/avatars/avatar-ship-4.svg'
import AGENT_AVATAR_5 from '@/assets/avatars/avatar-ship-5.svg'
import AGENT_AVATAR_6 from '@/assets/avatars/avatar-ship-6.svg'
import AGENT_AVATAR_7 from '@/assets/avatars/avatar-ship-7.svg'
import AGENT_AVATAR_8 from '@/assets/avatars/avatar-ship-8.svg'
import AGENT_AVATAR_9 from '@/assets/avatars/avatar-ship-9.svg'
import AGENT_AVATAR_10 from '@/assets/avatars/avatar-ship-10.svg'
import AGENT_AVATAR_11 from '@/assets/avatars/avatar-ship-11.svg'
import AGENT_AVATAR_12 from '@/assets/avatars/avatar-ship-12.svg'

export const agentAvatarList = {
    AGENT_AVATAR_1,
    AGENT_AVATAR_2,
    AGENT_AVATAR_3,
    AGENT_AVATAR_4,
    AGENT_AVATAR_5,
    AGENT_AVATAR_6,
    AGENT_AVATAR_7,
    AGENT_AVATAR_8,
    AGENT_AVATAR_9,
    AGENT_AVATAR_10,
    AGENT_AVATAR_11,
    AGENT_AVATAR_12,
} as const

type ReturnTypeOfAvatarImporter = typeof agentAvatarList[keyof typeof agentAvatarList];

export const agentAvatarImporter = (avatarName: keyof typeof agentAvatarList | null ): ReturnTypeOfAvatarImporter => {
    const fallbackAvatar = agentAvatarList.AGENT_AVATAR_1

    if(!avatarName) return fallbackAvatar

    return agentAvatarList[avatarName]
}