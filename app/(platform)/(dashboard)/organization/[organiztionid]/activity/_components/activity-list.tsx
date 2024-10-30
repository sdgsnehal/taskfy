"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AuditLog } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";

export const ActivityList = () => {
  const params = useParams();
  const organizationId = params.organizationid as string;

  // React Query to fetch audit logs
  const { data: auditLogs, isLoading } = useQuery<AuditLog[]>({
    queryKey: ["org-logs", organizationId],
    queryFn: () => fetcher(`/api/org/${organizationId}/logs`),
    staleTime: 0,
  });

  // Render loading skeletons while data is loading
  if (isLoading) {
    return <ActivityList.Skeleton />;
  }

  return (
    <ol className="space-y-4 mt-4">
      {auditLogs && auditLogs.length > 0 ? (
        auditLogs.map((log) => <ActivityItem key={log.id} data={log} />)
      ) : (
        <p className="text-xs text-center text-muted-foreground">
          No activity found inside this organization
        </p>
      )}
    </ol>
  );
};

// Skeleton loading component
ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};
