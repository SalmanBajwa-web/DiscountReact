import React, {  useState } from 'react';
import { useGlobalContext } from '../hook/Context'
import './CreateDiscount.css'
import Spinner from "../Spinner/Spinner";
import Card from "../Card/Card";
import { Link } from 'react-router-dom';
import OfferBox from '../OfferBox/OfferBox';
import AppReviewRegistration from '../AppReviewRegistration/AppReviewRegistration';
import BookLunch from '../BookLunch/BookLunch';
import Bundle from '../Bundle/Bundle';
import FreeShipping from '../FreeShipping/FreeShipping';
import Flat from '../Flat/Flat';
import MenuForSpecial from '../MenuForSpecial/MenuForSpecial';
import SetMenu from '../SetMenu/SetMenu';

const CreateDiscount = () => {
    const { discountList, error, loading,activeObject } = useGlobalContext();
  



    const offerType = {
        App_Review_Registration:<AppReviewRegistration/>,
        Book_Lunch_Dinner:<BookLunch/>,
        Bundle:<Bundle/>,
        Free_Shipping:<FreeShipping/>,
        Flat:<Flat/>,
        Menu_For_Special_Occasons:<MenuForSpecial/>,
        Set_Menu:<SetMenu/>,
    }


    return (
        <div className='createDiscount'>
         <Link to='/' className="btn btn-primary m-5">Go Back</Link>

            {loading && <Spinner />}
            {error && <h1>Error while Loading Data</h1>}

            <div className="cardBox">
                {(!loading && !error) && discountList.map((item,index) => {
                    if(item.draft){
                        return (
                            <Card {...item} num={index} key={`Discount-${index}`} />
                        );
                    }else{
                        return '';
                    }
                })}
            </div>

            {offerType[activeObject.offerType]}
           

        </div>
    )
}

export default CreateDiscount
