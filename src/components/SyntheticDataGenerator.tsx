
import { Button } from '@/components/ui/button';
import { useSyntheticData } from '@/hooks/useSyntheticData';
import { useClearSyntheticData } from '@/hooks/useClearSyntheticData';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';

export const SyntheticDataGenerator = () => {
  const { toast } = useToast();
  const syntheticDataMutation = useSyntheticData();
  const clearDataMutation = useClearSyntheticData();

  const handleGenerateData = async () => {
    try {
      await syntheticDataMutation.mutateAsync(100);
      toast({
        title: "Success!",
        description: "100 synthetic posts have been generated and added to the database.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate synthetic posts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearData = async () => {
    try {
      await clearDataMutation.mutateAsync();
      toast({
        title: "Success!",
        description: "All synthetic posts have been cleared from the database.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear synthetic posts. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        Development Tool: Manage Synthetic Posts
      </h3>
      <p className="text-yellow-700 mb-4">
        Generate or clear synthetic posts for testing the explore and visualization features.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={handleGenerateData}
          disabled={syntheticDataMutation.isPending || clearDataMutation.isPending}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          {syntheticDataMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Generate 100 Posts
        </Button>
        
        <Button
          onClick={handleClearData}
          disabled={syntheticDataMutation.isPending || clearDataMutation.isPending}
          variant="destructive"
          className="bg-red-600 hover:bg-red-700"
        >
          {clearDataMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All Posts
        </Button>
      </div>
    </div>
  );
};
