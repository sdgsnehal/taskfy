import { checkSubscription } from "@/lib/subscription";
import BillingPage from "./_components/billingpage";

const Billing = async () => {
  const isPro = await checkSubscription();
  return <BillingPage isPro={isPro} />;
};

export default Billing;
