import type { RootState } from '@/app/store';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getSelectedAgent, selectAccountAgentsIsLoading } from '@/features/accountAgentsSlice';
import { agentAvatarImporter } from '@/utils/agentAvatarImporter';
import { cn } from '@/utils/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AgentListCardMenu from '@/components/AgentListCardMenu';

type AgentListCardProps = RootState['account']['agents']['list'][0]

const AgentListCard = ({ agent }: { agent: AgentListCardProps }) => {
    const dispatch = useAppDispatch()
    const agentsAreLoading = useAppSelector(selectAccountAgentsIsLoading)
    const avatar = agentAvatarImporter(agent.avatar)

    const handlePlay = () => {
        dispatch(getSelectedAgent(agent.id))
    }
    return (
        <Card className={cn('flex flex-col', agentsAreLoading && 'animate-pulse')}>
            <CardHeader className='relative'>
                <CardTitle className='text-center'>Symbol: {agent.symbol}</CardTitle>
                <CardDescription className='w-full text-center'>Faction: {agent.faction}</CardDescription>
                <AgentListCardMenu agentId={agent.id} />
            </CardHeader>
            <CardContent className='grow grid place-items-center'>
                <img className='w-1/3 mx-auto' src={avatar} alt='avatar' />
            </CardContent>
            <CardFooter className='mt-auto'>
              <Button variant='outline' className='mx-auto w-1/2' onClick={handlePlay}>Play</Button>
            </CardFooter>
        </Card>
    )
}

export default AgentListCard
