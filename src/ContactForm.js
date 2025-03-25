import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    if (!contactFormData.name || !contactFormData.email || !contactFormData.message) {
      setSubmitStatus({ type: 'error', message: 'Please complete all fields.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: contactFormData.name,
        reply_to: contactFormData.email,
        message: contactFormData.message
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONTACT,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
      setContactFormData({ name: '', email: '', message: '' }); // Reset form

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500">
      <p className="text-gray-400 mb-6">
        Interested in discussing QA opportunities or collaboration? Feel free to reach out!
      </p>
      <form className="space-y-4" onSubmit={handleContactSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400">Name</label>
            <input
              type="text"
              value={contactFormData.name}
              onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
              className="w-full bg-gray-800/50 border border-gray-800 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400">Email</label>
            <input
              type="email"
              value={contactFormData.email}
              onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
              className="w-full bg-gray-800/50 border border-gray-800 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
              placeholder="Email address"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-400">Message</label>
          <textarea
            value={contactFormData.message}
            onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
            className="w-full h-24 bg-gray-800/50 border border-gray-800 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
            placeholder="Business inquiry or collaboration proposal details"
          />
        </div>
        {submitStatus.message && (
          <div className={`text-sm px-3 py-2 rounded-md ${
            submitStatus.type === 'error' 
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-green-500/10 text-green-400 border border-green-500/20'
          }`}>
            {submitStatus.message}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 bg-blue-500/10 border border-blue-500/20 
            hover:bg-blue-500/20 text-blue-400 text-sm rounded-md 
            transition-all duration-300 relative
            ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;