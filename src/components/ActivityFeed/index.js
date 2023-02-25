import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CallCard from '../CallCard';
import './style.css'

//activitiy call listing handeling
const ActivityFeed = ({ setActivity, activities, handleActivityClick }) => {
    const [activeCalls, setActiveCalls] = useState(activities && activities.filter(item => item.is_archived == false));

    return (
        <div className="activityFeed">
            <h2>Activity Feed</h2>
            {activeCalls && activeCalls.map(call => (
                <CallCard key={call.id} call={call} setActivity={setActivity} onClick={handleActivityClick} />
            ))}
        </div>
    );
};

export default ActivityFeed;
