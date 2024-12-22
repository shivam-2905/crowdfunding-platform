import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const WalletConnect = () => {
  const [account, setAccount] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask to use this feature");
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet");
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="relative">
      {account ? (
        <Button
          variant="outline"
          className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all duration-300"
        >
          {`${account.slice(0, 6)}...${account.slice(-4)}`}
        </Button>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
};