
interface AgentListCardProps {
    id: number,
    symbol: string,
    faction: string,
}

const AgentListCard = ({agent} : {agent: AgentListCardProps}) => {
  return (
    <li className="w-full h-full">
        <div>{agent.id}</div>
        <div>{agent.symbol}</div>
        <div>{agent.faction}</div>
    </li>
  )
}

export default AgentListCard