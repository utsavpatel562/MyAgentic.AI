import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "botttsNeutral" | "initials"; // Type of avatar to generate
}

// The GeneratedAvatar component dynamically renders avatars using Dicebear
export const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  let avatar;

  // Choose avatar style based on the 'variant' prop
  if (variant === "botttsNeutral") {
    // Generate a botttsNeutral (robot-style) avatar
    avatar = createAvatar(botttsNeutral, {
      seed, // ensures avatar is uniquely generated based on seed
    });
  } else {
    // Generate an initials avatar (text-based)
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
