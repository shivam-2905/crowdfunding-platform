import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  target: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Target amount must be a positive number",
  }),
  duration: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 90,
    {
      message: "Duration must be between 1 and 90 days",
    }
  ),
});

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      target: "",
      duration: "30",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Create a new campaign object
      const newCampaign = {
        id: crypto.randomUUID(),
        title: values.title,
        description: values.description,
        target: Number(values.target),
        raised: 0,
        daysLeft: Number(values.duration),
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2940&fit=crop", // Default image
      };

      // Get existing campaigns from localStorage
      const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      
      // Add new campaign
      const updatedCampaigns = [...existingCampaigns, newCampaign];
      
      // Save to localStorage
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      
      toast({
        title: "Campaign Created!",
        description: "Your campaign has been created successfully.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create campaign. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create a Campaign</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter campaign title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a clear and compelling title for your campaign
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your campaign"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain what the funds will be used for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount (ETH)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter target amount in ETH"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Set your fundraising goal in ETH
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (Days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="90"
                      placeholder="Enter campaign duration"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Set campaign duration (1-90 days)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Campaign
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Create;