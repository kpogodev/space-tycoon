import type { RootState } from '@/app/store';
import { useAppDispatch } from '@/app/hooks';
import { getSelectedAgent } from '@/features/accountAgentsSlice';
import { agentAvatarImporter } from '@/utils/agentAvatarImporter';
import AgentListCardMenu from '@/components/AgentListCardMenu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';





type AgentListCardProps = RootState['account']['agents']['list'][0]

const AgentListCard = ({ agent }: { agent: AgentListCardProps }) => {
    const dispatch = useAppDispatch()
    const avatar = agentAvatarImporter(agent.avatar)

    const handlePlay = () => {
        dispatch(getSelectedAgent(agent.id))
    }
    return (
        <Card className='flex flex-col'>
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
