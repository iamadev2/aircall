import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallCard from '../CallCard';
import './style.css';

const Archived = ({ handleActivityClick, activities }) => {
    const [archivedCalls, setArchivedCalls] = useState(activities && activities.filter(item => item.is_archived == true));
    const [Loading, setLoading] = useState(false)

    return (
        <div className='archive '>
            {Loading && <div style={{ textAlign: 'center', marginTop: '5px' }}>Loading</div>}
            {!Loading && archivedCalls.length === 0 && (
                <p>No archived calls at the moment.</p>
            )}
            {archivedCalls.map((call) => (
                <CallCard
                    key={call.id}
                    call={call}
                    archiveText='Unarchive'
                    onClick={handleActivityClick}
                />
            ))}
        </div>
    );
};

export default Archived;

