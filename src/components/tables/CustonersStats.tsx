import { PageHeader } from "../ui/PageHeader";
import { BookOpenCheck, Landmark, PipetteIcon, PlusSquareIcon, TableConfig } from "lucide-react";
import { CardWidget } from "../ui/cards";
import { Grid } from "../ui/ui-layout";
import Typography from "../primitives/Typography";

const CustomersStats = () => {
  return (
    <Grid className="gap-6">
        <PageHeader 
            title='Business customers'
            description='Manage and monitor high-volume business accounts across Nigeria.'
            actions={[
            {
                label: 'Add Business Customer',
                variant: 'primary',
                href: '',
                icon: <PlusSquareIcon size={18}/>
            }
            ]}
            />
        <Grid className='grid-cols-2 md:grid-cols-4 gap-4'>
            <CardWidget label='SME Accounts' num='1,284' 
            icon={<TableConfig size={20} className='text-primary'/>} 
            info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+12%</Typography>}/>
            <CardWidget label='Corporate Clients' num='324' 
            icon={<BookOpenCheck size={20} className='text-indigo-800'/>} 
            info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+5%</Typography>}/>
            <CardWidget label='High-Value Pipeline' num='₦ 42.8M' 
            icon={<PipetteIcon size={20} className='text-ink'/>} 
            info={<Typography className='py-1 px-2.5 rounded-md bg-accent font-semibold text-primary'>Target 85%</Typography>}/>
            <CardWidget label='Avg. Loan Size' num='₦ 1.5M' 
            icon={<Landmark size={20} className='text-destructive'/>} 
            info={<Typography className='py-1 px-2.5 rounded-md bg-accent font-semibold'>Weekly Avg.</Typography>}/>
        </Grid>
    </Grid>
  )
}

export default CustomersStats