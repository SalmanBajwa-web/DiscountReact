import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../hook/Context';
import OfferBox from '../OfferBox/OfferBox';
import './Bundle.css'
import { FaPlus } from 'react-icons/fa';

const offerBoxArray = ["Bundle plus free product", "Fixed Bundle"];

const Bundle = () => {
    const { activeObject, setActiveObject } = useGlobalContext();

    const [offerTypeChoice, setOfferTypeChoice] = useState(offerBoxArray[0]);
    const [showForm, setShowForm] = useState(false);
    const [showOfferBox, setShowOfferBox] = useState(true);

    return (
        <div className='appReviewRegistration'>
            <h1>AppReviewRegistration</h1>
            {showOfferBox && (
                <OfferBox array={offerBoxArray} activeObject={activeObject} setActiveObject={setActiveObject} offerTypeChoice={offerTypeChoice} setOfferTypeChoice={setOfferTypeChoice} setShowForm={setShowForm} setShowOfferBox={setShowOfferBox} />
            )}

            {showForm && (
                <>
                    {(offerTypeChoice === offerBoxArray[0]) && <Form1 />}
                    {(offerTypeChoice === offerBoxArray[1]) && <Form2 />}
                </>
            )}

        </div>
    )
}

export default Bundle







const Form1 = () => {
    const { fakeData, activeObject } = useGlobalContext();

    const [firstProduct, setFirstProduct] = useState({ product: null, count: 0 });
    const [secondProduct, setSecondProduct] = useState({ product: null, count: 0 });
    const [firstActive, setFirstActive] = useState(true);
    const [freeProduct, setFreeProduct] = useState('Desert');

    const [name, setName] = useState('');
    const [perPerson, setPerPerson] = useState(1);
    const [avaiableFor, setAvaiableFor] = useState({ delivery: false, Reservation: false });
    const [detail, setDetail] = useState('');
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const [days, setDays] = useState({ all: false, sunday: false, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false })
    const [code, setCode] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [newList, setNewList] = useState({});
    let draft = false;

    const createDiscount = () => {
        const newObjct = JSON.parse(JSON.stringify(activeObject));
        newObjct.bundle = [
            { product: firstProduct.product, quantity: firstProduct.count },
            { product: secondProduct.product, quantity: secondProduct.count },
        ]
        newObjct.freeProduct = [freeProduct];
        newObjct.name = name;
        newObjct.code = code;
        newObjct.repeat = perPerson;
        newObjct.available = avaiableFor;
        newObjct.description = detail;
        newObjct.startDate = startDate;
        newObjct.endDate = endDate;
        newObjct.days = days;
        newObjct.draft = draft;
        console.log("newObjct :", newObjct)
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        delete newObjct._id;
        const raw = JSON.stringify(newObjct);
        fetch(`http://localhost:4000/discounts`, { method: 'POST', body: raw, headers: myHeaders })
            .then(item => item.json())
            .then(item => {
                if (item.status === 'fail') throw new Error(item.message);
                setLoading(false);
                setNewList(item);
                console.log("Created Object,", item)
                window.location = '/';
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            })

    }

    const createDraft = () => {
        draft = true;
        createDiscount();
    }

    return (
        <div className='form1'>
            <div className="innerForm">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <h5 className='badge badge-primary'>Products</h5>
                            <div className="cardBox">
                                {fakeData.map((item, index) => {
                                    return (
                                        <div className="card" key={`fakeStore-${index}`}>
                                            <img src={item.img} alt="" className="card-img-top" />
                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                <p className="card-title m-0">{item.name}</p>
                                                <button className="btn btn-primary btn-sm " onClick={() => {
                                                    if (firstActive) {
                                                        setFirstProduct({ product: item, count: 1 });
                                                    } else {
                                                        setSecondProduct({ product: item, count: 1 });
                                                    }
                                                }}><FaPlus color='#fff' /></button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-4">
                            {firstActive ? (
                                <>
                                    <div className="firstProductBox active " onClick={() => setFirstActive(true)}>

                                        {!firstProduct.product && (
                                            <FaPlus />
                                        )}

                                        <p className='d-block'>{firstProduct.product?.name}</p>

                                        {firstProduct.product && (
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                <li className="page-item"><a className="page-link" href="#!">{firstProduct.count}</a></li>

                                                <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                            </ul>
                                        )}


                                    </div>
                                    <h5 className='badge badge-primary'>First Products</h5>
                                    <div className="secondProductBox" onClick={() => setFirstActive(false)}>
                                        {!secondProduct.product && (
                                            <FaPlus />
                                        )}

                                        <p className='d-block'>{secondProduct.product?.name}</p>

                                        {secondProduct.product && (
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                <li className="page-item"><a className="page-link" href="#!">{secondProduct.count}</a></li>

                                                <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                            </ul>
                                        )}
                                    </div>
                                    <h5 className='badge badge-primary'>Second Products</h5>

                                </>

                            ) : (
                                <>
                                    <>
                                        <div className="firstProductBox  " onClick={() => setFirstActive(true)}>

                                            {!firstProduct.product && (
                                                <FaPlus />
                                            )}

                                            <p className='d-block'>{firstProduct.product?.name}</p>

                                            {firstProduct.product && (
                                                <ul className="pagination pagination-sm">
                                                    <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                    <li className="page-item"><a className="page-link" href="#!">{firstProduct.count}</a></li>

                                                    <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                                </ul>
                                            )}


                                        </div>
                                        <h5 className='badge badge-primary'>First Products</h5>
                                        <div className="secondProductBox active" onClick={() => setFirstActive(false)}>
                                            {!secondProduct.product && (
                                                <FaPlus />
                                            )}

                                            <p className='d-block'>{secondProduct.product?.name}</p>

                                            {secondProduct.product && (
                                                <ul className="pagination pagination-sm">
                                                    <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                    <li className="page-item"><a className="page-link" href="#!">{secondProduct.count}</a></li>

                                                    <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                                </ul>
                                            )}
                                        </div>
                                        <h5 className='badge badge-primary'>Second Products</h5>

                                    </>

                                </>
                            )}
                            <select name="" id="" className='d-block' onChange={(ev) => setFreeProduct(ev.target.value)}>
                                <option value="Desert">Desert</option>
                                <option value="Princess Monoke">Princess Monoke</option>
                                <option value="Space Odesy">Space Odesy</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container">

                    <div className="form-group mt-2">
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">Per Person</label>
                        <input type="text" value={perPerson} onChange={(ev) => setPerPerson(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">Discription</label>
                        <input type="text" value={detail} onChange={(ev) => setDetail(ev.target.value)} className="input-field ml-3" />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="">Code</label>
                        <input type="text" value={code} onChange={(ev) => setCode(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <h5>Avaiable for</h5>

                        <label htmlFor="">
                            Delivery
                            <input type="checkbox" value={avaiableFor.delivery} onChange={(ev) => setAvaiableFor(prev => ({ ...prev, delivery: ev.target.value }))}
                                className="input-field ml-3" />
                        </label>
                        <label htmlFor="" className='ml-3'>
                            Reservation
                            <input type="checkbox" value={avaiableFor.Reservation} onChange={(ev) => setAvaiableFor(prev => ({ ...prev, Reservation: ev.target.value }))}
                                className="input-field ml-3" />
                        </label>

                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">Start Date</label>
                        <input type="date" value={startDate} onChange={(ev) => setStartDate(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">End Date</label>
                        <input type="date" value={endDate} onChange={(ev) => setEndDate(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <h5>Days</h5>

                        <label htmlFor="">
                            all
                            <input type="checkbox" value={days.all} onChange={(ev) => setDays(prev => ({ ...prev, all: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            sunday
                            <input type="checkbox" value={avaiableFor.sunday} onChange={(ev) => setDays(prev => ({ ...prev, sunday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            monday
                            <input type="checkbox" value={avaiableFor.monday} onChange={(ev) => setDays(prev => ({ ...prev, monday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            tuesday
                            <input type="checkbox" value={avaiableFor.tuesday} onChange={(ev) => setDays(prev => ({ ...prev, tuesday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            wednesday
                            <input type="checkbox" value={avaiableFor.wednesday} onChange={(ev) => setDays(prev => ({ ...prev, wednesday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            thursday
                            <input type="checkbox" value={avaiableFor.thursday} onChange={(ev) => setDays(prev => ({ ...prev, thursday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            friday
                            <input type="checkbox" value={avaiableFor.friday} onChange={(ev) => setDays(prev => ({ ...prev, friday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            saturday
                            <input type="checkbox" value={avaiableFor.saturday} onChange={(ev) => setDays(prev => ({ ...prev, saturday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>


                    </div>

                    <div className="form-group mt-5">
                        <button className="btn btn-outline-primary btn-p" onClick={createDraft}>Save Draft</button>
                        <button className="btn  btn-primary btn-p ml-5 " onClick={createDiscount}>Create</button>
                    </div>

                    {newList.data && <div className='alert alert-primary'>Created</div>}
                    {(loading) && <div className='alert alert-success'>Loading...</div>}
                    {(error) && <div className='alert alert-danger'>Error</div>}

                </div>
            </div>
        </div>
    )
}




const Form2 = () => {
    const { fakeData, activeObject } = useGlobalContext();

    const [firstProduct, setFirstProduct] = useState({ product: null, count: 0 });
    const [secondProduct, setSecondProduct] = useState({ product: null, count: 0 });
    const [firstActive, setFirstActive] = useState(true);
    const [freeProduct, setFreeProduct] = useState('Desert');

    const [name, setName] = useState('');
    const [perPerson, setPerPerson] = useState(1);
    const [avaiableFor, setAvaiableFor] = useState({ delivery: false, Reservation: false });
    const [detail, setDetail] = useState('');
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const [days, setDays] = useState({ all: false, sunday: false, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false })
    const [threshold, setThreshold] = useState(0);
    const [code, setCode] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [newList, setNewList] = useState({});
    let draft = false;

    const createDiscount = () => {
        const newObjct = JSON.parse(JSON.stringify(activeObject));
        newObjct.bundle = [
            { product: firstProduct.product, quantity: firstProduct.count },
            { product: secondProduct.product, quantity: secondProduct.count },
        ]
        newObjct.threshold = threshold;
        newObjct.name = name;
        newObjct.code = code;
        newObjct.repeat = perPerson;
        newObjct.available = avaiableFor;
        newObjct.description = detail;
        newObjct.startDate = startDate;
        newObjct.endDate = endDate;
        newObjct.days = days;
        newObjct.draft = draft;
        console.log("newObjct :", newObjct)
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        delete newObjct._id;
        const raw = JSON.stringify(newObjct);
        fetch(`http://localhost:4000/discounts`, { method: 'POST', body: raw, headers: myHeaders })
            .then(item => item.json())
            .then(item => {
                if (item.status === 'fail') throw new Error(item.message);
                setLoading(false);
                setNewList(item);
                console.log("Created Object,", item);
                window.location = '/';
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            })

    }

    const createDraft = () => {
        draft = true;
        createDiscount();
    }

    return (
        <div className='form1'>
            <div className="innerForm">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <h5 className='badge badge-primary'>Products</h5>
                            <div className="cardBox">
                                {fakeData.map((item, index) => {
                                    return (
                                        <div className="card" key={`fakeStore-${index}`}>
                                            <img src={item.img} alt="" className="card-img-top" />
                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                <p className="card-title m-0">{item.name}</p>
                                                <button className="btn btn-primary btn-sm " onClick={() => {
                                                    if (firstActive) {
                                                        setFirstProduct({ product: item, count: 1 });
                                                    } else {
                                                        setSecondProduct({ product: item, count: 1 });
                                                    }
                                                }}><FaPlus color='#fff' /></button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-4">
                            {firstActive ? (
                                <>
                                    <div className="firstProductBox active " onClick={() => setFirstActive(true)}>

                                        {!firstProduct.product && (
                                            <FaPlus />
                                        )}

                                        <p className='d-block'>{firstProduct.product?.name}</p>

                                        {firstProduct.product && (
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                <li className="page-item"><a className="page-link" href="#!">{firstProduct.count}</a></li>

                                                <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                            </ul>
                                        )}


                                    </div>
                                    <h5 className='badge badge-primary'>First Products</h5>
                                    <div className="secondProductBox" onClick={() => setFirstActive(false)}>
                                        {!secondProduct.product && (
                                            <FaPlus />
                                        )}

                                        <p className='d-block'>{secondProduct.product?.name}</p>

                                        {secondProduct.product && (
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                <li className="page-item"><a className="page-link" href="#!">{secondProduct.count}</a></li>

                                                <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                            </ul>
                                        )}
                                    </div>
                                    <h5 className='badge badge-primary'>Second Products</h5>

                                </>

                            ) : (
                                <>
                                    <>
                                        <div className="firstProductBox  " onClick={() => setFirstActive(true)}>

                                            {!firstProduct.product && (
                                                <FaPlus />
                                            )}

                                            <p className='d-block'>{firstProduct.product?.name}</p>

                                            {firstProduct.product && (
                                                <ul className="pagination pagination-sm">
                                                    <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                    <li className="page-item"><a className="page-link" href="#!">{firstProduct.count}</a></li>

                                                    <li className="page-item" onClick={() => setFirstProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                                </ul>
                                            )}


                                        </div>
                                        <h5 className='badge badge-primary'>First Products</h5>
                                        <div className="secondProductBox active" onClick={() => setFirstActive(false)}>
                                            {!secondProduct.product && (
                                                <FaPlus />
                                            )}

                                            <p className='d-block'>{secondProduct.product?.name}</p>

                                            {secondProduct.product && (
                                                <ul className="pagination pagination-sm">
                                                    <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count-- }))}><a className="page-link" href="#!">-</a></li>

                                                    <li className="page-item"><a className="page-link" href="#!">{secondProduct.count}</a></li>

                                                    <li className="page-item" onClick={() => setSecondProduct(prev => ({ ...prev, count: prev.count++ }))}><a className="page-link" href="#!">+</a></li>

                                                </ul>
                                            )}
                                        </div>
                                        <h5 className='badge badge-primary'>Second Products</h5>

                                    </>

                                </>
                            )}
                           
                        </div>
                    </div>
                </div>

                <div className="container">

                    <div className="form-group mt-2">
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">Per Person</label>
                        <input type="text" value={perPerson} onChange={(ev) => setPerPerson(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">Discription</label>
                        <input type="text" value={detail} onChange={(ev) => setDetail(ev.target.value)} className="input-field ml-3" />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="">Thershold</label>
                        <input type="text" value={threshold} onChange={(ev) => setThreshold(ev.target.value)} className="input-field ml-3" />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="">Code</label>
                        <input type="text" value={code} onChange={(ev) => setCode(ev.target.value)} className="input-field ml-3" />
                    </div>
                    <div className="form-group mt-2">
                        <h5>Avaiable for</h5>

                        <label htmlFor="">
                            Delivery
                            <input type="checkbox" value={avaiableFor.delivery} onChange={(ev) => setAvaiableFor(prev => ({ ...prev, delivery: ev.target.value }))}
                                className="input-field ml-3" />
                        </label>
                        <label htmlFor="" className='ml-3'>
                            Reservation
                            <input type="checkbox" value={avaiableFor.Reservation} onChange={(ev) => setAvaiableFor(prev => ({ ...prev, Reservation: ev.target.value }))}
                                className="input-field ml-3" />
                        </label>

                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">Start Date</label>
                        <input type="date" value={startDate} onChange={(ev) => setStartDate(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">End Date</label>
                        <input type="date" value={endDate} onChange={(ev) => setEndDate(ev.target.value)} className="input-field ml-3" />
                    </div>

                    <div className="form-group mt-2">
                        <h5>Days</h5>

                        <label htmlFor="">
                            all
                            <input type="checkbox" value={days.all} onChange={(ev) => setDays(prev => ({ ...prev, all: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            sunday
                            <input type="checkbox" value={avaiableFor.sunday} onChange={(ev) => setDays(prev => ({ ...prev, sunday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            monday
                            <input type="checkbox" value={avaiableFor.monday} onChange={(ev) => setDays(prev => ({ ...prev, monday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            tuesday
                            <input type="checkbox" value={avaiableFor.tuesday} onChange={(ev) => setDays(prev => ({ ...prev, tuesday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            wednesday
                            <input type="checkbox" value={avaiableFor.wednesday} onChange={(ev) => setDays(prev => ({ ...prev, wednesday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            thursday
                            <input type="checkbox" value={avaiableFor.thursday} onChange={(ev) => setDays(prev => ({ ...prev, thursday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            friday
                            <input type="checkbox" value={avaiableFor.friday} onChange={(ev) => setDays(prev => ({ ...prev, friday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>

                        <label htmlFor="" className='ml-3'>
                            saturday
                            <input type="checkbox" value={avaiableFor.saturday} onChange={(ev) => setDays(prev => ({ ...prev, saturday: ev.target.checked ? true : false }))}
                                className="input-field ml-3" />
                        </label>


                    </div>

                    <div className="form-group mt-5">
                        <button className="btn btn-outline-primary btn-p" onClick={createDraft}>Save Draft</button>
                        <button className="btn  btn-primary btn-p ml-5 " onClick={createDiscount}>Create</button>
                    </div>

                    {newList.data && <div className='alert alert-primary'>Created</div>}
                    {(loading) && <div className='alert alert-success'>Loading...</div>}
                    {(error) && <div className='alert alert-danger'>Error</div>}

                </div>
            </div>
        </div>
    )
}

