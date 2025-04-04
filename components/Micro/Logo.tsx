import Image from 'next/image';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const Logo = ({ width = 200, height = 100, className, onClick, style }: Props) => {
  return (
    <Image
      alt={'Redirect Logo'}
      className={className}
      height={height}
      src={'/logo.svg'}
      style={style}
      width={width}
      onClick={onClick}
    />
  );
};

export default Logo;
