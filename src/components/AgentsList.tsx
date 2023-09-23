import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getAgents } from "@/features/accountAgentsSlice"
import AgentCreate from "./AgentCreate"
import AgentListCard from "./AgentListCard"

const AgentsList = () => {
  const dispatch = useAppDispatch()
  const agents = useAppSelector((state) => state.account.agents.agents)

  useEffect(() => {
    dispatch(getAgents())
  }, [dispatch])
  return (
    <ul className='w-full max-w-7xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5 md:gap-10'>
        <AgentCreate />
        {agents.map((agent) => (
          <AgentListCard key={agent.id} agent={agent} />
        ))}
    </ul>
  )
}

export default AgentsList