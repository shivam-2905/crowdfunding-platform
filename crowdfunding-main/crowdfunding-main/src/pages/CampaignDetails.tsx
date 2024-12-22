import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Campaign {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  daysLeft: number;
  image: string;
}

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [contribution, setContribution] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load campaigns from localStorage
    const storedCampaigns = localStorage.getItem('campaigns');
    const defaultCampaigns = [
      {
        id: "1",
        title: "Sustainable Energy Project",
        description: "Help us build renewable energy solutions for communities in need. This project aims to provide clean and sustainable power to remote areas.",
        target: 10,
        raised: 4.2,
        daysLeft: 15,
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2940&fit=crop",
      },
      {
        id: "2",
        title: "Educational Technology Initiative",
        description: "Supporting the development of innovative educational technology to improve learning outcomes in underserved communities.",
        target: 5,
        raised: 2.8,
        daysLeft: 10,
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2940&fit=crop",
      },
    ];

    const allCampaigns = storedCampaigns 
      ? [...defaultCampaigns, ...JSON.parse(storedCampaigns)]
      : defaultCampaigns;

    const foundCampaign = allCampaigns.find(c => c.id === id);
    setCampaign(foundCampaign || null);
  }, [id]);

  const handleContribute = () => {
    if (!campaign) return;
    
    // For now, just update the raised amount in localStorage
    const amount = parseFloat(contribution);
    if (isNaN(amount)) return;

    const updatedCampaign = {
      ...campaign,
      raised: campaign.raised + amount
    };

    // Update localStorage
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    const updatedCampaigns = storedCampaigns.map((c: Campaign) => 
      c.id === campaign.id ? updatedCampaign : c
    );
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));

    // Update state
    setCampaign(updatedCampaign);
    setContribution("");

    toast({
      title: "Contribution Successful!",
      description: `You have contributed ${amount} ETH to this campaign.`,
    });
  };

  if (!campaign) {
    return <div className="container mx-auto px-4 pt-24">Campaign not found</div>;
  }

  const progress = (campaign.raised / campaign.target) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {campaign.daysLeft} days left
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{campaign.title}</h1>
            <p className="text-gray-600 mb-8">{campaign.description}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Raised: {campaign.raised} ETH</span>
                <span>Target: {campaign.target} ETH</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Contribute to Campaign</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make a Contribution</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Amount in ETH"
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleContribute}
                    disabled={!contribution || parseFloat(contribution) <= 0}
                  >
                    Confirm Contribution
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;