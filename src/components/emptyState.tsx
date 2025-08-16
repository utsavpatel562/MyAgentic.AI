import Image from "next/image";

interface Props {
  title: string;
  description: string;
}
export const EmptyState = ({ title, description }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Image
          className="text-red-500"
          alt="image"
          src={"/empty.svg"}
          width={240}
          height={240}
        />
        <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
          <h6 className="text-xl font-medium">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};
