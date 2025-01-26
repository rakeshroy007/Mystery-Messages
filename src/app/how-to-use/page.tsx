'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ManualPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">Mystery Messages Manual</h1>
          <p className="text-center text-gray-600 mt-2 text-lg">
            Learn how to use Mystery Messages and start sending anonymous messages seamlessly.
          </p>
        </header>

        <Separator className="mb-6" />

        {/* Card Section */}
        <Card className="mb-6 shadow-lg border-none rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">1. Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-7">
            <p>
              To begin using Mystery Messages, ensure you have an account. If you don’t have one yet, sign up on the
              platform by providing your email and creating a unique username.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Go to the Sign-Up page.</li>
              <li>Fill in your details and submit the form.</li>
              <li>Verify your email to activate your account.</li>
              <p className='ml-5 text-red-600 text-sm'> (Due to email API expiry issues, this last process may not happen.)</p>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-lg border-none rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">2. Your Unique Link</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-7">
            <p>
              Each user is provided with a unique link. This link allows others to send you anonymous messages.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Navigate to your Dashboard.</li>
              <li>Copy your unique link from the dashboard.</li>
              <li>Share your link with anyone you want to receive messages from.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-lg border-none rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">3. Sending Messages</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-7">
            <p>
              To send a message to someone, you need their unique link. Simply click on the link, write your message, and
              submit it.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Open the unique link shared with you.</li>
              <li>Write your message in the text area provided.</li>
              <li>Click on the Send button to deliver the message.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-lg border-none rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">4. Managing Messages</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-7">
            <p>
              As a registered user, you can manage the messages you receive directly from your dashboard. This includes
              viewing, deleting, or replying to messages.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Go to your Dashboard.</li>
              <li>View the list of received messages.</li>
              <li>Use the options available to delete or reply to any message.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-none rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">5. Privacy and Security</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-7">
            <p>
              Mystery Messages ensures your privacy. All messages are sent anonymously, and your identity is protected.
            </p>
            <p className="mt-4">
              <strong>Tips for Staying Secure:</strong>
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Only share your unique link with trusted individuals.</li>
              <li>Report any inappropriate messages through the support feature.</li>
              <li>Enable or disable message acceptance from your Dashboard.</li>
            </ul>
          </CardContent>
        </Card>

        <Separator className="my-6" />


      </div>
    </div>
  );
};

export default ManualPage;
