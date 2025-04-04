const MarqueeSection = ({ endText, startText, preStartText }: Props) => {
  return (
    <div className="py-12 w-full border-y-4 border-primaryBlack bg-bw text-text font-base">
      <p className="md:text-[4vw] tracking-wider text-primaryBlack md:text-start text-center text-[6vw] px-[5vw] font-anton">
        <span className="text-main">{preStartText}</span>
        {startText} <span className="text-main">{endText}</span>
      </p>
    </div>
  );
};

type Props = {
  preStartText?: string;
  startText?: string;
  endText?: string;
};

export default MarqueeSection;
