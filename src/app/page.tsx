import DressDesignerForm from '@/components/DressDesignerForm';
import DressDesignDisplay from '@/components/DressDesignDisplay';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dress Designer</h1>
                <p className="text-sm text-gray-600">Create your perfect dress design</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Design Your Dream Dress
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your preferences and measurements, and we'll create a custom design just for you
              </p>
            </div>
            <DressDesignerForm />
          </div>

          {/* Right Column - Display */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Custom Design
              </h2>
              <p className="text-lg text-gray-600">
                See your design come to life with fabric suggestions and detailed making instructions
              </p>
            </div>
            <DressDesignDisplay />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Design</h3>
            <p className="text-gray-600">AI-powered design generation based on your preferences and body measurements</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧵</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fabric Expertise</h3>
            <p className="text-gray-600">Professional fabric recommendations tailored to your design and style</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📏</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect Fit</h3>
            <p className="text-gray-600">Custom measurements and detailed instructions for a perfect fit every time</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-purple-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 Dress Designer System. Create beautiful, custom-fit dresses with ease.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
