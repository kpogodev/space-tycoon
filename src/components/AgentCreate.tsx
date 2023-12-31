import AgentCreateForm from './AgentCreateForm'

const AgentCreate = () => {
    return (
        <div className='w-full h-full border rounded-md p-6 flex flex-col gap-5'>
            <h2 className='scroll-m-20 text-xl font-semibold tracking-tight'>Create New Agent</h2>
            <AgentCreateForm />
        </div>
    )
}

export default AgentCreate
