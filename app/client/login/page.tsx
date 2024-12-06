'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("")
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setErrorMessage(res.error)
    } else {
      router.push("/client/profile")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl text-center font-semibold mb-8">Lily Shop</h1>
        {errorMessage && (
          <h1 className='text-red-500 mb-3'>{errorMessage}</h1>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="flex items-center justify-center p-2 w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            <img src="/imgs/icons/google.svg" alt="google" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center p-2 w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            <img src="/imgs/icons/facebook-color.svg" alt="google" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center p-2 w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            <img src="/imgs/icons/apple.svg" alt="google" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;