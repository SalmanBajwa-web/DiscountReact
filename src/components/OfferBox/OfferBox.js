import { useGlobalContext } from '../hook/Context'
import './OfferBox.css'

const OfferBox = ({ array, activeObject, setActiveObject, offerTypeChoice, setOfferTypeChoice,setShowForm,setShowOfferBox }) => {


    return (
        <div className='offerBox'>
            <div className="card">
                <div className="list-group">
                    <div className="list-group-item"><h5>Choose Offer when User {activeObject.name}</h5></div>
                    {array && array.map((item, index) => {
                        return (
                            item === offerTypeChoice ?
                                <label htmlFor={item} key={`AppReview-${index}`}>
                                    <div className="list-group-item ">
                                        {item}
                                        <input type="radio" defaultChecked onChange={(ev) => setOfferTypeChoice(ev.target.value)} value={item} name="offerBoxRadio" id={item} />
                                    </div>
                                </label>
                                :
                                <label htmlFor={item} key={`AppReview-${index}`}>
                                    <div className="list-group-item">
                                        {item}
                                        <input type="radio" onChange={(ev) => setOfferTypeChoice(ev.target.value)} value={item} name="offerBoxRadio" id={item} />
                                    </div>
                                </label>
                        );
                    })}
                    <div className="list-group-item offerBoxBtnBox">
                        <button className="btn btn-primary" onClick={()=>{
                            setShowForm(true);
                            setShowOfferBox(false);
                        }}>Create</button>
                        <button className="btn btn-danger" onClick={() => setActiveObject({})} >Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OfferBox
