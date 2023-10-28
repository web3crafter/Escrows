import { Skeleton } from "@/components/ui/skeleton"

const StandardDeploySkeleton = () => {
  return (
    <div className="px-2 py-10 space-y-4 sm:w-96 h-[420px] rounded-lg shadow-sm bg-secondary">
      <Skeleton className="w-40 h-6 bg-muted-foreground" />

      <div className="space-y-2">
        <Skeleton className="w-40 h-5 bg-muted-foreground" />
        <Skeleton className="flex w-full h-10 rounded-md bg-muted-foreground" />
      </div>

      <div className="space-y-2">
        <Skeleton className="w-40 h-5 bg-muted-foreground" />
        <Skeleton className="flex w-full h-10 rounded-md bg-muted-foreground" />
      </div>

      <div className="space-y-2">
        <Skeleton className="w-40 h-5 bg-muted-foreground" />
        <Skeleton className="flex w-full h-10 rounded-md bg-muted-foreground" />
      </div>

      <Skeleton className="w-full h-10 rounded-md bg-muted-foreground" />
    </div>
  )
}

export default StandardDeploySkeleton
