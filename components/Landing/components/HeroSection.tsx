import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <div className="relative h-main mt-nav">
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
        )}
      />
      <div className="h-main w-full absolute top-0 left-0 z-10 flex flex-col items-center justify-center">
        <div className="flex gap-2 mb-[3vh]">
          <Badge className="text-[3vw] shadow-shadow md:text-[1vw] !rounded-[40px] px-5 font-bold h-8">
            #NoCode
          </Badge>
          <Badge className="text-[3vw] shadow-shadow md:text-[1vw] !rounded-[40px] px-5 font-bold h-8">
            #NoHosting
          </Badge>
          <Badge className="text-[3vw] shadow-shadow md:text-[1vw] !rounded-[40px] px-5 font-bold h-8">
            #NoHassle
          </Badge>
        </div>
        <h1 className="md:text-[6vw] md:leading-[8vw] leading-[14vw] text-[12vw] tracking-wider font-anton px-[5vw] font-extrabold text-center text-primaryBlack dark:text-white">
          {'Effortless Domain Redirection,'.toUpperCase()}
          <br />
          {'Zero Hassle'.toUpperCase()}
        </h1>
        <h2 className="md:text-[1.5vw] text-[4vw] mt-[3vh] font-medium px-[5vw] text-center text-primaryBlack dark:text-white">
          Streamline your traffic flow with our secure, fast, and easy-to-use redirection service—no
          hosting required.
        </h2>
        <div className="flex gap-4 mt-8">
          <Button
            className="md:text-[1.2vw] text-[5vw] !rounded-[40px] font-bold h-14"
            href="/app"
            size={'lg'}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
