import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogUserMore({user}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="ml-1 cursor-pointer font-bold">...more</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{user?.name}</DialogTitle>
          
        </DialogHeader>
        <p className="text-xl">
            Information More
          </p>
          <div>
            email: {user?.email}
          </div>
        
        
      </DialogContent>
    </Dialog>
  )
}
