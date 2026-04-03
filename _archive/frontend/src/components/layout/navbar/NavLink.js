import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"

import './NavLink.css';

function NavLink(props) {
    const [className, setClassName] = useState('');
    const location = useLocation();

    useEffect(() => {
        let clsname = 'NavLink';

        if (location.pathname.includes(props.path)) {
            clsname = `${clsname} ${clsname}--active`;
        }

        setClassName(clsname);
    }, [location.pathname, props.path]);

    return (
        <Link className={className} to={props.path}>{props.title}</Link>
    );
}


export default NavLink;
