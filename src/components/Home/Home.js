import { useGlobalContext } from '../hook/Context'
import './Home.css'
import { Link } from 'react-router-dom';


const Home = () => {
    const { discountList, error, loading, activeObject,deleteDiscount } = useGlobalContext();
    return (
        <div className='home'>
            <div className="btnBox">
                <Link to='/createOffer' className="btn btn-primary">Create Discount Offer</Link>
            </div>
        <h1>Discount Offers</h1>
            <div className="cardBox">
                {(!loading && !error) && discountList.map((item, index) => {
                    if ((!item.draft) && item.offerType === "App_Review_Registration") {

                        // bundle plus free product
                        if (item.bundle[0].product.name) {
                            return (

                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <img src={item.bundle[0].product.img} alt="" />
                                        <span>+</span>
                                        <img src={item.bundle[1].product.img} alt="" />
                                        <span>=</span>
                                        <span>{item.freeProduct}</span>
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                   
                                </div>
                            );
                        } else if (item.threshold && item.fixedPrice) {
                            return (
                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <span>-{item.threshold}$</span>
                                        <span className='mx-3'>=</span>
                                        <span>Spend {item.fixedPrice}$</span>
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else if (item.threshold) {
                            return (

                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <span>-{item.threshold}$</span>
                                        <span className='mx-3'>=</span>
                                        <span>{item.freeProduct}</span>
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else {
                            return ('');
                        }

                    } else if ((!item.draft) && item.offerType === "Book_Lunch_Dinner") {
                        // bundle plus free product
                        if (item.bundle[0].product.name && item.threshold) {
                            return (

                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <span>-{item.threshold}$</span>
                                        <span>=</span>

                                        <img src={item.bundle[0].product.img} alt="" />
                                        <span>+</span>
                                        <img src={item.bundle[1].product.img} alt="" />
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else if (item.bundle[0].product.name) {
                            return (

                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <img src={item.bundle[0].product.img} alt="" />
                                        <span>+</span>
                                        <img src={item.bundle[1].product.img} alt="" />
                                        <span>=</span>
                                        <span>{item.freeProduct}</span>
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else if (item.threshold && item.fixedPrice) {
                            return (
                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <span>-{item.threshold}$</span>
                                        <span className='mx-3'>=</span>
                                        <span>Spend {item.fixedPrice}$</span>
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else if (item.threshold) {
                            return (

                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <span>-{item.threshold}$</span>
                                        <span className='mx-3'>=</span>
                                        <span>{item.freeProduct}</span>
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else {
                            return ('');
                        }
                    } else if ((!item.draft) && item.offerType === "Bundle") {

                        // bundle plus free product
                        if (item.bundle[0].product.name && item.threshold) {
                            return (

                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <span>-{item.threshold}$</span>
                                        <span>=</span>

                                        <img src={item.bundle[0].product.img} alt="" />
                                        <span>+</span>
                                        <img src={item.bundle[1].product.img} alt="" />
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else if (item.bundle[0].product.name) {
                            return (

                                <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                    <h5>{item.name}</h5>
                                    <div className="imgBox">
                                        <img src={item.bundle[0].product.img} alt="" />
                                        <span>+</span>
                                        <img src={item.bundle[1].product.img} alt="" />
                                        <span>=</span>
                                        <span>{item.freeProduct}</span>
                                    </div>
                                    <div className="dateBox mt-3 badge badge-secondary">
                                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                        <span className='mx-2'>----</span>
                                        <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                    </div>
                                    <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                                </div>
                            );
                        } else {
                            return ('');
                        }

                    } else if ((!item.draft) && item.offerType === "Free_Shipping") {

                        return (
                            // bundle plus free product
                            <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                <h5>{item.name}</h5>
                                <div className="imgBox">
                                    <span>Spent</span>
                                    <span className='mx-2'>=</span>
                                    <span>{item.spentMoney}$</span>
                                </div>
                                <div className="dateBox mt-3 badge badge-secondary">
                                    <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                    <span className='mx-2'>----</span>
                                    <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                </div>
                                <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                            </div>
                        );

                    } else if ((!item.draft) && item.offerType === "Flat") {

                        return (
                            // bundle plus free product
                            <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                <h5>{item.name}</h5>
                                <div className="imgBox">
                                    <span>Spent {item.fixedPrice}$</span>
                                    <span className='mx-2'>=</span>
                                    <span>-{item.threshold}$</span>
                                </div>
                                <div className="dateBox mt-3 badge badge-secondary">
                                    <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                    <span className='mx-2'>----</span>
                                    <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                </div>
                                <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                            </div>
                        );
                    } else if ((!item.draft) && item.offerType === "Menu_For_Special_Occasons") {

                        return (
                            // bundle plus free product
                            <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                <h5>{item.name}</h5>
                                <div className="imgBox">
                                    <img src={item.bundle[0].product.img} alt="" />
                                    <span className='mx-1'>=</span>
                                    <span>{`$` + item.fixedPrice + `-`}</span>
                                    <span> Only in {item.occasion}</span>
                                </div>

                                <div className="dateBox mt-3 badge badge-secondary">
                                    <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                    <span className='mx-2'>----</span>
                                    <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                </div>
                                <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                            </div>
                        );
                    } else if ((!item.draft) && item.offerType === "Set_Menu") {

                        return (
                            // bundle plus free product
                            <div className="card card-body" key={`DiscountNoDraft-${index}`}>
                                <h5>{item.name}</h5>
                                <div className="imgBox">
                                    <img src={item.bundle[0].product.img} alt="" />
                                    <span className='mx-1'>=</span>
                                    <span>{`$` + item.fixedPrice + `-`}</span>
                                    <span>{item.occasion}</span>
                                </div>

                                <div className="dateBox mt-3 badge badge-secondary">
                                    <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                    <span className='mx-2'>----</span>
                                    <span>{new Date(item.endDate).toLocaleDateString()}</span>

                                </div>
                                <div className=" p-0 mt-1 d-flex justify-content-between align-items-center">
                                        <div className="badge badge-primary">{item.offerType.replace(/_/gim, ' ')}</div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteDiscount(item._id)}>Delete</button>

                                    </div>
                            </div>
                        );
                    }
                    else {
                        return ('');
                    }
                })}
                {loading && <div className="spinner-border"></div>}
                
                {error && <h3>Eror occour Refresh page</h3>}
            </div>
        </div>
    )
}

export default Home
