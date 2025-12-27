import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#001a00]">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Page non trouvée
            </p>
            <Link
              href="/ar"
              className="inline-flex items-center px-6 py-3 bg-[#008000] hover:bg-[#006600] text-white font-medium rounded-lg transition-colors ring-2 ring-[#EFBF04] hover:ring-[#EFBF04]"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}