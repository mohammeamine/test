import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const VerifyEmailPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerification = async () => {
    // Simulated verification process
    setIsVerified(true);
    setTimeout(() => {
      navigate('/auth/sign-in');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please click the button below to verify your email address
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!isVerified ? (
            <button
              onClick={handleVerification}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify Email
            </button>
          ) : (
            <div className="text-center text-green-600">
              <p className="font-medium">Email verified successfully!</p>
              <p className="text-sm mt-2">Redirecting to login...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};