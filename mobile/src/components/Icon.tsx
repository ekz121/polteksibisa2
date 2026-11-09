import type { ReactNode } from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type IconName =
  | 'home' | 'information' | 'bell' | 'person' | 'attendance' | 'assets'
  | 'chart' | 'document' | 'calendar' | 'announcement' | 'chevron' | 'close' | 'book' | 'location';

type Props = { name: IconName; size?: number; color?: string };

export function Icon({ name, size = 24, color = '#940D1B' }: Props) {
  const glyphs: Record<IconName, ReactNode> = {
    home: <Path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" fill={color} strokeWidth={0} />,
    information: <><Circle cx="12" cy="12" r="9" fill={color} strokeWidth={0} /><Path d="M12 10.5v6m0-10v.2" stroke="#FFF" strokeWidth={2.5} /></>,
    bell: <Path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4M12 2V1" />,
    person: <><Circle cx="12" cy="7" r="4" fill={color} strokeWidth={0} /><Path d="M3 21v-2a9 7 0 0 1 18 0v2Z" fill={color} strokeWidth={0} /></>,
    attendance: <><Rect x="2" y="4" width="17" height="16" rx="2" /><Path d="M6 2v5m9-5v5M2 9h17M6 13h2m3 0h2m-7 4h2" /><Circle cx="18" cy="17" r="5" fill="#FFF" /><Path d="M18 14v3h2" /></>,
    assets: <><Rect x="2" y="3" width="20" height="14" rx="2" /><Path d="M8 22h8m-4-5v5m-5-15 5-3 5 3v6l-5 3-5-3Zm0-3 5 3 5-3m-5 3v6" /></>,
    chart: <><Path d="M2 21h20" /><Rect x="3" y="12" width="4" height="6" rx=".5" fill={color} strokeWidth={0} /><Rect x="10" y="7" width="4" height="11" rx=".5" fill={color} strokeWidth={0} /><Rect x="17" y="2" width="4" height="16" rx=".5" fill={color} strokeWidth={0} /></>,
    document: <Path d="M5 2h9l6 6v14H5Zm9 0v7h6M8 13h9m-9 4h9" />,
    calendar: <><Rect x="3" y="5" width="18" height="16" rx="2" /><Path d="M7 2v6m10-6v6M3 11h18m-14 4h3m4 0h3m-10 3h3" /></>,
    announcement: <Path d="m3 10 14-6v14L3 14Zm14-2h3v6h-3M5 15l2 6h4l-3-5M21 4l1-1m-1 16 1 1" />,
    chevron: <Path d="m9 5 7 7-7 7" />,
    close: <Path d="m6 6 12 12M6 18 18 6" />,
    book: <Path d="M12 5C8 2 4 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-2-1-6-2-10 1Zm0 0v16M5 8l4 1m-4 3 4 1m6-4 4-1m-4 5 4-1" />,
    location: <><Path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><Circle cx="12" cy="10" r="2.5" /></>,
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      {glyphs[name]}
    </Svg>
  );
}
