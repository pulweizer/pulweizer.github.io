import React, { useState, useEffect, useCallback } from 'react';
import { X, Layout, Gem, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const websiteTypes = [
  { id: 'presentation', label: 'Presentation Website', basePrice: { EUR: 500, RON: 2500 } },
  { id: 'ecommerce', label: 'E-commerce Website', basePrice: { EUR: 1200, RON: 6000 } }
];

const pageCounts = [
  { value: 5, label: '5 pages', multiplier: 1 },
  { value: 10, label: '10 pages', multiplier: 1.8 },
  { value: 15, label: '15 pages', multiplier: 2.5 }
];

const designLevels = [
  { 
    id: 'standard', 
    label: 'Standard', 
    multiplier: 1, 
    description: 'Clean and functional design',
    Icon: Layout
  },
  { 
    id: 'premium', 
    label: 'Premium', 
    multiplier: 1.5, 
    description: 'Custom illustrations and advanced features',
    Icon: Gem
  }
];

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    websiteType: '',
    pageCount: '',
    designLevel: '',
    description: '',
    email: '',
    name: ''
  });
  
  const [currency, setCurrency] = useState('EUR');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const calculateEstimate = useCallback(() => {
    if (!formData.websiteType || !formData.pageCount || !formData.designLevel) {
      setEstimatedPrice(0);
      return;
    }

    const basePrice = websiteTypes.find(t => t.id === formData.websiteType)?.basePrice[currency] || 0;
    const pageMultiplier = pageCounts.find(p => p.value === parseInt(formData.pageCount))?.multiplier || 1;
    const designMultiplier = designLevels.find(d => d.id === formData.designLevel)?.multiplier || 1;

    const estimate = basePrice * pageMultiplier * designMultiplier;
    setEstimatedPrice(Math.round(estimate));
  }, [formData.websiteType, formData.pageCount, formData.designLevel, currency]);

  useEffect(() => {
    calculateEstimate();
  }, [calculateEstimate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    if (!formData.websiteType || !formData.pageCount || !formData.designLevel) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please complete all project details' 
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.name || !formData.email) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please provide your contact information' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        website_type: websiteTypes.find(t => t.id === formData.websiteType)?.label,
        page_count: `${formData.pageCount} pages`,
        design_level: designLevels.find(d => d.id === formData.designLevel)?.label,
        description: formData.description,
        estimated_price: `${currency === 'EUR' ? '€' : 'RON'} ${estimatedPrice.toLocaleString()}`,
        from_name: formData.name,
        reply_to: formData.email
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({
        type: 'success',
        message: 'Quote request sent successfully!'
      });

      setTimeout(() => {
        onClose();
        setFormData({
          websiteType: '',
          pageCount: '',
          designLevel: '',
          description: '',
          email: '',
          name: ''
        });
      }, 2000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-gray-900/95 border border-blue-500/20 rounded-lg shadow-2xl w-full max-w-xl p-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-medium text-gray-100 mb-4">Request a Quote</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {websiteTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, websiteType: type.id }))}
                  className={`p-3 rounded-md border transition-all duration-300 ${
                    formData.websiteType === type.id
                      ? 'border-blue-500/50 bg-blue-500/5 text-blue-400'
                      : 'border-gray-800 hover:border-gray-700 text-gray-400'
                  }`}
                >
                  <h3 className="text-xs font-medium">{type.label}</h3>
                  <p className="text-[10px] mt-1 opacity-75">
                    From {currency === 'EUR' ? '€' : 'RON'} {type.basePrice[currency].toLocaleString()}
                  </p>
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">Number of Pages</label>
              <div className="grid grid-cols-3 gap-2">
                {pageCounts.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pageCount: option.value }))}
                    className={`py-1.5 px-2 rounded-md border text-xs transition-all duration-300 ${
                      formData.pageCount === option.value
                        ? 'border-blue-500/50 bg-blue-500/5 text-blue-400'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-400">Design Level</label>
                <button
                  type="button"
                  onClick={() => setCurrency(currency === 'EUR' ? 'RON' : 'EUR')}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Switch to {currency === 'EUR' ? 'RON' : 'EUR'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {designLevels.map((level) => (
                  <div
                    key={level.id}
                    className="relative"
                    onMouseEnter={() => setShowTooltip(level.id)}
                    onMouseLeave={() => setShowTooltip('')}
                  >
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, designLevel: level.id }))}
                      className={`w-full p-3 rounded-md border group transition-all duration-300 ${
                        formData.designLevel === level.id
                          ? 'border-blue-500/50 bg-blue-500/5 text-blue-400'
                          : 'border-gray-800 hover:border-gray-700 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <level.Icon 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            formData.designLevel === level.id 
                              ? 'scale-110 text-blue-400' 
                              : 'group-hover:scale-110'
                          }`}
                        />
                        <h3 className="text-xs font-medium">{level.label}</h3>
                      </div>
                    </button>
                    {showTooltip === level.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800/90 text-[11px] text-gray-300 rounded-md shadow-lg z-10 w-40">
                        {level.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">Project Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full h-24 bg-gray-800/50 border border-gray-800 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-800/50 border border-gray-800 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-gray-800/50 border border-gray-800 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            {estimatedPrice > 0 && (
              <div className="bg-gray-800/30 border border-gray-800 rounded-md p-3">
                <p className="text-xs text-gray-400">Estimated starting price:</p>
                <p className="text-lg font-medium text-blue-400">
                  {currency === 'EUR' ? '€' : 'RON'} {estimatedPrice.toLocaleString()}
                </p>
              </div>
            )}

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
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                'Submit Quote Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}