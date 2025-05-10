import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import ReactMarkdown from 'react-markdown';
import 'react-resizable/css/styles.css';

interface ResizableCardProps {
    content: string;
}

const ResizableCard: React.FC<ResizableCardProps> = ({ content }) => {
    return (
        <ResizableBox width={600} height={400} minConstraints={[300, 200]} maxConstraints={[1000, 800]} resizeHandles={['se']}>
            <Paper elevation={3} sx={{ padding: 2, overflow: 'auto', height: '100%' }}>
                <Typography variant="h4" gutterBottom color="primary">
                    NO
                </Typography>
                <ReactMarkdown>{content}</ReactMarkdown>
            </Paper>
        </ResizableBox>
    );
};

export default ResizableCard;
