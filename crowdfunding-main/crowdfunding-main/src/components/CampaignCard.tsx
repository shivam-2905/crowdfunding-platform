import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  daysLeft: number;
  image: string;
}

export const CampaignCard = ({
  id,
  title,
  description,
  target,
  raised,
  daysLeft,
  image,
}: CampaignCardProps) => {
  const navigate = useNavigate();
  const progress = (raised / target) * 100;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fadeIn backdrop-blur-sm bg-white/80 border border-gray-100">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {daysLeft} days left
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Raised: {raised} ETH</span>
            <span>Target: {target} ETH</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Button
          onClick={() => navigate(`/campaign/${id}`)}
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-white transition-all duration-300"
        >
          View Campaign
        </Button>
      </div>
    </Card>
  );
};