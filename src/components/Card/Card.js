import { FaEllipsisV, FaEye, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../hook/Context';
import './Card.css'

const Card = ({ name,description,num,_id }) => {
    const {makeActiveObj} = useGlobalContext();

    // const customize = (id)=>{
    //     makeActiveObj(id)
    // }

    return (
        <div className='card'>
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p className="card-text">
                    {/* <span className="badge">abc</span> */}
                    {/* <span className="badge badge-primary">{Date.now() - new Date(item.date).getTime()} hours</span> */}
                    <span className="badge">
                        <span><FaEye /></span>
                        <span>{description}</span>
                    </span>
                </p>
            </div>
            <div className="card-footer">
                <div className="btn btn-outline-primary btn-outline" onClick={()=>{
                    makeActiveObj(_id);
                }}>Customize</div>
                {/* <span className="badge">
                    <span><FaThumbsUp/></span>
                    <span>abc</span>
                </span> */}
                <span className="badge">
                    <span>{num+1}</span>
                </span>
            </div>
        </div>
    )
}

export default Card
