import { useState } from 'react';
import { useUser, useAuth } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';
import { useUserContext } from '../context/UserContext';
import { Zap, Check } from 'lucide-react';

const PLANS = [
  { id: 'starter', name: 'Starter', credits: 20, price: 49 },
  { id: 'pro', name: 'Pro', credits: 60, price: 129 },
  { id: 'business', name: 'Business', credits: 150, price: 299 },
];

const BuyCredits = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { refreshCredits } = useUserContext();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleBuy = async (plan) => {
    try {
      setLoadingPlan(plan.id);
      const token = await getToken();

      const { data } = await axiosInstance.post(
        '/api/payment/create-order',
        { plan: plan.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'CodeGuard AI',
        description: `${plan.credits} Credits - ${plan.name} Plan`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyToken = await getToken();
            await axiosInstance.post(
              '/api/payment/verify',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${verifyToken}` } }
            );
            await refreshCredits();
            navigate('/dashboard');
          } catch (err) {
            alert('Payment verification failed. Contact support if amount was deducted.');
          }
        },
        prefill: {
          name: user?.fullName || '',
          email: user?.primaryEmailAddress?.emailAddress || '',
        },
        theme: { color: '#2563eb' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Could not start payment. Try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', fontFamily: 'Syne, sans-serif' }}>
        Buy Credits
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: '2.5rem' }}>Top up to keep analyzing your code.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {PLANS.map((plan) => (
          <div key={plan.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '2rem' }}>
            <Zap size={20} style={{ color: '#60a5fa', marginBottom: '1rem' }} />
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.25rem' }}>{plan.name}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <Check size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
              {plan.credits} analysis credits
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>₹{plan.price}</p>
            <button
              onClick={() => handleBuy(plan)}
              disabled={loadingPlan === plan.id}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: '#2563eb', color: 'white', fontWeight: 600, cursor: 'pointer' }}
            >
              {loadingPlan === plan.id ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredits;