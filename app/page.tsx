'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">kensa</span>
          </div>
          <a 
            href="mailto:hello@kensa.to"
            className="text-gray-600 hover:text-gray-900 transition font-medium"
          >
            Contact
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-teal-50 rounded-full">
          <span className="text-teal-700 font-medium text-sm">
            Launching January 2025
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Your Research,
          <br />
          <span className="text-teal-600">Elevated</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          AI-powered platform that helps researchers organize papers, discover grants, 
          and accelerate breakthroughs.
        </p>

{/* Email Signup */}
<div className="max-w-md mx-auto mb-6">
  <form 
    className="flex gap-3"
    onSubmit={async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const emailInput = form.elements.namedItem('email') as HTMLInputElement;
      const email = emailInput.value;
      const button = form.querySelector('button') as HTMLButtonElement;
      const originalText = button.textContent;
      
      // Disable button
      button.disabled = true;
      button.textContent = 'Joining...';
      
      try {
        // Submit to Google Sheets
        const response = await fetch('https://script.google.com/macros/s/AKfycbxEkpOZq4msILG5W2HSnjBlZvRol1ZVYfO9omGHOog9m_jmbTqTXWaaXivlKsa462Af/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            email: email,
            website: '' // Honeypot field (empty for real users)
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Success!
          button.textContent = '✓ You\'re on the list!';
          button.className = button.className.replace('bg-teal-600', 'bg-green-600').replace('hover:bg-teal-700', 'hover:bg-green-700');
          emailInput.value = '';
          
          // Reset after 3 seconds
          setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
            button.className = button.className.replace('bg-green-600', 'bg-teal-600').replace('hover:bg-green-700', 'hover:bg-teal-700');
          }, 3000);
        } else {
          // Error (duplicate or invalid email)
          button.disabled = false;
          button.textContent = result.error || 'Try again';
          setTimeout(() => {
            button.textContent = originalText;
          }, 3000);
        }
        
      } catch (error) {
        button.disabled = false;
        button.textContent = 'Connection error';
        setTimeout(() => {
          button.textContent = originalText;
        }, 3000);
      }
    }}
  >
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-lg"
      required
    />
    <button
      type="submit"
      className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition shadow-lg hover:shadow-xl whitespace-nowrap"
    >
      Join Waitlist
    </button>
  </form>
</div>

        <p className="text-gray-500 text-sm">
          Early access • Priority support • Help shape Kensa
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Organize Papers
            </h3>
            <p className="text-gray-600 text-sm">
              AI-powered library with smart folders and instant search
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chat with Papers
            </h3>
            <p className="text-gray-600 text-sm">
              Ask questions and get instant answers from your research
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Find Grants
            </h3>
            <p className="text-gray-600 text-sm">
              Discover funding perfectly matched to your work
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Write Faster
            </h3>
            <p className="text-gray-600 text-sm">
              Generate literature reviews with AI assistance
            </p>
          </div>

        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 mb-8">
          Built by researchers, for researchers
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            For Academia
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            AI-Powered
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Private & Secure
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>© 2025 Kensa • Built with care for the research community</p>
          <p className="mt-2">
            <a href="mailto:hello@kensa.to" className="hover:text-teal-600 transition">
              hello@kensa.to
            </a>
          </p>
        </div>
      </footer>

    </main>
  );
}