import photo3_700 from '@assets/photos/welcome-party/3-700.jpg';
import photo3_1400 from '@assets/photos/welcome-party/3-1400.jpg';
import photo4_700 from '@assets/photos/welcome-party/4-700.jpg';
import photo4_1400 from '@assets/photos/welcome-party/4-1400.jpg';
import photo5_700 from '@assets/photos/welcome-party/5-700.jpg';
import photo5_1400 from '@assets/photos/welcome-party/5-1400.jpg';
import photo6_700 from '@assets/photos/welcome-party/6-700.jpg';
import photo6_1400 from '@assets/photos/welcome-party/6-1400.jpg';
import photo7_700 from '@assets/photos/welcome-party/7-700.jpg';
import photo7_1400 from '@assets/photos/welcome-party/7-1400.jpg';
import photo8_700 from '@assets/photos/welcome-party/8-700.jpg';
import photo8_1400 from '@assets/photos/welcome-party/8-1400.jpg';
import photo9_700 from '@assets/photos/welcome-party/9-700.jpg';
import photo9_1400 from '@assets/photos/welcome-party/9-1400.jpg';

export type SlideshowSlide = {
  id: string;
  src: string;
  srcSet: string;
};

/** Display max 700px — srcSet serves 700w / 1400w (2×) only. */
export const WELCOME_PARTY_SLIDESHOW_SLIDES: SlideshowSlide[] = [
  {
    id: '3',
    src: photo3_700,
    srcSet: `${photo3_700} 700w, ${photo3_1400} 1400w`,
  },
  {
    id: '4',
    src: photo4_700,
    srcSet: `${photo4_700} 700w, ${photo4_1400} 1400w`,
  },
  {
    id: '5',
    src: photo5_700,
    srcSet: `${photo5_700} 700w, ${photo5_1400} 1400w`,
  },
  {
    id: '6',
    src: photo6_700,
    srcSet: `${photo6_700} 700w, ${photo6_1400} 1400w`,
  },
  {
    id: '7',
    src: photo7_700,
    srcSet: `${photo7_700} 700w, ${photo7_1400} 1400w`,
  },
  {
    id: '8',
    src: photo8_700,
    srcSet: `${photo8_700} 700w, ${photo8_1400} 1400w`,
  },
  {
    id: '9',
    src: photo9_700,
    srcSet: `${photo9_700} 700w, ${photo9_1400} 1400w`,
  },
];

export const WELCOME_PARTY_SLIDESHOW_INTERVAL_MS = 4500;
