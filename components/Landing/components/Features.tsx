import { Axe, ChartArea, Lock, MemoryStick, Scale, Signal } from 'lucide-react';

import { cn } from '@/lib/utils';

const BigBox = ({ Icon, title, description, rotate = -1 }: BoxProps) => {
  return (
    <div
      className={cn(
        'md:w-2/3 w-full bg-white border-4 rounded-2xl border-primaryBlack shadow-shadow p-5',
        {
          'rotate-1': rotate === 1,
          '-rotate-1': rotate === -1,
        }
      )}
    >
      <div className="bg-bg p-3 w-fit rounded-base">
        <Icon />
      </div>
      <p className="text-[4vw] md:text-[1.2vw] mt-2 font-extrabold text-primaryBlack dark:text-white">
        {title}
      </p>
      <p className="text-[4vw] md:text-[1vw]  font-medium text-primaryBlack dark:text-white">
        {description}
      </p>
    </div>
  );
};

const SmallBox = ({ Icon, title, description, rotate = 1 }: BoxProps) => {
  return (
    <div
      className={cn(
        'md:w-1/3 w-full bg-white rotate-1 border-4 rounded-2xl border-primaryBlack shadow-shadow p-5',
        {
          'rotate-1': rotate === 1,
          '-rotate-1': rotate === -1,
        }
      )}
    >
      <div className="bg-bg p-3 w-fit rounded-base">
        <Icon />
      </div>
      <p className="text-[4vw] md:text-[1.2vw] mt-2 font-extrabold text-primaryBlack dark:text-white">
        {title}
      </p>
      <p className="text-[4vw] md:text-[1vw]  font-medium text-primaryBlack dark:text-white">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  return (
    <div className="min-h-main flex flex-col items-center  py-[10vh]  md:px-[10vw] px-[5vw]">
      <h2 className="text-[8vw] md:text-[3vw] font-anton text-primaryBlack dark:text-white">
        <span className="text-main">Features</span> of your link
      </h2>
      <h3 className="text-[4vw] text-center  md:text-[1vw] mt-2 font-medium text-primaryBlack dark:text-white">
        Quickleap makes it easy to redirect your domains without the hassle of hosting them. Here
        are some of the features that make us stand out:
      </h3>
      <div className="w-full pt-[5vh] flex-grow">
        <div className="flex md:flex-row flex-col gap-[3vh] md:gap-[2vw]">
          <BigBox
            description="Create and manage redirects in minutes through our intuitive dashboard."
            Icon={Axe}
            title="Easy Setup"
          />
          <SmallBox
            description="Automate redirection workflows with our advanced API."
            Icon={Signal}
            title="API Integration"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-[3vh] md:gap-[2vw] mt-[3vh] md:mt-[5vh]">
          <SmallBox
            description="Monitor traffic patterns and performance metrics with ease."
            Icon={ChartArea}
            title="Analytics & Monitoring"
          />
          <BigBox
            description="Rely on our secure, globally distributed network for fast redirection."
            Icon={Lock}
            title="Global Security"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-[3vh] md:gap-[2vw] mt-[3vh] md:mt-[5vh]">
          <BigBox
            description="Use your own domain for seamless redirection."
            Icon={MemoryStick}
            title="Custom Domains"
          />
          <SmallBox
            description="Customize and steer traffic using flexible redirect rules."
            Icon={Scale}
            title="Rule-Based Redirects"
          />
        </div>
      </div>
    </div>
  );
};

type BoxProps = {
  Icon: React.ElementType;
  title: string;
  description: string;
  rotate?: 1 | -1;
};

export default Features;
