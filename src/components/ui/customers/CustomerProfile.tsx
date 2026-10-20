import { formatCurrency, initials, isValidImageUrl } from "@/helpers/funcs";
import { FlexBox, FlexCol } from "../ui-layout";
import Image from "next/image";
import { Stat } from "@/components/primitive-ui/card-ui";
import Typography from "@/components/primitives/Typography";


const CustomerProfile = ({customer}: {customer: any}) => {

    if(!customer) return null;

    const ledgerItems = [
        { label: 'Booked balance', value: customer.bookedBalance },
        { label: 'Available balance', value: customer.availableBalance },
        { label: 'Credit lien', value: customer.creditLienBalance },
        { label: 'Debit lien', value: customer.debitLienBalance },
    ];

    return(
        <FlexBox className="mt-5 flex flex-col sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                    {isValidImageUrl(customer.profileImage) ? (
                    <Image
                        src={customer.profileImage}
                        alt={`${customer.firstName} ${customer.lastName}`}
                        fill
                        className="object-cover"
                    />
                    ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                        {initials(customer.firstName, customer.lastName)}
                    </div>
                    )}
                </div>
                <FlexCol>
                    <h1 className="text-xl font-semibold tracking-tight text-[#0B1220]">
                        {customer.firstName} {customer.lastName}
                    </h1>
                    <Typography variant="small">{customer.username}</Typography>
                </FlexCol>
            </div>
                 <div className="mt-8 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-4">
                    {ledgerItems.map((item) => (
                    <Stat key={item.label} label={item.label} value={formatCurrency(item.value)} />
                    ))}
                </div>
        </FlexBox>
    )
}


export default CustomerProfile;
