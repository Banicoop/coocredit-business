import React from 'react'
import Typography from '../primitives/Typography';

export const ColItem = ({item1, item2, className1, className2}: {item1: string, item2: string, className1?: string, className2?: string}) => {
  return(
    <div className="flex flex-col">
      <Typography className={className1}>{item1}</Typography>
      <Typography className={className2}>{item2}</Typography>
    </div>
  )
}

const PageHeader = ({title, subtitle, className}: {title: string, subtitle: string, className?: string}) => {
  return (
    <div className={`flex flex-col capitalize ${className}`}>
        <Typography weight='semibold'>{title}</Typography>
        <Typography color='primary'>{subtitle}</Typography>
    </div>
  )
}

export default PageHeader;
