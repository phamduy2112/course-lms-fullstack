import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDispatch } from "react-redux";
import { logoutDeviceThunk } from "@/store/thunks/user-thunks";
import type { AppDispatch } from "@/store/store";

export function AvatarPopover() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutDeviceThunk());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-70 mt-[.3rem]" align="end">
        <div className="grid gap-4">
          <div className="space-y-2 flex gap-2">
             <Avatar className="size-16 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold">Duy Pham</h2>
          <p>duy@email.com</p>
        </div>
          </div>
          <hr />
          <div>
            <div>Learn</div>
            <div>Cart</div>
          </div>
          <hr />
          <div>
            <div>Notification</div>
            <div>Message</div>
          </div>
          <hr />
          <div>
            <div>History Buy</div>
          </div>
           <hr />
           \
           
          <div
            className="cursor-pointer text-red-500 hover:bg-gray-100 px-2 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
