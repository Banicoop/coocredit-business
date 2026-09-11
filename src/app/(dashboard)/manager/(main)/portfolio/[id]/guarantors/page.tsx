import GuarantorSection from '@/app/(dashboard)/agent/(main)/loans/_sections/GuarantorSection';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Grid } from '@/components/ui/ui-layout';
import { getAdminGurantorInfo } from '@/lib/api';
import { IDParam } from '@/types/types';


const GuarantorSectionProps = async ({ params }: IDParam) => {

    const { id } = await params;
    const res = (await getAdminGurantorInfo(id)) as any

    const guarantors = res?.data

  return (
    <Grid className='gap-6'>
        <BackButton/>

        <GuarantorSection guarantors={guarantors} />
    </Grid>
  )
}

export default GuarantorSectionProps;
