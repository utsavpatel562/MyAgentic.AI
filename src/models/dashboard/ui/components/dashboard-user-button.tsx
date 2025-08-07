import { GeneratedAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaCreditCard } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

export const DashboardUserComponent = () => {
  const router = useRouter();
  const isMobile = useIsMobile(); // Check if current device is mobile
  const { data, isPending } = authClient.useSession(); // Get user session data and loading state

  // Logout handler function
  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  // Return nothing if user session is still loading or not available
  if (isPending || !data?.user) {
    return null;
  }

  // Render mobile version using Drawer
  if (isMobile) {
    return (
      <Drawer>
        {/* Drawer trigger UI (visible part the user clicks) */}
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
          {data.user.image ? (
            // If user has an image, display AvatarImage
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            // Otherwise, generate an avatar using user's name
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant={"outline"} onClick={() => {}}>
              <FaCreditCard className="size-4 text-black" />
              Billing
            </Button>
            <Button variant={"outline"} onClick={onLogout}>
              <TbLogout className="size-4 text-black" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Render desktop version using DropdownMenu
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
          {data.user.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="right" className="w-72">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="font-medium truncate">{data.user.name}</span>
              <span className="font-xs font-normal text-muted-foreground truncate">
                {data.user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
            Billing
            <FaCreditCard className="size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            className="cursor-pointer flex items-center justify-between"
          >
            Logout
            <TbLogout className="size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
