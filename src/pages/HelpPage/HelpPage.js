import React, { useState } from 'react';
import './HelpPage.css';

function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'account', name: 'Account & Billing', icon: '👤' },
    { id: 'streaming', name: 'Streaming Issues', icon: '📺' },
    { id: 'devices', name: 'Devices & Apps', icon: '📱' },
    { id: 'content', name: 'Content & Features', icon: '🎬' }
  ];

  const faqs = {
    general: [
      {
        question: 'What is Netflix?',
        answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices.'
      },
      {
        question: 'How much does Netflix cost?',
        answer: 'Netflix offers several plans to meet your needs. The plan you choose will determine the number of devices you can stream Netflix on at the same time.'
      },
      {
        question: 'Where can I watch Netflix?',
        answer: 'You can watch Netflix through any internet-connected device that offers the Netflix app, including smart TVs, game consoles, streaming media players, set-top boxes, smartphones, and tablets.'
      }
    ],
    account: [
      {
        question: 'How do I change my payment method?',
        answer: 'Go to Account > Manage payment info > Add payment method or Update payment method. You can also remove payment methods from this page.'
      },
      {
        question: 'How do I cancel my Netflix subscription?',
        answer: 'You can cancel your Netflix account at any time. Go to Account > Cancel Membership. Your account will remain active until the end of your current billing period.'
      },
      {
        question: 'How do I change my plan?',
        answer: 'Sign in to your Netflix account and select Change Plan. Choose the plan that\'s right for you and select Continue or Update.'
      }
    ],
    streaming: [
      {
        question: 'Netflix is not working, what should I do?',
        answer: 'Try refreshing the page or restarting your device. Check your internet connection and make sure Netflix is not down in your area.'
      },
      {
        question: 'Why is Netflix buffering or loading slowly?',
        answer: 'This is usually caused by a slow internet connection. Try closing other apps or devices using the internet, or contact your internet service provider.'
      },
      {
        question: 'Video quality is poor, how can I improve it?',
        answer: 'Check your internet speed and adjust your playback settings. Go to Account > Playback settings to change video quality preferences.'
      }
    ],
    devices: [
      {
        question: 'How many devices can I use with my Netflix account?',
        answer: 'The number of devices depends on your plan. Basic allows 1 device, Standard allows 2 devices, and Premium allows 4 devices to stream simultaneously.'
      },
      {
        question: 'How do I download titles to watch offline?',
        answer: 'Look for the download icon on movies and TV shows in the Netflix app. Not all titles are available for download.'
      },
      {
        question: 'Netflix app is not working on my device',
        answer: 'Try updating the Netflix app, restarting your device, or reinstalling the app. Make sure your device meets Netflix system requirements.'
      }
    ],
    content: [
      {
        question: 'Why did a TV show or movie disappear?',
        answer: 'Netflix licenses TV shows and movies from studios around the world. When these licenses expire, we remove the title from Netflix.'
      },
      {
        question: 'How do I request a TV show or movie?',
        answer: 'Netflix doesn\'t accept requests for specific titles, but we use viewing data and feedback to help decide what to add to our catalog.'
      },
      {
        question: 'How do I use parental controls?',
        answer: 'Go to Account > Parental controls to set maturity ratings for profiles and block specific titles.'
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-page">
      <div className="help-header">
        <h1>Help Center</h1>
        <p>Find answers to common questions and get support</p>
        
        <div className="search-container">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="help-content">
        <div className="help-sidebar">
          <h3>Categories</h3>
          <nav className="category-nav">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="help-main">
          <div className="faq-section">
            <h2>{categories.find(c => c.id === activeCategory)?.name} FAQs</h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="no-results">
                <p>No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="faq-list">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <svg 
                        className={`expand-icon ${expandedFaq === index ? 'expanded' : ''}`}
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                      </svg>
                    </button>
                    {expandedFaq === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="contact-section">
            <h2>Still need help?</h2>
            <div className="contact-options">
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Chat with our support team</p>
                <button className="contact-btn">Start Chat</button>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Phone Support</h3>
                <p>Call us at 1-844-505-2993</p>
                <button className="contact-btn">Call Now</button>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Email Support</h3>
                <p>Send us an email</p>
                <button className="contact-btn">Send Email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;