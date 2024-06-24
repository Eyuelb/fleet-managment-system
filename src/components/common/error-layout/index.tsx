import { Button } from '@mantine/core';
import { IconPageBreak } from '@tabler/icons-react';
import logger from '@utils/logger';

export default function ErrorLayout({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  logger.log(error);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <IconPageBreak size={60} color="var(--mantine-color-blue-3)" />
      <h2>Something went wrong!</h2>
      <Button variant="outline" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
