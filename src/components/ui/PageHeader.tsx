import React from 'react'
import Typography from '../primitives/Typography';

const PageHeader = ({title, subtitle, className}: {title: string, subtitle: string, className?: string}) => {
  return (
    <div className={`flex flex-col capitalize ${className}`}>
        <Typography weight='semibold'>{title}</Typography>
        <Typography color='primary'>{subtitle}</Typography>
    </div>
  )
}

export default PageHeader;
