import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <p className="text-sm text-muted-foreground mb-8">Last Updated: September 2, 2025</p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to Connect Sphere AI, an AI platform for creating personalized networking messages. We respect your privacy and are committed to protecting your personal data.
            This privacy policy explains what information we collect, how we use it, and your rights regarding your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We only collect and store the following limited personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Contact Information: We collect your contact information when you choose to engage with our service to provide you with personalized networking assistance.</li>
          </ul>
          <p className="mb-4">
            We do not collect any other personal information beyond what is necessary to provide our networking and messaging service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use your contact information solely for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To provide our personalized networking AI service to you.</li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>To communicate with you about your networking activities when necessary.</li>
          </ul>
          <p className="mb-4">
            We will never use your information for marketing purposes or sell it to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We do not use cookies or any other tracking technologies on our website or in our services. We respect your privacy and only collect the minimum information necessary to provide our networking and messaging service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Sharing and Third Parties</h2>
          <p className="mb-4">
            We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes. Your WhatsApp number is only used to provide you with our task management service.
          </p>
          <p className="mb-4">
            While we use Supabase as our database provider, they do not have access to use your information for their own purposes. They simply provide the infrastructure we use to securely store your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Age</h2>
          <p className="mb-4">
            Our task management AI service is available to users of all ages. We do not specifically target or restrict our service based on age, as it is designed to help anyone manage their tasks efficiently regardless of age.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
          <p className="mb-4">
            We use Supabase, a secure and compliant database service, to store your WhatsApp number. We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="mb-4">
            While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet or method of electronic storage is 100% secure. We are committed to protecting your data, but cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Data Protection Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>The right to access, update or delete the information we have on you.</li>
            <li>The right of rectification - the right to have your information corrected if it is inaccurate or incomplete.</li>
            <li>The right to object - the right to object to our processing of your personal data.</li>
            <li>The right of restriction - the right to request that we restrict the processing of your personal information.</li>
            <li>The right to data portability - the right to be provided with a copy of the information we have on you in a structured, machine-readable and commonly used format.</li>
            <li>The right to withdraw consent - the right to withdraw your consent at any time where we relied on your consent to process your personal information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date at the top of this Privacy Policy.
          </p>
          <p className="mb-4">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>By Email: <a href="mailto:anemvamsi4+tasky@gmail.com" className="text-primary hover:underline">anemvamsi4@gmail.com</a></li>
          </ul>
        </section>
      </div>
      
      <div className="mt-12 pt-8 border-t">
        <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}
