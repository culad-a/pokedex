import React from 'react';

interface StatCaseProps {
    title: string;
    value: number;
}

const StatCase: React.FC <StatCaseProps> = ({ title, value}) => {
    return (
        <div className='bg-gray-950 rounded-lg shadow-md p-2 w-28'>
            <span className='text-zinc-400 text-sm'>{title}</span>
            <div className='text-2xl font-bold text-zinc-100'>{value}</div>
        </div>
    )
}

export default StatCase