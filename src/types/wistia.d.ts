import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'media-id'?: string;
          aspect?: string;
          autoplay?: boolean;
          'silent-autoplay'?: string;
          'controls-visible-on-load'?: string;
          'volume-control'?: string;
          preload?: string;
        },
        HTMLElement
      >;
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'wistia-player': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement> & {
            'media-id'?: string;
            aspect?: string;
            autoplay?: boolean;
            'silent-autoplay'?: string;
            'controls-visible-on-load'?: string;
            'volume-control'?: string;
            preload?: string;
          },
          HTMLElement
        >;
      }
    }
  }
}

export {};
