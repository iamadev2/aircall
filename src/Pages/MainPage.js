import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityFeed from "../components/ActivityFeed";
import ActivityDetail from "../components/ActivityDetail";
import Archived from "../components/Archived";
import arrow from '../arrow.png';

const BASE_URL = "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app";

function MainPage() {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [archivedActivities, setArchivedActivities] = useState(null);
    const [openArchive, setOpenArchive] = useState(false);
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        fetchActivities();
    }, []);

    ///fetch Activities for showing main screen calls
    const fetchActivities = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/activities`);
            setActivities(response.data || []);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    };

    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
    };


    return (
        <div>
            {Loading && !selectedActivity && <div style={{ textAlign: 'center', marginTop: '5px' }}>Loading</div>}
            {(!Loading || selectedActivity) &&
                <div>
                    {!selectedActivity &&
                        <div className="activityArchiveHeader header-transition-show">
                            {openArchive && <img src={arrow} width="20" height="20" onClick={() => setOpenArchive(false)} />}
                            <h1 className="mainArchive" onClick={() => setOpenArchive(true)}>Archived Calls</h1>
                        </div>
                    }

                    <div className={openArchive && !selectedActivity ? 'header-transition-show' : 'header-transition-hide'}>
                        {openArchive && !selectedActivity && <Archived
                            archivedActivities={archivedActivities}
                            activities={activities}
                            handleActivityClick={handleActivityClick}

                        />}
                    </div>

                    <div className={!openArchive && !selectedActivity ? 'header-transition-show' : 'header-transition-hide'}>
                        {!openArchive && !selectedActivity && < ActivityFeed
                            activities={activities}
                            selectedActivity={selectedActivity}
                            handleActivityClick={handleActivityClick}

                        />}
                    </div>

                    <div className={selectedActivity ? 'header-transition-show' : 'header-transition-hide'}>
                        {selectedActivity && <ActivityDetail
                            selectedActivity={selectedActivity}
                            handleActivityClick={handleActivityClick}
                            fetchActivities={fetchActivities}
                        />}
                    </div>
                </div>
            }
        </div>
    );
}

export default MainPage;
