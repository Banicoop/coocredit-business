import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, Grid, GridItem } from '@/components/ui/ui-layout';
import { UserRound } from 'lucide-react';
import React from 'react'

const ProfileHero = () => {
  return (
    <Grid className="col-span-3 p-8 bg-primary2 rounded-xl text-white">
        <Flex className="justify-between items-center">
            <Flex className="gap-5 items-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <UserRound size={40} />
            </div>

            <Grid className="gap-1">
                <Typography color='light' className="text-[28px] font-bold">
                Alex Sovereign Chukwu
                </Typography>

                <Typography className="text-white/80">
                Senior Super Agent
                </Typography>

                <Typography className="text-white/70">
                Lagos Central • Member since 2024
                </Typography>
            </Grid>
            </Flex>

            <Typography color='light' className="bg-[#29d729] px-4 py-2 rounded-lg font-semibold">
            Active Account
            </Typography>
        </Flex>

        <Grid className="grid-cols-3 gap-6 mt-8">
            <ColItem
            item1="TOTAL BALANCE"
            item2="₦4,900,000"
            className1="text-white/70"
            className2="text-white text-[24px] font-bold"
            />

            <ColItem
            item1="TRANSACTIONS"
            item2="1,247"
            className1="text-white/70"
            className2="text-white text-[24px] font-bold"
            />

            <ColItem
            item1="CARDS LINKED"
            item2="4"
            className1="text-white/70"
            className2="text-white text-[24px] font-bold"
            />
        </Grid>
        </Grid>
  )
}

export default ProfileHero;
