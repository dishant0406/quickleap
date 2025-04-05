const MarqueeSection = ({ endText, startText, preStartText }: Props) => {
  return (
    <div className="py-12 w-full border-y-4 border-primaryBlack bg-primaryBlack text-text font-base">
      <p className="md:text-[4vw] tracking-wider md:text-start text-bw text-center text-[6vw] px-[5vw] font-anton">
        <span className="text-main">{preStartText}</span>
        {startText} <span className="text-main bg-primaryBlack px-4 rounded-base">{endText}</span>
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
