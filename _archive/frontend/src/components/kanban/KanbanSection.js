import './KanbanSection.css';


function KanbanSection(props) {
    return (
        <div className='KanbanSection'>
            <div className='KanbanSectionHeader'>
                <h2 className='KanbanSectionHeader-title'>
                    {props.section}
                </h2>
            </div>
            {props.children}
        </div>
    );
}


export default KanbanSection;
