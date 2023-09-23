import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from './ui/button'
import { useAppDispatch } from '@/app/hooks'
import { getSelectedAgent } from '@/features/accountAgentsSlice'
import avatar from '@/assets/avatars/avatar-ship-3.svg'
interface AgentListCardProps {
    id: number
    symbol: string
    faction: string
}

const AgentListCard = ({ agent }: { agent: AgentListCardProps }) => {
    const dispatch = useAppDispatch()

    const handlePlay = () => {
        dispatch(getSelectedAgent(agent.id))
    }
    return (
        <Card className='flex flex-col'>
            <CardHeader>
                <CardTitle className='text-center'>Agent: {agent.symbol}</CardTitle>
                <CardDescription className='w-full text-center'>Faction: {agent.faction}</CardDescription>
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
