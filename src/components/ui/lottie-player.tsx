/* NEVER TOUCH THIS FILE IT SHOULD BE DYNAMIC IN ORDER TO WORK */
"use client";

import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';

// Define prop types for the Lottie Player component
interface LottiePlayerProps {
  src: object | string; // Animation data or URL
  style?: CSSProperties;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
  // Additional props without causing type conflicts
  [key: string]: unknown | object | string | CSSProperties | boolean;
}

// Dynamic import for Lottie Player
const DynamicLottiePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => {
    return {
      default: ({ src, style, autoplay = true, loop = true, controls = false, ...props }: LottiePlayerProps) => {
        const { Player, Controls } = mod;
        return (
          <Player
            autoplay={autoplay}
            loop={loop}
            src={src}
            style={style}
            {...props}
          >
            {controls && <Controls visible={controls} />}
          </Player>
        );
      }
    };
  }),
  { ssr: false }
);

// Set the display name explicitly
DynamicLottiePlayer.displayName = 'LottiePlayer';

export default DynamicLottiePlayer;
