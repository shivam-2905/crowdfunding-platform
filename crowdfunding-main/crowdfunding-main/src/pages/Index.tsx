import { WalletConnect } from "@/components/WalletConnect";
import { CampaignCard } from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  daysLeft: number;
  image: string;
}

// Default campaigns as fallback
const defaultCampaigns = [
  {
    id: "1",
    title: "Sustainable Energy Project",
    description:
      "Help us build renewable energy solutions for communities in need. This project aims to provide clean and sustainable power to remote areas.",
    target: 10,
    raised: 4.2,
    daysLeft: 15,
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2940&fit=crop",
  },
  {
    id: "2",
    title: "Educational Technology Initiative",
    description:
      "Supporting the development of innovative educational technology to improve learning outcomes in underserved communities.",
    target: 5,
    raised: 2.8,
    daysLeft: 10,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2940&fit=crop",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Load campaigns from localStorage
    const storedCampaigns = localStorage.getItem('campaigns');
    if (storedCampaigns) {
      const parsedCampaigns = JSON.parse(storedCampaigns);
      setCampaigns([...defaultCampaigns, ...parsedCampaigns]);
    } else {
      setCampaigns(defaultCampaigns);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">CryptoFund</h1>
          <WalletConnect />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <section className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Decentralized Crowdfunding
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Support innovative projects and initiatives using cryptocurrency.
            Transparent, secure, and borderless funding for the future.
          </p>
          <Button
            onClick={() => navigate("/create")}
            className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
          >
            Start a Campaign
          </Button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;