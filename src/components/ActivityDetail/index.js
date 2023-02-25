import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import inCommingPhone from '../../incomming-call.png';
import outGoing from '../../outgoing-call.png';
import arrow from '../../arrow.png';

const ActivityDetail = ({ selectedActivity, handleActivityClick, fetchActivities }) => {
    const [call, setCall] = useState(selectedActivity);
    const [Loading, setLoading] = useState(false)

    const handleArchive = async () => {
        try {
            setLoading(true)
            const response = await axios.patch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${call.id}`, {
                is_archived: !call.is_archived,
            });

            let selectedActivityObj = selectedActivity;
            selectedActivityObj['is_archived'] = !call.is_archived;
            setCall(selectedActivityObj);
            fetchActivities();
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    const handleBack = () => {
        // navigate(-1);
    };

    if (!call) {
        return null;
    }

    const renderArrow = (direction) => {
        return direction === 'inbound' ? (
            <div><img src={inCommingPhone} width="30" height="30" /></div>
        ) : (
            <div><img src={outGoing} width="30" height="30" /></div>
        );
    };


    const toHoursAndMinutes = (totalSeconds) => {
        const totalMinutes = Math.floor(totalSeconds / 60);

        const seconds = totalSeconds % 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { h: hours, m: minutes, s: seconds };
    }

    let time = toHoursAndMinutes(call.duration);

    return (
        <div className="activityDetail">
            <div className="activityDetailHeader">
                <img src={arrow} width="20" height="20" onClick={() => handleActivityClick(null)} />
                <h2 style={{ fontWeight: 'bold', marginLeft: '10px', marginTop: '1px' }}>Call Details</h2>

            </div>
            {Loading && <div className='textCenter'>Updating ...</div>}
            <div className="archiveButton">
                <a onClick={handleArchive}>
                    {call.is_archived ? 'Unarchive' : 'Archive'}
                </a>
            </div>
            <div className="activityDetailInfo">
                <div >
                    {renderArrow(call.direction)}
                </div>
                <div >
                    <div className="phoneNumber">{call.from}</div>
                    <div className="phoneNumber">{call.to}</div>
                </div>

                <div className="">{time.h}:{time.m}:{time.s} sec
                    <div className="">
                        <div className={`callTypeIcon ${call.call_type}`}></div>
                        <div className={call.call_type == 'missed' ? "callTypeTextMissed" : "callTypeTextSucsess"}>{selectedActivity.call_type}</div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ActivityDetail;

