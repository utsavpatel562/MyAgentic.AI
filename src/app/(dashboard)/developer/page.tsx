import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import { GoProjectRoadmap } from "react-icons/go";
import { LuGithub } from "react-icons/lu";

const Developer = () => {
  return (
    <>
      <div className="max-w-full py-4 px-4">
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Profile Image */}
            <Image
              src={"/profile-pic.png"}
              alt="image"
              width={200}
              height={200}
              className="rounded-lg w-32 h-32 md:w-[200px] md:h-[200px] object-cover"
            />

            {/* Info Section */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
                Utsav Patel
              </h2>
              <p className="text-base md:text-lg font-semibold text-gray-700">
                Full Stack Developer
              </p>
              <p className="text-sm md:text-base font-light md:py-3 py-2 md:text-left">
                Hi, I&apos;m developer of MyAgentic.AI, SaaS platform designed
                to build and deploy autonomous AI agents tailored to your
                specific workflows. Built with a modern tech stack, it allows
                you to automate complex tasks, enhance productivity, and
                facilitate seamless human-agent collaboration.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:py-2 py-3">
                <Link
                  href={"https://www.linkedin.com/in/utsav-patel-coder"}
                  target="_blank"
                >
                  <Button variant={"outline"}>
                    <FaLinkedinIn />
                    LinkedIn
                  </Button>
                </Link>
                <Link href={"https://github.com/utsavpatel562"} target="_blank">
                  <Button variant={"outline"}>
                    <LuGithub />
                    GitHub
                  </Button>
                </Link>
                <Link
                  href={"https://utsavpatel-portfolio.vercel.app"}
                  target="_blank"
                >
                  <Button variant={"outline"}>
                    <GoProjectRoadmap />
                    Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Developer;
