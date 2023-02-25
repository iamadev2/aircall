import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.css';
import inCommingPhone from '../../incomming-call.png';
import outGoing from '../../outgoing-call.png';

const CallCard = ({ call, onClick, isArchived }) => {
  const { direction, from, to, created_at, is_archived } = call;

  const handleClick = () => {
    onClick(call);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format(' MMMM Do YYYY');
  };

  const renderArrow = () => {
    return direction === 'inbound' ? (
      <div><img src={inCommingPhone} width="30" height="30" /></div>
    ) : (
      <div><img src={outGoing} width="30" height="30" /></div>
    );
  };

  const renderCallTypeBadge = () => {
    const callType = call.call_type;
    let badgeClass = 'badge ';

    if (callType === 'missed') {
      badgeClass += 'badge-danger';
    } else if (callType === 'voicemail') {
      badgeClass += 'badge-info';
    } else {
      badgeClass += 'badge-success';
    }

    return <span className={badgeClass}>{callType}</span>;
  };

  const isCallArchived = is_archived || isArchived;

  return (
    <Fragment>
      <div className="callCardInfoText dateFormat">{formatDate(created_at)}</div>
      <div className={`callCard ${isCallArchived ? 'archived' : ''}`} onClick={handleClick}>
        <div className="callCardInfo">
          <div className="callCardDirection">{renderArrow()}</div>
          <div className="callCardDetails">
            <div className="callCardInfoText">{from}</div>
            <div className="callCardInfoText">{to}</div>
          </div>
          <div>
            <div className="callCardInfoText">{moment(created_at).format('h:mm a')}</div>
            <div className="callCardType">{renderCallTypeBadge()}</div>
          </div>
        </div>

      </div></Fragment>
  );
};

CallCard.propTypes = {
  call: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isArchived: PropTypes.bool,
};

export default CallCard;
