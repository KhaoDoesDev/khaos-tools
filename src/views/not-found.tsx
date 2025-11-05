import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-6 text-center">
      <Helmet>
        <title>Khao's Tools | 404 Not Found</title>
      </Helmet>
      <h1
        className="text-8xl font-extrabold mb-4 bg-gradient-to-br from-blue-500/80 to-purple-500 bg-clip-text text-transparent"
      >
        404
      </h1>

      <p
        className="text-muted-foreground text-lg max-w-md mb-8"
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div
      >
        <Button asChild>
          <Link
            to="/"
          >
            <ArrowLeft className="size-6" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
