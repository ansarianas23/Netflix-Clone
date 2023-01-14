import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "../components/PlanScreen.css"
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import { loadStripe } from "@stripe/stripe-js"

const PlanScreen = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null);

    useEffect(()=>{
        db.collection('customer')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(async subscription=> {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    },[user.uid,])

    useEffect(()=>{
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then(querySnapshot =>{
            const products ={};
            querySnapshot.forEach(async productDoc =>{
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach(price=>{
                    products[productDoc.id].prices={
                        priceId: price.id,
                        priceData: price.data()

                    }
                })
            });
            setProducts(products)
        });
    },[])


    // Checkout function
    const loadCheckout = async (priceId) =>{
        const docRef = await db.collection('customer')
        .doc(user.uid).collection("checkout session")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap)=>{
            const {error, sessionId} = snap.data();

            if(error){
                // Show an error to your customer and
                // inspect your cloud function logs in the firebase console.
                alert(`An error occured: ${error.message}`)
            }

            if(sessionId){
                // We have a session, let's redirect to Checkout
                // Init Stripe
                const stripe = await loadStripe('pk_test_sfdfasdf66'); // stripe test key here
                stripe.redirectToCheckout({ sessionId });
            };

        })
    }

  return (
    <div className='planScreen'>
        <br/>
        {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString}</p>}
        {Object.entries(products).map(([productId, productData])=>{
            // TODO: add some logic to check if user subscription is active
            const isCurrrentPackage = productData.name
            ?.toLowerCase()
            .includes(subscription?.role);

            return(
                <div key={productId} className={`${isCurrrentPackage && 'planScreen_plan__disabled'} planScreen_ plan`}>
                    <div className='PlanScreen_ info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>
                    <button onClick={()=> !isCurrrentPackage && loadCheckout(productData.prices.priceId)}>
                        {isCurrrentPackage ? 'Current Package': 'Subscribe'}
                    </button>
                </div>
            );
        })}
    </div>
  );
}

export default PlanScreen