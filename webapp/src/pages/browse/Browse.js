import Layout from '../../components/layout/Layout';
import BrowseHeader from './BrowseHeader';
import BrowseContent from './BrowseContent';

import './Browse.css';


function Browse (props) {
    return (
        <Layout>
            <div className='Browse'>
                <BrowseHeader />
                <BrowseContent />
            </div>
        </Layout>
    );
}


export default Browse;
