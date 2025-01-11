'use client';

import { useToast } from '@/hooks/use-toast';

export const useShowToast = () => {
  const { toast } = useToast();

  return (options: {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }) => {
    toast({
      title: options.title,
      description: options.description,
      variant: options.variant || 'default',
    });
  };
};
