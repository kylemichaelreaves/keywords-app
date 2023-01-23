import * as React from 'react';
import { Chip } from '@material-ui/core';

export interface ChipListProps {
    keywords: string[];
}

const ChipList: React.FC<ChipListProps> = ({ keywords }) => {
    return (
        <div>
            {keywords.map((item) => (
                <Chip key={item} label={item} />
            ))}
        </div>
    );
};

export default ChipList;