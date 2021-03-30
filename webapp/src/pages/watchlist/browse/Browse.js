import ReactModal from 'react-modal';

import BrowseHeader from './BrowseHeader';
import BrowseContent from './BrowseContent';

import './Browse.css';


function BrowseModal (props) {
    return (
        <ReactModal
            isOpen={props.isBrowsing}
            appElement={document.getElementById('root')}
            parentSelector={() => document.getElementById('modal-root')}
        >
            <div className='Browse'>
                <BrowseHeader toggleBrowsing={props.toggleBrowsing} />
                <BrowseContent />
            </div>
        </ReactModal>
    );
}


export default BrowseModal;
