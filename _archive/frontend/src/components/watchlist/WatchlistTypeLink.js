import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './WatchlistTypeLink.css';


function WatchlistTypeLink(props) {
    const [className, setClassName] = useState('');
    const location = useLocation();

    useEffect(() => {
        let clsname = 'WatchlistTypeLink';

        if (location.pathname === props.path) {
            clsname = `${clsname} ${clsname}--active`;
        }

        setClassName(clsname);
    }, [location.pathname, props.path]);

    return (
        <Link className={className} to={props.path}>{props.title}</Link>
    );
}


export default WatchlistTypeLink;
