import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonPage = () => {
  const linksArr = [1, 2, 3, 4]

  return (
    <div className="container flex flex-col items-center space-y-5">
      <div className="flex space-x-5">
        {linksArr.map((link, i) => (
          <Button asChild key={i} variant={"outline"}>
            <Skeleton className="w-24" />
          </Button>
        ))}
      </div>
      <div>
        <Skeleton className="h-6 w-36" />
      </div>
    </div>
  )
}
export default SkeletonPage
