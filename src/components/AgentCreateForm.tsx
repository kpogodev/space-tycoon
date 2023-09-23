import { useAppDispatch, useAppSelector } from '@/app/hooks'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReloadIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { cn } from '@/utils/utils'
import { createAgent, selectAccountAgentsIsLoading } from '@/features/accountAgentsSlice'

const FACTION_VALUES = [
    'COSMIC',
    'VOID',
    'GALACTIC',
    'QUANTUM',
    'DOMINION',
    'ASTRO',
    'CORSAIRS',
    'OBSIDIAN',
    'AEGIS',
    'UNITED',
    'SOLITARY',
    'COBALT',
    'OMEGA',
    'ECHO',
    'LORDS',
    'CULT',
    'ANCIENTS',
    'SHADOW',
    'ETHEREAL',
] as const

const FACTIONS = FACTION_VALUES.map((faction) => ({
    label: faction,
    value: faction,
}))

const formSchema = z.object({
    symbol: z
        .string()
        .min(3, {
            message: 'Nick must be at least 3 characters long',
        })
        .max(14, {
            message: 'Nick must be at most 14 characters long',
        }),
    faction: z.enum(FACTION_VALUES),
})

const AgentCreateForm = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectAccountAgentsIsLoading)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            faction: 'COSMIC',
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
       dispatch(createAgent(data))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
                <FormField
                    name='symbol'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agent Symbol</FormLabel>
                            <FormControl>
                                <Input {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormMessage>{form.formState.errors.symbol?.message}</FormMessage>
                <FormField
                    name='faction'
                    control={form.control}
                    render={() => (
                        <FormItem>
                            <FormField
                                control={form.control}
                                name='faction'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Faction</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant='outline'
                                                        role='combobox'
                                                        className={cn(
                                                            'w-full justify-between',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value
                                                            ? FACTIONS.find((faction) => faction.value === field.value)
                                                                  ?.label
                                                            : 'Select faction'}
                                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-[200px] p-0'>
                                                <Command>
                                                    <CommandInput placeholder='Search for faction...' className='h-9' />
                                                    <CommandEmpty>No faction found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {FACTIONS.map((faction) => (
                                                            <CommandItem
                                                                value={faction.label}
                                                                key={faction.value}
                                                                onSelect={() => {
                                                                    form.setValue('faction', faction.value)
                                                                }}
                                                                className='text-xs'
                                                            >
                                                                {faction.label}
                                                                <CheckIcon
                                                                    className={cn(
                                                                        'ml-auto h-4 w-4',
                                                                        faction.value === field.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                        </FormItem>
                    )}
                />
                <FormMessage>{form.formState.errors.faction?.message}</FormMessage>
                <Button type='submit' className='mt-5 transition-all'>
                    {isLoading && <ReloadIcon className='animate-spin mr-2 h-4 w-4' />}
                    Create Agent
                </Button>
            </form>
        </Form>
    )
}

export default AgentCreateForm
