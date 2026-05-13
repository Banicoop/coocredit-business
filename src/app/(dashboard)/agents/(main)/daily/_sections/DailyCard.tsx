import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import {
  Camera,
  Eye,
  Fingerprint,
  MapPinMinus,
  Phone,
  ReceiptText,
} from 'lucide-react';
import React from 'react';

type CardType = 'scheduled' | 'pending' | 'followUp';

type DailyCardProps = {
  type: CardType;
  name: string;
  subtitle?: string;
  time?: string;
  badge?: string;
  address?: string;
  description?: string;
  applicationId?: string;
};

const styles: Record<
  CardType,
  {
    border: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  scheduled: {
    border: 'border-l-primary',
    badgeBg: 'bg-[#0053CC1A]',
    badgeText: 'text-primary',
  },
  followUp: {
    border: 'border-l-[#D94801]',
    badgeBg: 'bg-[#F973161A]',
    badgeText: 'text-[#D94801]',
  },
  pending: {
    border: 'border-l-[#5B6472]',
    badgeBg: 'bg-[#E5E7EB]',
    badgeText: 'text-[#5B6472]',
  },
};

const DailyCard = ({
  type,
  name,
  subtitle,
  time,
  badge,
  address,
  description,
  applicationId,
}: DailyCardProps) => {
  const currentStyle = styles[type];

  const renderPendingIcon = () => {
    if (subtitle?.toLowerCase().includes('biometric')) {
      return <Fingerprint size={20} />;
    }

    if (subtitle?.toLowerCase().includes('store')) {
      return <Camera size={20} />;
    }

    return <ReceiptText size={20} />;
  };

  return (
    <FlexCol
      className={`gap-3 bg-card py-5 px-3 rounded-lg border-l-4 ${currentStyle.border}`}
    >
      {/* SCHEDULED VISIT */}
      {type === 'scheduled' && (
        <>
          <div className="w-full flex items-start justify-between gap-3">
            <FlexCol className="gap-1">
              <Typography weight="semibold" className="text-lg">
                {name}
              </Typography>

              <Typography variant="small" color="primary">
                {subtitle}
              </Typography>
            </FlexCol>

            <Typography
              variant="small"
              weight="semibold"
              className={`px-2 py-1 rounded-md text-xs ${currentStyle.badgeBg} ${currentStyle.badgeText}`}
            >
              {time}
            </Typography>
          </div>

          <Typography
            color="primary"
            className="text-sm"
            startIcon={<MapPinMinus size={16} />}
          >
            {address}
          </Typography>

          <Flex className="gap-3 w-full">
            <Button variant="secondary" className="w-full">
              Route
            </Button>

            <Button className="w-full">Start Visit</Button>
          </Flex>
        </>
      )}

      {/* FOLLOW UPS */}
      {type === 'followUp' && (
        <>
          <div className="w-full flex items-start justify-between gap-3">
            <Typography weight="semibold" className="text-lg">
              {name}
            </Typography>

            <Typography
              variant="small"
              weight="semibold"
              className={`text-xs ${currentStyle.badgeText}`}
            >
              {badge}
            </Typography>
          </div>

          <Typography color="primary" className="text-sm leading-6">
            {description}
          </Typography>

          <Button
            variant="secondary"
            className="w-full"
            startIcon={<Phone size={16} />}
          >
            Call Now
          </Button>
        </>
      )}

      {/* KYC PENDING */}
      {type === 'pending' && (
        <>
          <Flex className="items-start gap-3">
            <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              {renderPendingIcon()}
            </div>

            <FlexCol className="gap-1">
              <Typography weight="semibold">
                {subtitle}: {name}
              </Typography>

              <Typography variant="small" color="primary">
                Application #{applicationId}
              </Typography>
            </FlexCol>
          </Flex>

          <Button
            variant="secondary"
            className="w-full"
            startIcon={
              subtitle?.toLowerCase().includes('store') ? (
                <Camera size={16} />
              ) : subtitle?.toLowerCase().includes('utility') ? (
                <Eye size={16} />
              ) : (
                <Fingerprint size={16} />
              )
            }
          >
            {subtitle?.toLowerCase().includes('biometric')
              ? 'Upload Thumbprint'
              : subtitle?.toLowerCase().includes('store')
              ? 'Capture Photos'
              : 'Verify Document'}
          </Button>
        </>
      )}
    </FlexCol>
  );
};

export default DailyCard;
