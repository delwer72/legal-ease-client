"use client";
import { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, confirmPayment } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { getStripe } from "@/lib/stripe";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaCreditCard, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0f172a",
      fontFamily: "'Inter', sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#94a3b8" },
      iconColor: "#3b82f6",
    },
    invalid: { color: "#ef4444", iconColor: "#ef4444" },
  },
};

function CheckoutForm({ hiring, onSuccess, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleCardChange = (e) => setCardError(e.error ? e.error.message : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    try {
      const { clientSecret } = await createPaymentIntent(token, hiring._id);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      if (error) throw new Error(error.message);

      await confirmPayment(token, {
        hiringId: hiring._id,
        transactionId: paymentIntent.id,
        amount: hiring.fee,
        lawyerEmail: hiring.lawyerEmail,
      });

      setSucceeded(true);
      toast.success("Payment successful!");
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      toast.error(err.message);
      setCardError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (succeeded) return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
      >
        <FaCheckCircle className="text-green-500 text-5xl" />
      </motion.div>
      <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Payment Successful!</h3>
      <p className="text-gray-400">Your payment has been processed securely.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Amount Summary */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#16213e] to-[#1e3a5f] rounded-3xl p-7 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Total Amount</p>
        <p className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          ${hiring.fee}
        </p>
        <p className="text-gray-400 text-sm mt-2">to {hiring.lawyerName}</p>
      </div>

      {/* Test Card Notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-sm text-blue-700">
        <p className="font-semibold mb-1.5">🧪 Test Card Details</p>
        <p>Card: <span className="font-mono">4242 4242 4242 4242</span></p>
        <p className="mt-0.5">Expiry: any future date &nbsp;•&nbsp; CVC: any 3 digits</p>
      </div>

      {/* Card Input */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2.5">
          <FaCreditCard className="text-blue-500" /> Card Information
        </label>
        <div
          className={`border-2 rounded-2xl px-5 py-5 transition ${
            cardError ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-blue-400 focus-within:shadow-md"
          }`}
        >
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
        </div>
        {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
      </div>

      {/* Accepted Cards */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-gray-400">We accept:</p>
        <SiVisa className="text-blue-700 text-3xl" />
        <SiMastercard className="text-red-500 text-3xl" />
        <span className="text-sm text-gray-400">& more</span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 order-2 sm:order-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-2xl font-bold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
        >
          {processing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FaLock className="text-xs" />
              Pay ${hiring.fee} Securely
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={processing}
          className="flex-1 order-1 sm:order-2 border-2 border-gray-200 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition disabled:opacity-60"
        >
          Cancel
        </button>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
        <FaShieldAlt className="text-xs" />
        Secured by Stripe • 256-bit SSL encryption
      </div>
    </form>
  );
}

export default function PaymentModal({ hiring, onClose, onSuccess }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] px-8 py-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/30">
                <FaCreditCard className="text-[#0f172a] text-lg" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Complete Payment</h2>
                <p className="text-gray-400 text-sm">Consultation fee payment</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition text-xl font-bold leading-none"
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-8 py-7">
            <Elements stripe={getStripe()}>
              <CheckoutForm hiring={hiring} onSuccess={onSuccess} onClose={onClose} />
            </Elements>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}