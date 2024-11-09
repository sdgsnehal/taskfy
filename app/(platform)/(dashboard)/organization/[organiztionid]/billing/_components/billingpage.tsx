"use client";

import { Separator } from "@radix-ui/react-separator";
import { SubscriptionButton } from "./subscription-button";
import Info from "../../_components/info";

interface BillingPageProps {
  isPro: boolean;
}

const BillingPage = ({ isPro }: BillingPageProps) => {
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
